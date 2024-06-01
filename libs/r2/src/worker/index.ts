import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { CORSHeaders } from './cors';
import { RequestSchema } from './zod';

const BUCKET = 'vestido-bucket';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response('ok', { headers: CORSHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, message: 'Unknown Method' }),
        {
          headers: { ...CORSHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    const { success, ...body } = RequestSchema.safeParse(
      await request.json().catch(() => ({}))
    );

    if (!success || 'error' in body) {
      return new Response(JSON.stringify({ ...body, success }), {
        headers: { ...CORSHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const s3Client = new S3Client({
      region: 'auto',
      endpoint: env.R2_END_POINT,
      credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_KEY_ACCESS,
      },
    });

    let _command = null;
    const { requestType, key, expiresIn } = body.data;
    if (requestType === 'UPLOAD') {
      _command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
      });
    } else if (requestType === 'GET') {
      _command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
      });
    }

    if (!_command) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Unknown request type',
          error: 'UNKNOWN REQUEST TYPE',
        }),
        {
          headers: { ...CORSHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    const signedURL = await getSignedUrl(s3Client, _command, {
      expiresIn, // URL expiration time in seconds
    });

    return new Response(
      JSON.stringify({ success: true, requestType, key, signedURL }, null, 2),
      {
        headers: { ...CORSHeaders, 'Content-Type': 'application/json' },
      }
    );
  },
};

export interface Env {
  R2_END_POINT: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_KEY_ACCESS: string;

  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  //
  // Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
  // MY_QUEUE: Queue;
}

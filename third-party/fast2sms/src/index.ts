import { z } from 'zod';

import { getPrismaClient } from './../../../libs/models';

const FAST2SMS_AUTH_KEY = process.env['FAST2SMS_AUTH_KEY'] as string;

export enum SMSTemplate {
  OTP_SMS = '172544',
  ORDER_PLACED_SMS = '176598',
  ORDER_SHIPPED_SMS = '176599',
  ORDER_DELIVERED_SMS = '176600',
}

export enum SMSSenderID {
  BVSTID = 'BVSTID',
}

const MobileNumberSchema = z.string().regex(/^[6-9]\d{9}$/);

export const SendSMSSchema = z.object({
  senderId: z.nativeEnum(SMSSenderID),
  template: z.nativeEnum(SMSTemplate),
  variables: z.array(z.string()),
  recipients: z.array(MobileNumberSchema),
});

export type SendSMSRequest = z.infer<typeof SendSMSSchema>;

export async function sendSMS(_args: SendSMSRequest) {
  const prisma = getPrismaClient();
  const args = SendSMSSchema.parse(_args);

  // https://docs.fast2sms.com/#post-method
  const reqBody = {
    route: 'dlt',
    sender_id: args.senderId,
    message: args.template,
    variables_values: args.variables.join('|'),
    flash: 0,
    numbers: args.recipients.join(','),
  };

  const r = await fetch('https://www.fast2sms.com/dev/bulkV2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${FAST2SMS_AUTH_KEY}`,
    },
    body: JSON.stringify(reqBody),
  });

  await prisma.sMSLog.create({
    data: {
      context: JSON.stringify({
        mobile: args.recipients,
        orderId: args.variables,
      }),
      logType: args.template,
      response: JSON.stringify(r),
    },
  });

  if (!r.ok) {
    console.error('Fast2SMS Error:', await r.text());
    throw new Error('Error sending SMS');
  }

  const data = await r.json();
  if (data && data.message[0] === 'SMS sent successfully.') {
    return true;
  }

  console.error('Fast2SMS Error:', data);
  throw new Error('Error sending SMS');
}

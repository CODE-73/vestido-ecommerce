import { sendOTP } from '@vestido-ecommerce/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const r = await sendOTP(body);

    return new Response(
      JSON.stringify({ success: true, otp: r.otp, userExists: r.userExists }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (e) {
    return new Response(JSON.stringify(e), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

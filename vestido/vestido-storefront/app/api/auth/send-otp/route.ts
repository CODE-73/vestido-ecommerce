import { sendOTP } from '@vestido-ecommerce/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const otp = await sendOTP(body);

    console.log('OTP is:', otp);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify(e), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

import { getRedisClient } from './client';

export async function generateOTP(mobile: string) {
  let otp = await getOTP(mobile);
  if (!otp) {
    otp = mobile.slice(-6);
    // otp = Math.floor(100000 + Math.random() * 900000).toString();
  }
  await setOTP(mobile, otp);
  return otp;
}

export async function getOTP(mobile: string) {
  const client = await getRedisClient();
  return client.get(makeOTPKay(mobile));
}

function makeOTPKay(mobile: string) {
  return `otp:${mobile}`;
}

async function setOTP(mobile: string, otp: string) {
  const client = await getRedisClient();
  return client.set(makeOTPKay(mobile), otp, { EX: 300 });
}

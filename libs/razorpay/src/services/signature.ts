import * as CryptoJS from 'crypto-js';

const RAZORPAY_KEY_SECRET = process.env['RAZORPAY_KEY_SECRET'] as string;
const RAZORPAY_WEBHOOK_SECRET = process.env[
  'RAZORPAY_WEBHOOK_SECRET'
] as string;

export function generatePaymentSignature(
  order_id: string,
  payment_RP_id: string,
) {
  return CryptoJS.HmacSHA256(
    `${order_id}|${payment_RP_id}`,
    RAZORPAY_KEY_SECRET,
  ).toString(CryptoJS.enc.Hex);
}

export function generateWebhookSignature(dataString: string) {
  return CryptoJS.HmacSHA256(dataString, RAZORPAY_WEBHOOK_SECRET).toString(
    CryptoJS.enc.Hex,
  );
}

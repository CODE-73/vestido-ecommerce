import * as CryptoJS from 'crypto-js';

const razorpaySecret = process.env['RAZORPAY_KEY_SECRET'] as string; // Your Razorpay secret key
export function generatePaymentSignature(
  order_id: string,
  payment_RP_id: string,
) {
  return CryptoJS.HmacSHA256(
    `${order_id}|${payment_RP_id}`,
    razorpaySecret,
  ).toString(CryptoJS.enc.Hex);
}

const webhookSecret = '6d2Lv76AugGojJGt1Wa7MEgFZmSZaq5z';
export function generateWebhookSignature(dataString: string) {
  return CryptoJS.HmacSHA256(dataString, webhookSecret).toString(
    CryptoJS.enc.Hex,
  );
}

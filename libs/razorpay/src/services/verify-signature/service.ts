import { verifySignatureRequest, verifySignatureResponse } from './types';
import { verifyRPSignSchema } from './zod';

export async function verifySignature(data: verifySignatureRequest) {
  const validatedData = verifyRPSignSchema.parse(data);

  const { order_id, payment_id, razorpay_signature } = validatedData;

   const secret = process.env.['RAZORPAY_SECRET']; // Your Razorpay secret key

  // Generate the signature using the order_id and payment_id
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${order_id}|${payment_id}`)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    return true
  } else {
    return false
  }
}

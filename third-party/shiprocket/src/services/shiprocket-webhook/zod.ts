import { z } from 'zod';

// Schema for each scan item in the webhook payload
const scanSchema = z.object({
  date: z.string(),
  status: z.string(),
  activity: z.string(),
  location: z.string(),
  'sr-status': z.number().nullable(),
  'sr-status-label': z.string().nullable(),
});

// Main webhook payload schema
export const shiprocketWebhookSchema = z.object({
  awb: z.string(),
  courier_name: z.string(),
  current_status: z.string(),
  current_status_id: z.number(),
  shipment_status: z.string(),
  shipment_status_id: z.number(),
  current_timestamp: z.string(),
  order_id: z.string(), // Order ID from our system: filfillmentId
  sr_order_id: z.number(),
  awb_assigned_date: z.string(),
  pickup_scheduled_date: z.string(),
  etd: z.string(), // Estimated time of delivery
  scans: z.array(scanSchema), // Array of scan objects (each having date, status, activity, etc.)
  is_return: z.boolean(), // Whether this is a return shipment: 0 = false, 1 = true
  channel_id: z.number(),
  pod_status: z.string(), // POD status: "OTP Based Delivery"
  pod: z.string().nullable(), // Proof of delivery: "Not Available"
  token: z.string(),
});

export type shiprocketWebhookSchemaType = z.infer<
  typeof shiprocketWebhookSchema
>;

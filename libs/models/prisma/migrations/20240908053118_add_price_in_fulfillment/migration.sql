/*
  Warnings:

  - The `shiprocket_order_id` column on the `Fulfillment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Fulfillment" ADD COLUMN     "price" DOUBLE PRECISION,
DROP COLUMN "shiprocket_order_id",
ADD COLUMN     "shiprocket_order_id" INTEGER;

/*
  Warnings:

  - The `shipment_id` column on the `Fulfillment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Fulfillment" DROP COLUMN "shipment_id",
ADD COLUMN     "shipment_id" INTEGER;

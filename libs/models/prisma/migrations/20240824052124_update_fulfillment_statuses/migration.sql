/*
  Warnings:

  - The `status` column on the `Fulfillment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Payment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Fulfillment" DROP COLUMN "status",
ADD COLUMN     "status" "FulfillmentStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "status",
ADD COLUMN     "status" "OrderPaymentStatus" NOT NULL DEFAULT 'PENDING';

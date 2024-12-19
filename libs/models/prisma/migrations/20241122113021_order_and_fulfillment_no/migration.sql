-- AlterTable
ALTER TABLE "Fulfillment"
ADD COLUMN "fulfillment_no" BIGSERIAL NOT NULL;
-- AlterTable
ALTER TABLE "Order"
ADD COLUMN "order_no" BIGSERIAL NOT NULL;
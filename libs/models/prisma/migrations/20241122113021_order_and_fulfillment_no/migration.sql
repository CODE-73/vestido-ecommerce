-- AlterTable
ALTER TABLE "Fulfillment"
ADD COLUMN "fulfillment_no" BIGSERIAL NOT NULL;
-- AlterTable
ALTER TABLE "Order"
ADD COLUMN "order_no" BIGSERIAL NOT NULL;
ALTER SEQUENCE "Order_order_no-seq" RESTART WITH 10001;
ALTER SEQUENCE "Fulfillment_fulfillment_no_seq" RESTART WITH 101;
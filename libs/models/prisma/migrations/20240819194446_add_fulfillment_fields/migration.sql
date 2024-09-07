-- AlterTable
ALTER TABLE "Fulfillment" ADD COLUMN     "breadth" DOUBLE PRECISION,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "length" DOUBLE PRECISION,
ADD COLUMN     "shipment_id" TEXT,
ADD COLUMN     "shiprocket_order_id" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION;

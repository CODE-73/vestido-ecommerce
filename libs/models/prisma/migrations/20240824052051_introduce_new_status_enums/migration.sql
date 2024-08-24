-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('UNFULFILLED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ReturnStatus" AS ENUM ('RETURN_REQUESTED', 'RETURN_IN_PROGRESS', 'PARTIALLY_RETURNED', 'RETURNED');

-- CreateEnum
CREATE TYPE "ExchangeStatus" AS ENUM ('EXCHANGE_REQUESTED', 'EXCHANGE_IN_PROGRESS', 'PARTIALLY_EXCHANGED', 'EXCHANGED');

-- CreateEnum
CREATE TYPE "OrderPaymentStatus" AS ENUM ('PENDING', 'CAPTURED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "FulfillmentStatus" AS ENUM ('DRAFT', 'AWAITING_PICKUP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'FAILED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryStatus" "DeliveryStatus" NOT NULL DEFAULT 'UNFULFILLED',
ADD COLUMN     "exchangeStatus" "ExchangeStatus",
ADD COLUMN     "orderPaymentStatus" "OrderPaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "returnStatus" "ReturnStatus";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "deliveryStatus" "DeliveryStatus" NOT NULL DEFAULT 'UNFULFILLED',
ADD COLUMN     "exchangeStatus" "ExchangeStatus",
ADD COLUMN     "returnStatus" "ReturnStatus";

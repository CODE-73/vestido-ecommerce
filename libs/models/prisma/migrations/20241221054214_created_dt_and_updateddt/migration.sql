-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Fulfillment" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FulfillmentItem" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FulfillmentLog" ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "OrderLog" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tax" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP;
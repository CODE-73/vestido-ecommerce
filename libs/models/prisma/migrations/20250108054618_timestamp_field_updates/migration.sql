/*
  Warnings:

  - Made the column `updatedAt` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Coupon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Fulfillment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `FulfillmentItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Tax` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `WishlistItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Coupon" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Fulfillment" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "FulfillmentItem" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tax" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "WishlistItem" ALTER COLUMN "updatedAt" SET NOT NULL;

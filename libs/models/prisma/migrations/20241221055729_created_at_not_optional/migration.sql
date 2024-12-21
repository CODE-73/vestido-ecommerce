/*
  Warnings:

  - Made the column `createdAt` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Coupon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Fulfillment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `FulfillmentItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `OrderLog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Tax` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `WishlistItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Coupon" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Fulfillment" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "FulfillmentItem" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderLog" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tax" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "WishlistItem" ALTER COLUMN "createdAt" SET NOT NULL;

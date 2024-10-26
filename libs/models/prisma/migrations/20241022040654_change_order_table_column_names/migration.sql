/*
  Warnings:

  - You are about to drop the column `coupon` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "coupon",
DROP COLUMN "discount",
ADD COLUMN     "couponCode" TEXT,
ADD COLUMN     "totalDiscount" DOUBLE PRECISION NOT NULL DEFAULT 0;

/*
  Warnings:

  - You are about to drop the column `taxInclusive` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `taxRate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `taxTitle` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "taxInclusive",
DROP COLUMN "taxRate",
DROP COLUMN "taxTitle",
ADD COLUMN     "grandTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalCharges" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalTax" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "taxAmount" DOUBLE PRECISION NOT NULL DEFAULT 0;

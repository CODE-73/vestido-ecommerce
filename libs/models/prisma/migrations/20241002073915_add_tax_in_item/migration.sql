/*
  Warnings:

  - You are about to drop the column `tax` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "taxInclusive" BOOLEAN,
ADD COLUMN     "taxRate" DOUBLE PRECISION,
ADD COLUMN     "taxTitle" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "tax",
ADD COLUMN     "taxInclusive" BOOLEAN,
ADD COLUMN     "taxRate" DOUBLE PRECISION,
ADD COLUMN     "taxTitle" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "tax",
ADD COLUMN     "taxInclusive" BOOLEAN,
ADD COLUMN     "taxRate" DOUBLE PRECISION,
ADD COLUMN     "taxTitle" TEXT;

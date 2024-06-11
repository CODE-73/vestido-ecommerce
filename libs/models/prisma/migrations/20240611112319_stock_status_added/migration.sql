/*
  Warnings:

  - You are about to drop the column `stock` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Item` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StockStatus" AS ENUM ('AVAILABLE', 'LIMITED_STOCK', 'OUT_OF_STOCK');

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "stock",
DROP COLUMN "unit",
ADD COLUMN     "stockStatus" "StockStatus" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "ItemVariant" ADD COLUMN     "stockStatus" "StockStatus" NOT NULL DEFAULT 'AVAILABLE';

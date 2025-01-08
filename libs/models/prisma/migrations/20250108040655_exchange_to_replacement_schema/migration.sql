/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `exchangeStatus` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `exchangeStatus` on the `OrderItem` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReplacementStatus" AS ENUM ('REPLACEMENT_REQUESTED', 'REPLACEMENT_IN_PROGRESS', 'PARTIALLY_REPLACED', 'REPLACED');

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "exchangeStatus",
ADD COLUMN     "replacementStatus" "ReplacementStatus";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "exchangeStatus",
ADD COLUMN     "replacementStatus" "ReplacementStatus";

-- AlterTable
ALTER TABLE "WishlistItem" ALTER COLUMN "createdAt" DROP NOT NULL;

-- DropEnum
DROP TYPE "ExchangeStatus";

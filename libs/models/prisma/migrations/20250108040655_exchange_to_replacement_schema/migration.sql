/*
 Warnings:
 
 - You are about to drop the column `exchangeStatus` on the `Order` table. All the data in the column will be lost.
 - You are about to drop the column `exchangeStatus` on the `OrderItem` table. All the data in the column will be lost.
 
 */
-- CreateEnum
CREATE TYPE "ReplacementStatus" AS ENUM (
  'REPLACEMENT_REQUESTED',
  'REPLACEMENT_IN_PROGRESS',
  'PARTIALLY_REPLACED',
  'REPLACED'
);
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "exchangeStatus",
  ADD COLUMN "replacementStatus" "ReplacementStatus";
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "exchangeStatus",
  ADD COLUMN "replacementStatus" "ReplacementStatus";
-- DropEnum
DROP TYPE "ExchangeStatus";
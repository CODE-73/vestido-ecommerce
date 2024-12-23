/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Fulfillment` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fulfillment" DROP COLUMN "dateTime";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "dateTime";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "dateTime",
ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP;

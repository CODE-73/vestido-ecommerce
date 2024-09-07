/*
  Warnings:

  - You are about to drop the column `fulfillmentQuantity` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "fulfillmentQuantity",
ADD COLUMN     "fulfilledQuantity" INTEGER;

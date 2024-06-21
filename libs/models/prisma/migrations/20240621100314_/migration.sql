/*
  Warnings:

  - A unique constraint covering the columns `[orderItemId]` on the table `FulfillmentItem` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `price` on the `OrderItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FulfillmentItem_orderItemId_key" ON "FulfillmentItem"("orderItemId");

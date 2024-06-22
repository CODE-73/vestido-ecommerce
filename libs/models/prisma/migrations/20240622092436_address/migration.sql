/*
  Warnings:

  - You are about to drop the column `State` on the `CustomerAddress` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddress` on the `Order` table. All the data in the column will be lost.
  - Added the required column `state` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerAddress" DROP COLUMN "State",
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingAddress",
ADD COLUMN     "addressId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "CustomerAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

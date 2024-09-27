/*
 Warnings:
 
 - Added the required column `taxId` to the `Item` table without a default value. This is not possible if the table is not empty.
 - Added the required column `taxId` to the `Order` table without a default value. This is not possible if the table is not empty.
 
 */
-- AlterTable
ALTER TABLE "Item"
ADD COLUMN "hasTax" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "taxId" UUID NOT NULL DEFAULT 'f4bf94fd-5c92-4c79-8b7a-99a93a16633b';
-- AlterTable
ALTER TABLE "Order"
ADD COLUMN "hasTax" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "taxId" UUID NOT NULL DEFAULT 'f4bf94fd-5c92-4c79-8b7a-99a93a16633b';
-- AddForeignKey
ALTER TABLE "Item"
ADD CONSTRAINT "Item_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "Tax"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "Order"
ADD CONSTRAINT "Order_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "Tax"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
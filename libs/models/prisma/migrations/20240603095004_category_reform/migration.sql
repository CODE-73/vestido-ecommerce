/*
  Warnings:

  - You are about to drop the column `brand` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `ItemCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemCategory" DROP CONSTRAINT "ItemCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ItemCategory" DROP CONSTRAINT "ItemCategory_itemId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "brand",
ADD COLUMN     "categoryId" UUID;

-- DropTable
DROP TABLE "ItemCategory";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

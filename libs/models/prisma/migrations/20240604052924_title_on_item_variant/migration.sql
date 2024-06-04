/*
  Warnings:

  - Made the column `categoryId` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `title` to the `ItemVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ItemVariant" ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

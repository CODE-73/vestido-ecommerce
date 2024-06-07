/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_itemId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "images" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "ItemVariant" ADD COLUMN     "images" JSONB NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE "Image";

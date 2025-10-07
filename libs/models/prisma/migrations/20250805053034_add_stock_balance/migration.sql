-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "stockBalance" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ItemVariant" ADD COLUMN     "stockBalance" INTEGER NOT NULL DEFAULT 0;

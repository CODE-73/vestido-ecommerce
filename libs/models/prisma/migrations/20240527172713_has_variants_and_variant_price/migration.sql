-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "hasVariants" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ItemVariant" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

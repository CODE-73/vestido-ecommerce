-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sku" TEXT;

-- AlterTable
ALTER TABLE "ItemVariant" ADD COLUMN     "discountPercent" DOUBLE PRECISION,
ADD COLUMN     "discountedPrice" DOUBLE PRECISION,
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sku" TEXT;

-- DropForeignKey
ALTER TABLE "StockLedger" DROP CONSTRAINT "StockLedger_itemVariantId_fkey";

-- AlterTable
ALTER TABLE "StockLedger" ALTER COLUMN "itemVariantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StockLedger" ADD CONSTRAINT "StockLedger_itemVariantId_fkey" FOREIGN KEY ("itemVariantId") REFERENCES "ItemVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

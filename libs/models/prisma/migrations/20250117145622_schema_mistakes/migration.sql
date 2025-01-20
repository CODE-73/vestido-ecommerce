/*
  Warnings:

  - The `deliveredDate` column on the `Fulfillment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `replacedQty` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `returnedQty` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Fulfillment" DROP COLUMN "deliveredDate",
ADD COLUMN     "deliveredDate" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "OrderItem"
  ALTER COLUMN "replacedQty" SET DEFAULT 0,
  ALTER COLUMN "returnedQty" SET DEFAULT 0;

UPDATE "OrderItem" SET "replacedQty" = 0 WHERE "replacedQty" IS NULL;
UPDATE "OrderItem" SET "returnedQty" = 0 WHERE "returnedQty" IS NULL;

ALTER TABLE "OrderItem"
  ALTER COLUMN "replacedQty" SET NOT NULL,
  ALTER COLUMN "returnedQty" SET NOT NULL;

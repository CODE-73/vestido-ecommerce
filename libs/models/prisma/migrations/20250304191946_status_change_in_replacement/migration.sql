/*
  Warnings:

  - The values [PARTIALLY_REPLACED,REPLACED] on the enum `ReplacementStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReplacementStatus_new" AS ENUM ('REPLACEMENT_REQUESTED', 'REPLACEMENT_IN_PROGRESS', 'PARTIALLY_RECEIVED_BACK', 'RECEIVED_BACK');
ALTER TABLE "Order" ALTER COLUMN "replacementStatus" TYPE "ReplacementStatus_new" USING ("replacementStatus"::text::"ReplacementStatus_new");
ALTER TABLE "OrderItem" ALTER COLUMN "replacementStatus" TYPE "ReplacementStatus_new" USING ("replacementStatus"::text::"ReplacementStatus_new");
ALTER TYPE "ReplacementStatus" RENAME TO "ReplacementStatus_old";
ALTER TYPE "ReplacementStatus_new" RENAME TO "ReplacementStatus";
DROP TYPE "ReplacementStatus_old";
COMMIT;

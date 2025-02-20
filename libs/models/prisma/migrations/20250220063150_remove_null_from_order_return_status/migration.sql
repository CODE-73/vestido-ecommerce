/*
  Warnings:

  - The values [NULL] on the enum `OrderReturnStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderReturnStatus_new" AS ENUM ('RETURN_REQUESTED', 'RETURN_IN_PROGRESS', 'PARTIALLY_RETURNED', 'RETURNED');
ALTER TABLE "Order" ALTER COLUMN "returnStatus" TYPE "OrderReturnStatus_new" USING ("returnStatus"::text::"OrderReturnStatus_new");
ALTER TABLE "OrderItem" ALTER COLUMN "returnStatus" TYPE "OrderReturnStatus_new" USING ("returnStatus"::text::"OrderReturnStatus_new");
ALTER TYPE "OrderReturnStatus" RENAME TO "OrderReturnStatus_old";
ALTER TYPE "OrderReturnStatus_new" RENAME TO "OrderReturnStatus";
DROP TYPE "OrderReturnStatus_old";
COMMIT;

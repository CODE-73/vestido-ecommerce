/*
  Warnings:

  - The values [RETURN_REQUESTED,RETURN_IN_PROGRESS,PARTIALLY_RETURNED] on the enum `ReturnStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "RefundStatus" AS ENUM ('PENDING', 'REFUNDED', 'REJECTED');

-- AlterEnum
BEGIN;
CREATE TYPE "ReturnStatus_new" AS ENUM ('AWAITING_PICKUP', 'PICKED_UP', 'IN_TRANSIT', 'RETURNED', 'REJECTED');
ALTER TABLE "Order" ALTER COLUMN "returnStatus" TYPE "ReturnStatus_new" USING ("returnStatus"::text::"ReturnStatus_new");
ALTER TABLE "OrderItem" ALTER COLUMN "returnStatus" TYPE "ReturnStatus_new" USING ("returnStatus"::text::"ReturnStatus_new");
ALTER TYPE "ReturnStatus" RENAME TO "ReturnStatus_old";
ALTER TYPE "ReturnStatus_new" RENAME TO "ReturnStatus";
DROP TYPE "ReturnStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Fulfillment" ADD COLUMN     "deliveredDate" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "replacedQty" INTEGER,
ADD COLUMN     "returnedQty" INTEGER;

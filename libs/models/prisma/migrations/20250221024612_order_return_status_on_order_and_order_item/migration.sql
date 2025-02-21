/*
  Warnings:

  - The `returnStatus` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `returnStatus` column on the `OrderItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderReturnStatus" AS ENUM ('RETURN_REQUESTED', 'RETURN_IN_PROGRESS', 'PARTIALLY_RETURNED', 'RETURNED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "returnStatus",
ADD COLUMN     "returnStatus" "OrderReturnStatus";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "returnStatus",
ADD COLUMN     "returnStatus" "OrderReturnStatus";

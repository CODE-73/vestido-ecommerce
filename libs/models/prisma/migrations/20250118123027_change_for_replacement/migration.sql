-- CreateEnum
CREATE TYPE "ReturnType" AS ENUM ('RETURN', 'REPLACE');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isReplacement" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentOrderId" UUID;

-- AlterTable
ALTER TABLE "Return" ADD COLUMN     "replacementOrderId" UUID,
ADD COLUMN     "type" "ReturnType" NOT NULL DEFAULT 'RETURN';

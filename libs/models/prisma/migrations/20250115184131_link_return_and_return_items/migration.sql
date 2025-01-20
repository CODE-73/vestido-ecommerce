/*
  Warnings:

  - You are about to drop the column `orderItemId` on the `Return` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Return" DROP CONSTRAINT "Return_orderItemId_fkey";

-- AlterTable
ALTER TABLE "Return" DROP COLUMN "orderItemId";

-- AlterTable
ALTER TABLE "ReturnItem" ADD COLUMN     "returnId" UUID;

-- AddForeignKey
ALTER TABLE "ReturnItem" ADD CONSTRAINT "ReturnItem_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "Return"("id") ON DELETE SET NULL ON UPDATE CASCADE;

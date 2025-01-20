/*
  Warnings:

  - Made the column `returnId` on table `ReturnItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ReturnItem" DROP CONSTRAINT "ReturnItem_returnId_fkey";

-- AlterTable
ALTER TABLE "ReturnItem" ALTER COLUMN "returnId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ReturnItem" ADD CONSTRAINT "ReturnItem_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "Return"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Changed the type of `refundAmount` on the `Return` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Return" DROP COLUMN "refundAmount",
ADD COLUMN     "refundAmount" DOUBLE PRECISION NOT NULL;

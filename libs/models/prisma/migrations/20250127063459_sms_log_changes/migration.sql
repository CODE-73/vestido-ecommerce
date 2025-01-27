/*
  Warnings:

  - You are about to drop the column `contactDetails` on the `SMSLog` table. All the data in the column will be lost.
  - You are about to drop the column `rawData` on the `SMSLog` table. All the data in the column will be lost.
  - Added the required column `context` to the `SMSLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `response` to the `SMSLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SMSLog" DROP COLUMN "contactDetails",
DROP COLUMN "rawData",
ADD COLUMN     "context" TEXT NOT NULL,
ADD COLUMN     "response" JSONB NOT NULL;

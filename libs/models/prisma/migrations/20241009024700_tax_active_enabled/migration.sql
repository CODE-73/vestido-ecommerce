/*
  Warnings:

  - You are about to drop the column `active` on the `Tax` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tax" DROP COLUMN "active",
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true;

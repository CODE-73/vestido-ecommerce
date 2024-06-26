/*
  Warnings:

  - You are about to drop the column `postalCode` on the `CustomerAddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mobile]` on the table `CustomerAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `default` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinCode` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOME', 'OFFICE');

-- AlterTable
ALTER TABLE "CustomerAddress" DROP COLUMN "postalCode",
ADD COLUMN     "addressType" "AddressType" NOT NULL DEFAULT 'HOME',
ADD COLUMN     "default" BOOLEAN NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL,
ADD COLUMN     "pinCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAddress_mobile_key" ON "CustomerAddress"("mobile");

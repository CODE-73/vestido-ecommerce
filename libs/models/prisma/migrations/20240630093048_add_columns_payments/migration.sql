/*
  Warnings:

  - You are about to drop the column `method` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `currency` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moreDetails` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentGateway` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentGatewayRef` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "method",
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "moreDetails" TEXT NOT NULL,
ADD COLUMN     "paymentGateway" TEXT NOT NULL,
ADD COLUMN     "paymentGatewayRef" TEXT NOT NULL;

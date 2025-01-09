/*
  Warnings:

  - You are about to drop the column `IFSC_Code` on the `BankDetails` table. All the data in the column will be lost.
  - You are about to drop the column `ReceiverName` on the `BankDetails` table. All the data in the column will be lost.
  - You are about to drop the column `Qty` on the `ReturnItem` table. All the data in the column will be lost.
  - Added the required column `ifscCode` to the `BankDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Return` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `ReturnItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankDetails" DROP COLUMN "IFSC_Code",
DROP COLUMN "ReceiverName",
ADD COLUMN     "accountHolderName" TEXT,
ADD COLUMN     "ifscCode" TEXT NOT NULL,
ALTER COLUMN "mobile" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Return" ADD COLUMN     "orderId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ReturnItem" DROP COLUMN "Qty",
ADD COLUMN     "qty" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

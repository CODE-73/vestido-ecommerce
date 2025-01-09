-- CreateTable
CREATE TABLE "BankDetails" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customerId" UUID NOT NULL,
    "returnId" UUID NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "IFSC_Code" TEXT NOT NULL,
    "ReceiverName" TEXT,
    "mobile" TEXT NOT NULL,

    CONSTRAINT "BankDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BankDetails" ADD CONSTRAINT "BankDetails_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankDetails" ADD CONSTRAINT "BankDetails_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "Return"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "FulfillmentLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fullfillmentId" UUID NOT NULL,
    "logType" TEXT NOT NULL,
    "rawData" JSONB NOT NULL,

    CONSTRAINT "FulfillmentLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FulfillmentLog" ADD CONSTRAINT "FulfillmentLog_fullfillmentId_fkey" FOREIGN KEY ("fullfillmentId") REFERENCES "Fulfillment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "SMSLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contactDetails" TEXT NOT NULL,
    "logType" TEXT NOT NULL,
    "rawData" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SMSLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "logType" TEXT NOT NULL,
    "rawData" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookLog_pkey" PRIMARY KEY ("id")
);

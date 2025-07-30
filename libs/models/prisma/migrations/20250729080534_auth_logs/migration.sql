-- CreateEnum
CREATE TYPE "AuthLogType" AS ENUM ('AUTHENTICATED', 'PROFILE_CREATED', 'OTP_VERIFICATION_FAILED');

-- CreateTable
CREATE TABLE "AuthLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" UUID NOT NULL,
    "logType" "AuthLogType" NOT NULL,

    CONSTRAINT "AuthLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuthLog" ADD CONSTRAINT "AuthLog_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

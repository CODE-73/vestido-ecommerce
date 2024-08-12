-- CreateEnum
CREATE TYPE "ProfileGender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "gender" "ProfileGender" NOT NULL DEFAULT 'FEMALE';

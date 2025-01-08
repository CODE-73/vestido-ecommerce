-- DropIndex
DROP INDEX "Settings_key_key";

-- AlterTable
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_pkey" PRIMARY KEY ("key");

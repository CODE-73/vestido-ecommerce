-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "tax" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "tax" TEXT;

-- CreateTable
CREATE TABLE "Tax" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("id")
);

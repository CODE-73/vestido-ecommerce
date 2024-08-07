-- CreateTable
CREATE TABLE "_prisma_seeds" (
    "id" TEXT NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checksum" TEXT NOT NULL,
    "seed_name" TEXT NOT NULL,

    CONSTRAINT "_prisma_seeds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "_prisma_seeds_seed_name_key" ON "_prisma_seeds"("seed_name");

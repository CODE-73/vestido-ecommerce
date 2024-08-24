-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "searchTerms" TEXT[] DEFAULT ARRAY[]::TEXT[];

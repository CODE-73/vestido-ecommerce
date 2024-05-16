-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MEN', 'WOMEN', 'BOYS', 'GIRLS');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "gender" "Gender"[] DEFAULT ARRAY['MEN', 'WOMEN']::"Gender"[];

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "gender" "Gender"[] DEFAULT ARRAY['MEN', 'WOMEN']::"Gender"[];

/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ItemVariant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ItemVariant` table without a default value. This is not possible if the table is not empty.

*/

CREATE OR REPLACE FUNCTION generate_slug(title TEXT, item_id UUID, tablename TEXT) RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    new_slug TEXT;
    conflict BOOLEAN;
    count INT := 1;
BEGIN
    -- Create the base slug by lowercasing the title and replacing spaces with hyphens
    base_slug := regexp_replace(lower(title), '\s+', '-', 'g');

    -- Initialize the new_slug with the base_slug
    new_slug := base_slug;

    -- Check for conflicts and append a number if necessary
    LOOP
        EXECUTE format('SELECT EXISTS (SELECT 1 FROM %I WHERE slug = %L AND id <> %L)', tablename, new_slug, item_id) INTO conflict;
        EXIT WHEN NOT conflict;

        count := count + 1;
        new_slug := base_slug || '-' || count;
    END LOOP;

    RETURN new_slug;
END;
$$ LANGUAGE plpgsql;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "ItemVariant" ADD COLUMN     "slug" TEXT;


UPDATE "Category" SET slug = generate_slug("name", "id", 'Category');
UPDATE "Item" SET slug = generate_slug("title", "id", 'Item');
UPDATE "ItemVariant" SET slug = generate_slug("title", "id", 'ItemVariant');

ALTER TABLE "Category" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "Item" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "ItemVariant" ALTER COLUMN "slug" SET NOT NULL;

DROP FUNCTION generate_slug(TEXT, UUID, TEXT);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Item_slug_key" ON "Item"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ItemVariant_slug_key" ON "ItemVariant"("slug");

import { PrismaClient } from '@prisma/client';

export const __DEPENDS_ON__ = ['slugify'];

export const __SEED__ = async (client: PrismaClient) => {
  await client.$executeRaw`
    CREATE OR REPLACE FUNCTION validate_category_search_terms()
    RETURNS TRIGGER AS $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM "Category" AS c
          WHERE id != NEW.id
          AND slugify_array(c."searchTerms") && slugify_array(NEW."searchTerms")
        ) THEN
          RAISE EXCEPTION 'Duplicate search terms found in Category.searchTerms';
        END IF;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    `;

  await client.$executeRaw`
    CREATE OR REPLACE TRIGGER ensure_unique_category_search_terms
    BEFORE INSERT OR UPDATE ON "Category"
    FOR EACH ROW
    EXECUTE FUNCTION validate_category_search_terms();
  `;
};

import { getPrismaClient } from '@vestido-ecommerce/models';

import { categoryDetails } from '../get-category';
import { Category, GenerateCategorySearchTermsResponse } from './types';

const OPENAI_API_KEY = process.env['OPENAI_API_KEY'];

export async function generateCategorySearchTerms(categoryId: string) {
  const category = await categoryDetails(categoryId);
  if (!category) {
    throw new Error('Category does not exist');
  }

  const parentCategories = await getParentCategories(categoryId);
  const prompt = makePrompt(category, parentCategories);

  const terms = await invokeOpenAI(prompt);

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    searchTerms: terms.split('\n').map((x) => x.trim().replace(/\\[ntr]/g, '')),
  } satisfies GenerateCategorySearchTermsResponse;
}

function makePrompt(category: Category, ancestors: Category[]) {
  function formatCategory(category: Category) {
    return `"${category.name.trim()} (${category.gender.join(', ')})"`;
  }

  return `
Generate a list of search terms for the ECommerce Category ${formatCategory(category)}.
${ancestors.length > 0 ? `It's ancestor categories are: ${ancestors.map(formatCategory).join(', ')}.` : ''}

- Please don't go too far away generalizing from the category asked.
- When given "Shirts (MEN)", do not reply "T-Shirts for Men" since that is a different category altogether.
- Include Gender only if the category has that gender specified.
- Add gender as both suffix (".. For Men") and prefix ("Men's ..").

Please respond with just the seach terms, one in each line.
`;
}

async function getParentCategories(categoryId: string) {
  const prisma = getPrismaClient();
  const categories = (await prisma.$queryRaw`
  WITH RECURSIVE
  category_path AS (
    SELECT
      id,
      "name",
      "slug",
      "gender",
      "parentCategoryId"
    FROM
      public."Category"
    WHERE
      -- Specify the category Id for which you want to fetch parents
      id = ${categoryId}::UUID
    UNION
    SELECT
      c.id,
      c.name,
      c.slug,
      c.gender,
      c."parentCategoryId"
    FROM
      public."Category" c
      JOIN category_path cp ON c.id = cp."parentCategoryId"
  )
SELECT
  *
FROM
  category_path;
  `) as unknown as Array<Category>;

  return categories.filter((x) => x.id !== categoryId);
}

async function invokeOpenAI(prompt: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are responding to an application backend server of an ECommerce platform.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      n: 1,
      stop: null,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    console.error(await response.text());
    throw new Error(`OpenAI API request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

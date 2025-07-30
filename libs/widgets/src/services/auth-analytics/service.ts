import { getPrismaClient } from '@vestido-ecommerce/models';
import { adjustDateRange } from '@vestido-ecommerce/utils';

import { generatePeriods } from '../generate-periods';
import { validatePeriodRange } from '../validate-period-range';
import { BaseReportFilter, BaseReportFilterSchema } from '../zod';

export async function getAuthAnalytics(_body: BaseReportFilter) {
  const prisma = getPrismaClient();

  const body = BaseReportFilterSchema.parse(_body);
  const { fromDate, toDate, groupBy } = body;
  validatePeriodRange({ fromDate, toDate, groupBy });

  const { fromDate: adjustedFrom, toDate: adjustedTo } = adjustDateRange(
    new Date(fromDate),
    new Date(toDate),
  );

  let dateFormat: string;
  switch (groupBy) {
    case 'daily':
      dateFormat = 'YYYY-MM-DD';
      break;
    case 'weekly':
      dateFormat = 'IYYY-"W"IW'; // ISO week format
      break;
    case 'monthly':
      dateFormat = 'YYYY-MM';
      break;
    case 'yearly':
      dateFormat = 'YYYY';
      break;
    default:
      throw new Error(`Unsupported groupBy: ${groupBy}`);
  }

  const logins = await prisma.$queryRaw<
    Array<{ period: string; login_count: number }>
  >`
    SELECT 
      to_char("createdAt", ${dateFormat}) AS period,
      COUNT(*)::int AS login_count
    FROM "AuthLog"
    WHERE "createdAt" BETWEEN ${new Date(adjustedFrom)} AND ${new Date(adjustedTo)}
      AND "logType" = 'AUTHENTICATED'
    GROUP BY period
    ORDER BY period;
  `;
  const signups = await prisma.$queryRaw<
    Array<{ period: string; signup_count: number }>
  >`
  SELECT 
    to_char("createdAt", ${dateFormat}) AS period,
    COUNT(*)::int AS signup_count
  FROM "AuthLog"
  WHERE "createdAt" BETWEEN ${new Date(adjustedFrom)} AND ${new Date(adjustedTo)}
    AND "logType" = 'PROFILE_CREATED'
  GROUP BY period
  ORDER BY period;
`;

  const activeUsers = await prisma.$queryRaw<
    Array<{ period: string; active_users: number }>
  >`SELECT
    to_char("createdAt", ${dateFormat}) AS period,
    COUNT(DISTINCT "profileId")::int AS active_users
  FROM "AuthLog"
  WHERE "createdAt" BETWEEN ${new Date(adjustedFrom)} AND ${new Date(adjustedTo)}
  GROUP BY period
  ORDER BY period;
`;

  const allPeriods = generatePeriods(
    new Date(adjustedFrom),
    new Date(adjustedTo),
    groupBy,
  );

  console.log({
    fromDate: new Date(fromDate).toISOString(),
    toDate: new Date(toDate).toISOString(),
  });

  const loginMap = new Map(
    logins.map(({ period, login_count }) => [period, login_count]),
  );

  const signUpMap = new Map(
    signups.map(({ period, signup_count }) => [period, signup_count]),
  );
  const activeUsersMap = new Map(
    activeUsers.map(({ period, active_users }) => [period, active_users]),
  );

  const auth_analytics = allPeriods.map((period) => ({
    period,
    login_count: loginMap.get(period) ?? '0',
    signup_count: signUpMap.get(period) ?? '0',
    active_users: activeUsersMap.get(period) ?? '0',
  }));

  return auth_analytics;
}

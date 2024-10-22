import { z } from 'zod';

import { SettingsKeys } from '../swr';
import { useSettings } from '../swr/get-settings';

const attributeSchema = z.record(z.string(), z.object({ title: z.string() }));

const SizeSchema = z.record(
  z.string(),
  z.object({
    in: z.string(),
    cm: z.string(),
  }),
);
const SizeChartSchema = z.object({
  meta: z.object({
    title: z.string(),
    attributes: attributeSchema,
  }),
  data: z.record(z.string(), SizeSchema),
});

export const VestidoSizeChartSchema = z.record(z.string(), SizeChartSchema);

export const useVestidoSizeChart = (): z.infer<
  typeof VestidoSizeChartSchema
> | null => {
  const { data, error } = useSettings(SettingsKeys.VESTIDO_SIZE_CHART);

  if (error || !data) {
    return null;
  }

  try {
    const sizeChartData = VestidoSizeChartSchema.parse(data.data?.value);
    return sizeChartData;
  } catch (e) {
    console.error('Size chart validation failed:', e);
    return null;
  }
};

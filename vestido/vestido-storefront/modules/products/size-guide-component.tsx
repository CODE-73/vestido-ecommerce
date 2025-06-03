import * as React from 'react';
import { useMemo } from 'react';

import { motion } from 'framer-motion';
import { LuScaling } from 'react-icons/lu';

import { useCategory, useItem } from '@vestido-ecommerce/items/client';
import { useVestidoSizeChart } from '@vestido-ecommerce/settings/client';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/dialog';

import SizeChartTable from './size-chart-table';

interface ProductViewProps {
  itemId: string;
  IsSmallScreen?: boolean;
}

const SizeGuide: React.FC<ProductViewProps> = ({ itemId, IsSmallScreen }) => {
  const sizeCharts = useVestidoSizeChart();

  const { data: { data: item } = { data: null } } = useItem(itemId);

  const sizeChartValue = useMemo(() => {
    const sizeChartId = sizeCharts
      ? Object.keys(sizeCharts).find((x) => x === item?.sizeChart)
      : undefined;
    return sizeCharts && sizeChartId ? sizeCharts[sizeChartId] : undefined;
  }, [sizeCharts, item?.sizeChart]);

  const { data: { data: category } = { data: null } } = useCategory(
    item?.categoryId,
  );

  if (!item || !category) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`${IsSmallScreen ? '' : ' flex flex-col gap-1 items-center '} cursor-pointer `}
        >
          <LuScaling
            size={24}
            className={`${IsSmallScreen ? 'hidden' : ''} `}
          />
          <div
            className={
              IsSmallScreen
                ? 'pl-5 underline underline-offset-2 text-xs'
                : ' text-xs'
            }
          >
            <span className={IsSmallScreen ? '' : 'hidden'}>View </span>
            Size Guide
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-full w-[95%] sm:w-[500px] md:w-[600px] rounded-lg px-2 overflow-scroll">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {sizeChartValue ? (
            <SizeChartTable
              meta={sizeChartValue.meta}
              data={sizeChartValue.data}
            />
          ) : (
            <div>Size Chart Not Available.</div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuide;

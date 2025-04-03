import { FC, useState } from 'react';

import { LuChevronDown } from 'react-icons/lu';

import { formatINR } from '@vestido-ecommerce/utils';

import ItemImage from '../../components/item-image';
import { OrderItemDetailedStatus } from './hooks/use-order-item-detailed-status';

// Order fulfillment statuses and their progress percentages
const FULFILLMENT_STAGES: Record<string, { label: string; progress: number }> =
  {
    ORDER_PLACED: { label: 'Order Placed', progress: 0 },
    AWAITING_PICKUP: { label: 'Awaiting Pickup', progress: 25 },
    SHIPPED: { label: 'Shipped', progress: 50 },
    OUT_FOR_DELIVERY: { label: 'Out for Delivery', progress: 75 },
    DELIVERED: { label: 'Delivered', progress: 100 },
  };

const RETURN_STAGES: Record<string, { label: string; progress: number }> = {
  AWAITING_PICKUP: { label: 'Awaiting Pickup', progress: 25 },
  PICKED_UP: { label: 'Picked Up', progress: 50 },
  IN_TRANSIT: { label: 'In Transit', progress: 75 },
  RETURNED: { label: 'Returned', progress: 100 },
  REJECTED: { label: 'Rejected', progress: 100 },
};

type OrderItemProps = {
  orderItem: OrderItemDetailedStatus;
};

type ProgressBarProps = {
  progress: number;
  stages: Array<{ label: string; progress: number }>;
};

const ProgressBar: FC<ProgressBarProps> = ({ progress, stages }) => {
  return (
    <div className="relative h-48 w-2 sm:w-full sm:h-2 bg-gray-300 rounded-full">
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />

      {/* Milestone Circles & Status Labels */}
      <div className="absolute top-1/2 left-0 flex w-full justify-between transform -translate-y-1/2">
        {stages.map((stage, index) => (
          <div
            key={stage.label}
            className="relative flex flex-col items-center"
            style={{
              width: `${progress}/${index}%`,
            }}
          >
            {/* Circle */}
            <div
              className={`w-4 h-4 relative top-3 rounded-full border-2 flex items-center ${
                progress >= stage.progress
                  ? 'bg-blue-500 border-blue-500'
                  : 'bg-white border-gray-400'
              }`}
            />
            {/* Status Label */}
            <span className="mt-3 text-xs font-medium text-gray-700 text-center whitespace-nowrap">
              {stage.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrderDetailsViewOrderItem: FC<OrderItemProps> = ({ orderItem }) => {
  const [expandedFulfillments, setExpandedFulfillments] = useState<
    Record<string, boolean>
  >({});

  const toggleExpand = (fulfillmentId: string) => {
    setExpandedFulfillments((prev) => ({
      ...prev,
      [fulfillmentId]: !prev[fulfillmentId],
    }));
  };

  return (
    <div className="py-3 bg-gray-200 rounded-lg">
      <div className="grid grid-cols-6 items-center">
        <ItemImage
          item={orderItem.item}
          width={40}
          height={60}
          className="justify-self-center rounded-lg"
        />
        <div className="text-xs col-span-3">{orderItem.item.title}</div>
        <div className="text-sm justify-self-center">
          {formatINR(orderItem.price)}
        </div>
        <div className="text-sm justify-self-center">x{orderItem.qty}</div>
      </div>

      <div className="flex flex-col gap-3 w-full mt-2">
        {orderItem.statuses.length > 0 &&
          orderItem.statuses.map((fulfillment) => {
            const statusInfo = FULFILLMENT_STAGES[fulfillment.status] || {
              label: 'Unknown',
              progress: 0,
            };

            return (
              <div
                key={fulfillment.fulfillmentId}
                className={`relative flex flex-col bg-blue-500/20 py-3 rounded-lg mx-4 transition-all ${
                  expandedFulfillments[fulfillment.fulfillmentId] ? 'pb-6' : ''
                }`}
              >
                {/* Return Badge */}
                {fulfillment.return && (
                  <div className="absolute top-1/2 -translate-y-1/2 right-3 font-semibold text-xs border border-2 text-white border-blue-500/50 px-3 py-1 rounded-full bg-blue-500/30">
                    Return
                  </div>
                )}

                {/* Row with Chevron, Qty, and Title */}
                <div className="flex items-center w-full">
                  <button
                    onClick={() => toggleExpand(fulfillment.fulfillmentId)}
                    className="px-2 text-gray-600 hover:text-gray-800 transition"
                  >
                    <LuChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedFulfillments[fulfillment.fulfillmentId]
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>
                  <div className="px-1 text-sm text-center basis-1/4">
                    Qty:&nbsp;
                    <span className="">{fulfillment.qty}</span>
                  </div>
                  <div className="px-1 text-sm capitalize basis-3/4">
                    {statusInfo.label}
                  </div>
                </div>

                {/* Progress Bar (Shown When Expanded) */}
                {expandedFulfillments[fulfillment.fulfillmentId] &&
                  (fulfillment.return ? (
                    <div className="mt-3 px-4 relative">
                      {/* Return Statuses */}
                      <ProgressBar
                        progress={statusInfo.progress}
                        stages={Object.values(RETURN_STAGES)}
                      />
                    </div>
                  ) : (
                    <div className="mt-3 px-4 relative">
                      <ProgressBar
                        progress={statusInfo.progress}
                        stages={Object.values(FULFILLMENT_STAGES)}
                      />
                    </div>
                  ))}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OrderDetailsViewOrderItem;

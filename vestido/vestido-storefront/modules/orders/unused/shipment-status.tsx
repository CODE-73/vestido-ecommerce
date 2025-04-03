import { LuPackageCheck, LuTruck } from 'react-icons/lu';

import { Progress } from '@vestido-ecommerce/shadcn-ui/progress';

type ShipmentStatusProps = {
  fulfillmentStatus: string;
};
const ShipmentStatus: React.FC<ShipmentStatusProps> = ({
  fulfillmentStatus,
}) => {
  const statuses = [
    { key: 'DRAFT', label: 'Confirmed', icon: LuPackageCheck },
    { key: 'in_transit', label: 'In Transit', icon: LuTruck },
    { key: 'delivered', label: 'Delivered', icon: LuPackageCheck },
  ];

  const getStatusIndex = (status: string) => {
    if (status === 'DRAFT') return 0; // Ensure 'Confirmed' is active for DRAFT status
    return statuses.findIndex((s) => s.key === status);
  };

  const currentStatusIndex = getStatusIndex(fulfillmentStatus);
  const progress = ((currentStatusIndex + 1) / statuses.length) * 100;
  return (
    // <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <div className="w-full border border-gray-200 p-3 mx-auto rounded-lg mt-2">
      <div className=" font-semibold mb-6 ">Shipment Status</div>
      <div className="flex justify-between">
        {statuses.map((item, index) => {
          const Icon = item.icon;
          const isActive = index <= currentStatusIndex;
          return (
            <div key={item.key} className="flex flex-col items-center">
              <div
                className={`rounded-full p-2 ${
                  isActive
                    ? 'bg-[#48cab2] text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span
                className={`mt-2 text-sm font-medium text-center ${
                  isActive ? 'text-[#48cab2]' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>{' '}
      <div className="text-green-300">
        <Progress value={progress} className="mt-3 h-3" />
      </div>
    </div>
  );
};

export default ShipmentStatus;

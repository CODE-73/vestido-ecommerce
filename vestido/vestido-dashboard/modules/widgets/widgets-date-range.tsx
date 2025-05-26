import { Input } from '@vestido-ecommerce/shadcn-ui/input';

import { useWidgets } from './widgets-provider';

export default function WidgetsDateRange() {
  const { fromDate, toDate, handleDateChange } = useWidgets();

  return (
    <div className="flex gap-1 mb-4">
      <Input
        type="date"
        value={fromDate ?? ''}
        onChange={(e) => handleDateChange(e.target.value, toDate)}
        className="input w-[180px]"
      />
      <Input
        type="date"
        value={toDate ?? ''}
        onChange={(e) => handleDateChange(fromDate, e.target.value)}
        className="input w-[180px]"
      />
    </div>
  );
}

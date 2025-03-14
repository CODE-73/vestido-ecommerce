import { Label } from '@radix-ui/react-label';

import { RadioGroup } from '@vestido-ecommerce/shadcn-ui/radio-group';

import { RadioGroupItem } from './CustomerAddressSelector';

interface PaymentTypeSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const PaymentTypeSelector: React.FC<PaymentTypeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      <div className="font-semibold space-y-4 text-white">
        <div>
          <div className="border  space-x-3 w-full p-5 mb-5 shadow border-3 border-gray-600 ">
            <RadioGroupItem value="ONLINE" />
            <Label>Pay Now ( Online Payment) </Label>
          </div>
        </div>
        <div>
          <div className="border space-x-3  w-full p-5 mb-5 shadow border-3 border-gray-600">
            <RadioGroupItem value="CASH_ON_DELIVERY" />
            <Label>Cash on Delivery ( Cash, UPI) </Label>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
};

export default PaymentTypeSelector;

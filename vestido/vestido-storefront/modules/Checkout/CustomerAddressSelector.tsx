import React from 'react';
import { useAddresses } from '@vestido-ecommerce/orders';
import {
  RadioGroup,
  RadioGroupItem,
} from '@vestido-ecommerce/shadcn-ui/radio-group';

interface CustomerAddressSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const CustomerAddressSelector: React.FC<CustomerAddressSelectorProps> = ({
  value,
  onChange,
}) => {
  const { data: addresses } = useAddresses();
  console.log('addresses', addresses?.data[0].firstName);

  return (
    <RadioGroup value={value} onValueChange={onChange}>
      {addresses?.data.map((address, index) => (
        <div
          key={index}
          className="h-40 border   w-full p-5 mb-5 shadow border-3 border-gray-300"
        >
          <RadioGroupItem value={address.id}>
            <div className="font-semibold flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>
                  {address.firstName} {address.lastName}
                </div>
                <div className="text-[#48CAB2] rounded-xl border border-1 border-[#48CAB2] text-[10px] px-2 flex items-center">
                  {address.addressType}
                </div>
              </div>
              <div
                className={`${
                  address.default
                    ? 'bg-[#48CAB2] px-3 py-2 rounded-lg text-white'
                    : 'hidden'
                }`}
              >
                DEFAULT
              </div>
            </div>
            <div className="text-sm w-1/2 text-wrap pt-4 text-gray-600">
              {address.line1}, {address.line2}, {address.district},
              {address.state}, {address.pinCode}
            </div>
            <div className="pt-4 flex gap-2 font-semibold items-center">
              <div className="text-sm text-gray-600">Mobile:</div>
              <div> {address.mobile}</div>
            </div>
          </RadioGroupItem>
        </div>
      ))}
    </RadioGroup>

    // <RadioGroupElement
    //   name="shippingAddress"
    //   label="Choose Address"
    //   // defaultValue="Home"
    //   wrapperClassName="flex"
    //   required
    //   options={options}
    // />
  );
};

export default CustomerAddressSelector;

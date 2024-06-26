// import React, { useEffect, useState } from 'react';
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

  const sortedAddresses = [...(addresses?.data ?? [])].sort(
    (a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0)
  );
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      {sortedAddresses.map((address, index) => (
        <div
          key={index}
          className="border   w-full p-5 mb-5 shadow border-3 border-gray-300"
        >
          <div className="font-semibold flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <RadioGroupItem value={address.id} />
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
            {address.line1}, {address.line2}, {address.district},{address.state}
            , {address.pinCode}
          </div>
          <div className="pt-4 flex gap-2 font-semibold items-center">
            <div className="text-sm text-gray-600">Mobile:</div>
            <div> {address.mobile}</div>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default CustomerAddressSelector;

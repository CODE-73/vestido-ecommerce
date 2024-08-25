// import React, { useEffect, useState } from 'react';
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md';

import {
  useAddressDelete,
  useAddresses,
} from '@vestido-ecommerce/orders/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/alert-dialog';
import { Dialog, DialogTrigger } from '@vestido-ecommerce/shadcn-ui/dialog';
import {
  RadioGroup,
  RadioGroupItem,
} from '@vestido-ecommerce/shadcn-ui/radio-group';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import AddAddressDialog from './AddAddressDialog';

interface CustomerAddressSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const CustomerAddressSelector: React.FC<CustomerAddressSelectorProps> = ({
  value,
  onChange,
}) => {
  const { toast } = useToast();
  const { data: addresses } = useAddresses();

  const { trigger } = useAddressDelete();

  const sortedAddresses = [...(addresses?.data ?? [])].sort(
    (a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0),
  );

  const handleAddressDelete = async (addressId: string) => {
    try {
      await trigger({
        addressId: addressId,
      });
    } catch (e) {
      console.error('Error deleting address:', e);
      toast({
        title: 'Error deleting Address',
      });
    }
  };
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      {sortedAddresses
        .filter((address) => address.archived == false)
        .map((address, index) => (
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
              <div className="flex gap-2">
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <MdOutlineModeEditOutline
                        size={24}
                        className="hover:text-[#48CAB2] cursor-pointer"
                      />
                    </DialogTrigger>
                    <AddAddressDialog isNew={false} addressId={address.id} />
                  </Dialog>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <MdDeleteOutline
                      size={24}
                      className="hover:text-[#48CAB2] cursor-pointer"
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this address.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleAddressDelete(address.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
            </div>
            <div className="text-sm w-1/2 text-wrap pt-4 text-gray-600">
              {address.line1}, {address.line2}, {address.district},
              {address.state}, {address.pinCode}
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

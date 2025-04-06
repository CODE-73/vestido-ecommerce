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
import { Skeleton } from '@vestido-ecommerce/shadcn-ui/skeleton';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import AddAddressDialog from '../Checkout/AddAddressDialog';

const Addresses: React.FC = () => {
  const { toast } = useToast();
  const { data: addresses, isLoading } = useAddresses();

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
    <div>
      <div className="flex justify-between w-full items-center my-1 md:my-5">
        <div className="font-semibold md:text-lg ml-5 md:ml-0">
          Saved Addresses
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="md:border font-semibold p-2  cursor-pointer   md:border-3 md:border-gray-600 ">
              + Add
            </div>
          </DialogTrigger>
          <AddAddressDialog isNew={true} addressId={null} />
        </Dialog>
      </div>
      <hr className="mb-5" />
      {isLoading
        ? Array(2)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="border relative w-full p-5 mb-5 shadow border-1 border-neutral-700 flex flex-col gap-2"
              >
                <div className="absolute top-2 right-2 flex gap-1">
                  <Skeleton className="bg-neutral-700 rounded-full w-[25px] h-[25px]" />
                  <Skeleton className="bg-neutral-700 rounded-full w-[25px] h-[25px]" />
                </div>
                <Skeleton className=" bg-neutral-700 w-[400px] h-[15px] rounded-xl" />
                <Skeleton className=" bg-neutral-700  w-[400px] h-[15px] rounded-xl" />
                <Skeleton className=" bg-neutral-700 w-[400px] h-[15px] rounded-xl" />
              </div>
            ))
        : sortedAddresses
            .filter((address) => address.archived == false)
            .map((address, index) => (
              <div
                key={index}
                className="border   w-full p-5 mb-5 shadow border-3 border-gray-300"
              >
                <div className="font-semibold flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    {/* <RadioGroupItem value={address.id} /> */}
                    <div>
                      {address.firstName} {address.lastName}
                    </div>
                    <div className="text-black rounded-xl bg-white text-[10px] px-2 flex items-center">
                      {address.addressType}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <MdOutlineModeEditOutline
                            size={24}
                            className="hover:text-gray-300 cursor-pointer"
                          />
                        </DialogTrigger>
                        <AddAddressDialog
                          isNew={false}
                          addressId={address.id}
                        />
                      </Dialog>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <MdDeleteOutline
                          size={24}
                          className="hover:text-gray-300 cursor-pointer"
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
                          ? 'bg-white px-3 py-1 rounded-full text-black text-xs'
                          : 'hidden'
                      }`}
                    >
                      DEFAULT
                    </div>
                  </div>
                </div>

                <div className="text-sm w-1/2 text-wrap pt-4">
                  {address.line1}, {address.line2}, {address.district},
                  {address.state}, {address.pinCode}
                </div>
                <div className="pt-4 flex gap-2 font-semibold items-center">
                  <div className="text-sm">Mobile:</div>
                  <div> {address.mobile}</div>
                </div>
              </div>
            ))}
    </div>
  );
};

export default Addresses;

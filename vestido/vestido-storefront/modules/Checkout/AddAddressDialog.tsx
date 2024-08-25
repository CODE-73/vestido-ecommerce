import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddressType } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddress, useAddressUpsert } from '@vestido-ecommerce/orders/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@vestido-ecommerce/shadcn-ui/dialog';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import { CheckBoxElement } from '../../forms/checkbox-element';
import { InputElement } from '../../forms/input-element';
import { RadioGroupElement } from '../../forms/radio-group-element';

// const indianPostalCodeRegex = /^[1-9][0-9]{5}$/;

const AddAddressFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  mobile: z.string(),
  line1: z.string(),
  line2: z.string(),
  district: z.string(),
  state: z.string(),
  pinCode: z.string(),
  // .regex(indianPostalCodeRegex, 'Please enter a valid Indian postal code'),
  addressType: z.nativeEnum(AddressType).default('HOME' satisfies AddressType),
  default: z.boolean().default(false),
  archived: z.boolean().default(false),
});

type AddressFormProps = {
  addressId: string | null;
  isNew: boolean;
};

const defaultValues = {
  firstName: '',
  lastName: '',
  mobile: '',
  line1: '',
  line2: '',
  district: '',
  state: '',
  pinCode: '',
  default: false,
  archived: false,
};

export type AddAddressForm = z.infer<typeof AddAddressFormSchema>;
const AddAddressDialog: React.FC<AddressFormProps> = ({ addressId, isNew }) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const form = useForm<AddAddressForm>({
    resolver: zodResolver(AddAddressFormSchema),
    defaultValues: { ...defaultValues },
  });

  const { trigger } = useAddressUpsert();
  const { data: { data: addressDetails } = { data: null } } = useAddress(
    isNew ? null : addressId,
  );

  useEffect(() => {
    if (!isNew && addressDetails) {
      form.reset({
        ...{
          ...defaultValues,
          ...addressDetails,
        },
      });
    }
  }, [isNew, addressDetails, form]);

  const handleSubmit = async (data: AddAddressForm) => {
    try {
      await trigger({
        ...data,
        id: isNew ? null : addressId,
      });
      toast({
        title: isNew
          ? 'Address Added Successfully'
          : 'Address Updated Successfully',
      });
      setIsDialogOpen(false);
    } catch (e) {
      console.error('Error updating address:', e);
    }
  };
  return (
    <>
      {isDialogOpen && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isNew ? 'Add New Address' : 'Edit Address'}
            </DialogTitle>
            <DialogDescription>
              {isNew ? 'Add a new address, and save it for future use.' : ''}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-row space-x-3 my-2">
                <InputElement name="firstName" placeholder="First name" />
                <InputElement name="lastName" placeholder="Last name" />
              </div>
              <InputElement
                name="mobile"
                placeholder="Mobile"
                className="mb-2"
              />

              <InputElement
                name="line1"
                placeholder="Apartment, suite,..."
                className="mb-2"
              />

              <InputElement name="line2" placeholder="Area" className="mb-2" />

              <div className="flex flex-row space-x-3 mb-2">
                <InputElement name="pinCode" placeholder="Pin Code" />
                <InputElement name="district" placeholder="District" />
              </div>
              <InputElement name="state" placeholder="State" className="mb-2" />
              <RadioGroupElement
                name="addressType"
                label="Choose Address Type"
                defaultValue="Home"
                wrapperClassName="flex"
                options={[
                  { label: 'Home', value: 'HOME' },
                  { label: 'Office', value: 'OFFICE' },
                ]}
              />
              <div className="mt-4 mb-2">
                <CheckBoxElement
                  name="default"
                  label="Set this as your default address"
                />
              </div>
              <DialogFooter>
                <Button className="flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 font-extrabold hover:text-black text-white justify-center">
                  {isNew ? 'ADD ADDRESS' : 'UPDATE'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      )}
    </>
  );
};

export default AddAddressDialog;

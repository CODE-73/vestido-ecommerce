import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@vestido-ecommerce/shadcn-ui/dialog';
import { InputElement } from '../../forms/input-element';
import { RadioGroupElement } from '../../forms/radio-group-element';
import { CheckBoxElement } from '../../forms/checkbox-element';
import { AddressType } from '@prisma/client';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import { useAddressUpsert } from '@vestido-ecommerce/orders';
import { useRouter } from 'next/router';

const indianPostalCodeRegex = /^[1-9][0-9]{5}$/;

const AddAddressFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  mobile: z.string(),
  line1: z.string(),
  line2: z.string(),
  district: z.string(),
  state: z.string(),
  pinCode: z
    .string()
    .regex(indianPostalCodeRegex, 'Please enter a valid Indian postal code'),
  addressType: z.nativeEnum(AddressType).default('HOME' satisfies AddressType),
  default: z.boolean().default(false),
});

export type AddAddressForm = z.infer<typeof AddAddressFormSchema>;
const AddAddressDialog = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<AddAddressForm>({
    resolver: zodResolver(AddAddressFormSchema),
    defaultValues: {},
  });

  const { trigger } = useAddressUpsert();
  const handleSubmit = async (data: AddAddressForm) => {
    try {
      await trigger({
        ...data,
        id: null,
        // id: isNew ? undefined : (itemId as string),
      });
      toast({
        title: 'Address added succesfully',
        // title: isNew
        //   ? 'Product Added Successfully'
        //   : 'Product Updated Successfully',
      });

      router.replace('/checkout');
    } catch (e) {
      console.error('Error updating item:', e);
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-row space-x-3 my-2">
            <InputElement name="firstName" placeholder="First name" />
            <InputElement name="lastName" placeholder="Last name" />
          </div>
          <InputElement name="mobile" placeholder="Mobile" className="mb-2" />

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
            required
            options={[
              { label: 'Home', value: 'HOME' },
              { label: 'Office', value: 'OFFICE' },
            ]}
          />
          <div className="mt-4">
            <CheckBoxElement
              name="default"
              label="Set this as your default address"
            />
          </div>
          <Button className="flex tracking-wide bg-[#48CAB2] w-full h-14 hover:bg-gray-400 font-extrabold hover:text-black text-white justify-center">
            ADD ADDRESS
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddAddressDialog;

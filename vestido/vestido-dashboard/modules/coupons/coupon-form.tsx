import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { LuCalendar, LuChevronLeft } from 'react-icons/lu';
import { ZodError } from 'zod';

import { useCoupon, useCreateCoupon } from '@vestido-ecommerce/coupons/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Calendar } from '@vestido-ecommerce/shadcn-ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@vestido-ecommerce/shadcn-ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vestido-ecommerce/shadcn-ui/popover';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { VestidoError } from '@vestido-ecommerce/utils';

import { InputElement } from '../../forms/input-element';
import { RadioGroupElement } from '../../forms/radio-group-element';
import { SwitchElement } from '../../forms/switch-element';
import {
  CreateCouponForm,
  CreateCouponFormDefaultValues as defaultValues,
  CreateCouponFormSchema,
  parseCouponDetails,
} from './zod';

type CouponFormProps = {
  couponId: string | null;
  isNew: boolean;
};

const CouponForm: React.FC<CouponFormProps> = ({ couponId, isNew }) => {
  const { toast } = useToast();
  const router = useRouter();

  const { data: { data: coupon } = { data: null } /*, isLoading */ } =
    useCoupon(isNew ? null : couponId);

  const form = useForm<CreateCouponForm>({
    resolver: zodResolver(CreateCouponFormSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const { isDirty, isValid, errors } = form.formState;
  const isSubmitting = form.formState.isSubmitting;
  console.info(
    'FormState:',
    structuredClone({
      isDirty,
      isValid,
      errors,
      values: form.getValues(),
    }),
  );

  useEffect(() => {
    if (!isNew && coupon) {
      form.reset(parseCouponDetails(coupon));
    }
  }, [isNew, coupon, form]);

  const { trigger } = useCreateCoupon();

  const handleSubmit = async (data: CreateCouponForm) => {
    try {
      const response = await trigger({
        ...data,
      });
      toast({
        title: 'Coupon created Successfully',
      });
      router.replace(`/coupons/${response.data?.id}`);
    } catch (e) {
      if (e instanceof VestidoError) {
        form.setError('root', { message: e.message });
        toast({
          title: 'Error creating coupon',
          description: e.message,
        });
      } else if (e instanceof ZodError) {
        for (const issue of e.issues) {
          form.setError(issue.path.join('.') as keyof CreateCouponForm, {
            message: issue.message,
          });
          toast({
            title: 'Error creating coupon',
            description: issue.message,
          });
        }
      } else {
        console.error('Error creating coupon:', e);
      }
    }
  };

  return (
    <Form {...form}>
      <div
        onClick={() => router.back()}
        className="flex gap-1 items-center mt-12 mb-4 ml-4 cursor-pointer"
      >
        <LuChevronLeft />
        Back
      </div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-center w-full text-lg mt-16 bg-slate-200 px-5 py-10 mb-5"
      >
        <div className="text-2xl font-semibold capitalize flex justify-between">
          {isNew ? 'Add New Coupon' : couponId}
          <div>
            <SwitchElement name="enabled" label="Enabled" />
          </div>
        </div>{' '}
        <hr className="border-t-1 border-slate-400 mb-4 w-full" />
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <InputElement
              name="coupon"
              label="Coupon Code"
              placeholder="Coupon Code"
            />
          </div>
          <div className="col-span-2">
            <InputElement
              className="col-span-2"
              name="description"
              label="Description"
              placeholder="Description"
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <FormField
              control={form.control}
              name="fromDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={clsx(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        // selected={field.value}
                        // onSelect={field.onChange}
                        selected={new Date(field.value)}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        disabled={(date: Date) => date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <FormField
              control={form.control}
              name="toDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={clsx(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        // selected={field.value}
                        // onSelect={field.onChange}
                        selected={new Date(field.value)}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        disabled={(date: Date) => date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <RadioGroupElement
              name="discountType"
              label="Discount Type"
              options={[
                { label: 'Percentage', value: 'PERCENTAGE' },

                {
                  label: 'Amount',
                  value: 'AMOUNT',
                },
              ]}
            />
          </div>

          <InputElement
            name="discountPercent"
            label="Discount Percentage"
            placeholder="Discount Percentage"
          />

          <InputElement
            name="discountAmount"
            label="Discount Amount"
            placeholder="Discount Amount"
          />
        </div>
        <div className="grid grid-cols-8 mt-3 text-right gap-2">
          <Button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
            {isNew ? 'Create' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CouponForm;

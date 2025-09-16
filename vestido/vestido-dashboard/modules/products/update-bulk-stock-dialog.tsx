import { ReactNode, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useReconcileStock } from '@vestido-ecommerce/items/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/dialog';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { Textarea } from '@vestido-ecommerce/shadcn-ui/textarea';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

import { InputElement } from '../../forms/input-element';

// ✅ Schema for multiple variants
const BulkUpdateStockSchema = z.object({
  variants: z.array(
    z.object({
      itemVariantId: z.string(),
      name: z.string(), // size / color label
      currentStock: z.number(),
      qty: z.coerce.number().int().nonnegative(),
      remarks: z.string().optional(),
    }),
  ),
});

type BulkUpdateStockForm = z.infer<typeof BulkUpdateStockSchema>;

export function BulkUpdateStockDialog({
  itemId,
  variants, // array of { id, name, currentStock }
  children,
  onUpdated,
}: {
  itemId: string;
  variants: { itemVariantId: string; name: string; currentStock: number }[];
  children: ReactNode;
  onUpdated?: (newValues: { itemVariantId: string; qty: number }[]) => void;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { trigger, isMutating } = useReconcileStock();

  console.log('variants in bulk dialog', variants);

  const form = useForm<BulkUpdateStockForm>({
    resolver: zodResolver(BulkUpdateStockSchema),
    defaultValues: {
      variants: variants.map((v) => ({
        itemVariantId: v.itemVariantId,
        name: v.name,
        currentStock: v.currentStock,
        qty: v.currentStock,
        remarks: '',
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  useEffect(() => {
    if (open) {
      // Reset to fresh values when dialog opens
      form.reset({
        variants: variants.map((v) => ({
          itemVariantId: v.itemVariantId,
          name: v.name,
          currentStock: v.currentStock,
          qty: v.currentStock,
          remarks: '',
        })),
      });
    }
  }, [open, variants, form]);

  const handleBulkSubmit = async (data: BulkUpdateStockForm) => {
    try {
      await Promise.all(
        data.variants.map((variant) =>
          trigger({
            itemId,
            itemVariantId: variant.itemVariantId,
            qty: variant.qty,
            remarks: variant.remarks ?? '',
          }),
        ),
      );

      toast({ title: 'All variant stocks updated successfully!' });
      setOpen(false);

      if (onUpdated) {
        onUpdated(
          data.variants.map((v) => ({
            itemVariantId: v.itemVariantId,
            qty: v.qty,
          })),
        );
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error updating stock',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Stock for Variants</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleBulkSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-start border-b pb-3"
                >
                  {/* Variant Name */}
                  <div className="font-medium">{field.name}</div>

                  {/* Current Stock */}
                  <input
                    value={field.currentStock}
                    readOnly
                    type="number"
                    className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm"
                  />

                  {/* New Stock */}
                  <InputElement
                    name={`variants.${index}.qty`}
                    label="New Balance"
                    type="number"
                    placeholder="Enter stock"
                  />

                  {/* Remarks */}
                  <Textarea
                    {...form.register(`variants.${index}.remarks`)}
                    placeholder="Optional notes..."
                    className="mt-1"
                  />
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isMutating}>
                {isMutating ? 'Saving...' : 'Save All Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import { ReactNode, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

// Schema
const UpdateStockSchema = z.object({
  itemId: z.string(),
  itemVariantId: z.string().nullish(),
  qty: z.coerce.number().int().nonnegative(),
  remarks: z.string().optional(),
});

type UpdateStockForm = z.infer<typeof UpdateStockSchema>;

export function UpdateStockDialog({
  itemId,
  itemVariantId = null,
  currentStock,
  onUpdated,
  children,
}: {
  itemId: string;
  itemVariantId?: string | null;
  currentStock: number;
  children: ReactNode;
  onUpdated?: (newQty: number) => void;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { trigger, isMutating } = useReconcileStock();

  const form = useForm<UpdateStockForm>({
    resolver: zodResolver(UpdateStockSchema),
    defaultValues: {
      itemId,
      itemVariantId,
      qty: currentStock,
      remarks: '',
    },
  });

  useEffect(() => {
    console.log('Current values:', form.getValues());
  }, [form]);

  const handleSubmit = async (data: UpdateStockForm) => {
    console.log('Submitting data:', data);
    try {
      await trigger({
        itemId: data.itemId,
        itemVariantId: data.itemVariantId ?? null,
        qty: data.qty,
        remarks: data.remarks ?? '',
      });

      toast({ title: 'Stock updated successfully!' });
      setOpen(false);

      if (onUpdated) onUpdated(data.qty);
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <input
              value={currentStock ?? 0}
              readOnly
              type="number"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm"
            />
            <InputElement
              name="qty"
              label="New Stock Balance"
              type="number"
              placeholder="Enter new stock"
            />

            <div>
              <label className="text-sm font-medium">Remarks</label>
              <Textarea
                {...form.register('remarks')}
                placeholder="Optional notes..."
                className="mt-1"
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isMutating}>
                {isMutating ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

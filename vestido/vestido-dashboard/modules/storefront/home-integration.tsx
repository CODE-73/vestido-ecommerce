import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ZodError } from 'zod';

import {
  SettingsKeys,
  StorefrontHomeDataSchema,
  useUpdateSettings,
  useVestidoHomeData,
} from '@vestido-ecommerce/settings/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { VestidoError } from '@vestido-ecommerce/utils';

import CircleLinksUploader from './circles-links-uploader';
import PrimaryCarouselUploader from './hero-carousel-uploader';
import NavbarCarouselUploader from './navbar-carousel';
import PopularCollectionintegration from './popular-collection';
import HorizontalScrollCardsUploader from './scroll-cards-uploader';

export type StorefrontHomeDataSchemaForm = z.infer<
  typeof StorefrontHomeDataSchema
>;
const StorefrontHomeIntegration: React.FC = () => {
  const { trigger } = useUpdateSettings();
  const home_data = useVestidoHomeData();
  const { toast } = useToast();

  const form = useForm<StorefrontHomeDataSchemaForm>({
    mode: 'all',
    resolver: zodResolver(StorefrontHomeDataSchema),
    defaultValues: {},
  });

  const isDirty = form.formState.isDirty;
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (home_data) {
      form.reset({ ...home_data });
    }
  }, [home_data, form]);

  const handleSubmit = async (data: StorefrontHomeDataSchemaForm) => {
    try {
      await trigger({
        key: SettingsKeys.VESTIDO_HOME_DATA,
        value: { ...data },
      });
      toast({ title: 'Changes Saved Successfully' });
    } catch (e) {
      if (e instanceof VestidoError) {
        form.setError('root', { message: e.message });
        toast({
          title: 'Error updating Storefront Data',
          description: e.message,
        });
      } else if (e instanceof ZodError) {
        for (const issue of e.issues) {
          form.setError(
            issue.path.join('.') as keyof StorefrontHomeDataSchemaForm,
            {
              message: issue.message,
            },
          );
          toast({
            title: 'Error updating Data',
            description: issue.message,
          });
        }
      } else {
        console.error('Error updating storefront Data', e);
      }
    }
  };

  return (
    <div className="my-5 md:my-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="w-full justify-between sticky top-0 px-5 z-20 bg-white h-24 flex items-center">
            {Object.keys(form.formState.errors ?? {}).length > 0 && (
              <div className="text-red-300 text-xs pointer-events-none">
                {JSON.stringify(form.formState.errors, null, 2)}
              </div>
            )}
            <Button
              disabled={!isDirty || isSubmitting}
              type="submit"
              className="w-[20%] h-14 ml-auto"
            >
              Save Changes
            </Button>
          </div>
          <NavbarCarouselUploader />
          <PrimaryCarouselUploader />
          <CircleLinksUploader />
          <HorizontalScrollCardsUploader />
          <PopularCollectionintegration />
        </form>
      </Form>
    </div>
  );
};

export default StorefrontHomeIntegration;

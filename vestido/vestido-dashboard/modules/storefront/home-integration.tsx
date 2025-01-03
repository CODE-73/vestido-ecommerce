import {
  StorefrontHomeDataSchema,
  useVestidoHomeData,
} from 'libs/settings/src/hooks/use-storefront-home-data';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import CategoryCardsUploader from './category-cards-uploader';
import PopularCollectionintegration from './popular-collection';
import PrimaryCarouselUploader from './primary-carousel-uploader';
import HorizontalScrollCardsUploader from './scroll-cards-uploader';
import { useForm } from 'react-hook-form';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { useUpdateSettings } from '@vestido-ecommerce/settings/client';
import { SettingsKeys } from 'libs/settings/src/keys';
import { useEffect } from 'react';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

export type StorefrontHomeDataSchemaForm = z.infer<
  typeof StorefrontHomeDataSchema
>;
const StorefrontHomeIntegration: React.FC = () => {
  const { trigger } = useUpdateSettings();
  const home_data = useVestidoHomeData();

  const form = useForm<StorefrontHomeDataSchemaForm>({
    resolver: zodResolver(StorefrontHomeDataSchema),
    defaultValues: {},
  });

  console.info('formvalues', form.getValues());

  useEffect(() => {
    if (home_data) {
      form.reset({ ...home_data });
    }
  }, [home_data, form]);

  const handleSubmit = async (data: StorefrontHomeDataSchemaForm) => {
    await trigger({
      key: SettingsKeys.VESTIDO_HOME_DATA,
      value: { ...data },
    });
  };

  return (
    <div className="my-5 md:my-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="w-full justify-end sticky top-0 px-5 z-20 bg-white h-24 flex items-center">
            <Button type="submit" className="w-[20%] h-14">
              Save Changes
            </Button>
          </div>

          <PrimaryCarouselUploader />
          <CategoryCardsUploader />
          <HorizontalScrollCardsUploader />
          <PopularCollectionintegration />
        </form>
      </Form>
    </div>
  );
};

export default StorefrontHomeIntegration;

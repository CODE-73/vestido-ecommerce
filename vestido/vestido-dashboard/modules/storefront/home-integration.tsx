import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  StorefrontHomeDataSchema,
  useVestidoHomeData,
} from '@vestido-ecommerce/settings/client';
import {
  SettingsKeys,
  useUpdateSettings,
} from '@vestido-ecommerce/settings/client';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { Form } from '@vestido-ecommerce/shadcn-ui/form';

import CategoryCardsUploader from './category-cards-uploader';
import PrimaryCarouselUploader from './hero-carousel-uploader';
import PopularCollectionintegration from './popular-collection';
import HorizontalScrollCardsUploader from './scroll-cards-uploader';

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

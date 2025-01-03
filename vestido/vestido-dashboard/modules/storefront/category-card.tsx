import { useState } from 'react';
import Image from 'next/image';

import { UseFormReturn } from 'react-hook-form';
import { LuAlertTriangle, LuTrash } from 'react-icons/lu';

import { useR2SignedURL } from '@vestido-ecommerce/r2';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { FileUploadElement } from '../../components/FileUpload';
import { CategoryElement } from '../../forms/category-combobox-element';
import { StorefrontHomeDataSchemaForm } from './home-integration';

type CategoryCardProps = {
  index: number;
  form: UseFormReturn<StorefrontHomeDataSchemaForm>;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ index, form }) => {
  const [isHovered, setIsHovered] = useState(false);
  const image = form.watch(`hero_categories.${index}.image`) as ImageSchemaType;

  const { data: imgURL } = useR2SignedURL({
    key: image?.key,
    requestType: 'GET',
    expiresIn: 3600,
  });

  const handleDeleteImage = () => {
    console.log('delete');
    form.setValue(
      `hero_categories.${index}.image`,
      {
        blurHash: null,
        blurHashDataURL: null,
        alt: null,
        key: '',
        url: null,
        default: false,
        displayIndex: 0,
      },
      { shouldValidate: true },
    );
  };

  return (
    <div
      className="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative  w-16 h-16 md:w-32 md:h-32 overflow-hidden rounded-full bg-gray-300 border border-1 border-dashed border-gray-500">
        {image?.key ? (
          image.url || imgURL ? (
            <>
              <Image
                src={image.url || imgURL || ''}
                alt={image.alt ?? ''}
                sizes="80vw"
                width={0}
                height={0}
                className="h-40 w-32"
              />
              {isHovered && (
                <Button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  type="button"
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDeleteImage()}
                >
                  <LuTrash />
                </Button>
              )}
            </>
          ) : (
            <LuAlertTriangle />
          )
        ) : (
          <>
            <FileUploadElement
              name={`hero_categories.${index}.image.key`}
              keyPrefix="storefront/"
              label=""
              className="absolute top-1/2 left-1/2 transform -translate-x-[70%] -translate-y-1/2  z-5 border-none"
            />
          </>
        )}
      </div>

      <CategoryElement
        name={`hero_categories.${index}.categoryId`}
        placeholder="Category"
        className="pt-2 text-black capitalize text-center text-xs md:text-base leading-normal "
      />
    </div>
  );
};
export default CategoryCard;

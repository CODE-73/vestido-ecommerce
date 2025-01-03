import { useState } from 'react';
import Image from 'next/image';

import { UseFormReturn } from 'react-hook-form';
import { LuAlertTriangle, LuTrash } from 'react-icons/lu';

import { useR2SignedURL } from '@vestido-ecommerce/r2';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { FileUploadElement } from '../../components/FileUpload';
import { StorefrontHomeDataSchemaForm } from './home-integration';
// import { InputElement } from '../../forms/input-element';

type props = {
  index: number;
  form: UseFormReturn<StorefrontHomeDataSchemaForm>;
};

const ScrollCardImageUploader: React.FC<props> = ({ index, form }) => {
  const [isHovered, setIsHovered] = useState(false);

  const image = form.watch(
    `horizontal_scroll_cards.${index}.image`,
  ) as ImageSchemaType;

  const { data: imgURL } = useR2SignedURL({
    key: image?.key,
    requestType: 'GET',
    expiresIn: 3600,
  });

  const handleDeleteImage = () => {
    console.log('delete');
    form.setValue(
      `horizontal_scroll_cards.${index}.image`,
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
      className="flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-0 pb-[50%] bg-gray-300">
        {image?.key ? (
          image.url || imgURL ? (
            <>
              <Image
                src={image.url || imgURL || ''}
                alt={image.alt ?? ''}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />{' '}
              {isHovered && (
                <Button
                  className="absolute top-3 right-3 "
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
              name={`horizontal_scroll_cards.${index}.image.key`}
              keyPrefix="storefront/"
              label=""
              className="absolute top-1/2 left-1/2 transform -translate-x-[70%] -translate-y-1/2  z-5 border-none"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ScrollCardImageUploader;

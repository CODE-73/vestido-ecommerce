import { useState } from 'react';
import Image from 'next/image';

import { UseFormReturn } from 'react-hook-form';
import { LuAlertTriangle, LuTrash } from 'react-icons/lu';

import { useR2SignedURL } from '@vestido-ecommerce/r2';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { FileUploadElement } from '../../components/FileUpload';
import { StorefrontHomeDataSchemaForm } from './home-integration';

type props = {
  index: number;
  form: UseFormReturn<StorefrontHomeDataSchemaForm>;
};

const PopularCollectionCard: React.FC<props> = ({ index, form }) => {
  const image = form.watch(`collage.${index}.image`) as ImageSchemaType;
  const [isHovered, setIsHovered] = useState(false);

  const { data: imgURL } = useR2SignedURL({
    key: image?.key,
    requestType: 'GET',
    expiresIn: 3600,
  });

  const handleDeleteImage = () => {
    form.setValue(
      `collage.${index}.image`,
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {' '}
      {image?.key ? (
        image.url || imgURL ? (
          <>
            {' '}
            <Image
              src={image.url || imgURL || ''}
              alt={image.alt ?? ''}
              fill
              className="object-cover "
            />
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
            name={`collage.${index}.image.key`}
            keyPrefix="storefront/"
            label="Upload Image"
            className="text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2"
          />
        </>
      )}
    </div>
  );
};

export default PopularCollectionCard;

import { useState } from 'react';
import Image from 'next/image';

import { UseFormReturn } from 'react-hook-form';
import { LuAlertTriangle, LuTrash } from 'react-icons/lu';

import { useR2SignedURL } from '@vestido-ecommerce/r2';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

// import { ImageSchemaType } from '@vestido-ecommerce/utils';
import { FileUploadElement } from '../../components/FileUpload';
import { StorefrontHomeDataSchemaForm } from './home-integration';

type HeroCarouselItemProps = {
  index: number;
  form: UseFormReturn<StorefrontHomeDataSchemaForm>;
  className: string;
};

const HeroCarouselItem: React.FC<HeroCarouselItemProps> = ({ index, form }) => {
  const [isHovered, setIsHovered] = useState(false);
  const image = form.watch(`hero_carousel.${index}.image`) as ImageSchemaType;
  const { data: imgURL } = useR2SignedURL({
    key: image?.key,
    requestType: 'GET',
    expiresIn: 3600,
  });
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
              alt={image.alt}
              className="object-cover lg:rounded-[25px]"
              fill
            />
            {isHovered && (
              <Button
                className="absolute top-3 right-3 flex gap-2 "
                type="button"
                variant="destructive"
                // onClick={() => handleDeleteImage()}
              >
                Remove <LuTrash />
              </Button>
            )}
          </>
        ) : (
          <LuAlertTriangle />
        )
      ) : (
        <>
          <FileUploadElement
            name={`hero_carousel.${index}.image.key`}
            keyPrefix="storefront/"
            label=""
            className="absolute top-1/2 left-1/2 transform -translate-x-[70%] -translate-y-1/2  z-5 border-none"
          />
        </>
      )}
    </div>
  );
};
export default HeroCarouselItem;

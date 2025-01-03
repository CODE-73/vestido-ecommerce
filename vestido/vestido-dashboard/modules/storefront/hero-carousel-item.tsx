import { useState } from 'react';
import Image from 'next/image';

import { UseFormReturn } from 'react-hook-form';
import { LuAlertTriangle, LuTrash } from 'react-icons/lu';

import { useR2SignedURL } from '@vestido-ecommerce/r2';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

// import { ImageSchemaType } from '@vestido-ecommerce/utils';
import { FileUploadElement } from '../../components/FileUpload';
import { InputElement } from '../../forms/input-element';
import { SelectElement } from '../../forms/select-element';
import { StorefrontHomeDataSchemaForm } from './home-integration';

type HeroCarouselItemProps = {
  index: number;
  form: UseFormReturn<StorefrontHomeDataSchemaForm>;
  className: string;
};

const HeroCarouselItem: React.FC<HeroCarouselItemProps> = ({ index, form }) => {
  const [isHovered, setIsHovered] = useState(false);
  const image = form.watch(`hero_carousel.${index}.image`) as ImageSchemaType;
  const color = form.watch(`hero_carousel.${index}.text_color`);
  const text_position = form.watch(`hero_carousel.${index}.text_position`);
  const { data: imgURL } = useR2SignedURL({
    key: image?.key,
    requestType: 'GET',
    expiresIn: 3600,
  });

  const handleDeleteImage = () => {
    console.log('delete');
    form.setValue(
      `hero_carousel.${index}.image`,
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
              className="object-cover lg:rounded-[25px]"
              fill
            />
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col gap-2 ${isHovered ? '' : 'invisible'}`}
            >
              <SelectElement
                name={`hero_carousel.${index}.text_color`}
                options={[
                  { title: 'Black', id: 'black' },
                  {
                    title: 'White',
                    id: 'white',
                  },
                ]}
                placeholder="Text Color"
              />
              <SelectElement
                name={`hero_carousel.${index}.text_position`}
                options={[
                  { title: 'Left', id: 'left' },
                  {
                    title: 'Center',
                    id: 'center',
                  },
                  {
                    title: 'Right',
                    id: 'right',
                  },
                ]}
                placeholder="Text Position"
              />
            </div>
            {isHovered && (
              <>
                <Button
                  className="absolute top-3 right-3 flex gap-2 "
                  type="button"
                  variant="destructive"
                  onClick={() => handleDeleteImage()}
                >
                  Remove <LuTrash />
                </Button>
              </>
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
      <div className="min-h-[300px] md:min-h-[500px] xl:min-h-[600px] overflow-hidden w-full">
        <div
          className={`flex flex-col gap-1 absolute mt-10 md:mt-auto md:top-1/3 pl-2 md:pl-10 z-[3] ${
            text_position === 'right'
              ? 'right-8 text-right'
              : text_position === 'left'
                ? 'left-8 text-left'
                : text_position === 'center'
                  ? 'left-1/2 transform -translate-x-1/2 text-center'
                  : ''
          }`}
        >
          <InputElement
            name={`hero_carousel.${index}.text_content.line1`}
            placeholder="Subtitle 1"
            className={`bg-transparent border-transparent uppercase text-xs md:text-base font-bold md:font-extrabold text-${color}`}
          />

          <InputElement
            name={`hero_carousel.${index}.text_content.line2`}
            placeholder="Main Title"
            className={`bg-transparent border-transparent capitalize text-lg md:text-5xl max-w-[500px] leading-normal placeholder:text-black text-${color}`}
          />

          <InputElement
            name={`hero_carousel.${index}.text_content.line3`}
            placeholder="Subtitle 2"
            className={`bg-transparent border-transparent text-xs font-light md:text-base md:font-extralight text-${color}`}
          />

          <InputElement
            name={`hero_carousel.${index}.button_text`}
            className="h-16 w-1/2 bg-black rounded-none text-white placeholder:text-white font-semibold"
            placeholder="DISCOVER NOW!"
          />
        </div>
      </div>
    </div>
  );
};
export default HeroCarouselItem;

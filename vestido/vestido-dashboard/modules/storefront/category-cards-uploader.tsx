import Image from 'next/image';

import { useFormContext } from 'react-hook-form';
import { LuAlertTriangle } from 'react-icons/lu';

import { useR2SignedURL } from '@vestido-ecommerce/r2';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

import { FileUploadElement } from '../../components/FileUpload';
import { CategoryElement } from '../../forms/category-combobox-element';

const CategoryCardsUploader: React.FC = () => {
  const form = useFormContext();
  const image = form.watch(`hero_categories.image.key`) as ImageSchemaType;

  const { data: imgURL } = useR2SignedURL({
    key: image?.url ? null : image?.key || null,
    requestType: 'GET',
    expiresIn: 3600,
  });
  return (
    <div className="w-full lg:w-auto overflow-x-auto no-scrollbar sm:pt-4 lg:pt-10">
      <div className="flex space-x-4 lg:space-x-2 px-4 lg:justify-center">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="cursor-pointer group basis-1/4 lg:basis-48 text-center  text-[#333333]"
            >
              <div className="flex flex-col items-center">
                <div className="relative  w-16 h-16 md:w-32 md:h-32 overflow-hidden rounded-full bg-gray-300 border border-1 border-dashed border-gray-500">
                  {/* <FileUploadElement
                    name={`hero_categories.${index}.image.key`}
                    keyPrefix="storefront/"
                    label=""
                    className="absolute top-1/2 left-1/2 transform -translate-x-[70%] -translate-y-1/2  z-5 border-none"
                  /> */}
                  {image?.key ? (
                    image.url || imgURL ? (
                      <Image
                        src={image.url || imgURL || ''}
                        alt={image.alt}
                        sizes="80vw"
                        width={0}
                        height={0}
                        className="h-40 w-32"
                      />
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

                {/* <Image
                    src={data.cardImage.url ?? ''}
                    className="w-16 h-16 md:w-32 md:h-32 overflow-hidden rounded-full"
                    alt="alt text"
                    sizes="(max-width: 640px) 50vw"
                    width={16}
                    height={16}
                  /> */}

                {/* <InputElement
                  name={`hero_categories.${index}.categoryId`}
                  placeholder="Title"
                  className="pt-2 text-black border-transparent capitalize text-center text-xs md:text-base leading-normal "
                /> */}
                <CategoryElement
                  name={`hero_categories.${index}.categoryId`}
                  placeholder="Category"
                  className="pt-2 text-black capitalize text-center text-xs md:text-base leading-normal "
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryCardsUploader;

import { FileUploadElement } from '../../components/FileUpload';
import { InputElement } from '../../forms/input-element';

const CategoryCardsUploader: React.FC = () => {
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
                  <FileUploadElement
                    name={`hero_categories.${index}.image.key`}
                    keyPrefix="storefront/"
                    label=""
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-5 border-none"
                  />
                </div>

                {/* <Image
                    src={data.cardImage.url ?? ''}
                    className="w-16 h-16 md:w-32 md:h-32 overflow-hidden rounded-full"
                    alt="alt text"
                    sizes="(max-width: 640px) 50vw"
                    width={16}
                    height={16}
                  /> */}

                <InputElement
                  name={`hero_categories.${index}.categoryId`}
                  placeholder="Title"
                  className="pt-2 text-black border-transparent capitalize text-center text-xs md:text-base leading-normal "
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryCardsUploader;

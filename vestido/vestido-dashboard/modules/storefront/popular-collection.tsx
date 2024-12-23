import { FileUploadElement } from '../../components/FileUpload';
import { InputElement } from '../../forms/input-element';

const PopularCollectionintegration: React.FC = () => {
  return (
    <div className={`flex flex-col items-center justify-center px-1 sm:px-0`}>
      <div className="flex flex-col w-full md:grid md:grid-cols-4 gap-3 mt-7 md:mt-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            // <PopularCollectionCard key={index} mainImage={index === 1} />
            <div
              key={index}
              className={`group relative overflow-hidden bg-gray-300 ${index === 1 ? 'col-span-2 row-span-2' : ''} w-full`}
              style={{ height: index === 1 ? '85vh' : '42vh' }}
            >
              <FileUploadElement
                name={`collage.${index}.image.key`}
                keyPrefix="storefront/"
                label="Upload Image"
                className="text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2"
              />
              <div className="hover:scale-110 transition duration-500 cursor-pointer w-full h-full">
                {/* <Image
                  src={data.cardImage.url ?? ''}
                  alt="alt text"
                  fill
                  className="object-cover "
                /> */}
              </div>
              <div className="absolute left-10 top-10 ">
                <InputElement
                  name={`collage.${index}.text_content`}
                  placeholder="Main Title"
                  className="bg-transparent border-transparent capitalize font-bold text-2xl leading-normal main-title placeholder:text-black"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PopularCollectionintegration;

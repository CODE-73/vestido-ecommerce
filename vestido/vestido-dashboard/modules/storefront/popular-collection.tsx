import { useFormContext } from 'react-hook-form';

import { InputElement } from '../../forms/input-element';
import { StorefrontHomeDataSchemaForm } from './home-integration';
import PopularCollectionCard from './popular-collection-card';

const PopularCollectionintegration: React.FC = () => {
  const form = useFormContext<StorefrontHomeDataSchemaForm>();
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
              <PopularCollectionCard index={index} form={form} />

              {/* <Image
                  src={data.cardImage.url ?? ''}
                  alt="alt text"
                  fill
                  className="object-cover "
                /> */}

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

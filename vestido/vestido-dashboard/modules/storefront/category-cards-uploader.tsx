import { useFormContext } from 'react-hook-form';

import CategoryCard from './category-card';
import { StorefrontHomeDataSchemaForm } from './home-integration';

const CategoryCardsUploader: React.FC = () => {
  const form = useFormContext<StorefrontHomeDataSchemaForm>();

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
              <CategoryCard index={index} form={form} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryCardsUploader;

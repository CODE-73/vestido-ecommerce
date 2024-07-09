import * as React from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

const data = [
  {
    category: 'Collections',
    type: 'list',
    subCategory: ['Womens', 'Mens', 'Trending', 'Best Seller'],
  },
  {
    category: 'ProductType',
    type: 'list',
    subCategory: ['Backpacks', 'Bags', 'Boots', 'Coats'],
  },
  {
    category: 'Color',
    type: 'colors',
    subCategory: ['Red', 'Blue', 'Yellow', 'Orange'],
  },
  {
    category: 'Size',
    type: 'tags',
    subCategory: ['XS', 'S', 'M', 'L'],
  },
  {
    category: 'Price',
    type: 'list',
    subCategory: ['$0 -$100', '$100 - $200', '$300 - $400', '$400 - $500'],
  },
  {
    category: 'Vendor',
    type: 'list',
    subCategory: ['Gap', 'Guest', 'Levi,s', 'Polo'],
  },
  {
    category: 'Tags',
    type: 'tags',
    subCategory: ['Vintage', 'Cool', 'Nice', 'Outdoor'],
  },
];

const ProductFilter: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(
    []
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prevState) => {
      if (prevState.includes(category)) {
        return prevState.filter((item) => item !== category);
      } else {
        return [...prevState, category];
      }
    });
  };

  const isExpanded = (category: string) => {
    return expandedCategories.includes(category);
  };

  return (
    <div className="row-span-4">
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <div
              className="flex flex-row my-2"
              onClick={() => toggleCategory(item.category)}
            >
              <div className=" font-semibold hover:text-[#48CAB2] cursor-pointer">
                {item.category}
              </div>
              {isExpanded(item.category) ? <LuChevronUp /> : <LuChevronDown />}
            </div>
            {isExpanded(item.category) &&
              (item.type === 'list' ? (
                <div>
                  {item.subCategory.map((subItem, subIndex) => (
                    <div key={subIndex}>{subItem}</div>
                  ))}
                </div>
              ) : item.type === 'colors' ? (
                <div className="flex flex-row">
                  {item.subCategory.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="mr-2 w-4 h-4 rounded-full cursor-pointer"
                      style={{
                        backgroundColor: subItem.toLowerCase(),
                        border: '1px solid #000',
                      }}
                      onClick={() => console.log('Selected color:', subItem)}
                    />
                  ))}
                </div>
              ) : item.type === 'tags' ? (
                <div className="grid grid-cols-2 gap-1">
                  {item.subCategory.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="outline outline-3 outline-zinc-100 p-1 m-1 hover:outline-black"
                    >
                      {subItem}
                    </div>
                  ))}
                </div>
              ) : null)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;

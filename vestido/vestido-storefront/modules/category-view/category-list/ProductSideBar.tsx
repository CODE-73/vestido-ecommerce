import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ProductSideBar = () => {
  const [showCollections, setShowCollections] = useState(true);
  const [showProductType, setShowProductType] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const toggleCollections = () => {
    setShowCollections(!showCollections);
    setShowProductType(false);
    setShowPrice(false);
  };

  const toggleProductType = () => {
    setShowProductType(!showProductType);
    setShowCollections(false);
  };

  const togglePrice = () => {
    setShowPrice(!showPrice);
    setShowCollections(false);
    setShowProductType(false);
  };

  const categories = ['Womens', 'Mens', 'Trending', 'Best Seller'];

  const productTypes = [
    'Backpacks',
    'Boots',
    'Dresses',
    'Flats',
    'Hats & Beanie',
    'Heels',
    'Jeans',
    'Knitwear',
    'Platforms',
    'Purses',
    'Sandals',
  ];
  const prices = [
    '$10-$100',
    '$100-$200',
    '$200-$300',
    '$300-$400',
    '$400-$500',
  ];

  const handleItemClick = (category) => {
    console.log(category);
  };

  return (
    <div className="hidden sm:block sticky top-40 ">
      <div
        onClick={toggleCollections}
        className="cursor-pointer py-2 font-bold text-xl hover:text-[#48CAB2] flex flex-row  "
      >
        Collections{' '}
        {showCollections ? (
          <ChevronUp className="p-1" />
        ) : (
          <ChevronDown className="p-1" />
        )}
      </div>

      {showCollections && (
        <div>
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(category)}
              className="cursor-pointer py-2 text-sm font-thin hover:text-[#48CAB2]"
            >
              {category}
            </div>
          ))}
        </div>
      )}

      <div
        onClick={toggleProductType}
        className="cursor-pointer py-2 font-bold text-xl hover:text-[#48CAB2] flex flex-row"
      >
        Product Type{' '}
        {showProductType ? (
          <ChevronUp className="p-1" />
        ) : (
          <ChevronDown className="p-1" />
        )}
      </div>

      {showProductType && (
        <div>
          {productTypes.map((product, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(product)}
              className="cursor-pointer py-2 text-sm font-thin hover:text-[#48CAB2]"
            >
              {product}
            </div>
          ))}
        </div>
      )}

      <div
        onClick={togglePrice}
        className="cursor-pointer py-2 font-bold text-xl hover:text-[#48CAB2] flex flex-row"
      >
        Price{' '}
        {showPrice ? (
          <ChevronUp className="p-1" />
        ) : (
          <ChevronDown className="p-1" />
        )}
      </div>

      {showPrice && (
        <div>
          {prices.map((price, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(price)}
              className="cursor-pointer py-2 text-sm font-thin hover:text-[#48CAB2]"
            >
              {price}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSideBar;

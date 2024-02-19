import React, { useState } from 'react';
import ProductTile from './category-tile/ProductTile';
import Image from 'next/image';

interface Category {
  id: number;
  brandName: string;
  dressName: string;
  offerBadge: string;
  newArrivel: string;
  bestSeller: string;
  price: string;
  oldPrice: string;
  imageOne: React.ReactNode;
  imageTwo: React.ReactNode;
}

const ProductList = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const categories: Category[] = [
    {
      id: 1,
      brandName: 'LACOSTE',
      dressName: 'Denim Jacket',
      price: '₹1,036',
      oldPrice: '₹2,036',
      offerBadge: 'SALE 50%',
      newArrivel: '',
      bestSeller: '',
      imageOne: (
        <Image src="/assets/men1.webp" alt="Logo" width={250} height={250} />
      ),

      imageTwo: (
        <Image src="/assets/men2.webp" alt="Logo" width={250} height={250} />
      ),
    },
    {
      id: 2,
      brandName: 'LUIS PHILIPH',
      dressName: 'Leather Jacket',
      price: '₹1,855',
      oldPrice: '',
      offerBadge: '',
      newArrivel: '',
      bestSeller: 'BEST SELLER',
      imageOne: (
        <Image src="/assets/woman3.webp" alt="Logo" width={250} height={250} />
      ),
      imageTwo: (
        <Image src="/assets/woman33.webp" alt="Logo" width={250} height={250} />
      ),
    },
    {
      id: 3,
      brandName: 'ALLEN SOLLY',
      dressName: 'Henley T-shirt',
      price: '₹1,676',
      oldPrice: '₹3,036',
      offerBadge: '',
      newArrivel: 'NEW',
      bestSeller: '',
      imageOne: (
        <Image src="/assets/women1.webp" alt="Logo" width={250} height={250} />
      ),
      imageTwo: (
        <Image src="/assets/women2.webp" alt="Logo" width={250} height={250} />
      ),
    },
    {
      id: 4,
      brandName: 'ADDRESS',
      dressName: 'V-neck T-shirt',
      price: '₹1,436',
      oldPrice: '',
      offerBadge: '',
      newArrivel: '',
      bestSeller: '',
      imageOne: (
        <Image src="/assets/woman4.webp" alt="Logo" width={250} height={250} />
      ),
      imageTwo: (
        <Image src="/assets/woman44.webp" alt="Logo" width={250} height={250} />
      ),
    },
    {
      id: 5,
      brandName: 'TOMMI HILLFIGER',
      dressName: 'Graphic T-shirt',
      price: '₹1,678',
      oldPrice: '',
      offerBadge: 'SALE 20%',
      newArrivel: '',
      bestSeller: '',

      imageOne: (
        <Image src="/assets/woman5.webp" alt="Logo" width={250} height={250} />
      ),
      imageTwo: (
        <Image src="/assets/woman55.webp" alt="Logo" width={250} height={250} />
      ),
    },
    {
      id: 6,
      brandName: 'VESTIDO NATION',
      dressName: 'Sports Jacket',
      price: '₹1,446',
      oldPrice: '₹2,446',
      offerBadge: 'SALE 12%',
      newArrivel: 'NEW',
      bestSeller: '',
      imageOne: (
        <Image src="/assets/woman6.webp" alt="Logo" width={250} height={250} />
      ),
      imageTwo: (
        <Image src="/assets/woman66.webp" alt="Logo" width={250} height={250} />
      ),
    },
    {
      id: 7,
      brandName: 'LACOSTE',
      dressName: 'Denim Jacket',
      price: '₹1,036',
      oldPrice: '₹2,036',
      offerBadge: 'SALE 50%',
      newArrivel: '',
      bestSeller: '',
      imageOne: (
        <Image src="/assets/men1.webp" alt="Logo" width={250} height={250} />
      ),

      imageTwo: (
        <Image src="/assets/men2.webp" alt="Logo" width={250} height={250} />
      ),
    },
    {
      id: 8,
      brandName: 'LUIS PHILIPH',
      dressName: 'Leather Jacket',
      price: '₹1,855',
      oldPrice: '',
      offerBadge: '',
      newArrivel: '',
      bestSeller: 'BEST SELLER',
      imageOne: (
        <Image src="/assets/woman3.webp" alt="Logo" width={250} height={250} />
      ),
      imageTwo: (
        <Image src="/assets/woman33.webp" alt="Logo" width={250} height={250} />
      ),
    },
    {
      id: 9,
      brandName: 'ALLEN SOLLY',
      dressName: 'Henley T-shirt',
      price: '₹1,676',
      oldPrice: '₹3,036',
      offerBadge: '',
      newArrivel: 'NEW',
      bestSeller: '',
      imageOne: (
        <Image src="/assets/women1.webp" alt="Logo" width={250} height={250} />
      ),
      imageTwo: (
        <Image src="/assets/women2.webp" alt="Logo" width={250} height={250} />
      ),
    },
    {
      id: 10,
      brandName: 'ADDRESS',
      dressName: 'V-neck T-shirt',
      price: '₹1,436',
      oldPrice: '',
      offerBadge: '',
      newArrivel: '',
      bestSeller: '',
      imageOne: (
        <Image src="/assets/woman4.webp" alt="Logo" width={250} height={250} />
      ),
      imageTwo: (
        <Image src="/assets/woman44.webp" alt="Logo" width={250} height={250} />
      ),
    },
    {
      id: 11,
      brandName: 'TOMMI HILLFIGER',
      dressName: 'Graphic T-shirt',
      price: '₹1,678',
      oldPrice: '',
      offerBadge: 'SALE 20%',
      newArrivel: '',
      bestSeller: '',

      imageOne: (
        <Image src="/assets/woman5.webp" alt="Logo" width={250} height={250} />
      ),
      imageTwo: (
        <Image src="/assets/woman55.webp" alt="Logo" width={250} height={250} />
      ),
    },
    {
      id: 12,
      brandName: 'VESTIDO NATION',
      dressName: 'Sports Jacket',
      price: '₹1,446',
      oldPrice: '₹2,446',
      offerBadge: 'SALE 12%',
      newArrivel: 'NEW',
      bestSeller: '',
      imageOne: (
        <Image src="/assets/woman6.webp" alt="Logo" width={250} height={250} />
      ),
      imageTwo: (
        <Image src="/assets/woman66.webp" alt="Logo" width={250} height={250} />
      ),
    },
  ];

  const handleMouseEnter = (categoryId: number) => {
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div className="  grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 ">
      {categories.map((category) => (
        <div
          className=""
          key={category.id}
          onMouseEnter={() => handleMouseEnter(category.id)}
          onMouseLeave={handleMouseLeave}
        >
          <ProductTile
            key={category.id}
            brandName={category.brandName}
            dressName={category.dressName}
            price={category.price}
            oldPrice={category.oldPrice}
            offerBadge={category.offerBadge}
            newArrivel={category.newArrivel}
            bestSeller={category.bestSeller}
            imageOne={category.imageOne}
            imageTwo={category.imageTwo}
            isHovered={hoveredCategory === category.id}
          />
        </div>
      ))}
    </div>
  );
};
export default ProductList;

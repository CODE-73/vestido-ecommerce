import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

import { ZoomIn } from 'lucide-react';
import { Heart } from 'lucide-react';
import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

interface CategoryTileProps {
  brandName: string;
  dressName: string;
  price: string;
  oldPrice: string;
  offerBadge: string;
  newArrivel: string;
  bestSeller: string;
  imageOne: React.ReactNode;
  imageTwo: React.ReactNode;
  isHovered: boolean;
}

const sizes = ['XS', 'S', 'SM', 'LG', 'XL', 'XXL', 'XXXL'];

const generateStarIcon = () => (
  <svg
    className="w-4 h-4 text-yellow-300 ms-1"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 20"
  >
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
  </svg>
);

const CategoryTile: React.FC<CategoryTileProps> = ({
  brandName,
  dressName,
  price,
  oldPrice,
  offerBadge,
  newArrivel,
  bestSeller,
  imageOne,
  imageTwo,
  isHovered,
}) => {
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  //   const handleDeployClick = () => {};

  return (
    <div className="lg:w-[250px] w-[180px]   flex flex-col  relative">
      <a className=" relative flex flex-row">
        {isHovered ? <>{imageTwo}</> : <>{imageOne}</>}

        <div className="absolute top-0 left-0 m-2 flex flex-row gap-2">
          {offerBadge && (
            <div className=" bg-red-500 text-xs text-white flex justify-center items-center my-1 font-semibold  px-2">
              {offerBadge}
            </div>
          )}

          {bestSeller && (
            <div className=" bg-yellow-500 text-xs text-white flex justify-center items-center my-1 font-semibold  px-2">
              {bestSeller}
            </div>
          )}

          {newArrivel && (
            <div className=" bg-blue-500 text-xs text-white flex justify-center items-center my-1 font-semibold  px-2">
              {newArrivel}
            </div>
          )}
        </div>
        {isHovered && (
          <div className="  absolute top-0 right-0  flex flex-col  text-black font-bold m-2 pt-4 hidden sm:block ">
            <Heart className="cursor-pointer" />
            <ZoomIn className="cursor-pointer" />
          </div>
        )}
      </a>

      <div className="  gap-3 flex flex-col justify-start justify-items-start py-2  ">
        <div className="flex">
          {Array(4)
            .fill(generateStarIcon)
            .map((icon, index) => (
              <React.Fragment key={index}>{icon()}</React.Fragment>
            ))}
          <svg
            className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
        <h1 className="text-stone-600 text-xs font-thin">{brandName}</h1>
        <h2 className=" text-sm font-semibold">{dressName}</h2>

        <div className="sm:hidden block flex flex-row gap-2">
          <h1 className="text-sm font-bold text-rose-950">
            <s>{oldPrice}</s>
          </h1>
          <h1 className="text-sm font-bold text-[#48CAB2]">{price}</h1>
        </div>
        <div className="flex flex-row  grid grid-cols-5 cursor-pointer ">
          {sizes.map((size) => (
            <div
              key={size}
              className={`w-10 h-6 border border-black-500 flex items-center justify-center text-xs m-1 ${
                selectedSize === size ? 'bg-gray-100 ' : ''
              }`}
              onClick={() => handleSizeClick(size)}
            >
              <div className="text-xs font-thin">{size}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-row gap-3  items-center">
          <Button
            className="gap-3 sm:w-auto w-full bg-[#48CAB2] text-white"
            variant="outline"
            onClick={() => {
              toast({
                description: 'Your message has been sent.',
              });
            }}
          >
            <div className="">
              <ShoppingCart />
            </div>
            {/* <div className="hidden lg:block">Add to cart</div> */}
          </Button>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-rose-950">
              <s>{oldPrice}</s>
            </h1>
            <h1 className="text-sm font-bold text-[#48CAB2]">{price}</h1>
          </div>
        </div>
        <div className="    flex flex-row gap-4 text-black font-bold  block sm:hidden">
          <Heart className="cursor-pointer " />
          <ZoomIn className="cursor-pointer " />
        </div>
      </div>
    </div>
  );
};

export default CategoryTile;

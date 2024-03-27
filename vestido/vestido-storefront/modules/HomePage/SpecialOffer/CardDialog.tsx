import * as React from 'react';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@vestido-ecommerce/shadcn-ui/dialog';
import { Trash2, Minus, Plus, ChevronLeft, RefreshCcw } from 'lucide-react';
import { Checkbox } from '@vestido-ecommerce/shadcn-ui/checkbox';

import { Input } from '@vestido-ecommerce/shadcn-ui/input';
import { Label } from '@vestido-ecommerce/shadcn-ui/label';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import product11 from '../../../assets/offer-products/product1-1.jpg';
import product12 from '../../../assets/offer-products/product1-2.jpg';

type CardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CardDialog: React.FC<CardDialogProps> = ({ isOpen, onClose }) => {
  const product = [
    {
      cardImage1: product11,
      cardImage2: product12,
      name: 'T-shirt with pearly sleeves',
      salePercent: '13',
      brand: "levi's",
      price: '$450.00',
      offerPrice: '$390.00',
    },
  ];
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
        <DialogContent className="flex h-3/4 w-7/12 flex-col items-center justify-center px-10">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center pt-12 font-extrabold tracking-normal text-xl">
              Added to cart successfully!
            </DialogTitle>
          </DialogHeader>

          <Image
            className="w-1/4 "
            src={product[0].cardImage1}
            alt="alt text"
          />

          <div className="flex flex-col items-center justify-center">
            <div className="text-lg tracking-tight ">{product[0].name}</div>
            <div className="flex flex-row space-x-2  pt-1 ">
              <div className="text-sm">4 x</div>
              <div className="text-[#48CAB2] font-extrabold text-sm ">
                {product[0].offerPrice}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 my-1 w-full"></div>
          <div className="flex items-center justify-center text-center text-base ">
            There are 8 items <br /> in your cart
          </div>
          <div className="flex flex-row items-center justify-center font-extrabold text-[#48CAB2] text-xl ">
            <div>Total:</div>
            {product[0].offerPrice}
          </div>
          <div className="flex items-center justify-center w-full bg-neutral-700 hover:bg-[#48CAB2] h-1/3 text-white">
            <ChevronLeft />
            <button className="font-extrabold tracking-wider ">
              Continue Shopping
            </button>
          </div>
          <button className="h-1/3 font-extrabold tracking-wide w-full  outline  outline-2  outline-slate-300 hover:outline-black  ">
            View Cart
          </button>
          <div className="flex flex-row justify-start pr-40 gap-2 ">
            <Checkbox className="bg-white" />
            <div className="text-slate-500 text-sm">
              I agree with the terms and conditions
            </div>
          </div>

          <button className="  h-1/3 text-white  w-full bg-[#48CAB2] hover:bg-teal-500">
            PROCEED TO CHECKOUT
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CardDialog;

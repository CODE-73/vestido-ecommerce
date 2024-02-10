// import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { ShoppingBag} from 'lucide-react';

export function AddToCartButton() {
  return (
    <div className="flex gap-1"><div className='p-2 bg-[#48CAB2]'><ShoppingBag color="#fff" /></div>
    <div className='flex flex-col'><div className='line-through'>real price</div><div>offer price</div></div>

   
    </div>
  );
}
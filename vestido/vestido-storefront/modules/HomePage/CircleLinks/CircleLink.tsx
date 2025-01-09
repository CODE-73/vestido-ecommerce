import Image from 'next/image';
import Link from 'next/link';

import { z } from 'zod';

import { CircleLinksSchema } from '@vestido-ecommerce/settings/client';
type CircleLinkData = z.infer<typeof CircleLinksSchema>;
interface CircleLinkProps {
  data: CircleLinkData;
}
const CircleLink: React.FC<CircleLinkProps> = ({ data }) => {
  return (
    <div className="group basis-1/4 lg:basis-48 text-center transition duration-700 ease-in-out md:hover:-translate-y-5 text-[#333333]">
      <Link
        href={`/${data.href}`}
        className={`${data.href ? '' : 'pointer-events-none'}`}
      >
        <div className="flex flex-col items-center mb-5 md:mb-auto">
          <div className="relative w-16 h-16 md:w-32 md:h-32 overflow-hidden rounded-full">
            <Image
              src={data.image.url ?? ''}
              alt="alt text"
              placeholder={data.image.blurHashDataURL ? 'blur' : undefined}
              blurDataURL={data.image.blurHashDataURL ?? undefined}
              sizes="(max-width: 640px) 50vw"
              fill
            />
          </div>

          <div className="pt-2 capitalize text-center text-xs md:text-base leading-normal text-white group-hover:text-[#48CAB2] ">
            {data.text_content}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CircleLink;

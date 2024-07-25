import Image, { StaticImageData } from 'next/image';

import { DiscoverButton } from '../DiscoverButton';

export type FinalSectionCardData = {
  cardImage: StaticImageData;
  mainTitle: string;
  subtitle1: string;
  subtitle2: string;
  textColor?: string;
};

interface FinalSectionCardProps {
  data: FinalSectionCardData;
}
const FinalSectionCard: React.FC<FinalSectionCardProps> = ({ data }) => {
  return (
    <div className={`group relative overflow-hidden`}>
      <div className="hover:scale-110 transition duration-500 cursor-pointer object-cover">
        <Image src={data.cardImage} alt="alt text" />
      </div>
      <div className="absolute left-10 top-10 ">
        <div
          className={`uppercase font-bold text-md max-w-sm ${
            data.textColor ? `text-${data.textColor}` : 'text-[#333333]'
          }`}
        >
          {data.subtitle2}
        </div>
        <div
          className={`group-hover:underline capitalize font-bold text-2xl sm:text-4xl md:text-5xl my-1 sm:my-3 group-hover:underline group-hover:underline-offset-4 leading-normal main-title ${
            data.textColor ? `text-${data.textColor}` : 'text-[#333333]'
          }`}
        >
          {data.mainTitle}
        </div>
        <div
          className={`capitalize font-extralight text-lg max-w-md ${
            data.textColor ? `text-${data.textColor}` : 'text-[#777777]'
          }`}
        >
          {data.subtitle1}
        </div>
        <DiscoverButton />
      </div>
    </div>
  );
};

export default FinalSectionCard;

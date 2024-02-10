import Image, { StaticImageData } from 'next/image';

export type PopularCollectionCardData = {
  cardImage: StaticImageData;
  mainTitle: string;
  subtitle1: string;
  span?: string;
  textColor?: string;
};

interface PopularCollectionCardProps {
  data: PopularCollectionCardData;
}
const PopularCollectionCard: React.FC<PopularCollectionCardProps> = ({
  data,
}) => {
  return (
    <div className={`group relative overflow-hidden ${data.span}`}>
      {' '}
      <div className="hover:scale-110 transition duration-500 cursor-pointer object-cover">
        <Image src={data.cardImage} alt="alt text" />
      </div>
      <div className="absolute left-10 top-10 ">
        {' '}
        <div
          className={`group-hover:underline capitalize font-bold text-2xl group-hover:underline group-hover:underline-offset-4 leading-normal main-title ${
            data.textColor ? `text-${data.textColor}` : 'text-[#333333]'
          }`}
        >
          {data.mainTitle}
        </div>
        <div
          className={`font-extralight text-lg max-w-sm ${
            data.textColor ? `text-${data.textColor}` : 'text-[#777777]'
          }`}
        >
          {data.subtitle1}
        </div>
      </div>
    </div>
  );
};

export default PopularCollectionCard;

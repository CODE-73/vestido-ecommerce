import Image, { StaticImageData } from 'next/image';

export type PopularCollectionCardData = {
  cardImage: StaticImageData;
  mainTitle: string;
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
    <div className={`group relative overflow-hidden ${data.span} w-full`}>
      <div className="hover:scale-110 transition duration-500 cursor-pointer  w-full">
        <Image
          src={data.cardImage}
          alt="alt text"
          className="object-cover w-full"
        />
      </div>
      <div className="absolute left-10 top-10 ">
        <div
          className={`group-hover:underline capitalize font-bold text-2xl group-hover:underline group-hover:underline-offset-4 leading-normal main-title ${
            data.textColor ? `text-${data.textColor}` : 'text-white'
          }`}
        >
          {data.mainTitle}
        </div>
      </div>
    </div>
  );
};

export default PopularCollectionCard;

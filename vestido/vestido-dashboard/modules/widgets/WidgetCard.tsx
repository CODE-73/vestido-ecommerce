import Image, { StaticImageData } from 'next/image';
export type WidgetCardData = {
  name: string;
  number: string;
  icon: StaticImageData;
};

interface WidgetCardProps {
  data: WidgetCardData;
}
const WidgetCard: React.FC<WidgetCardProps> = ({ data }) => {
  return (
    <div className=" flex-1 px-12 py-10 font-bold bg-white rounded-md border-4 border-slate-400">
      <div className="flex gap-5">
        <Image src={data.icon} alt="new-orders" width="50" height="50" />

        <div className="flex flex-col">
          <div>{data.name}</div>
          <div>{data.number}</div>
        </div>
      </div>
    </div>
  );
};
export default WidgetCard;

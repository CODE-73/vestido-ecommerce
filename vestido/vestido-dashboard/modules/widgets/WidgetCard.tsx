export type WidgetCardData = {
  name: string;
  number: string;
  icon: string;
};

interface WidgetCardProps {
  data: WidgetCardData;
}
const WidgetCard: React.FC<WidgetCardProps> = ({ data }) => {
  return (
    <div className=" flex-1 px-16 py-10 font-bold bg-white rounded-md border-4 border-slate-400">
      <div className="flex flex-col">
        <div>{data.name}</div>
        <div>{data.number}</div>
        <div>{data.icon}</div>
      </div>
    </div>
  );
};
export default WidgetCard;

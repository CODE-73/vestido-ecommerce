import WidgetCard from './WidgetCard';

const widgetItems = [
  {
    name: 'NewOrders',
    number: '1200',
    icon: 'icon',
  },
  {
    name: 'Total Income',
    number: '12000',
    icon: 'icon',
  },
  {
    name: 'Total Expense',
    number: '1200',
    icon: 'icon',
  },
  {
    name: 'new Users',
    number: '320',
    icon: 'icon',
  },
];

const WidgetCards: React.FC = () => {
  return (
    <div className="flex justify-around gap-4 rounded-md">
      {widgetItems.map((widget, index) => (
        <WidgetCard key={index} data={widget} />
      ))}
    </div>
  );
};
export default WidgetCards;

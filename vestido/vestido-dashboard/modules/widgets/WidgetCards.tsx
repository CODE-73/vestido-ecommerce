import WidgetCard from './WidgetCard';
import newOrdersIcon from '../../assets/icons/new-orders.png';
import incomeIcon from '../../assets/icons/total-income.png';
import expenseIcon from '../../assets/icons/total-expense.png';
import userIcon from '../../assets/icons/new-users.png';

const widgetItems = [
  {
    name: 'NewOrders',
    number: '1200',
    icon: newOrdersIcon,
  },
  {
    name: 'Total Income',
    number: '12000',
    icon: incomeIcon,
  },
  {
    name: 'Total Expense',
    number: '1200',
    icon: expenseIcon,
  },
  {
    name: 'new Users',
    number: '320',
    icon: userIcon,
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

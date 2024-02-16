import { FC } from 'react';
import cardImage1 from '../../../assets/final/image1.jpg';
import cardImage2 from '../../../assets/final/image2.jpg';
import FinalSectionCard, { FinalSectionCardData } from './FinalSectionCard';
import clsx from 'clsx';

const cards: FinalSectionCardData[] = [
  {
    cardImage: cardImage1,
    mainTitle: "Women's",
    subtitle1: 'Here to bring your lifestyle to the next level.',
    subtitle2: 'complete your look',
  },
  {
    cardImage: cardImage2,
    mainTitle: "Men's",
    subtitle1: 'distinguished. individual. Character',
    subtitle2: 'top trending styles',
    textColor: 'white',
  },
];

type FinalSectionProps = {
  className?: string;
};

export const FinalSection: FC<FinalSectionProps> = (props) => {
  return (
    <div className={`flex flex-col md:flex-row gap-3 ${clsx(props.className)}`}>
      {' '}
      {cards.map((card, index) => (
        <FinalSectionCard key={index} data={card} />
      ))}
    </div>
  );
};

import { ScrollCardData } from './HorizontalScrollCard';
import HorizontalScrollCard from './HorizontalScrollCard';
import cardImage1 from '../../assets/cards/card-1.jpg';
import cardImage2 from '../../assets/cards/card-2.jpg';
import cardImage3 from '../../assets/cards/card-3.jpg';
import cardImage4 from '../../assets/cards/card-4.jpg';
import cardImage5 from '../../assets/cards/card-5.jpg';
import cardImage6 from '../../assets/cards/card-6.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@vestido-ecommerce/shadcn-ui/carousel';

const cards: ScrollCardData[] = [
  {
    cardImage: cardImage1,
    mainTitle: 'what to buy now',
    subtitle1: 'new collection',
    subtitle2: 'Mysterious. Hypnotic. Surreal. Multifaceted. Daring',
  },
  {
    cardImage: cardImage2,
    mainTitle: 'must-haves for the season',
    subtitle1: 'need-it-now',
    subtitle2: 'Contemporary, minimal and beautifully iconic.',
  },
  {
    cardImage: cardImage3,
    mainTitle: 'get upto 50% off!',
    subtitle1: "don't miss today's featured deals",
    subtitle2: 'Here to bring your lifestyles to next level',
  },
  {
    cardImage: cardImage4,
    mainTitle: 'get upto 50% off!',
    subtitle1: "don't miss today's featured deals",
    subtitle2: 'Here to bring your lifestyles to next level',
  },
  {
    cardImage: cardImage5,
    mainTitle: 'get upto 50% off!',
    subtitle1: "don't miss today's featured deals",
    subtitle2: 'Here to bring your lifestyles to next level',
  },
  {
    cardImage: cardImage6,
    mainTitle: 'get upto 50% off!',
    subtitle1: "don't miss today's featured deals",
    subtitle2: 'Here to bring your lifestyles to next level',
  },
];
export function HorizontalScrollCards() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full relative"
    >
      <CarouselContent>
        {cards.map((card, index) => (
          <HorizontalScrollCard key={index} data={card} />
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-10" />
      <CarouselNext className="absolute right-10" />
    </Carousel>
  );
}

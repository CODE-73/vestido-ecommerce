
import { CarouselItem } from "@vestido-ecommerce/shadcn-ui/carousel";
import Image from "next/image"
import {LandingCarouselItemData} from './Carousel'
import { DiscoverButton } from "./DiscoverButton";

interface LandingCarouselItemProps {
    data: LandingCarouselItemData;

}
const LandingCarouselItem: React.FC<LandingCarouselItemProps> = ({data}) => {
    return(
        <CarouselItem>
        <div className="embla__slide relative">
        <div className={`flex flex-col gap-1 absolute top-1/3 ${data.textPosition} text-${data.textAlign} `}>
          <div className={`uppercase text-md font-extrabold text-${data.textColor}`}>{data.subtitle1}</div>
          <div className={`capitalize font-bold text-5xl max-w-[500px] leading-normal text-${data.textColor}`}>{data.mainTitle}</div>
          <div className={`font-extralight text-${data.textColor}`}>{data.subtitle2}</div>
          <div><DiscoverButton/></div>
        </div>
       
        <Image
          className="embla__slide__img"
          src={data.backgroundImage}
          alt="Your alt text"
        />
      </div></CarouselItem>
    )

}

export default LandingCarouselItem;
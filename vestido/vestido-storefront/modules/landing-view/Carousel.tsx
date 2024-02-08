import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import image1 from '../../assets/carousel/slide-1.jpg'
import image2 from '../../assets/carousel/slide-2.jpg'
import image3 from '../../assets/carousel/slide-3.jpg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "libs/shadcn-ui/src/ui/carousel"
import Image, { StaticImageData } from "next/image"
import { Button } from "@vestido-ecommerce/shadcn-ui/button"

type LandingCarouselItemData = {
  backgroundImage: StaticImageData;
  mainTitle: string;
  subtitle1: string;
  subtitle2: string;
  buttonText: string;
  buttonLink: string;
  textAlign: string;
  textColor: string;
  textPosition: string;
}

const slides: LandingCarouselItemData[] = [
  {
    backgroundImage: image1,
    mainTitle: 'find your new favourite clothing',
    subtitle1: 'new collection',
    subtitle2: 'Keep perfect time with the contemporary, expertly-crafted designs.',
    buttonText: 'discover now!',
    buttonLink: '1',
    textAlign: 'left',
    textColor: '[#333333]',
    textPosition: 'left-1/3'
  },
  {
    backgroundImage: image2,
    mainTitle: 'must-haves for the season',
    subtitle1: 'need-it-now',
    subtitle2: 'Contemporary, minimal and beautifully iconic.',
    buttonText: 'discover now!',
    buttonLink: '2',
    textAlign: 'center',
    textColor: 'white',
    textPosition:'left-1/3'
  },
  {
    backgroundImage: image3,
    mainTitle: 'get upto 50% off!',
    subtitle1: "don't miss today's featured deals",
    subtitle2: 'Here to bring your lifestyles to next level',
    buttonText: 'discover now!',
    buttonLink: '3',
    textAlign: 'left',
    textColor: 'white',
    textPosition:'right-1/4'
  }
]
export function LandingCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  ) 

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
      {slides.map((slide, index) => (
      
          <CarouselItem>
          <div className="embla__slide relative"  key={index}>
          <div className={`flex flex-col gap-1 absolute top-1/3 ${slide.textPosition} text-${slide.textAlign} `}>
            <div className={`uppercase text-md font-extrabold text-${slide.textColor}`}>{slide.subtitle1}</div>
            <div className={`capitalize font-bold text-5xl max-w-[500px] leading-normal text-${slide.textColor}`}>{slide.mainTitle}</div>
            <div className={`font-extralight text-${slide.textColor}`}>{slide.subtitle2}</div>
            <div><Button className="mt-6 h-12 rounded-none text-white bg-[#48CAB2] uppercase font-bold px-10">{slide.buttonText}</Button></div>
          </div>
         
          <Image
            className="embla__slide__img"
            src={slide.backgroundImage}
            alt="Your alt text"
          />
        </div></CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  )
}



 
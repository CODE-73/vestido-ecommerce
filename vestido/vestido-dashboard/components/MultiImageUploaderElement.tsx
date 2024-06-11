import {
  ChevronLeft,
  ChevronRight,
  Trash,
  Plus,
  FileImage,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ImageSchemaType } from '@vestido-ecommerce/utils';
import { InputElement } from '../forms/input-element';

interface ImageUploaderProps {
  name: string;
}
const sampleImages = [
  'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1619785292559-a15caa28bde6?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];
const MultiImageUploader: React.FC<ImageUploaderProps> = ({ name }) => {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(-1);

  const form = useFormContext();

  const { fields, replace } = useFieldArray({
    control: form.control,
    name,
  });
  const images = fields as unknown as ImageSchemaType[];

  const setImages = (imgs: ImageSchemaType[]) => {
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].displayIndex = i;
      imgs[i].default = i === 0 ? true : false;
    }
    replace(imgs);
  };

  const handleMoveImageLeft = () => {
    if (activeImageIdx !== null && activeImageIdx > 0) {
      const newImages = [...images];
      console.log('newImages', newImages);
      const temp = newImages[activeImageIdx - 1];
      newImages[activeImageIdx - 1] = newImages[activeImageIdx];
      newImages[activeImageIdx] = temp;
      console.log('newImages active', newImages[activeImageIdx]);
      console.log(name);
      setImages(newImages);
      setActiveImageIdx(activeImageIdx - 1);
    }
  };

  const handleMoveImageRight = () => {
    if (activeImageIdx !== null && activeImageIdx < name.length - 1) {
      const newImages = [...images];
      const temp = newImages[activeImageIdx + 1];
      newImages[activeImageIdx + 1] = newImages[activeImageIdx];
      newImages[activeImageIdx] = temp;
      setImages(newImages);
      setActiveImageIdx(activeImageIdx + 1);
    }
  };

  return (
    <div>
      <div className="flex overflow-x-auto gap-2 lg:w-full cursor-pointer">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative basis-1/5 bg-white  border border-2 text-gray-300 border-dashed border-gray-300 hover:bg-white  flex-shrink-0 flex items-center justify-center ${
              activeImageIdx === index
                ? 'border-blue-800 border-double opacity-75'
                : ''
            }`}
            onClick={() => setActiveImageIdx(index)}
          >
            {index == 0 && (
              <div className="absolute bg-blue-800 font-semibold text-white p-1 top-3 left-3 uppercase text-xs rounded-none">
                default
              </div>
            )}
            <Image src={image.url} alt={image.alt} height="600" width="450" />
            <div className="absolute left-1/2 top-1/2">{index}</div>
            {activeImageIdx === index ? (
              <Button
                className="absolute right-2 top-2"
                type="button"
                onClick={() => {
                  if (activeImageIdx >= 0) {
                    console.log(activeImageIdx);
                    images.splice(activeImageIdx, 1);
                    setImages([...images]);
                    setActiveImageIdx(-1); // Reset active image index after removal
                  }
                }}
                disabled={activeImageIdx < 0}
              >
                <Trash />
              </Button>
            ) : (
              ''
            )}
          </div>
        ))}
        {images.length < 10 && (
          <div
            className="relative lg:w-56 flex-shrink-0 bg-white opacity-75 border border-2 text-gray-300 border-dashed border-gray-300 hover:bg-white hover:opacity-100 flex items-center justify-center"
            onClick={() => {
              if (images.length < 10) {
                const randomIndex = Math.floor(
                  Math.random() * sampleImages.length
                );
                setImages([
                  ...images,
                  {
                    alt: 'This is alt',
                    url: sampleImages[randomIndex],
                    displayIndex: name.length,
                    default: name.length === 0,
                  },
                ]);
              }
            }}
          >
            <FileImage />
          </div>
        )}
      </div>
      <div className="flex gap-5 lg:w-1/2 mt-5">
        <Button
          className="basis-2/5"
          type="button"
          onClick={() => {
            if (name.length < 10) {
              const randomIndex = Math.floor(
                Math.random() * sampleImages.length
              );
              setImages([
                ...images,
                {
                  alt: 'This is alt',
                  url: sampleImages[randomIndex],
                  displayIndex: name.length,
                  default: name.length === 0,
                },
              ]);
            }
          }}
        >
          <div className="flex gap-2 items-center">
            <span>Add Image</span>
            <Plus />
          </div>
        </Button>
        <Button
          className="basis-1/5"
          type="button"
          onClick={handleMoveImageLeft}
          disabled={activeImageIdx === -1 || activeImageIdx === 0}
        >
          <ChevronLeft />
        </Button>
        <Button
          className="basis-1/5"
          type="button"
          onClick={handleMoveImageRight}
          disabled={activeImageIdx === -1 || activeImageIdx >= name.length - 1}
        >
          <ChevronRight />
        </Button>
        {activeImageIdx >= 0 && (
          <InputElement name={`images.${activeImageIdx}.alt`}></InputElement>
        )}
      </div>
    </div>
  );
};

export default MultiImageUploader;

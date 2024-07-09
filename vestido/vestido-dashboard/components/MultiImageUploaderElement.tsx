import { Button } from '@vestido-ecommerce/shadcn-ui/button';
import { ImageSchemaType } from '@vestido-ecommerce/utils';
import {
  LuAlertTriangle,
  LuChevronLeft,
  LuChevronRight,
  LuPlus,
  LuTrash,
  LuTimer,
} from 'react-icons/lu';
import Image from 'next/image';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InputElement } from '../forms/input-element';
import { FileUploadElement } from './FileUpload';
import { useR2SignedURL } from '@vestido-ecommerce/r2';
import { clsx } from 'clsx';

interface ImageUploaderProps {
  name: string;
}

const MultiImageUploader: React.FC<ImageUploaderProps> = ({ name }) => {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(-1);

  const form = useFormContext();

  const { replace } = useFieldArray({
    control: form.control,
    name,
  });
  const images = (form.watch(name) ?? []) as ImageSchemaType[];

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
      const temp = newImages[activeImageIdx - 1];
      newImages[activeImageIdx - 1] = newImages[activeImageIdx];
      newImages[activeImageIdx] = temp;
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

  const addNewImage = () => {
    setImages([
      ...images,
      {
        alt: '',
        key: '',
        displayIndex: name.length,
        default: name.length === 0,
      },
    ]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap gap-2 lg:w-full cursor-pointer">
        {images.map((image, index) => (
          <ImageCardElement
            key={`image-${index}-${image.key}`}
            image={image}
            isSelected={activeImageIdx === index}
            onSelect={() => setActiveImageIdx(index)}
            onDelete={() => {
              const newImages = images.filter((_, i) => i !== index);
              setImages(newImages);
            }}
            onAddNewImage={addNewImage}
          />
        ))}
      </div>
      <div className="flex gap-5 lg:w-1/2 mt-5">
        <Button
          className="basis-1/5"
          type="button"
          onClick={handleMoveImageLeft}
          disabled={activeImageIdx === -1 || activeImageIdx === 0}
        >
          <LuChevronLeft />
        </Button>
        <Button className="basis-2/5" type="button" onClick={addNewImage}>
          <div className="flex gap-2 items-center">
            <span>Add Image</span>
            <LuPlus />
          </div>
        </Button>
        <Button
          className="basis-1/5"
          type="button"
          onClick={handleMoveImageRight}
          disabled={activeImageIdx === -1 || activeImageIdx >= name.length - 1}
        >
          <LuChevronRight />
        </Button>
        {activeImageIdx >= 0 && (
          <InputElement name={`images.${activeImageIdx}.alt`}></InputElement>
        )}
      </div>
    </div>
  );
};

type ImageCardElementProps = {
  image: ImageSchemaType;
  isSelected?: boolean;
  onSelect: () => void;
  onDelete?: () => void;
  onAddNewImage?: () => void;
};

const ImageCardElement: React.FC<ImageCardElementProps> = ({
  image,
  isSelected,
  onSelect,
  onDelete,
}) => {
  const { data: imgURL, isValidating: isLoading } = useR2SignedURL({
    key: image?.key || '',
    requestType: 'GET',
    expiresIn: 3600,
  });

  return (
    <div
      className={clsx(
        'flex items-center justify-center flex-shrink-0',
        'h-40 w-32 overflow-hidden',
        'border border-2 border-dashed border-gray-300',
        `relative basis-1/5 bg-white text-gray-300 hover:bg-white`,
        {
          'border-blue-800 border-double border-4': isSelected,
        }
      )}
      onClick={onSelect}
    >
      {image?.default && (
        <div className="absolute bg-blue-800 font-semibold text-white p-1 top-3 left-3 uppercase text-xs rounded-none">
          default
        </div>
      )}

      {image?.key ? (
        imgURL ? (
          <Image
            src={imgURL}
            alt={image.alt}
            sizes="100vw"
            width={0}
            height={0}
            className="h-40 w-32"
          />
        ) : isLoading ? (
          <LuTimer />
        ) : (
          <LuAlertTriangle />
        )
      ) : (
        <>
          <FileUploadElement
            name={`images.${image?.displayIndex}.key`}
            keyPrefix="items/"
            label="Upload Image"
            className="absolute bottom-5 h-10 z-10"
          />
        </>
      )}

      {isSelected && (
        <Button
          className="absolute right-2 top-2"
          type="button"
          size="icon"
          variant="destructive"
          onClick={onDelete}
        >
          <LuTrash />
        </Button>
      )}
    </div>
  );
};

export default MultiImageUploader;

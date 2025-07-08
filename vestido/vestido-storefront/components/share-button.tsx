import { useState } from 'react';

import { Item } from '@prisma/client';
import { LuShare2 } from 'react-icons/lu';

import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';
import { ImageSchemaType } from '@vestido-ecommerce/utils';

type ShareButtonProps = {
  itemId: string;
  item: Item;
};

const ShareButton: React.FC<ShareButtonProps> = ({ itemId, item }) => {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);
  const handleShare = async () => {
    setIsSharing(true);

    const shareUrl = `${window.location.origin}/products/${itemId}`;
    const imageUrl =
      (item.images as ImageSchemaType[])?.find((img) => img?.default)?.url ??
      (item.images as ImageSchemaType[])?.[0]?.url;

    const shareData: ShareData = {
      title: item?.title || 'Check out this item!',
      text: 'I found this awesome item on Vestido Nation! 😍',
      url: shareUrl,
    };

    try {
      if (imageUrl) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'item-image.jpg', { type: blob.type });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            ...shareData,
            files: [file],
          });
          setIsSharing(false);
          return;
        }
      }

      // Fallback to URL sharing or copying
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: 'Success',
          description: 'Link copied to clipboard!',
          variant: 'default',
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to share. Please try again.',
        variant: 'destructive',
        duration: 2000,
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      aria-label="Share item"
      className="text-gray-600 hover:text-gray-800 transition-colors p-1"
    >
      <LuShare2 strokeWidth={1.3} size={22} />
    </button>
  );
};

export default ShareButton;

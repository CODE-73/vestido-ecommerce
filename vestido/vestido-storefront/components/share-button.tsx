import { useState } from 'react';

import { Item } from '@prisma/client';
import { LuShare2 } from 'react-icons/lu';

import { useToast } from '@vestido-ecommerce/shadcn-ui/use-toast';

type ShareButtonProps = {
  itemId: string;
  item: Item;
};

const ShareButton: React.FC<ShareButtonProps> = ({ itemId, item }) => {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    const shareData = {
      title: item?.title || 'Check out this item!',
      text: item?.description || 'I found this awesome item!',
      url: `${window.location.origin}/item/${itemId}`,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
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
      <LuShare2 strokeWidth={1.3} size={28} />
    </button>
  );
};

export default ShareButton;

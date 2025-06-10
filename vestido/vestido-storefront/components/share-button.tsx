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

    const shareUrl = `${window.location.origin}/item/${itemId}`;
    const itemTitle = item?.title || 'Check out this item!';
    const itemDescription =
      item?.description || 'I found this awesome item on Vestido Nation! 😍';
    const hashtags = '#FashionFinds #MadeInIndiaForTheWorld'; // Add relevant hashtags

    // Format the message for WhatsApp
    const message = `${itemTitle}\n${itemDescription}\n${shareUrl}\n${hashtags}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    try {
      // First, try to use navigator.share to let the user choose the app
      if (navigator.share) {
        await navigator.share({
          title: itemTitle,
          text: `${itemDescription}\n${hashtags}`,
          url: shareUrl,
        });
      } else {
        // Fallback: Open WhatsApp directly with the pre-filled message
        window.open(whatsappUrl, '_blank');
      }
    } catch (error) {
      console.error('Share failed:', error);
      // Fallback to clipboard if sharing fails
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: 'Success',
        description: 'Link copied to clipboard!',
        variant: 'default',
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

import { Plus } from 'lucide-react';
import React, { useMemo } from 'react';

type CollapsableFooterSectionProps = {
  title: string;
  collapsible: boolean;
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (title: string) => void;
};

const CollapsableFooterSection: React.FC<CollapsableFooterSectionProps> = ({
  title,
  collapsible,
  children,
  activeSection,
  setActiveSection,
}) => {
  const isCollapsed = useMemo(() => {
    if (!collapsible) {
      return false;
    }

    return title !== activeSection;
  }, [collapsible, title, activeSection]);

  return (
    <div className="w-full flex flex-col md:w-1/4 pr-4 mb-4 md:mb-0">
      <div className="flex items-center justify-between">
        <h1 className="font-black text-xl text-black">{title}</h1>
        {collapsible && (
          <Plus
            className="inline-block"
            onClick={() => setActiveSection(title)}
          />
        )}
      </div>
      {!isCollapsed && (
        <div className="flex flex-col space-y-3">{children}</div>
      )}
    </div>
  );
};

export default CollapsableFooterSection;

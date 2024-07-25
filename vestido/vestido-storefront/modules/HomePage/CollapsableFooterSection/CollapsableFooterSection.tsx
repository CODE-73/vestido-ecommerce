import React, { useMemo } from 'react';

import { LuPlus } from 'react-icons/lu';

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
    <div className="w-full flex flex-col md:w-3/4 pr-4 mb-4 md:mb-0">
      <div className="flex items-center justify-between">
        <h1 className="font-black text-base text-[#333] sm:pb-4 xl:pb-4">
          {title}
        </h1>
        {collapsible && (
          <LuPlus
            className="inline-block"
            onClick={() => setActiveSection(title)}
          />
        )}
      </div>
      {!isCollapsed && (
        <div className="flex flex-col space-y-2">{children}</div>
      )}
    </div>
  );
};

export default CollapsableFooterSection;

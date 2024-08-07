import { useState } from 'react';
import { FC } from 'react';

import clsx from 'clsx';

type WelcomeToStoreProps = {
  className?: string;
};

export const WelcomeToStore: FC<WelcomeToStoreProps> = (props) => {
  const [selected, setSelected] = useState(0);
  const menu = ['new arrival', 'popular', 'featured', 'specials'];
  return (
    <div
      className={`flex flex-col items-center justify-center ${clsx(
        props.className,
      )}`}
    >
      <div className="text-4xl capitalize tracking-wide text-[#333333] font-extrabold">
        welcome To Store
      </div>
      <div className="flex gap-8 justify-center pt-8 ">
        {menu.map((menuItem, index) => (
          <div onClick={() => setSelected(index)} key={index}>
            <div
              className={`text-sm font-bold cursor-pointer uppercase hover:text-[#48CAB2] ${
                selected === index ? 'text-[#48CAB2]' : 'text-[#333333]'
              }`}
            >
              {menuItem}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

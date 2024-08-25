import { FC } from 'react';

const BlockingSpinner: FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-300"></div>
    </div>
  );
};

export default BlockingSpinner;

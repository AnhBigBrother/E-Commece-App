import { LuLoader2 } from 'react-icons/lu';

const PageLoader = () => {
  return (
    <div className='w-full h-auto flex justify-center items-center'>
      <LuLoader2 className='w-9 h-auto rounded-full animate-spin' />
    </div>
  );
};

export default PageLoader;

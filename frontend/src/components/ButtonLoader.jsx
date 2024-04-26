import { LuLoader2 } from 'react-icons/lu';

const ButtonLoader = () => {
  return (
    <div className='w-full h-auto flex justify-center items-center'>
      <LuLoader2 className='w-6 h-auto rounded-full animate-spin' />
    </div>
  );
};

export default ButtonLoader;

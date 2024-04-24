const Skeleton1 = () => {
  return (
    <div className='animate-pulse flex flex-row justify-center xl:justify-between gap-[1rem] xl:gap-[3rem]'>
      <div className='grid-cols-2 gap-[1rem] xl:gap-[2rem] grid h-fit w-max'>
        <div className='w-[12rem] 2xl:w-[16rem] aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-md'></div>
        <div className='w-[12rem] 2xl:w-[16rem] aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-md'></div>
        <div className='w-[12rem] 2xl:w-[16rem] aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-md'></div>
        <div className='w-[12rem] 2xl:w-[16rem] aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-md'></div>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='w-[40rem] aspect-video rounded-lg bg-neutral-200 dark:bg-neutral-800'></div>
        <div className='w-40 h-[1.75rem] rounded-full bg-neutral-200 dark:bg-neutral-800'></div>
        <div className='w-full h-[1rem] rounded-full bg-neutral-200 dark:bg-neutral-800'></div>
        <div className='w-full h-[1rem] rounded-full bg-neutral-200 dark:bg-neutral-800'></div>
        <div className='w-full h-[1rem] rounded-full bg-neutral-200 dark:bg-neutral-800'></div>
      </div>
    </div>
  );
};
const Skeleton2 = () => {
  return (
    <div className='grid grid-cols-3 gap-[1rem] xl:gap-[3rem] animate-pulse'>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};
const CardSkeleton = () => {
  return (
    <div className='flex flex-col bg-transparent rounded-md items-start w-[20rem] xl:w-[24rem] h-fit animate-pulse'>
      <div className='aspect-video w-full object-cover rounded-md bg-neutral-200 dark:bg-neutral-800'></div>
      <div className='flex flex-col gap-2 p-3 w-full'>
        <p className='h-[1.75rem] w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded-full'></p>
        <p className='h-[1.5rem] w-full bg-neutral-200 dark:bg-neutral-800 rounded-full'></p>
        <p className='h-[1.5rem] w-full bg-neutral-200 dark:bg-neutral-800 rounded-full'></p>
      </div>
    </div>
  );
};
const Skeleton3 = () => {
  return (
    <div className='py-[3rem] grid grid-cols-2 gap-[2rem] bg-transparent animate-pulse'>
      <div className='w-full flex flex-col gap-[1rem]'>
        <div className='rounded-lg w-full h-fit aspect-video bg-neutral-200 dark:bg-neutral-800'></div>
        <div className='grid grid-cols-2 gap-3'>
          <div className='bg-neutral-200 dark:bg-neutral-800 w-4/5 h-[1.75rem] rounded-full'></div>
          <div className='bg-neutral-200 dark:bg-neutral-800 w-4/5 h-[1.75rem] rounded-full'></div>
          <div className='bg-neutral-200 dark:bg-neutral-800 w-4/5 h-[1.75rem] rounded-full'></div>
          <div className='bg-neutral-200 dark:bg-neutral-800 w-4/5 h-[1.75rem] rounded-full'></div>
          <div className='bg-neutral-200 dark:bg-neutral-800 w-4/5 h-[1.75rem] rounded-full'></div>
          <div className='bg-neutral-200 dark:bg-neutral-800 w-4/5 h-[1.75rem] rounded-full'></div>
        </div>
      </div>
      <div className='flex-grow flex flex-col gap-3 w-full'>
        <div className='bg-neutral-200 dark:bg-neutral-800 rounded-full w-1/2 h-[2.2rem]'></div>
        <div className='flex flex-col gap-2 w-full'>
          <div className='bg-neutral-200 dark:bg-neutral-800 w-full h-[1.5rem] rounded-full'></div>
          <div className='bg-neutral-200 dark:bg-neutral-800 w-full h-[1.5rem] rounded-full'></div>
          <div className='bg-neutral-200 dark:bg-neutral-800 w-full h-[1.5rem] rounded-full'></div>
        </div>
      </div>
    </div>
  );
};
const Skeleton4Item = () => {
  return (
    <div className='flex flex-row gap-3 bg-neutral-200 dark:bg-neutral-800 animate-pulse p-3 rounded-md'>
      <div className='rounded-md h-40 aspect-square bg-neutral-300 dark:bg-neutral-700'></div>
      <div className='flex flex-col gap-2 flex-grow'>
        <div className='bg-neutral-300 dark:bg-neutral-700 w-1/2 h-7 rounded-full'></div>
        <div className='bg-neutral-300 dark:bg-neutral-700 w-full rounded-full h-5'></div>
        <div className='bg-neutral-300 dark:bg-neutral-700 w-full rounded-full h-5'></div>
        <div className='bg-neutral-300 dark:bg-neutral-700 w-1/3 rounded-full h-5'></div>
      </div>
    </div>
  );
};
const Skeleton4 = () => {
  return (
    <>
      <Skeleton4Item />
      <Skeleton4Item />
      <Skeleton4Item />
      <Skeleton4Item />
      <Skeleton4Item />
      <Skeleton4Item />
      <Skeleton4Item />
    </>
  );
};
export { Skeleton1, Skeleton2, Skeleton3, CardSkeleton, Skeleton4, Skeleton4Item };

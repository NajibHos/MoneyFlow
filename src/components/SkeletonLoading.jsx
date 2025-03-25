import { Skeleton } from 'primereact/skeleton';

const SkeletonLoading = () => {

  return (
    <div className='h-[90vh] md:max-2xl:h-[85vh] w-full flex
     justify-center items-center'>
      <div className='h-[80%] w-[90%] md:max-2xl:w-[50%] flex flex-col
       justify-center items-start gap-8'>
         <Skeleton height='24px' width='100%' className="!bg-zinc-500">
         </Skeleton>
         <Skeleton height='24px' width='90%' className="!bg-zinc-500">
         </Skeleton>
         <Skeleton height='24px' width='80%' className="!bg-zinc-500">
         </Skeleton>
         <Skeleton height='3rem' width='100%' className="!bg-zinc-500">
         </Skeleton>
      </div>
    </div>
  )
}

export default SkeletonLoading;

const Skeleton = () => {
  return (
    <div className="h-[90vh] w-full flex justify-center items-center">
      <div className="h-full w-[90%] lg:max-2xl:w-[60%]
      flex flex-col justify-center items-center gap-6">
        <div className="skeleton h-6 w-full"></div>
        <div className="skeleton h-6 w-full"></div>
        <div className="skeleton h-6 w-full"></div>
      </div>
    </div>
  )
}

export default Skeleton
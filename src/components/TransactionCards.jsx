
const TransactionCards = ({ data, removeTransaction }) => {

  return (
    <div className="h-auto w-full p-6 flex flex-col justify-center items-center
      gap-4 rounded bg-card-light dark:bg-card-dark"
    >
      <div className="h-auto w-full flex justify-between items-center">
        <div className="h-auto w-[70%] text-left">
        <h2 className="text-lg font-descriptions font-medium
          truncate text-zinc-700 dark:text-zinc-200"
        >
          {data.name || 'Not Available'}
        </h2>
        </div>
        <div className="h-auto w-[20%] text-right">
          <div className="h-auto w-auto">
            <h2 className={`text-base font-descriptions font-medium
              ${data.type === 'Income' && 'text-green-600'} 
              ${data.type === 'Expense' && 'text-red-600'} 
              ${data.type === 'Savings' && 'text-blue-600'} 
              `}
            >
              {data.type || 'Note Available'}
            </h2>
          </div>
        </div>
      </div>
      <div className="h-auto w-full text-left">
        <h2 className={`text-base font-descriptions font-medium
          ${data.type === 'Income' && 'text-green-600'}
          ${data.type === 'Expense' && 'text-red-600'}
          ${data.type === 'Savings' && 'text-blue-600'}
          `}
        >
          {`${data.amount || 0} BDT`}
        </h2>
      </div>
      <div className="h-auto w-full flex justify-between items-center">
          <div className="h-auto w-auto">
            <h2 className="text-base text-zinc-200 font-descriptions font-medium">
              {data.date || 'Note Available'}
            </h2>
          </div>
          <div className="h-auto w-auto">
            <button 
              onClick={() => removeTransaction(data.$id)} 
              className="px-3 py-1 text-base font-descriptions font-medium 
              rounded cursor-pointer text-white bg-red-600"
            >
              Remove
            </button>
          </div>
      </div>
    </div>
  )
}

export default TransactionCards
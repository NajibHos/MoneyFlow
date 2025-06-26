import { Trash2 } from "lucide-react";

const TransactionCards = ({ data, removeTransaction }) => {

  return (
    <div className="h-[150px] w-full flex flex-col justify-center items-center
    gap-5 bg-zinc-950 p-6 border rounded border-zinc-900">
      <div className="h-auto w-full text-left">
        <h2 className="text-base text-zinc-200 font-descriptions font-medium">
          {data.name || 'Not Available'}
        </h2>
      </div>
      <div className="h-auto w-full flex justify-between items-center">
        <div className="h-auto w-auto">
          <h2 className={`text-base font-descriptions font-medium
           ${data.type === 'Expense' ? 'text-red-600' : data.type === 'Income' ?
           'text-green-600' : data.type === 'Savings' ? 'text-blue-600' : ''}  `}>
            {`${data.amount || '0000'} BDT`}
          </h2>
        </div>
        <div className="h-auto w-auto">
          <h2 className={`text-base font-descriptions font-medium
           ${data.type === 'Expense' ? 'text-red-600' : data.type === 'Income' ?
           'text-green-600' : data.type === 'Savings' ? 'text-blue-600' : ''}  `}>
            {data.type || 'Note Available'}
          </h2>
        </div>
      </div>
        <div className="h-auto w-full flex justify-between items-center">
          <div className="h-auto w-auto">
            <h2 className="text-base text-zinc-200 font-descriptions font-medium">
              {data.date || 'Note Available'}
            </h2>
          </div>
          <div className="h-auto w-auto">
            <button type="button" className="cursor-pointer"
            onClick={() => removeTransaction(data.$id)} >
              <Trash2 size={22} className="text-red-600" />
            </button>
          </div>
        </div>
    </div>
  )
}

export default TransactionCards
import { format } from "date-fns"
import { Trash } from "lucide-react"

const TransactionCards = ({ data, removeTransaction }) => {

  return (
    <div className="h-auto w-full p-6 flex flex-col justify-center items-center
      gap-4 rounded-lg bg-card-light dark:bg-card-dark"
    >
      <div className="h-auto w-full flex justify-between items-center">
        <div className="h-auto w-auto text-left">
        <h2 className="text-lg font-headings font-medium
          truncate text-zinc-700 dark:text-zinc-200"
        >
          {data.name || 'Not Available'}
        </h2>
        </div>
        <div className="h-auto w-auto text-right">
          <div className="h-auto w-auto">
            <div className={`badge badge-sm badge-soft font-descriptions font-medium
              ${data.type === 'Income' && 'badge-success'}
              ${data.type === 'Expense' && 'badge-error'}
              ${data.type === 'Savings' && 'badge-info'}
              `}
            >
              {data.type || 'Note Available'}
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full text-left">
        <h2 className={`text-2xl font-descriptions font-medium
          ${data.type === 'Income' && 'text-green-600'}
          ${data.type === 'Expense' && 'text-red-600'}
          ${data.type === 'Savings' && 'text-blue-600'}
          `}
        >
          {`${data.amount || 0} BDT`}
        </h2>
      </div>
      <div className="h-auto w-full mt-1 flex justify-between items-center">
          <div className="h-auto w-auto">
            <h2 className="text-sm font-descriptions font-medium
              text-zinc-700 dark:text-zinc-300"
            >
              {
                format(new Date(data.date), 'dd MMM yyyy') || 'Not Available'
              }
            </h2>
          </div>
          <div className="h-auto w-auto">
            <button
              onClick={() => removeTransaction(data.$id)}
              className="btn btn-sm btn-error rounded text-white"
            >
              <Trash size={18} />
              Remove
            </button>
          </div>
      </div>
    </div>
  )
}

export default TransactionCards
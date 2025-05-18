import { DatabaseID, databases, DBCollectionID } from "../appwrite/Appwrite";
import { Trash2 } from "lucide-react";

const TransactionCards = (props) => {

  const removeTransaction = async () => {

    try {
        await databases.deleteDocument(
        DatabaseID,
        DBCollectionID,
        props.data.$id //document ID
      )

      // fetching the transactions again
      props.fetchData();

    } catch (error) {
      console.error('Fetching error ' + error.message);
    }
  }

  return (
    <div className="h-auto w-full">
      <div className="h-auto w-full hidden md:max-2xl:block">
        <div className="h-[60px] w-full flex justify-between items-center
        border rounded border-zinc-800 px-5">
          <div className="h-auto w-[20%] text-left">
            <h2 className="font-medium font-descriptions text-zinc-200
            text-xl truncate">
              {props.data.name}
            </h2>
          </div>
          <div className="h-auto w-[20%] text-center ">
            <h2 className={`font-medium font-descriptions text-xl
              ${props.data.type === 'Income' ?
              'text-green-600' : props.data.type === 'Expense' ?
              'text-red-600' : props.data.type === 'Savings' ?
              'text-blue-600' : '' } `}>
              {props.data.type}
            </h2>
          </div>
          <div className="h-auto w-[20%] text-center">
            <h2 className="font-medium font-descriptions text-zinc-200
            text-xl">
              {props.data.date}
            </h2>
          </div>
          <div className="h-auto w-[20%] text-center">
            <h2 className={`font-medium font-descriptions text-xl
              ${props.data.type === 'Income' ?
              'text-green-600' : props.data.type === 'Expense' ?
              'text-red-600' : props.data.type === 'Savings' ?
              'text-blue-600' : '' } `}>
              {`${props.data.amount} BDT`}
            </h2>
          </div>
          <div className="h-auto w-[20%] text-right">
            <button type="button" className="px-4 py-2 bg-red-600
            text-base font-medium font-descriptions rounded
            text-zinc-100 cursor-pointer"
            onClick={removeTransaction} >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="h-auto w-full block md:max-2xl:hidden">
        <div className="h-[180px] w-full flex flex-col justify-center
        items-center gap-3 border border-zinc-700 rounded px-8">
          <div className="h-auto w-full text-left">
            <h2 className="font-medium font-descriptions text-zinc-200
            text-xl">
              {props.data.name}
            </h2>
          </div>
          <div className="h-auto w-full flex justify-between
           items-center">
            <div className="h-auto w-[25%] text-left">
              <h2 className={`font-medium font-descriptions text-xl
              ${props.data.type === 'Income' ?
              'text-green-600' : props.data.type === 'Expense' ?
              'text-red-600' : props.data.type === 'Savings' ?
              'text-blue-600' : '' } `}>
                {props.data.type}
              </h2>
            </div>
            <div className="h-auto w-[50%] text-right">
              <h2 className="font-medium font-descriptions text-zinc-200
              text-lg">
                {props.data.date}
              </h2>
            </div>

          </div>
          <div className="h-auto w-full flex justify-between
           items-center">
            <div className="h-auto w-[60%] text-left">
              <h2 className={`font-medium font-descriptions text-xl
              ${props.data.type === 'Income' ?
              'text-green-600' : props.data.type === 'Expense' ?
              'text-red-600' : props.data.type === 'Savings' ?
              'text-blue-600' : '' } truncate`}>
                {`${props.data.amount} BDT`}
              </h2>
            </div>
            <div className="h-auto w-[20%] text-right">
              <button type="button" className="px-4 py-2 bg-red-600
              text-base font-medium font-descriptions rounded
             text-zinc-100 cursor-pointer" onClick={removeTransaction} >
              <Trash2 />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionCards
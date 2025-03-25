import { database, DBCollection, projectDBID } from "../appwrite/appwrite";

const TransactionCards = ({data, getTransactions}) => {
  // console.log(data);

  // using shorthand keywords for better readabiity
  const type = data.type;
  const I = 'Income';
  const E = 'Expense';
  const S = 'Savings';

  const removeDoc = async (docID) => {
    try {
      await database.deleteDocument(
        projectDBID,
        DBCollection,
        docID
      )

      getTransactions();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-[180px] w-full md:max-2xl:w-[30%]
     flex flex-col justify-center items-start gap-4
     border-2 border-zinc-500 rounded-lg p-6" id='hello'>

          <div className="h-auto w-auto text-left">
            <h2 className="text-white font-semibold text-xl">
             {data.title}
            </h2>
          </div>

          <div className="h-auto w-full flex justify-between
          items-center">
            <div className="h-auto w-auto">
            <h2 className={` font-semibold text-base underline
        ${type === I ? 'text-green-600' : type === E ? 'text-red-600' :
             type === S ? 'text-blue-600' : ''} `}>
             {data.type}
            </h2>
            </div>
            <div className="h-auto w-auto">
            <h2 className="text-white font-semibold text-base">
             |
            </h2>
            </div>
          <div className="h-auto w-auto">
            <h2 className="text-white font-semibold text-base truncate">
             {data.category}
            </h2>
          </div>
          <div className="h-auto w-auto">
            <h2 className="text-white font-semibold text-base">
             |
            </h2>
          </div>
          <div className="h-auto w-auto">
            <h2 className="text-white font-semibold text-base">
             {data.date}
            </h2>
          </div>
          </div>

          <div className="h-auto w-full flex justify-between items-center">
            <div className="h-auto w-auto">
              <h2 className={`font-semibold text-xl font-display
        ${type === I ? 'text-green-600' : type === E ? 'text-red-600' :
                type === S ? 'text-blue-600' : ''}  `}>

    {`${type === I ? '+' : type === E ? '-' : type === S ? '+' : ''}
            ${data.amount} BDT`}
              </h2>
            </div>
            <div className="h-auto w-auto">
              <button className="px-4 py-2 rounded text-white bg-red-600
                text-sm md:max-2xl:text-base font-semibold cursor-pointer"
                onClick={() => removeDoc(data.$id)}>
                 Remove
              </button>
            </div>
          </div>
        </div>

  )
}

export default TransactionCards
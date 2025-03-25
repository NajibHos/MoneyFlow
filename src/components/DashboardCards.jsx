import { useNavigate } from "react-router-dom";

const DashboardCards = ({data}) => {

  // using shorthand keywords for better readabiity
  const type = data.type;
  const I = 'Income';
  const E = 'Expense';
  const S = 'Savings';

  const navigate = useNavigate();

  return (
    <div className="h-[240px] w-full md:max-lg:w-[40%]
     lg:max-2xl:w-[30%] flex flex-col
     justify-center items-start gap-6 p-10 border-2 border-zinc-500
     rounded-2xl">

      <div className="w-full text-left">
        <h2 className="text-xl text-zinc-300 font-semibold
        font-poppins">
          {data.title}
        </h2>
      </div>

        <div className="w-full text-left">
          {/* <h2 className={`text-2xl font-semibold font-poppins
      ${type === I ? 'text-green-600' : type === E ? 'text-red-600' :
            type === S ? 'text-blue-600' : ''} `}>

        {`${type === I | S ? '+' : type === E ? '-' : ''} ${data.amount}`}
        </h2> */}
        <h2 className={`font-semibold text-2xl font-display
        ${type === I ? 'text-green-600' : type === E ? 'text-red-600' :
        type === S ? 'text-blue-600' : ''} `}>

    {`${type === I ? '+' : type === E ? '-' : type === S ? '+' : ''}
  ${data.amount} BDT`}
        </h2>
        </div>

        <div className="h-auto w-full flex justify-start items-center
          gap-8 mt-2">
          <div className="h-auto w-auto">
            <button className={`px-4 py-2 rounded
            text-white font-semibold text-base cursor-pointer
            ${type === I ? 'bg-green-600' : type === E ? 'bg-red-600' :
            type === S ? 'bg-blue-600' : ''} `}
             onClick={() => navigate(data.addButtonPath)}
             >
              {data.addButtonText}
            </button>
          </div>
          <div className="h-auto w-auto">
            <button className="px-4 py-2 rounded bg-zinc-200
             text-zinc-950 font-semibold text-base
             cursor-pointer"
             onClick={() => navigate(
              data.historyButtonPath,
              {state: {transactionData: data.historyButtonStateValue}}
              )}
             >
              {data.historyButtonText}
            </button>
          </div>
        </div>


      </div>
  )
}

export default DashboardCards
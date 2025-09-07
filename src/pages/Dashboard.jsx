import { useEffect, useState } from "react";
import { DatabaseID, databases, DBCollectionID } from "../appwrite/Appwrite";
import { useAuth } from "../utils/AuthProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const [transactions, setTransactions] = useState([]);
  const { user, userName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getTransactions();
  }, [user])

  //transaction amount and type for tracking total transactions amount
  const funds = [
    {
      type: 'Income',
      amount: 0
    },
    {
      type: 'Expense',
      amount: 0
    },
    {
      type: 'Savings',
      amount: 0
    },
  ]

  //fetching transaction data
  const getTransactions = async () => {
    try {
      const data = await databases.listDocuments(
        DatabaseID,
        DBCollectionID
      )

      setTransactions(data.documents);

    } catch (error) {
      console.error("Fetching error " + error.message);
    }
  }

  //re-assigning transaction amount variables
  transactions.forEach(( value ) => {

    switch (value.type) {
      case 'Income' :
        funds[0].amount += value.amount; //Income
        break;
      case 'Expense' :
        funds[1].amount += value.amount; //Expense
        break;
      case 'Savings' :
        funds[2].amount += value.amount; //Savings
        break;

      default:
        ''
        break;
    }

  });

  // available balance
  let balance = funds[0].amount - (funds[1].amount + funds[2].amount);

  return (
    <div className="h-auto w-full py-12 lg:h-[90vh] lg:py-0 flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center
        items-center gap-16 lg:gap-14"
      >
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl font-descriptions font-medium 
            text-zinc-800 dark:text-zinc-200"
          >
            Dashboard
          </h2>
        </div>
        <div className="h-auto w-full flex flex-col justify-center
          items-center gap-2"
        >
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-descriptions font-medium
              text-zinc-700 dark:text-zinc-300"
            >
              Welcome <span 
                className="text-zinc-900 dark:text-white"
                >
                  {userName || null}
                </span>
            </h2>
          </div>
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-descriptions font-medium
              text-zinc-700 dark:text-zinc-300"
            >
              Have a good day!
            </h2>
          </div>
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-descriptions font-medium
              text-zinc-700 dark:text-zinc-300"
            >
              Your remaining balance is: 
              <span className="text-lg ml-1 text-green-600">
                {`${balance || 0} BDT`}
              </span>
            </h2>
          </div>
        </div>
        <div className="h-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="h-auto w-full p-6 flex flex-col justify-center items-center gap-5
            rounded bg-card-light dark:bg-card-dark"
          >
            <div className="h-auto w-full text-left">
              <h2 className="text-base font-descriptions font-medium
                text-zinc-700 dark:text-zinc-300"
              >
                Total Income
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-xl font-descriptions font-medium
                text-green-600 dark:text-white"
              >
                {`+ ${funds[0].amount || 0} BDT`}
              </h2>
            </div>
            <div className="h-auto w-full flex justify-start items-center gap-5">
              <div className="h-auto w-auto">
                <button
                  onClick={() => navigate('/add-income')}
                  className="px-3 py-1 text-base font-descriptions font-medium
                  rounded cursor-pointer text-white bg-green-700"
                >
                  Add Income
                </button>
              </div>
              <div className="h-auto w-auto">
                <button
                  onClick={() => {
                    navigate(
                      '/transaction-history',
                      {state: {dataType: 'Income'}}
                    )
                  }}
                  className="px-3 py-1 text-base font-descriptions font-medium
                  rounded cursor-pointer text-white bg-stone-600"
                >
                  History
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto w-full p-6 flex flex-col justify-center items-center gap-5
            rounded bg-card-light dark:bg-card-dark"
          >
            <div className="h-auto w-full text-left">
              <h2 className="text-base font-descriptions font-medium
                text-zinc-700 dark:text-zinc-300"
              >
                Total Expense
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-xl font-descriptions font-medium
                text-red-600 dark:text-white"
              >
                {`- ${funds[1].amount || 0} BDT`}
              </h2>
            </div>
            <div className="h-auto w-full flex justify-start items-center gap-5">
              <div className="h-auto w-auto">
                <button
                  onClick={() => navigate('/add-expense')}
                  className="px-3 py-1 text-base font-descriptions font-medium
                  rounded cursor-pointer text-white bg-red-700"
                >
                  Add Expense
                </button>
              </div>
              <div className="h-auto w-auto">
                <button
                  onClick={() => {
                    navigate(
                      '/transaction-history',
                      {state: {dataType: 'Expense'}}
                    )
                  }}
                  className="px-3 py-1 text-base font-descriptions font-medium
                  rounded cursor-pointer text-white bg-stone-600"
                >
                  History
                </button>
              </div>
            </div>
          </div>
          <div className="h-auto w-full p-6 flex flex-col justify-center items-center gap-5
            rounded bg-card-light dark:bg-card-dark"
          >
            <div className="h-auto w-full text-left">
              <h2 className="text-base font-descriptions font-medium
                text-zinc-700 dark:text-zinc-300"
              >
                Total Savings
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-xl font-descriptions font-medium
                text-blue-600 dark:text-white"
              >
                {`+ ${funds[2].amount || 0} BDT`}
              </h2>
            </div>
            <div className="h-auto w-full flex justify-start items-center gap-5">
              <div className="h-auto w-auto">
                <button
                  onClick={() => navigate('/add-savings')}
                  className="px-3 py-1 text-base font-descriptions font-medium
                  rounded cursor-pointer text-white bg-blue-700"
                >
                  Add Savings
                </button>
              </div>
              <div className="h-auto w-auto">
                <button
                  onClick={() => {
                    navigate(
                      '/transaction-history',
                      {state: {dataType: 'Savings'}}
                    )
                  }}
                  className="px-3 py-1 text-base font-descriptions font-medium
                  rounded cursor-pointer text-white bg-stone-600"
                >
                  History
                </button>
              </div>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Dashboard
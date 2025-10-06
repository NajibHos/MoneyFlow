import { useEffect, useRef, useState } from "react";
import { DatabaseID, databases, DBCollectionID } from "../appwrite/Appwrite";
import { useAuth } from "../utils/AuthProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const { user, userName } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  // transaction amount references
  const income = useRef(0);
  const expense = useRef(0);
  const savings = useRef(0);
  const balance = useRef(0);

  useEffect(() => {
    getTransactions();
  }, [user])

  // fetch transaction data
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

  // calculate total amounts
  income.current = transactions
    .filter((item) => item.type === 'Income')
    .reduce((acc, item) => acc + item.amount, 0);

  expense.current = transactions
    .filter((item) => item.type === 'Expense')
    .reduce((acc, item) => acc + item.amount, 0);

  savings.current = transactions
    .filter((item) => item.type === 'Savings')
    .reduce((acc, item) => acc + item.amount, 0);

  // available balance calculation
  balance.current = income.current - (expense.current + savings.current);
  let availableBalance = balance.current;

  return (
    <div className="h-auto w-full py-12 lg:h-[90vh] lg:py-0 flex
      justify-center items-center"
    >
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
                {`${availableBalance || 0} BDT`}
              </span>
            </h2>
          </div>
        </div>
        <div className="h-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="h-auto w-full p-6 flex flex-col justify-center
            items-center gap-5 rounded bg-card-light dark:bg-card-dark"
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
                {`+ ${income.current || 0} BDT`}
              </h2>
            </div>
            <div className="h-auto w-full flex justify-start items-center
              gap-5"
            >
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
          <div className="h-auto w-full p-6 flex flex-col justify-center
            items-center gap-5 rounded bg-card-light dark:bg-card-dark"
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
                {`- ${expense.current || 0} BDT`}
              </h2>
            </div>
            <div className="h-auto w-full flex justify-start items-center
              gap-5"
            >
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
          <div className="h-auto w-full p-6 flex flex-col justify-center
            items-center gap-5 rounded bg-card-light dark:bg-card-dark"
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
                {`+ ${savings.current || 0} BDT`}
              </h2>
            </div>
            <div className="h-auto w-full flex justify-start items-center
              gap-5"
            >
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
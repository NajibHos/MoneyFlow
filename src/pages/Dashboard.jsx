import { useAuth } from "../utils/AuthProvider";
import { database, DBCollection, projectDBID } from "../appwrite/appwrite";
import { useEffect, useState } from "react";
import DashboardCards from "../components/DashboardCards";
import SkeletonLoading from "../components/SkeletonLoading";

const Dashboard = () => {

  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userName } = useAuth();

  // fetching transaction data
  const getTransactions = async () => {

    setLoading(true);

    try {
      const docs = await database.listDocuments(
        projectDBID,
        DBCollection
      )

      setTransactionData(docs.documents);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);

  }

  useEffect(() => {

    getTransactions();

  }, [])

  const transactionCardsData = [
    {
      title: 'Total Income',
      amount: 0,
      type: 'Income',
      addButtonText: 'Add Income',
      addButtonPath: '/add-income',
      historyButtonText: 'History',
      historyButtonPath: '/transaction-history',
      historyButtonStateValue: 'Income'
    },
    {
      title: 'Total Expense',
      amount: 0,
      type: 'Expense',
      addButtonText: 'Add Expense',
      addButtonPath: '/add-expenses',
      historyButtonText: 'History',
      historyButtonPath: '/transaction-history',
      historyButtonStateValue: 'Expense'
    },
    {
      title: 'Total Savings',
      amount: 0,
      type: 'Savings',
      addButtonText: 'Add Savings',
      addButtonPath: '/add-savings',
      historyButtonText: 'History',
      historyButtonPath: '/transaction-history',
      historyButtonStateValue: 'Savings'
    }

  ]

  // re-assigning Transaction variables
  transactionData.forEach((v) => {

    switch (v.type) {
      case 'Income':
        transactionCardsData[0].amount += v.amount
        break;
      case 'Expense':
        transactionCardsData[1].amount += v.amount;
        break;
      case 'Savings':
        transactionCardsData[2].amount += v.amount;
        break;

      default:
        console.log('hello < 3');
        break;
    }

  })

  if (loading) {
    return <SkeletonLoading/>
  }

  return (
    <div className="h-[120vh] md:max-2xl:h-[85vh] w-full
     flex justify-center items-center">
      <div className="h-full md:max-2xl:h-[80%] w-[90%]
       flex flex-col justify-center md:max-2xl:justify-start
       items-start gap-16">

          <div className="h-auto w-auto text-left">
            <h2 className="text-xl text-white font-semibold">
              Welcome {userName}
            </h2>
          </div>
          {/* <div className="h-auto w-[40%] flex justify-between
           items-center">
            <div className="h-auto w-auto">
              <button className="px-4 py-2 rounded bg-green-600
              text-white font-semibold text-lg
               cursor-pointer">Add Income</button>
            </div>
            <div className="h-auto w-auto">
              <button className="px-4 py-2 rounded bg-red-600
              text-white font-semibold text-lg
              cursor-pointer">Add Expenses</button>
            </div>
            <div className="h-auto w-auto">
              <button className="px-4 py-2 rounded bg-blue-600
              text-white font-semibold text-lg
              cursor-pointer">Add Savings</button>
            </div>
          </div> */}

        <div className="h-auto w-full flex flex-col md:max-2xl:flex-row
         flex-wrap justify-center md:max-2xl:justify-between items-center
         gap-10 md:max-2xl:gap-0">
          {
            transactionCardsData.map((v, i) => {
              return <DashboardCards data={v} key={i} />
            })
          }
          {/* <DashboardCards /> */}
        </div>
       </div>
    </div>
  )
}

export default Dashboard
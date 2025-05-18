import { useEffect, useState } from "react";
import { DatabaseID, databases, DBCollectionID } from "../appwrite/Appwrite";
import { useAuth } from "../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";

const Dashboard = () => {

  const [ loading, setLoading ] = useState(false);
  const [ transactions, setTransactions ] = useState([]);
  const { userName } = useAuth();
  const navigate = useNavigate();

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

    setLoading(true);

    try {
      const data = await databases.listDocuments(
        DatabaseID,
        DBCollectionID
      )

      setTransactions(data.documents);

    } catch (error) {
      console.error("Fetching error " + error.message);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {

    getTransactions();

  }, [])

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

  //available balance
  let balance = funds[0].amount - (funds[1].amount + funds[2].amount);


  if (loading) {
    return <Skeleton />
  }


  return (
    <div className="h-[140vh] lg:max-2lg:h-[120vh]
      2lg:max-2xl:h-[90vh] w-full flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center
       items-center gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-xl font-medium font-descriptions
          text-white">
            Dashboard
          </h2>
        </div>
        <div className="h-auto w-full flex flex-col justify-center
          items-center gap-2">
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-medium font-descriptions
              text-zinc-400">
              Welcome <span className="text-zinc-200">{userName}</span>
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-medium font-descriptions
              text-zinc-400">
              Have a good day!
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-medium font-descriptions
              text-zinc-400">
              Your remaining balance is <span className="text-green-600
              text-xl">
                { `${balance} BDT` }
              </span>
              </h2>
            </div>
        </div>
        <div className="h-auto w-full flex flex-col lg:max-2xl:flex-row
        justify-center md:max-2xl:justify-between items-center
        lg:max-2lg:flex-wrap gap-12 2lg:max-2xl:gap-0">
          <div className="h-[220px] w-full
          md:max-lg:w-[60%] lg:max-2lg:w-[40%] 2lg:max-2xl:w-[30%]
          flex flex-col justify-start
          items-center gap-8 border border-zinc-700 rounded-xl">
            <div className="h-[50px] w-full bg-zinc-900 rounded-tl-xl
            rounded-tr-xl px-8 flex justify-start items-center">
              <h2 className="text-lg font-medium font-descriptions
              text-white">
                Total Income
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-2xl font-medium font-descriptions
              text-green-600">
                + {funds[0].amount} BDT
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center gap-8">
              <div className="h-auto w-auto">
                <button type="button" className="px-4 py-2 bg-green-600
                text-base font-medium font-descriptions rounded
                text-zinc-200 cursor-pointer"
                onClick={() => {
                  navigate('/add-income')
                }}
                >
                  Add Income
                </button>
              </div>
              <div className="h-auto w-auto">
                <button type="button" className="px-4 py-2 bg-zinc-200
                text-base font-medium font-descriptions rounded
                text-zinc-900 cursor-pointer"
                onClick={() => {
                  navigate(
                    '/transaction-history',
                    {state: {dataType: 'Income'}}
                  )
                }}
                >
                  History
                </button>
              </div>
            </div>
          </div>
          <div className="h-[220px] w-full
          md:max-lg:w-[60%] lg:max-2lg:w-[40%] 2lg:max-2xl:w-[30%]
          flex flex-col justify-start
          items-center gap-8 border border-zinc-700 rounded-xl">
            <div className="h-[50px] w-full bg-zinc-900 rounded-tl-xl
            rounded-tr-xl px-8 flex justify-start items-center">
              <h2 className="text-lg font-medium font-descriptions
              text-white">
                Total Expense
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-2xl font-medium font-descriptions
              text-red-600">
                - {funds[1].amount} BDT
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex
             justify-start items-center gap-8">
              <div className="h-auto w-auto ">
                <button type="button" className="px-4 py-2 bg-red-600
                text-base font-medium font-descriptions rounded
                text-zinc-200 cursor-pointer"
                onClick={() => {
                  navigate('/add-expense')
                }}>
                  Add Expense
                </button>
              </div>
              <div className="h-auto w-auto">
                <button type="button" className="px-4 py-2 bg-zinc-200
                text-base font-medium font-descriptions rounded
                text-zinc-900 cursor-pointer"
                onClick={() => {
                  navigate(
                    '/transaction-history',
                    {state: {dataType: 'Expense'}}
                  )
                }}
                >
                  History
                </button>
              </div>
            </div>
          </div>
          <div className="h-[220px] w-full
          md:max-lg:w-[60%] lg:max-2lg:w-[40%] 2lg:max-2xl:w-[30%]
          flex flex-col justify-start
          items-center gap-8 border border-zinc-700 rounded-xl">
            <div className="h-[50px] w-full bg-zinc-900 rounded-tl-xl
            rounded-tr-xl px-8 flex justify-start items-center">
              <h2 className="text-lg font-medium font-descriptions
              text-white">
                Total Savings
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-2xl font-medium font-descriptions
              text-blue-600">
                + {funds[2].amount} BDT
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center gap-8">
              <div className="h-auto w-auto">
                <button type="button" className="px-4 py-2 bg-blue-600
                text-base font-medium font-descriptions rounded
                text-zinc-200 cursor-pointer"
                onClick={() => {
                  navigate('/add-savings')
                }}>
                  Add Savings
                </button>
              </div>
              <div className="h-auto w-auto">
                <button type="button" className="px-4 py-2 bg-zinc-200
                text-base font-medium font-descriptions rounded
                text-zinc-900 cursor-pointer"
                onClick={() => {
                  navigate(
                    '/transaction-history',
                    {state: {dataType: 'Savings'}}
                  )
                }}
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
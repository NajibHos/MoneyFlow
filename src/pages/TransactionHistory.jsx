import { useEffect, useState } from "react";
import TransactionCards from "../components/TransactionCards"
import { DatabaseID, databases, DBCollectionID } from "../appwrite/Appwrite";
import { Query } from "appwrite";
import { useLocation } from "react-router-dom";
import Skeleton from "../components/Skeleton";

const TransactionHistory = () => {

  const location = useLocation();
  const { dataType } = location.state || {}; // Query for fetching data
  const [ transactions, setTransactions ] = useState([]);

  useEffect(() => {
    getTransactions();
  }, [])

  //fetching transaction data
  const getTransactions = async () => {

    try {
      const data = await databases.listDocuments(
        DatabaseID,
        DBCollectionID,
        [
          Query.equal('type', dataType)
        ]
      )

      setTransactions(data.documents);

    } catch (error) {
      console.error('Fetching error ' + error.message);
    }

  }

  const removeTransaction = async (docID) => {
    try {
        await databases.deleteDocument(
        DatabaseID,
        DBCollectionID,
        docID
      )

      // fetching the transactions again
      getTransactions();

    } catch (error) {
      console.error('Error removing transaction: ' + error.message);
    }
  }

  return (
    <div className="h-[90vh] w-full py-12 flex justify-center items-start">
      <div className="h-auto w-[90%] flex flex-col justify-center items-center gap-16 lg:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl font-descriptions font-medium 
            text-zinc-800 dark:text-zinc-200"
          >
            Transactions History
          </h2>
        </div>
        {
          // fallback UI
          transactions?.length === 0 && <div 
            className="h-auto w-full py-12 flex justify-center items-center"
          >
            <div className="h-auto w-full text-center">
              <h2 className="text-lg font-descriptions font-medium text-red-600">
                Please add transaction to continue
              </h2>
            </div>
          </div>
        }
        {/* {
          // loading UI
          loading && <div 
            className="h-auto w-full py-12 flex justify-center items-center"
          >
            <div className="h-auto w-full text-center">
              <h2 className="text-lg font-descriptions font-medium
                text-zinc-800 dark:text-zinc-200"
              >
                Fetching data..
              </h2>
            </div>
          </div>
        } */}
        <div className="h-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            transactions.map((data, i) => {
              return <TransactionCards
                key={i} 
                data={data}
                removeTransaction={removeTransaction}
              />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory
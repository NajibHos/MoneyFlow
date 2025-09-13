import { useEffect, useState } from "react";
import TransactionCards from "../components/TransactionCards"
import { DatabaseID, databases, DBCollectionID } from "../appwrite/Appwrite";
import { Query } from "appwrite";
import { useLocation } from "react-router-dom";

const TransactionHistory = () => {

  // loading state
  const [loading, setLoading] = useState(false);

  // get query from useLocation hook
  const location = useLocation();
  const { dataType } = location.state || {}; // Query for fetching data
  const [ transactions, setTransactions ] = useState(null);

  useEffect(() => {
    getTransactions();
  }, [])

  //fetching transaction data
  const getTransactions = async () => {
    setLoading(true);

    try {
      const data = await databases.listDocuments(
        DatabaseID,
        DBCollectionID,
        [
          Query.equal('type', dataType), // filter data based on type
          Query.orderDesc('$createdAt') // fetch the latest transaction first
        ]
      )

      setTransactions(data.documents); // set the transaction data

    } catch (error) {
      console.error('Error fething transactions: ' + error.message);
    } finally {
      setLoading(false);
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
      <div className="h-auto w-[90%] flex flex-col justify-center items-center
        gap-16 lg:gap-12"
      >
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl font-headings font-medium
            text-zinc-800 dark:text-zinc-200"
          >
            Transactions History
          </h2>
        </div>
        {
          // fallback UI
          transactions?.length === 0 && <>
            <div
              className="h-auto w-full py-12 flex justify-center items-center"
            >
              <div className="h-auto w-full text-center">
                <h2 className="text-lg font-headings font-medium text-red-600">
                  Please add transaction to continue
                </h2>
              </div>
            </div>
          </>
        }
        {
          // loading UI
          loading && <>
            <div
              className="h-auto w-full py-8 flex justify-center items-center"
            >
              <span className="loading loading-dots loading-xl bg-zinc-900
                dark:bg-white"></span>
            </div>
          </>
        }
        {
          // transaction cards
          transactions?.length > 0 && !loading && <>
            <div className="h-auto w-full grid grid-cols-1 md:grid-cols-2
              lg:grid-cols-3  gap-8"
            >
              {
                transactions?.map((data, i) => {
                  return <TransactionCards
                    key={i}
                    data={data}
                    removeTransaction={removeTransaction}
                  />
                })
              }
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default TransactionHistory
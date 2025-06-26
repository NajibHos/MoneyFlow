import { useEffect, useState } from "react";
import TransactionCards from "../components/TransactionCards"
import { DatabaseID, databases, DBCollectionID } from "../appwrite/Appwrite";
import { Query } from "appwrite";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "../components/Skeleton";

const TransactionHistory = () => {

  const [ loading, setLoading ] = useState(false);
  const location = useLocation();
  const { dataType } = location.state || {}; // Query for fetching data
  const [ transactions, setTransactions ] = useState([]);

  //fetching transaction data
  const getTransactions = async () => {

    setLoading(true);

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

  useEffect(() => {
    getTransactions();
  }, [])

  if (loading) {
    return <Skeleton />
  }

  return (
    <div className="h-auto py-12 lg:h-[90vh] lg:py-0 w-full flex justify-center
     items-center">
      <div className="h-[80%] w-[90%] flex flex-col justify-start
      items-center gap-16 lg:gap-16">
        <div className="h-auto w-full flex flex-col justify-center
        items-center gap-4">
          <div className="h-auto w-full text-center">
            <h2 className="font-medium font-descriptions text-zinc-200
              text-xl">
              Transaction History
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <Link to='/dashboard'>
            <h2 className="font-medium font-descriptions text-zinc-200
              text-base underline cursor-pointer">
              Dashboard
            </h2>
            </Link>
          </div>
        </div>
        <div className="h-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
        gap-8">
          {
            transactions.map((value, index) => {
              return <TransactionCards
              data={value} key={index} removeTransaction={removeTransaction} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory
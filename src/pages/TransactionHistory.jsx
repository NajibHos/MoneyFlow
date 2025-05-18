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

  useEffect(() => {

    getTransactions();

  }, [])

  if (loading) {
    return <Skeleton />
  }

  return (
    <div className="h-[90vh] w-full flex justify-center items-center">
      <div className="h-[80%] w-[90%] flex flex-col justify-start
      items-center gap-12">
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
        <div className="h-auto max-h-[600px] w-full flex flex-col
         justify-start items-center gap-6 overflow-auto">
          {
            transactions.map((value, index) => {
              return <TransactionCards
              data={value} key={index} fetchData={getTransactions} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { database, DBCollection, projectDBID } from "../appwrite/appwrite";
import { Query } from "appwrite";
import TransactionCards from "../components/TransactionCards";
import SkeletonLoading from "../components/SkeletonLoading";

const TransactionHistory = () => {

  const location = useLocation();
  const { transactionData } = location.state || {}; // data filter
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetching transaction data
  const getTransactions = async () => {

    setLoading(true);

    try {
      const docs = await database.listDocuments(
        projectDBID,
        DBCollection,
        [
          Query.equal('type', transactionData)
        ]
      )

      setTransactions(docs.documents);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);

  }

  useEffect(() => {

    getTransactions();

  }, [])

  // pagination logic

  const [page, setPage] = useState(1);
  // mobile and tab devices
  const totalPagesforSM = Math.ceil(transactions.length / 3);
  // desktop and laptop devices
  const totalPagesforLG = Math.ceil(transactions.length / 6);

  const selectPageRenderSM = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPagesforSM &&
       selectedPage !== page) {
      setPage(selectedPage);
    } else {
      console.log('How are you today?');

    }
  };

  const selectPageRenderLG = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPagesforLG &&
       selectedPage !== page) {
      setPage(selectedPage);
    } else {
      console.log('How are you today?');

    }
  };

  if (loading) {
    return <SkeletonLoading />
  }

  return (
    <div className={`
${transactions.length > 3 ? 'lg:max-2xl:h-[105vh]' : 'lg:max-2xl:h-[85vh]'}
       h-[105vh] w-full flex justify-center items-center`}>

      <div className="h-[80%] w-[90%] flex flex-col justify-center
      items-center gap-12">

        {/* <div className={`h-auto w-full flex flex-col justify-center
        items-center gap-12`}> */}

        <div className='h-auto w-full flex flex-col
         justify-center items-center gap-6'>
          <div className='h-auto w-auto text-center'>
            <h2 className='text-2xl text-white font-semibold
            font-display'>
              Transaction History
            </h2>
          </div>
          <div className="h-auto w-auto">
            <h2 className='text-base text-white font-semibold underline
            cursor-pointer font-display'
            onClick={() => {
              navigate('/dashboard')
            }}>
              Go back to Home
            </h2>
          </div>
        </div>
        {/* </div> */}

        <div className="h-auto w-full block lg:max-2xl:hidden">
        <div className="h-auto w-full
          flex flex-col md:max-2xl:flex-row
          flex-wrap justify-start items-center gap-10">
          {
            transactions.slice((page - 1) * 3, page * 3).map((v, i) => {
              return <TransactionCards data={v}
               getTransactions={getTransactions}
               key={i} />
            })
          }
        </div>
        </div>
        <div className="h-auto w-full hidden lg:max-2xl:block">
        <div className="h-auto w-full
          flex flex-col md:max-2xl:flex-row
          flex-wrap justify-start items-center gap-10">
          {
            transactions.slice((page - 1) * 6, page * 6).map((v, i) => {
              return <TransactionCards data={v}
               getTransactions={getTransactions}
               key={i} />
            })
          }
        </div>
        </div>

        {/* pagination for small and mid screens */}
        {totalPagesforSM > 1 && (
        <div className="w-full flex justify-center items-center gap-4
         sm:max-2xl:gap-8">
          <button
            className="bg-white text-zinc-900 rounded px-4 py-2
            cursor-pointer"
            onClick={() => selectPageRenderSM(page - 1)}>
            <i className="pi pi-arrow-left" style={{ fontSize: '1rem' }}>
            </i>
          </button>

          {[...Array(totalPagesforSM)].map((_, i) => (

            <button key={i}
               className={`bg-white text-zinc-900 rounded px-4 py-2
              cursor-pointer font-semibold font-display
               ${page === i + 1 ? 'selected' : ''} `}
              onClick={() => selectPageRenderSM(i + 1)}>
              {(i + 1).toString()}
            </button>

          ))}

          <button
            className="bg-white text-zinc-900 rounded px-4 py-2
            cursor-pointer"
            onClick={() => selectPageRenderSM(page + 1)}>
           <i className="pi pi-arrow-right" style={{ fontSize: '1rem' }}>
            </i>
          </button>
        </div>
        )}

        {/* pagination for big screens */}
        {totalPagesforLG > 1 && (
        <div className="w-full flex justify-center items-center gap-4
         sm:max-2xl:gap-8">
          <button
            className="bg-white text-zinc-900 rounded px-4 py-2
            cursor-pointer"
            onClick={() => selectPageRenderLG(page - 1)}>
            <i className="pi pi-arrow-left" style={{ fontSize: '1rem' }}>
            </i>
          </button>

          {[...Array(totalPagesforLG)].map((_, i) => (

            <button key={i}
               className={`bg-white text-zinc-900 rounded px-4 py-2
              cursor-pointer font-semibold font-display
               ${page === i + 1 ? 'selected' : ''} `}
              onClick={() => selectPageRenderLG(i + 1)}>
              {(i + 1).toString()}
            </button>

          ))}

          <button
            className="bg-white text-zinc-900 rounded px-4 py-2
            cursor-pointer"
            onClick={() => selectPageRenderSM(page + 1)}>
           <i className="pi pi-arrow-right" style={{ fontSize: '1rem' }}>
            </i>
          </button>
        </div>
        )}

      </div>
    </div>
  )
}

export default TransactionHistory
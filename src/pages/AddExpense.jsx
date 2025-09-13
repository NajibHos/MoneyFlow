import { useState } from "react";
import { DatabaseID, databases, DBCollectionID } from "../appwrite/Appwrite";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const AddExpense = () => {

  // status state variable for managing toast state
  const [status, setStatus] = useState('');
  const toastDataSuccess = {
    title: 'Transaction added Successfully',
    bg: 'bg-green-600'
  }
  const toastDataFailed = {
    title: 'Failed to add Transaction',
    bg: 'bg-red-600'
  }

  // init naigation
  const navigate = useNavigate();

  // form action
  async function formAction(formData) {
    const transaction_name = formData.get('name');
    //converting transaction amount to integer
    const transaction_amount = parseInt(formData.get('amount'), 10);
    const transaction_date = formData.get('date');
    const transaction_type = 'Expense';

    try {
      await databases.createDocument(
        DatabaseID,
        DBCollectionID,
        ID.unique(),
        {
          name: transaction_name,
          amount: transaction_amount,
          type: transaction_type,
          date: transaction_date
        }
      )

      //trigger success toast
      setStatus('Success');

      //reset success toast to disable after 3 secs
      setTimeout(() => {
        setStatus('');
      }, 3000);

    } catch (error) {
      //print the error
      console.error('Submission error ' + error.message);

      //trigger failed toast
      setStatus('Failed');

      //reset failed toast to disable after 3 secs
      setTimeout(() => {
        setStatus('');
      }, 3000);

    }
  }

  return (
    <div className="h-auto w-full py-12 flex justify-center items-center">
      <div className="h-auto w-[90%] flex flex-col justify-center
        items-center gap-16 lg:gap-14"
      >
        {
          status === 'Success'
          ? <Toast data={toastDataSuccess} />
          : status === 'Failed'
          ? <Toast data={toastDataFailed}/> : ''
        }
        <div className="h-auto w-full flex flex-col justify-center
          items-center gap-4"
        >
          <div className="h-auto w-full text-center">
            <h2 className="text-2xl font-headings font-medium
              text-zinc-800 dark:text-zinc-200"
            >
              Add Expense
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <h2 className="text-base font-descriptions font-medium
              underline cursor-pointer text-zinc-700 dark:text-zinc-300"
              onClick={() => {
                navigate(
                  '/transaction-history',
                  {state: {dataType: 'Expense'}}
                )
              }}
            >
              Expense History
            </h2>
          </div>
        </div>
        <div className="h-auto w-full md:w-[60%] lg:w-[50%] flex justify-center
          items-center"
        >
          <form
            action={formAction}
            className="h-auto w-full flex flex-col justify-center
            items-center gap-8"
          >
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-descriptions
                  text-zinc-700 dark:text-zinc-300"
                >
                  Expense Type*
                </h2>
              </div>
              <div className="h-auto w-full">
              <input
                  type="text"
                  name="name"
                  required
                  placeholder="type here"
                  className="input w-full text-base font-descriptions font-medium
                  text-zinc-900 dark:text-white bg-transparent border
                  border-zinc-300 dark:border-zinc-400"
                />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-descriptions
                  text-zinc-700 dark:text-zinc-300"
                >
                  Amount*
                </h2>
              </div>
              <div className="h-auto w-full">
              <input
                  type="number"
                  name="amount"
                  required
                  placeholder="type here"
                  className="input w-full text-base font-descriptions font-medium
                  text-zinc-900 dark:text-white bg-transparent border
                  border-zinc-300 dark:border-zinc-400"
                />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-descriptions
                  text-zinc-700 dark:text-zinc-300"
                >
                  Date*
                </h2>
              </div>
              <div className="h-auto w-full">
              <input
                  type="date"
                  name="date"
                  required
                  className="input w-full text-base font-descriptions font-medium
                  text-zinc-900 dark:text-white bg-transparent border
                  border-zinc-300 dark:border-zinc-400"
                />
              </div>
            </div>
            <div className="h-auto w-full mt-2">
              <button
                type="submit"
                className="w-full py-2 text-base font-descriptions font-medium
                rounded cursor-pointer text-white bg-red-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddExpense
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
  const navigate = useNavigate();

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

      //triggering success toast
      setStatus('Success');

      //reseting success toast to disable after 4 secs
      setTimeout(() => {

        setStatus('');

      }, 4000);

    } catch (error) {
      //printing the error
      console.error('Submission error ' + error.message);

      //triggering failed toast
      setStatus('Failed');

      //reseting failed toast to disable after 4 secs
      setTimeout(() => {

        setStatus('');

      }, 3000);

    }
  }

  return (
    <div className="h-[90vh] w-full flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center
      items-center gap-12">
        {
          status === 'Success' ?
          <Toast data={toastDataSuccess} /> : status === 'Failed' ?
          <Toast data={toastDataFailed}/> : ''
        }
        <div className="h-auto w-full flex flex-col justify-center
        items-center gap-4">
          <div className="h-auto w-full text-center">
            <h2 className="font-medium font-descriptions text-zinc-200
              text-2xl">
              Add Expense
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <h2 className="font-medium font-descriptions text-zinc-200
              text-base underline cursor-pointer"
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
        <div className="h-auto w-full md:max-lg:w-[60%]
        lg:max-2xl:w-[50%]">
          <form action={formAction}
          className="h-auto w-full flex flex-col justify-center
          items-center gap-8">
            <div className="h-auto w-full flex flex-col justify-center
            items-center gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="font-medium font-descriptions text-zinc-200
                  text-base">
                  Expense Type
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="text" placeholder="Type here"
                  className="input w-full text-zinc-100 font-medium
                  font-descriptions bg-zinc-900"
                   required name="name"/>
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
            items-center gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="font-medium font-descriptions text-zinc-200
                  text-base">
                  Amount
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="number" placeholder="5000"
                  className="input w-full text-zinc-100 font-medium
                  font-descriptions bg-zinc-900"
                   required name="amount" />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
            items-center gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="font-medium font-descriptions text-zinc-200
                  text-base">
                  Date
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="date"
                className="input w-full text-zinc-100 font-medium
                  font-descriptions bg-zinc-900" required name="date" />
              </div>
            </div>
            <div className="h-auto w-full">
              <button type="submit" className="w-full py-2 bg-red-600
                text-base font-medium font-descriptions rounded
                text-zinc-200 cursor-pointer">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddExpense
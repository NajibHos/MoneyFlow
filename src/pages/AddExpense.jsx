import { useRef } from 'react';
import { database, DBCollection, projectDBID } from '../appwrite/appwrite';
import { ID } from 'appwrite';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';

const AddExpense = () => {

  const navigate = useNavigate();
  const toast = useRef(null);

  const d = new Date();
  const currentDate = d.getDate().toString();
  const currentMonth = (d.getMonth() + 1).toString();
  const currentYear = d.getFullYear().toString();
  const today = `${currentDate} - ${currentMonth} - ${currentYear}`;

  async function formAction(formData) {
    const title = formData.get('title');
    const amount = parseInt(formData.get("amount"), 10); // convert to int
    const type = 'Expense';
    const category = formData.get('category');
    const date = formData.get('date') || today;
    const userID = 'asdscfgere213';

    try {
      await database.createDocument(
        projectDBID,
        DBCollection,
        ID.unique(),
        {
          title : title,
          amount : amount,
          type : type,
          category : category,
          date : date,
          userID : userID
        }
      )

      // if form added successfully then success toast will trigger
      toast.current.show({severity:'success', summary: 'Success',
        detail:'Expense Added', life: 3000});

    } catch (error) {

      // if not
      toast.current.show({severity:'warning', summary: 'Failed',
        detail:'Failed to add Expense', life: 3000});

      console.log(error);

    }
  }

  return (
    <div className='h-[95vh] md:max-2xl:h-[115vh] w-full flex
     justify-center items-center'>
      <Toast ref={toast} className="mx-10 sm:max-2xl:m-0" />
      <div className='h-full w-[90%] flex flex-col justify-center
      items-center gap-12'>
        <div className='h-auto w-full flex flex-col
         justify-center items-center gap-6'>
          <div className='h-auto w-auto text-center'>
            <h2 className='text-2xl text-white font-semibold
            font-display'>
              Add Expense
            </h2>
          </div>
          <div className="h-auto w-auto">
            <h2 className='text-base text-white font-semibold underline
            cursor-pointer font-display'
            onClick={() => {
              navigate(
                '/transaction-history',
                 {state: {transactionData: 'Expense'}}
                )
            }}>
              Expense History
            </h2>
          </div>
        </div>

          <div className='h-auto w-full lg:max-2xl:w-[50%] flex
            justify-center items-start'>
              <form action={formAction} className='w-full h-auto flex
               flex-col justify-center items-center gap-8'>

              <div className="w-full flex flex-col gap-3">
              <label htmlFor="title" className="text-white font-semibold
              font-display">
              Title *
              </label>
              <InputText id="title" type="text" name="title"
              placeholder="Bill Payment" required
              className="!bg-zinc-900 border !border-zinc-700 !rounded
              !text-white !font-semibold font-display" />
              </div>
              <div className="w-full flex flex-col gap-3">
              <label htmlFor="amount" className="text-white font-semibold
              font-display">
              Amount *
              </label>
              <InputText id="amount" type="number" name="amount"
              placeholder="2000" required
              className="!bg-zinc-900 border !border-zinc-700 !rounded
              !text-white !font-semibold font-display" />
              </div>
              <div className="w-full flex flex-col gap-3">
              <label htmlFor="category" className="text-white
               font-semibold font-display">
              Category *
              </label>
              <InputText id="category" type="text" name="category"
              placeholder="Grocery" required
              className="!bg-zinc-900 border !border-zinc-700 !rounded
              !text-white !font-semibold font-display" />
              </div>

              <div className="w-full flex flex-col gap-3">
              <label htmlFor="date" className="text-white font-semibold
              font-display">
              Date
              </label>
              <InputText id="date" type="text" name="date"
              placeholder="input a date like 22 - 03 - 2025"
              className="!bg-zinc-900 border !border-zinc-700 !rounded
              !text-white !font-semibold font-display" />
               {/* <Calendar
                id="deadline"
                name='date'
                 placeholder="Select a deadline"
                 className="w-full !bg-zinc-900 border !border-zinc-700
                  !rounded !text-white !font-semibold"

                // showIcon
                required
               /> */}
              </div>

              <div className="w-full h-auto mt-4">
              <button className="w-full py-2 bg-white text-zinc-950
              font-semibold rounded cursor-pointer text-base
              md:max-2xl:text-lg font-display"
               type="submit">
              Add Expense
              </button>
              </div>

              <div className="w-full h-auto">
              <button className="w-full py-2 bg-blue-600 text-white
              font-semibold rounded cursor-pointer text-base
              md:max-2xl:text-lg font-display"
              type="button" onClick={() => navigate('/dashboard')}>
              Cancel
              </button>
              </div>

              </form>
            </div>
      </div>
    </div>
  )
}

export default AddExpense
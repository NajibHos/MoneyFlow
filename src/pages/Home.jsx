import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="h-[90vh] md:max-2xl:h-[85vh] w-full flex
    justify-center items-center">

     <div className="h-[80%] w-[90%] md:max-2xl:w-[60%] flex flex-col
      justify-center items-center gap-10 md:max-2xl:gap-8">

       <div className="h-auto w-full text-center flex flex-col gap-4">
         <h2 className="font-semibold font-display text-white
         text-2xl">
         MoneyFlow
         </h2>
         <h2 className="font-semibold font-display text-zinc-200
         text-lg">Control Your Money, Control Your Future</h2>
       </div>

       <div className="h-auto w-full text-left">
         <p className="font-medium font-display text-zinc-400
         text-base">
          MoneyFlow is a simple and intuitive income, expense, and savings tracker designed to help you manage your finances effortlessly. With an easy-to-use dashboard and clear financial insights, MoneyFlow empowers you to take control of your money and make smarter financial decisions.
         </p>
       </div>

       <div className="h-auto w-full flex flex-col justify-start
       items-start gap-4">

         <div className="h-auto w-full text-left">
         <h2 className="font-semibold font-display text-zinc-400
         text-lg">
         Technologies used:
         </h2>
         </div>
         <div className="h-auto w-full text-left">
         <h2 className="font-semibold font-display text-zinc-400
         text-base">
         Front-end: <span className="font-medium text-white">
          React, Prime React, Tailwind CSS</span>
         </h2>
         </div>

         <div className="h-auto w-full text-left">
         <h2 className="font-semibold font-display text-zinc-400
         text-base">
         Back-end: <span className="font-medium text-white">Appwrite
           (authentication and database)</span>
         </h2>
         </div>

         <div className="h-auto w-full text-left">
         <h2 className="font-semibold font-display text-zinc-400
         text-base">
         Tools: <span className="font-medium text-white">ChatGPT</span>
         </h2>
         </div>

         <div className="h-auto w-full text-left">
         <h2 className="font-semibold font-display text-zinc-400
         text-base">
         Deployment: <span className="font-medium text-white">Vercel</span>
         </h2>
         </div>

       </div>

       <div className="h-auto w-full flex justify-center items-center">
          <button className="px-8 py-2 bg-white text-zinc-950
            font-semibold rounded cursor-pointer text-base
            md:max-2xl:text-lg font-display"
            type="button" onClick={() => navigate('/dashboard')}>
            Visit APP
          </button>
       </div>

     </div>
   </div>
  )
}

export default Home
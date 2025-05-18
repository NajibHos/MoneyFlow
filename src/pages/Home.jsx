import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="h-[90vh] w-full flex
     justify-center items-center">
     <div className="h-[80%] w-[90%] md:max-2xl:w-[60%] flex flex-col
      justify-center items-center gap-10 md:max-2xl:gap-8">

       <div className="h-auto w-full text-center flex flex-col gap-4">
          <h2 className="text-2xl text-white font-semibold
           cursor-pointer font-headings">
            Money
            <span className="italic">Flow</span>
          </h2>
          <h2 className="font-medium font-descriptions text-zinc-200
            text-lg">
            Control Your Money, Control Your Future
          </h2>
       </div>

       <div className="h-auto w-full text-left">
         <p className="font-medium font-descriptions text-zinc-400
         text-base">
          MoneyFlow is a simple and intuitive income, expense, and savings tracker designed to help you manage your finances effortlessly. With an easy-to-use dashboard and clear financial insights, MoneyFlow empowers you to take control of your money and make smarter financial decisions.
         </p>
       </div>

       <div className="h-auto w-full flex flex-col justify-start
       items-start gap-4">

        <div className="h-auto w-full text-left">
          <h2 className="font-medium font-descriptions text-zinc-300
          text-lg">
          Technologies used:
          </h2>
        </div>
        <div className="h-auto w-full text-left">
          <h2 className="font-medium font-descriptions text-zinc-400
          text-base">
          Front-end: <span className="font-medium font-descriptions
          text-zinc-300">
          React, Tailwind CSS, Daisy UI</span>
          </h2>
        </div>

        <div className="h-auto w-full text-left">
          <h2 className="font-medium font-descriptions text-zinc-400
          text-base">
          Back-end: <span className="font-medium font-descriptions
          text-zinc-300">
          Appwrite (authentication and database)</span>
          </h2>
        </div>

        <div className="h-auto w-full text-left">
          <h2 className="font-medium font-descriptions text-zinc-400
          text-base">
          Tools: <span className="font-medium font-descriptions
          text-zinc-300">ChatGPT</span>
          </h2>
        </div>

        <div className="h-auto w-full text-left">
          <h2 className="font-medium font-descriptions text-zinc-400
          text-base">
          Deployment: <span className="font-medium font-descriptions
          text-zinc-300">Vercel</span>
          </h2>
        </div>

       </div>

       <div className="h-auto w-full flex justify-center items-center">
          <Link to='/sign-in'>
          <button className="text-lg text-zinc-900
            font-semibold cursor-pointer font-descriptions
             px-4 py-2 bg-zinc-200 rounded-xl" type="button">
            Visit APP
          </button>
          </Link>
       </div>

     </div>
   </div>
  )

}

export default Home
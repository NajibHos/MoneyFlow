import { useAuth } from "../utils/AuthProvider";
import { Link } from "react-router-dom";

const Home = () => {

  const { user } = useAuth();

  return (
    <div className="h-auto py-12 w-full flex justify-center items-center">
      <div className="h-full w-[90%] lg:w-[60%] flex flex-col
        justify-center items-center gap-6 lg:gap-8"
      >
        <div className="h-auto w-full flex flex-col justify-center
          items-center gap-4"
        >
          <div className="h-auto w-full text-center">
            <h2 className="text-3xl font-heading font-semibold
              text-zinc-900 dark:text-white"
            >
              Moneyflow
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <h2 className="text-lg font-heading font-medium
              text-zinc-700 dark:text-zinc-300"
            >
              From tasks to invoices, manage it all with ease
            </h2>
          </div>
        </div>
        <div className="h-auto w-full text-left">
          <p className="text-base font-text font-medium
            text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap"
          >
            MoneyFlow is a simple and intuitive income, expense, and savings
            tracker designed to help you manage your finances effortlessly.
            With an easy-to-use dashboard and clear financial insights, MoneyFlow 
            empowers you to take control of your money and make smarter financial decisions.
          </p>
        </div>
        <div className="h-auto w-full flex flex-col justify-center items-center gap-2">
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-text font-medium
              text-zinc-700 dark:text-zinc-300"
            >
              Built with:
            </h2>
          </div>
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-text font-medium
              text-zinc-900 dark:text-white"
            >
              React, Appwrite, Daisy UI, Tailwind CSS
            </h2>
          </div>
        </div>
        <div className="h-auto w-full flex flex-col justify-center
          items-start gap-2"
        >
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-text font-medium
              text-zinc-700 dark:text-zinc-300"
            >
              Features:
            </h2>
          </div>
          <div className="h-auto w-full">
            <ul className="h-auto w-full list-disc ml-4 text-left
              text-zinc-900 dark:text-white"
            >
              <li>
                <h2 className="text-base font-text font-medium
                  text-zinc-900 dark:text-white"
                >
                  User authentication, CRUD operations, and real-time database
                </h2>
              </li>
              <li>
                <h2 className="text-base font-text font-medium
                  text-zinc-900 dark:text-white"
                >
                  Manages income, expense, savings with real-time balance updates
                </h2>
              </li>
              <li>
                <h2 className="text-base font-text font-medium
                  text-zinc-900 dark:text-white"
                >
                  Protected routes, responsive user-friendly Interface, and theme toggle

                </h2>
              </li>
            </ul>
          </div>
        </div>
        {
          user && <div className="h-auto w-auto">
            <Link to={'/dashboard'}>
            <button
              className="w-auto px-6 py-2 text-base font-text
              font-medium rounded cursor-pointer text-white bg-blue-700"
            >
              Dashboard
            </button>
            </Link>
          </div>
        }
        {
          !user && <div className="h-auto w-auto">
            <Link to={'/sign-in'}>
            <button
              className="w-auto px-6 py-2 text-base font-text
              font-medium rounded cursor-pointer text-white bg-blue-700"
            >
              Get Started
            </button>
            </Link>
          </div>
        }
        <div className="h-auto w-full text-center">
          <h2 className="text-base font-text font-medium 
            text-zinc-700 dark:text-zinc-300"
          >
            Web App developed by
            <a 
              href="https://najibdev.vercel.app" 
              target="_blank"
              className="text-blue-600 underline ml-1"
            >
              Najib Hossain
            </a>
          </h2>
        </div>
      </div>
    </div>
  )

}

export default Home
import { useAuth } from "../utils/AuthProvider";
import { Link } from "react-router-dom";
import { Github, House, LogIn, LogOut } from "lucide-react";

const Header = () => {

  const { user, logOutUser } = useAuth();

  return (
     <div className="h-[10vh] w-full flex justify-center
     items-center">
      <div className="h-full w-[90%] flex justify-between items-center">
        <div className="h-auto w-[40%] flex justify-start items-center">
          <Link to='/'>
          <h2 className="text-3xl text-white font-semibold
           cursor-pointer font-headings">
            Money
          <span className="italic">Flow</span>
          </h2>
          </Link>
        </div>

        <div className="h-auto w-[40%] flex justify-end items-center
        gap-4">
          {
            !user ? (

              <>
              <a href="#" target="_blank"
                className="text-lg text-zinc-200
                font-semibold cursor-pointer font-descriptions
               hover:text-white px-4 py-2 bg-transparent
               hover:bg-zinc-800 rounded-xl">
                <Github  />
              </a>

              {/* 2 different buttons for smaller and larger screens */}
              <Link to='/sign-in'>
              <button type="button" className="block md:max-2xl:hidden
                text-lg text-zinc-200 font-semibold cursor-pointer
                font-descriptions
               hover:text-white px-4 py-2 bg-transparent
               hover:bg-zinc-800 rounded-xl">
                <LogIn />
              </button>
              </Link>

              <Link to='/sign-in'>
              <button type="button" className="hidden md:max-2xl:block
                text-lg text-zinc-200 font-semibold cursor-pointer
                font-descriptions
               hover:text-white px-4 py-2 bg-transparent
               hover:bg-zinc-800 rounded-xl">
                Sign in
              </button>
              </Link>

              </>

            ) : (

              <>
                {/* 2 different buttons for smaller and larger screens */}
                <Link to='/dashboard'>
                <button type="button"
                  className="block md:max-2xl:hidden
                  text-lg text-zinc-200
                  font-semibold cursor-pointer font-descriptions
                 hover:text-white px-4 py-2 bg-transparent
                 hover:bg-zinc-800 rounded-xl">
                  <House />
                </button>
                </Link>

                <Link to='/dashboard'>
                <button type="button"
                  className="hidden md:max-2xl:block
                  text-lg text-zinc-200
                  font-semibold cursor-pointer font-descriptions
                 hover:text-white px-4 py-2 bg-transparent
                 hover:bg-zinc-800 rounded-xl">
                  Dashboard
                </button>
                </Link>

                <button type="button"
                  className="block md:max-2xl:hidden
                  text-lg text-zinc-200
                  font-semibold cursor-pointer font-descriptions
                 hover:text-white px-4 py-2 bg-transparent
                 hover:bg-zinc-800 rounded-xl"
                  onClick={logOutUser}>
                  <LogOut />
                </button>

                <button type="button"
                  className="hidden md:max-2xl:block
                  text-lg text-zinc-200
                  font-semibold cursor-pointer font-descriptions
                 hover:text-white px-4 py-2 bg-transparent
                 hover:bg-zinc-800 rounded-xl"
                  onClick={logOutUser}>
                  Sign Out
                </button>
              </>

            )
          }
        </div>
      </div>
    </div>
  )
}

export default Header
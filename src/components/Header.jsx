import { useAuth } from "../utils/AuthProvider";
import { Link } from "react-router-dom";
import { House, LogIn, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "../utils/ThemeProvider";

const Header = () => {

  const { user, logOutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  console.log(theme)

  return (
     <div className="h-auto w-full py-5 flex justify-center items-center">
      <div className="h-full w-[90%] flex justify-between items-center">
        <div className="h-auto w-[40%] flex justify-start items-center">
          <Link to='/'>
          <h2 className="text-3xl font-headings font-medium
            cursor-pointer text-zinc-900 dark:text-white"
          >
            Moneyflow
          </h2>
          </Link>
        </div>
        <div className="h-auto w-[40%] flex justify-end items-center gap-5 md:gap-4">
          {
            theme === 'light' && <button 
              onClick={toggleTheme}
              className="cursor-pointer text-zinc-900"
            >
              <Sun size={22} />
            </button>
          }
          {
            theme === 'dark' && <button 
              onClick={toggleTheme}
              className="cursor-pointer text-white"
            >
              <Moon size={22} />
            </button>
          }
            {
            !user ? (
              <> 
              {/* 2 different buttons for smaller and larger screens */}
              <Link to='/sign-in'>
              <button 
                className="block md:hidden cursor-pointer text-zinc-900 
                dark:text-white hover:text-blue-600"
              >
                <LogIn size={22} />
              </button>
              </Link>

              <Link to='/sign-in'>
              <button 
                className="hidden md:block
                text-lg font-descriptions font-medium cursor-pointer
                text-zinc-900 dark:text-white hover:text-blue-600"
              >
                Sign in
              </button>
              </Link>
              </>
            ) : (
              <>
                {/* 2 different buttons for smaller and larger screens */}
                <Link to='/dashboard'>
                <button
                  className="block md:hidden cursor-pointer text-zinc-900 
                  dark:text-white hover:text-blue-600"
                >
                  <House size={22} />
                </button>
                </Link>

                <Link to='/dashboard'>
                <button
                  className="hidden md:block
                  text-lg font-descriptions font-medium cursor-pointer
                  text-zinc-900 dark:text-white hover:text-blue-600">
                  Dashboard
                </button>
                </Link>

                <button 
                  className="block md:hidden cursor-pointer text-zinc-900 
                  dark:text-white hover:text-blue-600"
                  onClick={logOutUser}
                >
                  <LogOut size={22} />
                </button>

                <button
                  onClick={logOutUser}
                  className="hidden md:block
                  text-lg font-descriptions font-medium cursor-pointer
                  text-zinc-900 dark:text-white hover:text-blue-600"
                >
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
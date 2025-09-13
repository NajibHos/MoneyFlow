import { useAuth } from "../utils/AuthProvider";
import { Link } from "react-router-dom";
import { House, LogIn, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "../utils/ThemeProvider";

const Header = () => {

  const { user, logOutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
     <div className="h-auto w-full py-5 flex justify-center items-center">
      <div className="h-full w-[90%] flex justify-between items-center">
        <div className="h-auto w-auto flex justify-start items-center">
          <Link to='/'>
          <h2 className="text-3xl font-headings font-medium
            cursor-pointer text-zinc-900 dark:text-white"
          >
            Moneyflow
          </h2>
          </Link>
        </div>
        <div className="h-auto w-auto flex justify-end-safe items-center gap-6">
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
            !user && <>
              <div className="h-auto w-auto block md:hidden">
                <Link to='/sign-in'>
                <button
                  className="flex justify-center items-center cursor-pointer
                  text-zinc-900 dark:text-white hover:text-blue-600"
                >
                  <LogIn size={22} />
                </button>
                </Link>
              </div>

              <div className="h-auto w-auto hidden md:block">
                <Link to='/sign-in'>
                <button
                  className="text-lg font-headings font-medium cursor-pointer
                  text-zinc-900 dark:text-white hover:text-blue-600"
                >
                  Sign in
                </button>
                </Link>
              </div>
            </>
          }
          {
            user && <>
              <div className="h-auto w-auto block md:hidden">
                <Link to='/dashboard'>
                <button
                  className="flex justify-center items-center
                  cursor-pointer text-zinc-900 dark:text-white
                  hover:text-blue-600"
                >
                  <House size={22} />
                </button>
                </Link>
              </div>

              <div className="h-auto w-auto hidden md:block">
                <Link to='/dashboard'>
                <button
                  className="text-lg font-headings font-medium cursor-pointer
                  text-zinc-900 dark:text-white hover:text-blue-600"
                >
                  Dashboard
                </button>
                </Link>
              </div>

              <div className="h-auto w-auto block md:hidden">
                <button
                  className="flex justify-center items-center
                  cursor-pointer text-zinc-900
                  dark:text-white hover:text-blue-600"
                  onClick={logOutUser}
                >
                  <LogOut size={22} />
                </button>
              </div>

              <div className="h-auto w-auto hidden md:block">
                <button
                  onClick={logOutUser}
                  className="text-lg font-headings font-medium cursor-pointer
                  text-zinc-900 dark:text-white hover:text-blue-600"
                >
                  Sign Out
                </button>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Header
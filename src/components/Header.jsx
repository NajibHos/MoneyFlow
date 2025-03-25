import { useAuth } from "../utils/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-[10vh] md:max-2xl:h-[15vh] w-full
     flex justify-center items-center">
      <div className="h-full w-[90%] flex justify-between items-center">
        <div className="w-auto h-auto text-center">
          <Link to ='/' >
          <h2 className="text-3xl text-white font-semibold
          cursor-pointer font-heading">
            MoneyFlow
          </h2>
          </Link>
        </div>

        <div className="h-auto w-auto flex justify-center items-center
        gap-6 md:max-2xl:gap-8">
          <div className="h-auto w-auto mt-1">
          <a
          href="#"
          target="_blank">
          <i className='pi pi-github
          text-white hover:text-zinc-200' style={{ fontSize: '2rem' }}>
          </i>
          </a>
          </div>
          <div className="h-auto w-auto">
            {user ? (
              <>
                <span className="h-auto w-auto">
                  <button className="px-4 py-2 rounded bg-white
                  font-semibold text-base md:max-2xl:text-lg
                  cursor-pointer"
                  onClick={() => logout()}
                  >
                    Sign Out
                  </button>
                </span>
              </>
            ) : (
              <>
                <span className="h-auto w-auto">
                  <button className="px-4 py-2 rounded bg-white
                  font-semibold text-base md:max-2xl:text-lg
                   cursor-pointer font-display"
                   onClick={() => {
                    navigate('/login');
                   }}
                   >
                    Sign In
                  </button>
                </span>
              </>
            )}
          </div>
        </div>


      </div>
    </div>
  )
}

export default Header
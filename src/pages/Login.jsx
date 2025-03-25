import { useAuth } from "../utils/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";

const Login = () => {

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]); // Ensures navigation only when 'user' updates

  async function formAction(formData) {

    const email = formData.get('email');
    const password = formData.get('password');

    const userInfo = { email, password };

    await login(userInfo);

  }

  return (
    <div className="h-[90vh] lg:max-2xl:h-[105vh] w-full
     flex justify-center items-center">
      <div className="h-[90%] md:max-2xl:h-[90%]
      w-[90%] flex flex-col justify-center
      items-center gap-12 lg:max-2xl:gap-10">

        <div className="h-16 w-16 rounded-full bg-zinc-900
        flex justify-center items-center">
          <i className="pi pi-sign-in text-white"
           style={{ fontSize: '1.5rem' }}></i>
        </div>

        <div className="h-auto w-auto text-center">
          <h2 className="text-2xl text-white font-semibold">
            Sign In
          </h2>
        </div>
        <div className="h-auto w-full md:max-2xl:w-[50%]">
          <form action={formAction} className='w-full h-auto flex flex-col
          justify-center items-center gap-8'>

            <div className="w-full flex flex-col gap-3">
              <label htmlFor="email" className="text-white font-semibold">
                Email
              </label>
              <InputText id="email" type="email" name="email"
               placeholder="example@gmail.com" required
              className="!bg-zinc-900 border !border-zinc-700 !rounded
              !text-white !font-semibold" />
              <div className="h-auto w-full">
                <h2 className="text-base text-zinc-400 font-semibold
                font-display">Email: <span className="text-white">
                  najib@gmail.com</span></h2>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <label htmlFor="pass" className="text-white font-semibold">
                Password
              </label>
              <InputText id="pass" type="password" name="password"
               placeholder="example1232" required
              className="!bg-zinc-900 border !border-zinc-700 !rounded
              !text-white !font-semibold" />
              <div className="h-auto w-full">
                <h2 className="text-base text-zinc-400 font-semibold
                font-display">Password: <span className="text-white">
                  Pass@MoneyFlow</span></h2>
              </div>
            </div>
            {/* <div className="h-auto w-full text-left">
              <Link to='/reset-password'>
              <h2 className="text-base text-zinc-400 font-semibold
               underline">
                Forgot Password?
              </h2>
              </Link>
            </div> */}

            <div className="w-full h-auto mt-4">
              <button className="w-full py-2 bg-white text-zinc-950
              font-semibold rounded cursor-pointer font-display text-base
              md:max-2xl:text-lg"
               type="submit">
                Sign In
              </button>
            </div>

            <div className="w-full h-auto">
              <button className="w-full py-2 bg-blue-600 text-white
              font-semibold rounded cursor-pointer text-base
              md:max-2xl:text-lg font-display"
              type="button" onClick={() => navigate('/')}>
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
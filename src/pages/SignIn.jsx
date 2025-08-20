import { useEffect } from "react";
import { useAuth } from "../utils/AuthProvider";
import { useFormStatus } from "react-dom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  const { user, logInUser } = useAuth();
  const navigate = useNavigate();

  // get recent form submission status
  const { isPending } = useFormStatus();

  useEffect(() => {

    //if user is available then navigate user to dashboard
    if (user) {
      navigate('/dashboard');
    }

  }, [user])

  async function formAction(formData) {

    const email = formData.get('email');
    const password = formData.get('password');

    const userInfo = { email, password }

    await logInUser(userInfo);

  }

  return (
    <div className="h-[90vh] w-full flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center
        items-center gap-16 lg:gap-12"
      >
        <div className="h-auto w-full flex flex-col justify-center items-center gap-4">
          <div className="h-auto w-full text-center">
            <h2 className="text-2xl font-headings font-medium
              text-zinc-800 dark:text-zinc-200"
            >
              Sign In
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <h2 className="text-base font-descriptions font-medium
              text-zinc-700 dark:text-zinc-300"
            >
              Enter currect credentials to proceed further
            </h2>
          </div>
        </div>
        <div className="h-auto w-full md:w-[60%] lg:w-[50%]">
          <form action={formAction}
            className="h-auto w-full flex flex-col justify-center
            items-center gap-8"
          >
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-descriptions 
                  text-zinc-700 dark:text-zinc-300"
                >
                  Email
                </h2>
              </div>
              <div className="h-auto w-full">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@gmail.com"
                  className="input w-full text-base font-descriptions font-medium
                  text-zinc-900 dark:text-white bg-transparent border 
                  border-zinc-300 dark:border-zinc-400"
                />
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-descriptions font-medium
                  text-zinc-700 dark:text-zinc-300"
                >
                  Email: <span className="text-lg text-blue-600">njbhossn@gmail.com</span>
                </h2>
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-medium font-descriptions 
                  text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </h2>
              </div>
              <div className="h-auto w-full">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="type here"
                  className="input w-full text-base font-descriptions font-medium
                  text-zinc-900 dark:text-white bg-transparent border 
                  border-zinc-300 dark:border-zinc-400"
                />
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-descriptions font-medium
                  text-zinc-700 dark:text-zinc-300"
                >
                  Password: <span className="text-lg text-blue-600">P12345678</span>
                </h2>
              </div>
            </div>
            <div className="h-auto w-full">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-2 text-base font-descriptions font-medium  
                rounded cursor-pointer text-white bg-blue-600 disabled:bg-blue-500"
              >
                {isPending ? 'Submitting' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
       </div>
    </div>
  )
}

export default SignIn
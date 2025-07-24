import { useEffect } from "react";
import { useAuth } from "../utils/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  const { user, logInUser } = useAuth();
  const navigate = useNavigate();

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
        <div className="h-auto w-full text-center">
          <h2 className="font-medium font-descriptions text-zinc-200
            text-2xl"
          >
            Sign In
          </h2>
        </div>
        <div className="h-auto w-full md:w-[60%] lg:w-[50%]">
          {/* I'm using React 19 form handling feature here */}
          <form action={formAction}
            className="h-auto w-full flex flex-col justify-center
            items-center gap-8"
          >
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="font-medium font-descriptions text-zinc-200
                  text-base"
                >
                  Email
                </h2>
              </div>
              <div className="h-auto w-full">
                <input
                  type="email"
                  placeholder="Enter your email here"
                  className="input w-full text-zinc-200 font-medium
                  font-descriptions bg-zinc-900"
                  required
                  name="email"
                />
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="font-medium font-descriptions text-zinc-200
                  text-base"
                >
                  Email: <span className="text-lg">njbhossn@gmail.com</span>
                </h2>
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="font-medium font-descriptions text-zinc-200
                  text-base"
                >
                  Password
                </h2>
              </div>
              <div className="h-auto w-full">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password here"
                    className="input w-full text-zinc-200 font-medium
                    font-descriptions bg-zinc-900"
                    required
                  />
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="font-medium font-descriptions text-zinc-200
                  text-base"
                >
                  Password: <span className="text-lg">P12345678</span>
                </h2>
              </div>
            </div>
            <div className="h-auto w-full">
              <button
                type="submit"
                className="w-full py-2 bg-zinc-200
                text-base font-medium font-descriptions rounded
                text-zinc-900 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
       </div>
    </div>
  )
}

export default SignIn
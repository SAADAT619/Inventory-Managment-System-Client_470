import { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase.init";
import saveUserDB from "../../../helper/SaveUserDB";

const Login = () => {
  // signInWithGoogle hook from firebase
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  // signInWithEmailAndPassword hook from firebase
  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);

  // navigate hook
  const navigate = useNavigate();

  // handle form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // handle login button
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  // handle google login button
  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  // if user found
  useEffect(() => {
    if (googleUser || emailUser) {
      // save google account user to custom database
      const data = {
        name: googleUser?.user?.displayName,
        email: googleUser?.user?.email,
        role: "customer",
      };
      saveUserDB(data);

      // navigate user to home page
      navigate("/");
    }
  }, [googleUser, emailUser, navigate]);

  // declare a empty variable for storing error message
  let errorMessage = "";
  // get error message
  if (googleError || emailError) {
    errorMessage = (
      <p className="text-error text-sm">
        Error: {googleError?.message || emailError?.message}
      </p>
    );
  }

  return (
    <section>
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg my-14 shadow-lg hover:shadow-xl">
        <div className="flex justify-center mx-auto">
          <h1 className="text-2xl font-bold">Please login!</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div>
            <label htmlFor="username" className="block text-sm text-gray-800 ">
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && (
            <span className="label-text-alt text-red-500 mt-2">
              Email is required
            </span>
          )}

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 "
              >
                Password
              </label>
            </div>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("password", { required: true })}
            />
          </div>

          {errors.password && (
            <span className="label-text-alt text-red-500 mt-2">
              Password is required
            </span>
          )}

          {/* print error message */}
          {errorMessage}

          <div className="mt-6">
            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              {emailLoading ? "Loading..." : "Login"}
            </button>
          </div>

          <Link
            to="/reset-password"
            className="text-xs text-blue-500  hover:underline"
          >
            Forget Password?
          </Link>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b  lg:w-1/5"></span>

          <p className="text-xs text-center text-gray-500 uppercase">
            or login with Social Media
          </p>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
        </div>

        <div className="flex items-center mt-6 -mx-2">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17_40)">
                <path
                  d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                  fill="#4285F4"
                />
                <path
                  d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                  fill="#34A853"
                />
                <path
                  d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                  fill="#FBBC04"
                />
                <path
                  d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {googleLoading ? "Loading..." : "Continue with Google"}
          </button>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Dont&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-gray-700  hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

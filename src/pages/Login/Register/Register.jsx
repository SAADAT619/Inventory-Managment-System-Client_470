import { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase.init";
import saveUserDB from "../../../helper/SaveUserDB";

const Register = () => {
  // create and update user by Firebase hook
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  // handle form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // navigate hook
  const navigate = useNavigate();

  // handle register button
  const onSubmit = async (data) => {
    const success = await createUserWithEmailAndPassword(
      data.email,
      data.password
    );
    await updateProfile({ displayName: data.name });
    // if user return then save to custom database by saveUserDB() function
    if (success) {
      saveUserDB(data);
    }
  };

  // if user created
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  // declare a empty variable for storing error message
  let errorMessage = "";
  // get error message
  if (error || updateError) {
    errorMessage = (
      <p className="text-error text-sm">
        Error: {error?.message || updateError?.message}
      </p>
    );
  }

  return (
    <section>
      <div className="w-full max-w-sm p-6 my-14 m-auto mx-auto bg-white rounded-lg shadow-lg hover:shadow-xl">
        <div className="flex justify-center mx-auto">
          <h1 className="text-2xl font-bold">Create an account!</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div>
            <label htmlFor="username" className="block text-sm text-gray-800 ">
              Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && (
            <span className="label-text-alt text-red-500 mt-2">
              Name is required
            </span>
          )}

          <div className="mt-4">
            <label htmlFor="username" className="block text-sm text-gray-800 ">
              Email
            </label>
            <input
              type="text"
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

          {/* print error */}
          {errorMessage}

          <div className="mt-6">
            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              {loading || updating ? "Loading..." : "Register"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-gray-700  hover:underline"
          >
            Please login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../../config/firebase.init";

const ResetPassword = () => {
  // password reset hook
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  // handle form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // handle button
  const onSubmit = async (data) => {
    const success = await sendPasswordResetEmail(data.email);
    if (success) {
      alert("Reset email sent. Please check your email");
    }
    reset();
  };

  // declare a empty variable for storing error message
  let errorMessage = "";
  // get error message
  if (error) {
    errorMessage = <p className="text-error text-sm">{error?.message}</p>;
  }

  return (
    <section>
      <div className="w-full max-w-sm p-6 my-24 mx-auto bg-white rounded-lg shadow-md ">
        <div className="flex justify-center mx-auto">
          <h1 className="text-2xl font-bold">Reset your password</h1>
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

          {/* print error message */}
          {errorMessage}

          <div className="mt-6">
            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none ">
              {sending ? "sending..." : "Send email"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;

import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { auth } from "../../config/firebase.init";
import Loader from "../Shared/Loader/Loader";

const Feedback = () => {
  // get user info from firebase
  const [user] = useAuthState(auth);

  // handle form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // get current customer info from database
  const {
    isPending,
    error,
    data: customer,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: () =>
      fetch(`http://localhost:5000/api/v1/user/${user?.email}`).then((res) =>
        res.json()
      ),
  });

  // handle save button
  const onSubmit = async (data) => {
    // modify data
    const postJobData = {
      customer: customer?.data?._id,
      feedback: data.feedback,
    };

    // send data to the server
    fetch("http://localhost:5000/api/v1/feedback", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postJobData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // success toast
          toast.success("Feedback Send Successfully");
          reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Send Request Failed");
      });
  };

  // if pending data...
  if (isPending) return <Loader />;
  // if getting error
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full max-w-lg p-6 m-auto mx-auto bg-white rounded-lg my-14 border">
      <div className="flex justify-center mx-auto">
        <h1 className="text-2xl font-bold text-teal-800">Feedback Form</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="mt-4">
          <label htmlFor="feedback" className="block text-sm text-gray-800 ">
            Write Message
          </label>
          <textarea
            type="text"
            className="block w-full h-36 px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-400 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            {...register("feedback", { required: true })}
          />
        </div>
        {errors.feedback && (
          <span className="label-text-alt text-red-500 mt-2">
            Feedback is required
          </span>
        )}

        <div className="mt-6">
          <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-500 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;

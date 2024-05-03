import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import toast from "react-hot-toast";
import Loader from "../../Shared/Loader/Loader";

const ManageFeedback = () => {
  const {
    isPending,
    error,
    data: feedbacks,
    refetch,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/feedback").then((res) => res.json()),
  });

  // handle delete button
  const handleDeleteFeedback = (id) => {
    const confirm = window.confirm("Are you sure you want to Delete?");

    if (confirm) {
      fetch(`http://localhost:5000/api/v1/feedback/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // success toast
            toast.success("Feedback deleted successfully");
            refetch();
          }
        });
    }
  };

  // if pending data...
  if (isPending) return <Loader />;
  // if getting error
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {/* header  */}
      <div className="flex items-center justify-between mx-8 mt-10">
        <h1 className="text-2xl font-bold">
          Customer Feedback ({feedbacks?.data?.length})
        </h1>
      </div>

      {/* table */}
      <div className="overflow-x-auto mt-16 mx-8 border rounded-lg shadow-sm">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-sky-200 text-black">
              <th>No.</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Messages</th>
              <th>Sent Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks?.data?.map((feedback, index) => (
              <tr className="hover:bg-sky-50" key={feedback?._id}>
                <th>{index + 1}</th>
                <td>{feedback?.customer?.username}</td>
                <td>{feedback?.customer?.email}</td>
                <td>{feedback?.feedback}</td>
                <td>
                  {moment(feedback?.createdAt).format("YYYY-MM-DD HH:mm a")}
                </td>
                <button
                  onClick={() => handleDeleteFeedback(feedback?._id)}
                  className="btn bg-red-600 hover:bg-red-700 p-2 rounded shadow-lg text-slate-200"
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFeedback;

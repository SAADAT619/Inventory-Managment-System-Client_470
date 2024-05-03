import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Loader from "../../Shared/Loader/Loader";

const ManageCustomer = () => {
  const {
    isPending,
    error,
    data: customers,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/user").then((res) => res.json()),
  });

  // if pending data...
  if (isPending) return <Loader />;
  // if getting error
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {/* header  */}
      <div className="flex items-center justify-between mx-8 mt-10">
        <h1 className="text-2xl font-bold">
          Manage Customers ({customers?.data?.length})
        </h1>
      </div>

      {/* table */}
      <div className="overflow-x-auto mt-16 mx-8 border rounded-lg shadow-sm">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-sky-200 text-black">
              <th>No.</th>
              <th>Customer Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {customers?.data?.map((customer, index) => (
              <tr className="hover:bg-sky-50" key={customer?._id}>
                <th>{index + 1}</th>
                <td>{customer?._id}</td>
                <td>{customer?.username}</td>
                <td>{customer?.email}</td>
                <td>{customer?.role}</td>
                <td>
                  {moment(customer?.createdAt).format("YYYY-MM-DD HH:mm a")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCustomer;

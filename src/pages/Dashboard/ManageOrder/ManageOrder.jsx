import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import toast from "react-hot-toast";
import Loader from "../../Shared/Loader/Loader";

const ManageOrder = () => {
  const {
    isPending,
    error,
    data: orders,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/order").then((res) => res.json()),
  });

  // handle delete button
  const handleDeleteOrderBtn = (id) => {
    const confirm = window.confirm("Are you sure you want to Delete?");

    if (confirm) {
      fetch(`http://localhost:5000/api/v1/order/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // success toast
            toast.success("Order deleted successfully");
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
      {/* header */}
      <div className="flex items-center justify-between mx-8 mt-10">
        <h1 className="text-2xl font-bold">
          Manage Orders ({orders?.data?.length})
        </h1>
      </div>

      {/* table */}
      <div className="overflow-x-auto mt-16 mx-8 border rounded-lg shadow-sm">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-sky-200 text-black">
              <th>Transaction Id</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Shipping Address</th>
              <th>Billing Address</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th>Ordered Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((order) => (
              <tr className="hover:bg-sky-50" key={order?._id}>
                <td>{order?._id}</td>
                <td>
                  <p>{order?.customer?.username}</p>
                  <p>{order?.customer?.email}</p>
                </td>
                <td>
                  {order?.products.map((product, index) => (
                    <p key={index}>{product.product.name}</p>
                  ))}
                </td>
                <td>
                  {order?.products.map((product, index) => (
                    <p key={index}>{product.quantity}</p>
                  ))}
                </td>
                <td>{order?.shippingAddress}</td>
                <td>{order?.billingAddress}</td>
                <td>{order?.totalAmount}$</td>
                <td>{order?.isPaid === true ? "Paid" : "Unpaid"}</td>
                <td>{order?.paymentMethod}</td>
                <td>{moment(order?.createdAt).format("YYYY-MM-DD HH:mm a")}</td>
                <td>
                  <button
                    onClick={() => handleDeleteOrderBtn(order?._id)}
                    className="btn bg-red-600 hover:bg-red-700 p-2 rounded shadow-lg text-slate-200"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrder;

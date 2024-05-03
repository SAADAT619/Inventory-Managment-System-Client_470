import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaDownload } from "react-icons/fa";
import { auth } from "../../../config/firebase.init";
import Loader from "../../Shared/Loader/Loader";

const CustomerOrders = () => {
  // get user info from firebase
  const [user] = useAuthState(auth);

  const {
    isPending,
    error,
    data: orders = [],
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`http://localhost:5000/api/v1/order/${user?.email}`).then((res) =>
        res.json()
      ),
  });

  // if pending data...
  if (isPending) return <Loader />;
  // if getting error
  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="container mx-auto pt-8 pb-16 print:max-w-full">
      {orders?.data?.length > 0 ? (
        <>
          {/* header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-center mt-4">
              Total Orders ({orders?.data?.length || 0})
            </h1>
            <button
              onClick={() => window.print()}
              className="btn bg-purple-600 hover:bg-purple-700 text-white print:hidden"
            >
              <FaDownload />
              Invoice
            </button>
          </div>

          {/* table */}
          <div className="overflow-x-auto mt-6 mb-10 border rounded-lg shadow-sm">
            <table className="table print:table-xs">
              {/* head */}
              <thead>
                <tr className="bg-sky-200 text-black">
                  <th>Transaction Id</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th className="print:hidden">Shipping Address</th>
                  <th className="print:hidden">Billing Address</th>
                  <th>Total Amount</th>
                  <th className="print:hidden">Payment Status</th>
                  <th>Payment Method</th>
                  <th>Ordered Time</th>
                </tr>
              </thead>
              <tbody>
                {orders?.data?.map((order) => (
                  <tr className="hover:bg-sky-50" key={order?._id}>
                    <td>{order?._id}</td>
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
                    <td className="print:hidden">{order?.shippingAddress}</td>
                    <td className="print:hidden">{order?.billingAddress}</td>
                    <td>{order?.totalAmount}$</td>
                    <td className="print:hidden">
                      {order?.isPaid === true ? "Paid" : "Unpaid"}
                    </td>
                    <td>{order?.paymentMethod}</td>
                    <td>
                      {moment(order?.createdAt).format("YYYY-MM-DD HH:mm a")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1 className="text-2xl text-red-500 font-bold text-center my-28">
          Total Orders ({orders?.data?.length || 0})
        </h1>
      )}
    </section>
  );
};

export default CustomerOrders;

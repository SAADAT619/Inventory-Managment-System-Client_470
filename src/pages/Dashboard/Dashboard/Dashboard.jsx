import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import DashboardHeader from "./DashboardHeader";
import { FaChartLine, FaMoneyCheckDollar, FaToolbox, FaUser } from "react-icons/fa6";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);

  // users
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/user/customer").then((res) =>
        res.json()
      ),
  });
  // products
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/product").then((res) => res.json()),
  });
  // orders
  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/order").then((res) => res.json()),
  });
  // products
  const { data: Revenue } = useQuery({
    queryKey: ["Revenue"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/metrics").then((res) => res.json()),
  });

  return (
    <div>
      <DashboardHeader></DashboardHeader>

      {admin && (
        <div className="flex justify-between mt-5 mx-5">
          <div className="flex items-center w-3/12 mx-3 border p-5 rounded-lg shadow-md">
            <FaUser className="w-10 h-10 mr-3" />
            <div>
              <h4 className="text-xl font-bold">Total Customers</h4>
              <p className="text-xl font-bold">{users?.data?.length}</p>
            </div>
          </div>
          <div className="flex items-center w-3/12 mx-3 border p-5 rounded-lg shadow-md">
          <FaToolbox className="w-10 h-10 mr-4" />
            <div>
              <h4 className="text-xl font-bold">Total Products</h4>
              <p className="text-xl font-bold">{products?.data?.length}</p>
            </div>
          </div>
          <div className="flex items-center w-3/12 mx-3 border p-5 rounded-lg shadow-md">
          <FaMoneyCheckDollar className="w-10 h-10 mr-4" />
            <div>
              <h4 className="text-xl font-bold">Total Orders</h4>
              <p className="text-xl font-bold">{orders?.data?.length}</p>
            </div>
          </div>
          <div className="flex items-center w-3/12 mx-3 border p-5 rounded-lg shadow-md">
          <FaChartLine className="w-10 h-10 mr-4" />
            <div>
              <h4 className="text-xl font-bold">Total Revenue</h4>
              <p className="text-xl font-bold">
                ${Revenue?.data?.totalRevenue}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

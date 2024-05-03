import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../config/firebase.init";
import useAdmin from "../hooks/useAdmin";

const DashboardLayout = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden print:hidden"
        >
          Open drawer
        </label>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-60 min-h-full border-r-2 text-base-content">
          <Link
            to="/"
            className="mb-5 text-2xl text-center font-bold mx-auto  w-full"
          >
            Inventory
          </Link>
          {/* Sidebar content here */}
          {admin ? (
            <>
              <li>
                <Link to="">Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/products">Products</Link>
              </li>
              <li>
                <Link to="/dashboard/orders">Orders</Link>
              </li>
              <li>
                <Link to="/dashboard/customers">Customers</Link>
              </li>
              <li>
                <Link to="/dashboard/feedbacks">Feedbacks</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard/customer-orders">My Orders</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

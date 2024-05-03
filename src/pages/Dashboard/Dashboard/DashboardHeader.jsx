import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../../config/firebase.init";

const DashboardHeader = () => {
  // get user info from firebase
  const [user] = useAuthState(auth);

  return (
    <div className="navbar border-b-2">
      <div className="navbar-start"></div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div className="flex items-center gap-1 text-end">
            <div>
              <p className="text-xs font-semibold">{user?.displayName}</p>
              <p className="text-xs ">{user?.email}</p>
            </div>

            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </label>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] py-3 px-2 space-y-1 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <a onClick={() => signOut(auth)} className="">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

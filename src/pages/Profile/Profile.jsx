import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase.init";

const Profile = () => {
  const [user] = useAuthState(auth);

  console.log(user);

  return (
    <div className="m-16 p-10 border rounded shadow-lg flex">
      <img
        className="w-28 h-28 rounded shadow-lg"
        src={user?.photoURL}
        alt=""
      />
      <div className="ps-10">
        <h3 className="text-3xl font-bold">{user?.displayName}</h3>
        <p className="text-xl mt-3">
          <span className="font-bold">Email: </span>
          {user?.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;

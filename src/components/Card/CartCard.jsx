import { FaTrashCan } from "react-icons/fa6";

const CartCard = () => {
  return (
    <div className="flex border rounded mx-auto mb-5 py-3">
      <img
        className="w-40 h-40"
        src="https://i.ibb.co/nRMGNq8/image-8.webp"
        alt=""
      />
      <div className="pr-5">
        <h6 className="text-xl font-bold">Product Name</h6>
        <p className="text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
          tempore nulla deserunt magni eum...
        </p>
        <p className="text-lg my-2">
          <span className="font-semibold">Price: </span>$70
        </p>
        <div className="flex">
          <button className="py-2 px-4 text-white rounded bg-gray-800">
            Add To Cart
          </button>
          <button className="py-2 px-4 mx-3 text-white rounded bg-gray-800">
            Purchase Now
          </button>
          <button className="py-2 px-4 text-white hover:text-red-400 rounded bg-gray-800">
            <FaTrashCan className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

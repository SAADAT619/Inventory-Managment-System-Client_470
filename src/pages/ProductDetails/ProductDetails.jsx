import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import productImg from "../../assets/product.png";
import { auth } from "../../config/firebase.init";
import handleAddToCart from "../../helper/addToCart";
import Loader from "../Shared/Loader/Loader";

const ProductDetails = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();

  const {
    isPending,
    error,
    data: products = [],
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`http://localhost:5000/api/v1/product`).then((res) => res.json()),
  });

  // if pending data...
  if (isPending) return <Loader />;
  // if getting error
  if (error) return "An error has occurred: " + error.message;

  const product = products?.data?.find((item) => item._id === id);

  return (
    <div className="py-10 px-16">
      <div className="flex border rounded-lg shadow-lg">
        <div className="w-4/12">
          <img className="rounded-lg" src={productImg} alt="" />
        </div>
        <div className="w-7/12 pl-10 py-5">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="mt-1 text-justify">{product.description}</p>
          <p className="text-md my-1">
            <span className="font-bold">Category: </span>${product.category}
          </p>
          <p className="text-md my-1">
            <span className="font-bold">Batch Number: </span>$
            {product.batchNumber}
          </p>
          <p className="text-md my-1">
            <span className="font-bold">Supplier: </span>${product.supplier}
          </p>
          <p className="text-lg my-1">
            <span className="font-bold">Price: </span>${product.salePrice}
          </p>
          {user && (
            <button
              onClick={() => handleAddToCart(product)}
              className="py-2 px-4 mr-5 text-white rounded bg-gray-800"
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import productImg from "../../assets/product.png";
import { auth } from "../../config/firebase.init";
import handleAddToCart from "../../helper/addToCart";

const ProductCard = ({ product }) => {
  // get user info from firebase
  const [user] = useAuthState(auth);
  const { _id, name, description, salePrice } = product;

  return (
    <div className="card bg-base-100 shadow-lg border">
      <div className="card-body">
        <Link to={`/productDetails/${_id}`} className="card-title">
          {name}
        </Link>
        <p>{description}</p>
        <p>
          <span className="font-bold">Price: </span>
          {salePrice}
        </p>
        <img src={productImg} alt="pd" />
        {user && (
          <button
            onClick={() => handleAddToCart(product)}
            className="px-3 py-1 mt-5 bg-gray-800 text-white rounded"
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

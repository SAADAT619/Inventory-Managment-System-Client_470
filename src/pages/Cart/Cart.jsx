import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import productImg from "../../assets/product.png";
import { auth } from "../../config/firebase.init";
import Loader from "../Shared/Loader/Loader";

const Cart = () => {
  // handle form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // get user info from firebase
  const [user] = useAuthState(auth);

  // set success data temp state
  const [paymentSuccessData, setPaymentSuccessData] = useState([]);

  // get current customer info from database
  const {
    isPending,
    error,
    data: customer,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: () =>
      fetch(`http://localhost:5000/api/v1/user/${user?.email}`).then((res) =>
        res.json()
      ),
  });

  // initial state for products
  const [productsArray, setProductsArray] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );

  // Function to remove a specific product from the cart
  const removeFromCart = (productId) => {
    const updatedArray = productsArray.filter(
      (product) => product._id !== productId
    );
    setProductsArray(updatedArray);
    localStorage.setItem("products", JSON.stringify(updatedArray));
  };

  // Function to increase quantity for a specific product
  const increaseQuantity = (productId) => {
    setProductsArray((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, quantity: (product.quantity || 10) + 10 }
          : product
      )
    );
  };

  // Function to decrease quantity for a specific product
  const decreaseQuantity = (productId) => {
    setProductsArray((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId && product.quantity > 10
          ? { ...product, quantity: product.quantity - 10 }
          : product
      )
    );
  };

  // Use useEffect to update the state when local storage changes
  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("products")) || [];
    setProductsArray(storedArray);
  }, []);

  const totalAmount = productsArray.reduce(
    (total, product) => total + product.salePrice * (product.quantity || 10),
    0
  );

  // handle payment button
  const onSubmit = async (data) => {
    // updated data
    const paymentData = {
      customer: customer?.data?._id,
      products: productsArray.map((product) => ({
        product: product._id,
        quantity: product.quantity,
      })),
      status: "pending",
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,
      paymentMethod: data.paymentMethod,
      totalAmount: totalAmount,
      isPaid: true,
    };

    // send data to the server
    fetch("http://localhost:5000/api/v1/order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // set success data temp
          setPaymentSuccessData(data?.data);
          document.getElementById("order_success_modal").showModal();
          // Clear local storage
          localStorage.removeItem("products");
          reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Payment Failed");
      });
  };

  // if pending data...
  if (isPending) return <Loader />;
  // if getting error
  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="container mx-auto py-10">
      {productsArray.length === 0 ? (
        <h1 className="text-center text-2xl text-red-500 py-20">
          Your cart is empty!
        </h1>
      ) : (
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
            <div className="max-w-lg space-y-3">
              {/* left side */}
              <div>
                {/* cart product data */}
                <div>
                  {productsArray.map((product) => (
                    <div
                      className="flex border rounded mx-auto mb-5 py-3"
                      key={product._id}
                    >
                      <img className="w-40 h-40" src={productImg} alt="" />
                      <div className="pr-5">
                        <h6 className="text-xl font-bold">{product.name}</h6>
                        <p className="text-justify">{product.description}</p>
                        <p className="text-lg my-2">
                          <span className="font-semibold">
                            Per Product Price:{" "}
                          </span>
                          ${product.salePrice}
                        </p>
                        <div className="flex items-center">
                          {/* quantity */}
                          <div className="flex items-center">
                            <button
                              className="px-3 py-1 border rounded-l"
                              onClick={() => decreaseQuantity(product._id)}
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border">
                              {product.quantity || 10}
                            </span>
                            <button
                              className="px-3 py-1 border rounded-r"
                              onClick={() => increaseQuantity(product._id)}
                            >
                              +
                            </button>
                          </div>

                          {/* remove from cart btn */}
                          <button
                            onClick={() => removeFromCart(product._id)}
                            className="py-2 px-4 text-white hover:text-red-400 rounded bg-gray-800 ml-4"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-lg my-2">
                          <span className="font-semibold">Quantity: </span>
                          {product.quantity || 10}
                        </p>
                        <p className="text-lg my-2">
                          <span className="font-semibold">Total Price: </span>$
                          {product.salePrice * (product.quantity || 10)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="flex-1 sm:max-w-lg lg:max-w-md">
              {/* cart header */}
              <div className="text-end">
                <h1 className="text-md">
                  Total Products: <b>{productsArray.length}</b>
                </h1>
                <h1 className="text-md">
                  Total Order Quantity:{" "}
                  <b>
                    {productsArray.reduce(
                      (total, product) => total + (product.quantity || 10),
                      0
                    )}
                  </b>
                </h1>

                <hr className="my-2" />
                <h1 className="text-lg font-bold">
                  Total Amount: {totalAmount}$
                </h1>
              </div>

              {/* form */}
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <div>
                  <label
                    htmlFor="shippingAddress"
                    className="block text-sm text-gray-800 "
                  >
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("shippingAddress", { required: true })}
                  />
                </div>
                {errors.shippingAddress && (
                  <span className="label-text-alt text-red-500 mt-2">
                    Shipping Address is required
                  </span>
                )}

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="billingAddress"
                      className="block text-sm text-gray-800 "
                    >
                      Billing Address
                    </label>
                  </div>

                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("billingAddress", { required: true })}
                  />
                </div>
                {errors.billingAddress && (
                  <span className="label-text-alt text-red-500 mt-2">
                    Billing Address is required
                  </span>
                )}

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="paymentMethod"
                      className="block text-sm text-gray-800 "
                    >
                      Payment Method
                    </label>
                  </div>
                  <select
                    className=" mt-2 select select-bordered w-full hover:outline-none focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("paymentMethod", { required: true })}
                  >
                    <option disabled selected value="">
                      Select Method
                    </option>
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Rocket">Rocket</option>
                  </select>

                  {errors.paymentMethod && (
                    <span className="label-text-alt text-red-500 mt-2">
                      Payment Method is required
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-500 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                    Payment
                  </button>
                </div>
              </form>

              {/* Payment Success Modal */}
              {/* Payment Success Modal */}
              <dialog
                id="order_success_modal"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <h3 className="font-bold text-xl text-green-600 mb-4">
                    Payment Success!
                  </h3>
                  <div className="flex justify-between">
                    <div>
                      <p>Transaction Id:</p>
                      <p>Customer Id:</p>
                      <p>Shipping Address:</p>
                      <p>Billing Address:</p>
                      <p>Payment Method:</p>
                      <p>Total Amount:</p>
                      <p>Date & Time:</p>
                    </div>
                    <div>
                      <p>
                        <b>{paymentSuccessData._id}</b>
                      </p>
                      <p>
                        <b>{paymentSuccessData.customer}</b>
                      </p>
                      <p>
                        <b>{paymentSuccessData.shippingAddress}</b>
                      </p>
                      <p>
                        <b>{paymentSuccessData.billingAddress}</b>
                      </p>
                      <p>
                        <b>{paymentSuccessData.paymentMethod}</b>
                      </p>
                      <p>
                        <b>{paymentSuccessData.totalAmount}$</b>
                      </p>
                      <p>
                        <b>
                          {moment(paymentSuccessData.createdAt).format(
                            "YYYY-MM-DD HH:mm a"
                          )}
                        </b>
                      </p>
                    </div>
                  </div>
                  <div className="modal-action">
                    <Link
                      to="/dashboard/customer-orders"
                      className="btn btn-outline"
                    >
                      Go to Order Page
                    </Link>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;

import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loader from "../../Shared/Loader/Loader";
import AddProduct from "./AddProduct";

const ManageProduct = () => {
  const [selectedProductId, setSelectedProductId] = useState(null); // state for storing product id when update the stock

  const {
    isPending,
    error,
    data: products,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/product").then((res) => res.json()),
  });

  // handle form hook
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  // handle update stock button
  const onSubmit = async (data) => {
    const stockQuantity = data.stockQuantity;
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/product/stock-update/${selectedProductId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stockQuantity,
          }),
        }
      );
      if (response.ok) {
        // success toast
        toast.success("Stock updated successfully");
        refetch();
        reset();
        // close modal
        document.getElementById("stock-update-modal").close();
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  // handle delete button
  const handleDeleteProductBtn = (id) => {
    const confirm = window.confirm("Are you sure you want to Delete?");

    if (confirm) {
      fetch(`http://localhost:5000/api/v1/product/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // success toast
            toast.success("Product deleted successfully");
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
    <section>
      {/* header */}
      <div className="flex items-center justify-between mx-8 mt-10">
        <h1 className="text-2xl font-bold">
          Manage Products ({products?.data?.length})
        </h1>
        <button
          onClick={() =>
            document.getElementById("add-product-modal").showModal()
          }
          className="btn bg-teal-600 text-white hover:bg-teal-700 hover:text-white"
        >
          Add new Product
        </button>
      </div>

      {/* low stock alert */}

      {/* table */}
      <div className="overflow-x-auto mt-16 mx-8 border rounded-lg shadow-sm">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-sky-200 text-black">
              <th>No.</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Batch No.</th>
              <th>Expire Date</th>
              <th>Purchase Price</th>
              <th>Sale Price</th>
              <th>Stock Limit</th>
              <th>Stock Quantity & Alert</th>
              <th>Low Stock</th>
              <th>Warehouse</th>
              <th>Supplier</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.data?.map((product, index) => (
              <tr className="hover:bg-sky-50" key={product?._id}>
                <th>{index + 1}</th>
                <td>{product?.name}</td>
                <td>{product?.category}</td>
                <td>{product?.batchNumber}</td>
                <td>
                  {moment(product.expiryDate).format("YYYY-MM-DD HH:mm a")}
                </td>
                <td>${product?.purchasePrice}</td>
                <td>${product?.salePrice}</td>
                <td>{product?.stockLimit}</td>
                <td className="flex items-center gap-2">
                  <p>{product?.stockQuantity}</p>
                  {/* Display alert if stock quantity is low */}
                  {product?.stockQuantity <= product?.minimumStockLimit && (
                    <p className="text-red-500 font-bold">(Low Stock)</p>
                  )}
                </td>
                <td>{product?.minimumStockLimit}</td>
                <td>{product?.warehouseLocation}</td>
                <td>{product?.supplier}</td>
                <td>
                  {moment(product.createdAt).format("YYYY-MM-DD HH:mm a")}
                </td>
                {/* action button here */}
                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      document.getElementById("stock-update-modal").showModal();
                      setSelectedProductId(product?._id);
                    }}
                    className="btn bg-green-700 hover:bg-green-800 p-2 rounded shadow-lg text-slate-200"
                  >
                    Update
                    <br />
                    Stock
                  </button>
                  <button
                    onClick={() => handleDeleteProductBtn(product?._id)}
                    className="btn bg-red-600 hover:bg-red-700 p-2 rounded shadow-lg text-slate-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*add job modal */}
      <dialog id="add-product-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <AddProduct></AddProduct>
          </div>
        </div>
      </dialog>

      {/*set stock update modal */}
      <dialog id="stock-update-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Update Stock Quantity"
                className="input input-bordered input-info w-full max-w-xs"
                {...register("stockQuantity", { required: true })}
              />

              <button className="btn btn-primary ms-2">Update</button>

              <div>
                {errors.stockQuantity && (
                  <span className="label-text-alt text-red-500 mt-2">
                    Stock Value is required
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default ManageProduct;

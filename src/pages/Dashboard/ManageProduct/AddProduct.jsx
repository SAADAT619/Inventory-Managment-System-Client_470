import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loader from "../../Shared/Loader/Loader";

const AddProduct = () => {
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
    handleSubmit,
    reset,
  } = useForm();

  // handle save button
  const onSubmit = async (data) => {
    // modify data
    const productData = {
      name: data.name,
      description: data.description,
      category: data.category,
      batchNumber: data.batchNumber,
      expiryDate: data.expiryDate,
      purchasePrice: data.purchasePrice,
      salePrice: data.salePrice,
      stockQuantity: data.stockQuantity,
      stockLimit: data.stockLimit,
      minimumStockLimit: data.minimumStockLimit,
      warehouseLocation: data.warehouseLocation,
      supplier: data.supplier,
    };

    // send data to the server
    fetch("http://localhost:5000/api/v1/product", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        // You can check if 'data' exists, then show a success toast and close the modal.
        if (data) {
          // success toast
          toast.success("Product added successfully");
          // close modal
          document.getElementById("add-product-modal").close();
          // clear form data
          reset();
          refetch();
        }
      })
      .catch((error) => {
        // Handle any errors that may occur during the fetch request.
        console.error("Error:", error);

        // Show an error toast with the error message.
        toast.error("An error occurred while adding the job.");
      });
  };

  // if pending data...
  if (isPending) return <Loader />;
  // if getting error
  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <div className="w-full">
        <div className="flex justify-center mx-auto">
          <h1 className="text-2xl font-bold text-teal-700">Add Product</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm text-teal-800">
              Product Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="label-text-alt text-red-500 mt-2">
                Product name is required
              </span>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm text-teal-800">
              Category
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("category", { required: true })}
            />
            {errors.category && (
              <span className="label-text-alt text-red-500 mt-2">
                Category is required
              </span>
            )}
          </div>

          {/* Batch Number */}
          <div>
            <label
              htmlFor="batchNumber"
              className="block text-sm text-teal-800"
            >
              Batch Number
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("batchNumber", { required: true })}
            />
            {errors.batchNumber && (
              <span className="label-text-alt text-red-500 mt-2">
                Batch Number is required
              </span>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label htmlFor="expiryDate" className="block text-sm text-teal-800">
              Expiry Date
            </label>
            <input
              type="date"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("expiryDate", { required: true })}
            />
            {errors.expiryDate && (
              <span className="label-text-alt text-red-500 mt-2">
                Expiry Date is required
              </span>
            )}
          </div>

          {/* Purchase Price */}
          <div>
            <label
              htmlFor="purchasePrice"
              className="block text-sm text-teal-800"
            >
              Purchase Price
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("purchasePrice", { required: true })}
            />
            {errors.purchasePrice && (
              <span className="label-text-alt text-red-500 mt-2">
                Purchase Price is required
              </span>
            )}
          </div>

          {/* Sale Price */}
          <div>
            <label htmlFor="salePrice" className="block text-sm text-teal-800">
              Sale Price
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("salePrice", { required: true })}
            />
            {errors.salePrice && (
              <span className="label-text-alt text-red-500 mt-2">
                Sale Price is required
              </span>
            )}
          </div>

          {/* Stock Quantity */}
          <div>
            <label
              htmlFor="stockQuantity"
              className="block text-sm text-teal-800"
            >
              Stock Quantity
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("stockQuantity", { required: true })}
            />
            {errors.stockQuantity && (
              <span className="label-text-alt text-red-500 mt-2">
                Stock Quantity is required
              </span>
            )}
          </div>

          {/* Stock Limit */}
          <div>
            <label htmlFor="stockLimit" className="block text-sm text-teal-800">
              Stock Limit
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("stockLimit", { required: true })}
            />
            {errors.stockLimit && (
              <span className="label-text-alt text-red-500 mt-2">
                Stock Limit is required
              </span>
            )}
          </div>

          {/* Minimum Stock Limit */}
          <div>
            <label htmlFor="stockLimit" className="block text-sm text-teal-800">
              Minimum Stock Limit
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("minimumStockLimit", { required: true })}
            />
            {errors.minimumStockLimit && (
              <span className="label-text-alt text-red-500 mt-2">
                Minimum Stock Limit is required
              </span>
            )}
          </div>

          {/* Warehouse Location Limit */}
          <div>
            <label htmlFor="stockLimit" className="block text-sm text-teal-800">
              Warehouse Location
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("warehouseLocation", { required: true })}
            />
            {errors.warehouseLocation && (
              <span className="label-text-alt text-red-500 mt-2">
                Warehouse Location is required
              </span>
            )}
          </div>

          {/* supplier Limit */}
          <div>
            <label htmlFor="stockLimit" className="block text-sm text-teal-800">
              Supplier
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("supplier", { required: true })}
            />
            {errors.supplier && (
              <span className="label-text-alt text-red-500 mt-2">
                Supplier is required
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm text-teal-800"
            >
              Description
            </label>
            <textarea
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-teal-500 dark:focus:border-teal-300 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="label-text-alt text-red-500 mt-2">
                Description is required
              </span>
            )}
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-500 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;

import toast from "react-hot-toast";

const handleAddToCart = (product) => {
  // Retrieve the existing array from Local Storage
  const storedArrayString = localStorage.getItem("products");

  // Parse the JSON string into an array or initialize an empty array if it doesn't exist
  const productsArray = JSON.parse(storedArrayString) || [];

  // Check if the products already exists in the array
  const existingProduct = productsArray.find(
    (existingProduct) => existingProduct._id === product._id
  );

  if (!existingProduct) {
    // Add the job object to the array
    productsArray.push(product);

    // Update Local Storage with the modified array
    localStorage.setItem("products", JSON.stringify(productsArray));
    toast.success("Added to cart");
  } else {
    toast.error("Already added!");
  }
};

export default handleAddToCart;

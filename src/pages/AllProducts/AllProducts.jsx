import ProductCard from "../../components/Card/ProductCard";
import Headings from "../../components/Headings/Headings";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader/Loader";

const AllProducts = () => {
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

  return (
    <div className="my-16">
      <Headings
        heading={"All Products"}
        subHeading={"Discover our diverse selection of products"}
      ></Headings>
      <div className="grid grid-cols-4 gap-4 m-16">
        {products?.data.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

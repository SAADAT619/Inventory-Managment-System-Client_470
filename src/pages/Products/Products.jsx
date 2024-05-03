import ProductCard from "../../components/Card/ProductCard";
import Headings from "../../components/Headings/Headings";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader/Loader";

const Products = () => {

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
    <div className="mt-40">
      <Headings
        heading={"Featured Products"}
        subHeading={"Explore our full range of products"}
      ></Headings>
      <div className="grid grid-cols-4 gap-4 m-16">
        {products?.data?.slice(0, 6).map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Products;

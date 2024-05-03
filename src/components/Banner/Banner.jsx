import { Link } from "react-router-dom";
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex h-[500px] items-center border p-10 rounded-lg shadow-lg m-16">
      <div className="w-7/12 pr-16">
        <h1 className="lg:text-5xl font-bold ">
          Your Ultimate Hub for Exceptional Finds
        </h1>
        <p className="mt-5 mb-10 text-md text-justify">
          Revel in the redefinition of exclusivity. Explore our meticulously
          curated inventory, featuring exclusive finds across fashion, tech, and
          wellness. Experience luxury like never before, all in one seamless
          destination.
        </p>
        <Link className="py-3 px-4 bg-gray-800 text-white rounded">
          Explore More
        </Link>
      </div>
      <div className="w-5/12">
        <img className="w-full" src={bannerImg} alt="" />
      </div>
    </div>
  );
};

export default Banner;

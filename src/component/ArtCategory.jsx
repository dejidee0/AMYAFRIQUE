import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ArtCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://assignment-10-server-nu-ashen.vercel.app/artSub")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg "></span>
        ) : null}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {categories.map((category) => (
          <div key={category._id} className="card ">
            <figure className="relative">
              <Link to={`/subCa/${category.subcategory_name}`}>
                <img
                  src={category.image}
                  alt=""
                  className=" hover:border-red-500 hover:border-4 rounded-xl h-[200px] w-[300px] border-2 border-[#eb9b40]"
                />
              </Link>
              <h1 className="absolute top-auto bottom-4 font-bold text-xl text-white bg-[#eb9b40] p-1">
                {category.subcategory_name}
              </h1>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtCategory;

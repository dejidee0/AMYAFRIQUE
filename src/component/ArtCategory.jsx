import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabase-client"; // Ensure this is correctly imported

const ArtCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("artSub").select("*");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center">
        {isLoading && (
          <span className="loading loading-spinner loading-lg"></span>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {categories.map((category) => (
          <div key={category.id} className="card">
            <figure className="relative">
              <Link to={`/subCa/${category.category}`}>
                <img
                  src={category.image}
                  alt={category.category}
                  className="hover:border-red-500 hover:border-4 rounded-xl h-[200px] w-[300px] border-2 border-[#eb9b40]"
                />
              </Link>
              <h1 className="absolute bottom-4 font-bold text-xl text-white bg-[#eb9b40] p-1">
                {category.category}
              </h1>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtCategory;

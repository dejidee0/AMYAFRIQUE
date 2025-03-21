import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import supabase from "../../supabase-client";

const AllArt = () => {
  const loadedData = useLoaderData();
  const [allArt, setAllArt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllArts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("ArtList").select("*");
      if (error) {
        console.error(error);
      } else {
        setAllArt(data);
      }
      setIsLoading(false);
    };

    fetchAllArts();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center mb-6">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Masonry Grid Layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {allArt.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg shadow-lg group transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Image with Overlay */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover rounded-lg"
            />

            {/* Overlay & Text */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <h2 className="text-white text-xl font-bold">{item.title}</h2>
              <p className="text-gray-300">By {item.artist}</p>
              <p className="text-lg font-semibold text-yellow-400 mt-1">
                {item.year}
              </p>

              {/* View Details Button */}
              <Link to={`/view/${item.id}`}>
                <button className="mt-3 bg-[#eb9b40] hover:bg-[#d58a35] text-black font-semibold py-2 px-4 rounded-md transition-all">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArt;

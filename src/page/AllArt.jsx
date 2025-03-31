import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabase-client";

const AllArt = () => {
  const [allArt, setAllArt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllArts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from("ArtList").select("*");
        if (error) {
          throw error;
        }
        setAllArt(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllArts();
  }, []);

  const ArtOverlay = ({ title, artist, year, id }) => (
    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
      <h2 className="text-white text-xl font-bold">{title}</h2>
      <p className="text-gray-300">By {artist}</p>
      <p className="text-lg font-semibold text-yellow-400 mt-1">{year}</p>
      <Link to={`/view/${id}`} aria-label={`View details of ${title}`}>
        <button
          className="mt-3 bg-[#eb9b40] hover:bg-[#d58a35] text-black font-semibold py-2 px-4 rounded-md transition-all"
          aria-label={`View details of ${title}`}
        >
          View Details
        </button>
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center mb-6">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center my-4">
          Failed to load art: {error}
        </div>
      )}

      {/* Masonry Grid Layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {allArt.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg shadow-lg group transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Image with Magnification */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover rounded-lg"
            />

            {/* Overlay */}
            <ArtOverlay
              title={item.title}
              artist={item.artist}
              year={item.year}
              id={item.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArt;

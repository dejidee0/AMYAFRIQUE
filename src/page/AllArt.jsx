import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabase-client";

const ITEMS_PER_PAGE = 20;

const AllArt = () => {
  const [allArt, setAllArt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination Logic
  const totalPages = Math.ceil(allArt.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArt = allArt.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-6 py-12">
      {isLoading && (
        <div className="flex justify-center mb-6">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center my-4">
          Failed to load art: {error}
        </div>
      )}

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {currentArt.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg shadow-lg group transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover rounded-lg"
            />

            <ArtOverlay
              title={item.title}
              artist={item.artist}
              year={item.year}
              id={item.id}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`w-10 h-10 rounded-full ${
                currentPage === index + 1
                  ? "bg-[#eb9b40] text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-[#d58a35] transition`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllArt;

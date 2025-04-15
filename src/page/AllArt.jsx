import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabase-client";

const ITEMS_PER_PAGE = 20;

const AllArt = () => {
  const [allArt, setAllArt] = useState([]);
  const [filteredArt, setFilteredArt] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
        setFilteredArt(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllArts();
  }, []);

  useEffect(() => {
    const filtered = allArt.filter((item) =>
      [item.title, item.artist, item.year?.toString()]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredArt(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, allArt]);

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
  const totalPages = Math.ceil(filteredArt.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArt = filteredArt.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-6">
      {/* Search Bar UI */}
      <div className="sticky top-4 z-20 mb-12 flex justify-center">
        <div className="relative w-full md:w-2/3 lg:w-1/2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artworks by title, artist, or year..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#eb9b40] focus:border-[#eb9b40] focus:animate-[pulse-ring_1s_ease-out] placeholder-gray-500 text-gray-900 transition-all"
          />
          {/* Search icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-3.5 h-5 w-5 text-gray-600 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>

          {/* Live Suggestions */}
          {searchQuery && filteredArt.length > 0 && (
            <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto border border-gray-200">
              {filteredArt.slice(0, 6).map((item) => (
                <Link key={item.id} to={`/view/${item.id}`}>
                  <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                    <span className="text-gray-800 font-medium">
                      {item.title}
                    </span>
                    <span className="text-sm text-gray-500">{item.artist}</span>
                  </div>
                </Link>
              ))}
              {filteredArt.length > 6 && (
                <div className="px-4 py-2 text-center text-sm text-gray-400">
                  Showing top 6 results. Scroll down to see more.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

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
        {!isLoading && filteredArt.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-center animate-fadeIn">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
              alt="No results found"
              className="w-32 h-32 mb-6 opacity-70"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No matching artworks found
            </h2>
            <p className="text-gray-500 max-w-md">
              We couldn’t find any artworks that match "
              <span className="font-medium text-[#eb9b40]">{searchQuery}</span>
              ". <br />
              Try checking your spelling or use different keywords.
            </p>
          </div>
        )}
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

import { Link, useLoaderData } from "react-router-dom";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import Slider from "../component/Slider";
import ArtCategory from "../component/ArtCategory";
import supabase from "../../supabase-client";

import Amara from "../assets/amara.jpg";
import wooden from "../assets/wooden.jpg";
import nature from "../assets/nature.jpg";

const Home = () => {
  const loadedData = useLoaderData();
  const [allArt, setAllArt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("ArtList").select("*");
      if (error) console.log(error);
      else setAllArt(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className=" min-h-screen text-gray-900">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg text-[#eb9b40]"></span>
        </div>
      )}

      {/* Hero Section - Slider */}
      <div className="mt-10">
        <Slider />
      </div>

      {/* Section: Beautiful Paintings */}
      <SectionTitle title="The Beautiful Paintings" />
      <Slide>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-6">
          {allArt.slice(0, 6).map((data) => (
            <Fade key={data._id} delay={100}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-[#eb9b40] transition-transform hover:scale-105">
                <img
                  src={data.image}
                  alt="Artwork"
                  className="h-60 w-full object-cover"
                />
                <div className="p-5 text-center">
                  <p className="text-lg">{data.short_description}</p>
                  <Link to={`/view/${data._id}`}>
                    <button className="mt-4 px-6 py-2 bg-[#eb9b40] text-white font-semibold rounded-lg transition-all hover:bg-[#d88a36]">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </Slide>

      {/* Section: The Art */}
      <SectionTitle title="The Art" />
      <ArtShowcase
        image={wooden}
        title="Starry Night Over the Rhône"
        description="Starry Night Over the Rhône (1888) is the sister work of Starry Night (1889). While Starry Night was painted from Van Gogh’s hospital room, this lesser-known midnight depiction was actually painted on the bank of the Rhône river, a short walk from his home in Arles."
      />
      <ArtShowcase
        image={nature}
        title="The Mona Lisa"
        description="Mona Lisa, painted between 1503 and 1519 by Leonardo da Vinci, is one of the world’s most famous paintings. It now hangs in the Louvre Museum, Paris, where its mysterious smile and unproven identity continue to captivate art lovers worldwide."
      />

      {/* Section: The Artist */}
      <SectionTitle title="The Artist" />
      <ArtShowcase
        image={Amara}
        title="Amara Okparachi"
        description="Amara Okparachi is a renowned impressionist artist known for her dramatic and expressive works. Her art tells deep stories, and her quick mind has led her to make significant discoveries in the art space."
      />

      {/* Section: Art Categories */}
      <SectionTitle title="Art Categories" />
      <div className="mt-10 px-8">
        <Zoom>
          <ArtCategory />
        </Zoom>
      </div>
    </div>
  );
};

/** Helper Component: Section Titles */
const SectionTitle = ({ title }) => (
  <>
    <hr className="mt-20 border-2 border-[#eb9b40] w-1/2 mx-auto" />
    <h2 className="text-center text-[#eb9b40] font-bold text-3xl sm:text-5xl mt-10">
      {title}
    </h2>
  </>
);

/** Helper Component: Art Showcase */
const ArtShowcase = ({ image, title, description }) => (
  <Fade>
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-8 py-10">
      <img
        src={image}
        alt={title}
        className="w-80 h-80 object-cover rounded-lg shadow-xl transition-transform hover:scale-105"
      />
      <div className="max-w-2xl text-center lg:text-left">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-4 text-gray-200">{description}</p>
      </div>
    </div>
  </Fade>
);

export default Home;

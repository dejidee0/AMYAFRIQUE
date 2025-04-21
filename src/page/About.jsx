import { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import MissionVisionValues from "../component/Missions";
import TestimonialsSection from "../component/Testimonials";

const About = () => {
  const [showFullText, setShowFullText] = useState(false);

  const handleReadMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <>
      <div className="h-auto sm:h-auto flex flex-col sm:gap-10 lg:flex-row justify-around items-center relative px-4 py-8 md:py-2 overflow-hidden ">
        {/* Image Section */}
        <Fade delay={200}>
          <div className="h-[350px] sm:h-[530px] w-full sm:min-w-[420px] object-cover mb-6 sm:mb-0 rounded-xl shadow-xl">
            <img
              src="/image3.jpg"
              alt="Artist"
              className="h-full w-full object-cover rounded-xl shadow-2xl"
            />
          </div>
        </Fade>

        {/* Text Content Section */}
        <div className="text-center sm:text-left max-w-3xl px-6 sm:px-0 md:py-8">
          <Slide direction="left" delay={200}>
            <h1 className="text-[#eb9b40] font-bold text-3xl sm:text-4xl mb-6  sm:py-3">
              The Gallerist behind the Artistry
            </h1>
          </Slide>

          <hr className="mt-4 pl-7 border-2 border-[#eb9b40] w-1/2 mx-auto sm:mx-0" />
          <Fade delay={300}>
            <p className="text-base-content mt-6 text-base sm:text-base leading-relaxed ">
              <span className="text-[#eb9b40] text-2xl sm:text-3xl">
                Okpara Judith Amarachi{" "}
              </span>
              was born in Orlu, Imo State, Nigeria, in 1994 and displayed
              leadership qualities from an early age. She attended an
              international secondary school before studying History and
              International Relations at Imo State University. She later pursued
              Computer Science at the National Open University in Lagos. In
              2013, Amyafrique relocated to Lagos, where Amarachi became a
              runway model, walking in numerous fashion shows. In 2015, she
              enrolled in aviation school and obtained her air hostess license.
              However, after struggling to find a job, she shifted her focus to
              fashion design while continuing her modeling career. During her
              modeling journey, she met Mama Nike of Nike Art Gallery, becoming
              one of her models. This encounter sparked her deep interest in
              art. She and her sister began
            </p>

            {/* Read More Section */}
            {showFullText && (
              <p className="text-base-content mt-4 text-base sm:text-base leading-relaxed ">
                {/* Full text continues here... */}
                designing and painting on outfits, a project they named
                “Bankara.” In 2020, while taking a walk in her estate, Amarachi
                discovered Vivid Exclusive Art Gallery, marking the true
                beginning of her art career. By 2021, she moved out of her
                family home and transformed her new space into a gallery. She
                strategically built her gallery by hosting in-house artists
                rather than relying solely on external collections. Amy Afrique
                Art Gallery was officially registered in 2022, and within just
                seven months, she successfully sold 70 artworks. Over the course
                of her career, she has organized five art exhibitions and two
                art competitions. Passionate about her community, Amarachi
                remains dedicated to using art to create a positive impact in
                the world. She also deeply believes in the power of mentorship
                and often mentors young artists to help them reach their full
                potential. Amarachi continues to inspire and leave a lasting
                impression on the art community through her creativity and
                passion for positive change.
              </p>
            )}

            {/* Read More Button */}
            <button
              onClick={handleReadMore}
              className="text-[#eb9b40] font-semibold mt-4 hover:underline"
            >
              {showFullText ? "Read Less" : "Read More"}
            </button>
          </Fade>
        </div>
      </div>

      {/* Education and Awards Section */}
      {/* <div className="py-16 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <Fade delay={500}>
            <h2 className="text-[#eb9b40] font-bold text-3xl sm:text-4xl text-center mb-6">
              Education & Awards
            </h2>
          </Fade>

          <div className="flex flex-col sm:flex-row gap-8">

            <div className="mb-8 flex-1">
              <Slide direction="left" delay={600}>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-base-content">
                  Education
                </h3>
              </Slide>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>
                  <span className="font-bold">Imo State University</span> —
                  Bachelor of Arts in History and International Relations
                </li>
                <li>
                  <span className="font-bold">
                    National Open University, Lagos
                  </span>{" "}
                  — Bachelor of Science in Computer Science
                </li>
                <li>
                  <span className="font-bold">Aviation School</span> — Certified
                  Air Hostess License, 2015
                </li>
              </ul>
            </div>

            
            <div className="flex-1">
              <Slide direction="right" delay={600}>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-base-content">
                  Awards & Recognition
                </h3>
              </Slide>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Best Emerging Artist, Nike Art Gallery Exhibition, 2020</li>
                <li>Top 3 Fashion Model at Lagos Fashion Week, 2014</li>
                <li>
                  Most Innovative Art Gallery, Art and Culture Awards, 2022
                </li>
                <li>
                  Lagos Entertainment Award Entrepreneur of the Year (2016)
                </li>
                <li>Young Entrepreneurs International Summit</li>
                <li>Outstanding One Person of the Year (2023)</li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}

      <MissionVisionValues />
      <TestimonialsSection />
    </>
  );
};

export default About;

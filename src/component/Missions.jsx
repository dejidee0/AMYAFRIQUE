import { Fade, Slide } from "react-awesome-reveal";

const coreValues = [
  {
    title: "Empowerment Through Art",
    desc: "We believe art can awaken confidence, inspire change, and elevate lives.",
  },
  {
    title: "Cultural Pride and Preservation",
    desc: "Our gallery celebrates the richness of African heritage and seeks to preserve its stories through creative expression.",
  },
  {
    title: "Inclusivity and Opportunity",
    desc: "We create spaces where every voice is heard, every talent is valued, and every dream is nurtured—regardless of background.",
  },
  {
    title: "Community Impact",
    desc: "Our work goes beyond galleries; we invest in people, schools, neighborhoods, and hearts.",
  },
  {
    title: "Creativity With Purpose",
    desc: "Every art piece, event, and initiative is driven by meaning and intention—fueled by a desire to uplift others.",
  },
  {
    title: "Integrity and Excellence",
    desc: "We are committed to transparency, professionalism, and delivering value in everything we do.",
  },
  {
    title: "Collaboration and Growth",
    desc: "We grow by working together—partnering with artists, creatives, organizations, and communities to expand our reach and deepen our impact.",
  },
];

export default function MissionVisionValues() {
  return (
    <section className="px-4 py-16 text-base-content">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Mission Section */}
        <Fade direction="up" cascade damping={0.1} triggerOnce>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold border-l-4 border-[#eb9b40] pl-4">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed">
              At Amyafrique Art Gallery, our mission is to use art as a
              transformative force—one that empowers individuals, strengthens
              communities, and amplifies cultural identity. We believe that art
              is more than aesthetics—it is a voice, a movement, and a powerful
              tool for healing, storytelling, and change.
            </p>
            <p className="text-lg leading-relaxed">
              Our goal is to provide a vibrant platform where creativity meets
              purpose, where emerging and established artists alike can showcase
              their talents, and where audiences can experience the soul of
              African heritage through visual expression.
            </p>
            <p className="text-lg leading-relaxed">
              Through exhibitions, community outreach, art competitions, and
              mentorship programs, we are dedicated to nurturing creativity,
              promoting inclusivity, and fostering growth—especially among
              underrepresented populations.
            </p>
            <p className="text-lg leading-relaxed">
              Whether in a classroom, a gallery, or a remote community, our
              mission is to inspire people to see beyond their circumstances and
              realize their potential.
            </p>
          </div>
        </Fade>

        {/* Vision Section */}
        <Slide direction="left" triggerOnce>
          <div className="space-y-6  p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold border-l-4 border-[#eb9b40] pl-4 text-base-content">
              Our Vision
            </h2>
            <p className="text-lg leading-relaxed">
              To become a leading force in Africa and beyond—championing art as
              a medium for empowerment, education, and global cultural dialogue.
              We envision a future where every brushstroke tells a story, every
              gallery space becomes a voice for the voiceless, and every piece
              of art ignites hope, purpose, and possibility in the hearts of
              people across the world.
            </p>
          </div>
        </Slide>

        {/* Core Values Section */}
        <div className="space-y-6">
          <Fade direction="up" triggerOnce>
            <h2 className="text-3xl font-bold border-l-4 border-[#eb9b40] pl-4">
              Our Core Values
            </h2>
          </Fade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => (
              <Slide key={idx} direction="up" delay={idx * 100} triggerOnce>
                <div className="bg-white  rounded-lg p-6 shadow-md hover:shadow-xl transition duration-300">
                  <h3 className="text-xl font-semibold mb-2 text-[#eb9b40]">
                    {value.title}
                  </h3>
                  <p className="text-sm text-base-content">{value.desc}</p>
                </div>
              </Slide>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Otoibhi Jeffrey",

    message:
      "Honestly, what Amyafrique is doing through her art gallery is nothing short of amazing. Her exhibitions have become a hub for societal enlightenment. The way she uses creativity to address deep issues in our society is commendable. I always say it—she is not just an artist, she’s a nation builder.",
  },
  {
    name: "Thelma Akpojaro",

    message:
      "Amy Afrique has really changed the game. Her exhibitions always touch the soul. The first time I walked into her gallery, I felt like I was seeing the world through a new lens. She’s not just showcasing art, she’s transforming mindsets and empowering lives, especially among our youths.",
  },
  {
    name: "Ikpeama Mark",

    message:
      "I have attended several exhibitions by Amyafrique and I must say, they always leave a lasting impact. Her work speaks to our culture, our struggles, and our future. She has created a platform where talents are nurtured and the society is inspired. God bless her for all she’s doing.",
  },
  {
    name: "ASMA DIN",
    image: "/images/asma.jpg",
    message:
      "Experiencing Amyafrique’s exhibition was absolutely enlightening. Her work tells stories that go beyond borders—it’s bold, emotional, and deeply human. I was amazed at how she uses African art to speak to global issues. She’s building bridges between cultures through every stroke of her brush.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="border-[#eb9b40] border-2 px-4 py-16 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          What People Are Saying
        </h2>
        <hr className="mt-4 border-2 border-[#eb9b40] w-1/2 mx-auto " />

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-6 rounded-xl shadow-md transition duration-300 ${
                index % 2 === 0
                  ? "bg-[#eb9b40]"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              <div>
                <h4 className="font-semibold text-lg mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-sm leading-relaxed">{testimonial.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

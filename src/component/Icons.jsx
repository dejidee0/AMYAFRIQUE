import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const BouncingSocialIcons = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-row justify-center items-center gap-6">
          <a
            href="https://www.facebook.com/share/19BUDDA3rg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-white text-3xl animate-bounce hover:text-gray-200 transition duration-300" />
          </a>
          <a
            href="https://x.com/Amyafrique?t=qGncSG2Z9RW93S0qAirX7A&s=09"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-white text-3xl animate-bounce hover:text-gray-200 transition duration-300 delay-100" />
          </a>
          <a
            href="https://www.instagram.com/amyafrique?igsh=NW8yOHYycnZvdjU2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-white text-3xl animate-bounce hover:text-gray-200 transition duration-300 delay-200" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BouncingSocialIcons;

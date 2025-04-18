import { Flip } from "react-awesome-reveal";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa6";
import logo from "../../public/logo.png";

const Footer = () => {
  return (
    <footer className="footer p-10 border-2 border-white rounded-3xl bg-gradient-to-r from-[#eb9b40] to-[#eb9b40] text-neutral-content">
      <nav>
        <h1 className="text-white font-bold text-xl">Social</h1>
        <Flip>
          <div className="flex flex-row justify-center items-center gap-3">
            <FaFacebook className="text-white text-3xl" />
            <FaGithub className="text-white text-3xl" />
            <FaTwitter className="text-white text-3xl" />
          </div>
        </Flip>

        <p className="font-semibold text-xl text-white">
          For more information send us email at
        </p>

        <a className="text-lg font-semibold link link-hover underline underline-offset-2 text-white">
          Amyafriquee@gmail.com
        </a>
      </nav>

      <nav className="flex flex-col items-center text-center justify-between">
        <Flip>
          <img
            className="w-[100px] h-[100px]"
            src={logo}
            alt="AmyAfrique Logo"
          />
        </Flip>
        <h2 className="font-bold text-3xl text-white">Amarachi Okpara</h2>
        <p className="text-black font-semibold mt-6">
          Copyright © 2024 - All rights reserved by amyafrique.net
        </p>
        <p className="text-white text-sm md:text-base font-semibold mt-2">
          Made with <span className="text-red-600 text-lg">❤️</span> by{" "}
          <a
            href="https://www.instagram.com/__techbro.mike"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-black transition"
          >
            Codemonk
          </a>
        </p>
      </nav>
    </footer>
  );
};

export default Footer;

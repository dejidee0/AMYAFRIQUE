import { Flip } from "react-awesome-reveal";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa6";
import logo from "../../public/logo.png";

const Footer = () => {
  return (
    <div>
      <div>
        <footer className="footer p-10   border-2 border-white rounded-3xl bg-gradient-to-r from-[#eb9b40] to-[#eb9b40] text-neutral-content">
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

            <a className="text-lg  font-semibold link link-hover underline underline-offset-2 text-white">
              Amyafriquee@gmail.com
            </a>
          </nav>
          <nav>
            <Flip>
              <img className="w-[100px] h-[100px]" src={logo} alt="" />{" "}
            </Flip>
            <h2 className="font-bold text-3xl text-white">Amarachi Okpara</h2>
            <p className="text-black mt-10 font-semibold">
              Copyright © 2024 - All right reserved by amyafrique.net
            </p>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;

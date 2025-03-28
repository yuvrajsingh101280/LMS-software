import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <Footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo_dark} alt="" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
        <div></div>
        <div></div>
      </div>
      <p>copyright @2025 Academix. All Right reserved</p>
    </Footer>
  );
};

export default Footer;

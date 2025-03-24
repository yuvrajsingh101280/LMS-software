import React from "react";
import { assets } from "../../assets/assets";
import Marquee from "react-fast-marquee";
const Companies = () => {
  return (
    <div className="pt-10">
      <p className="text-base text-gray-500">Trusted by learners from</p>
      <Marquee pauseOnHover={true} autoFill={true}>
        <div className="flex flex-wrap  items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5">
          <img
            src={assets.microsoft_logo}
            alt="Microsoft"
            className="w-20 md:w-28 cursor-pointer"
          />
          <img
            src={assets.walmart_logo}
            alt="walmart"
            className="w-20 md:w-28 cursor-pointer"
          />
          <img
            src={assets.accenture_logo}
            alt="Accenture"
            className="w-20 md:w-28 cursor-pointer"
          />
          <img
            src={assets.adobe_logo}
            alt="Adobe"
            className="w-20 md:w-28 cursor-pointer"
          />
          <img
            src={assets.paypal_logo}
            alt="Paypal"
            className="w-20 md:w-28 cursor-pointer"
          />
          <div></div>
        </div>
      </Marquee>
    </div>
  );
};

export default Companies;

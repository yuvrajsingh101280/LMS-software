import React from "react";
import { assets } from "../../assets/assets";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-36 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        {/* Logo & About Section */}
        <div className="flex flex-col md:items-start items-center w-full md:w-1/4">
          <img src={assets.logo_dark} alt="Company Logo" className="w-40" />
          <p className="mt-4 text-center md:text-left text-gray-300">
            Find your dream home with us. We provide the best real estate deals
            across the city, offering modern living spaces that match your
            lifestyle.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li>
              <a href="#" className="hover:text-white block">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white block">
                Properties
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white block">
                Agents
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white block">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white block">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-300 whitespace-nowrap">
            123 Real Estate St, City, Country
          </p>
          <p className="text-gray-300 whitespace-nowrap">
            Email: info@realestate.com
          </p>
          <p className="text-gray-300 whitespace-nowrap">
            Phone: +123 456 7890
          </p>
        </div>

        {/* Social Media Links */}
        <div className="w-full md:w-1/4 flex flex-col">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-xl">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 text-gray-400 text-sm">
        <p>© 2025 Academix. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

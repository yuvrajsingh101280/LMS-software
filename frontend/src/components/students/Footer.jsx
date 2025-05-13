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
    <footer className="bg-gray-800 text-white w-full mt-16">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-36 justify-between gap-10 md:gap-32 py-16 border-b border-gray-600/30">
        {/* Logo & About Section */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/4">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            ACADEMIX
          </h1>
          <p className="mt-4 text-center md:text-left text-gray-300">
            Transform your learning experience with Academix. Courses designed
            for your success, anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="#" className="hover:text-blue-500">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Teachers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
          <p className="text-gray-300">Damodarpur, Dhanbad-826004</p>
          <p className="text-gray-300">Email: support@academix.com</p>
          <p className="text-gray-300">Phone: +91 9471718169</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center gap-6 py-4 bg-gray-700">
        <a href="#" className="text-white hover:text-blue-500">
          <FaFacebookF size={20} />
        </a>
        <a href="#" className="text-white hover:text-blue-500">
          <FaTwitter size={20} />
        </a>
        <a href="#" className="text-white hover:text-pink-500">
          <FaInstagram size={20} />
        </a>
        <a href="#" className="text-white hover:text-blue-700">
          <FaLinkedinIn size={20} />
        </a>
      </div>

      {/* Copyright */}
      <div className="text-center py-6 text-gray-400 text-sm">
        <p>© 2025 Academix. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

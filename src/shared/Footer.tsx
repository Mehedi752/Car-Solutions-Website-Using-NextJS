import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import footerImg from '../../public/logo2.svg'; 
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#1d1d1d] text-white py-20 ">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center mb-2">
            <Image
              src={footerImg}
              alt="Car Doctor Logo"
              width={50}
              height={50}
              className="mr-2"
            />
            <h1 className="text-lg font-semibold">Car Doctor</h1>
          </div>
          <p className="text-gray-400">
            Edwin Diaz is a software and web technologies engineer, a life coach
            trainer who is also a serial.
          </p>
          <div className="flex space-x-3 mt-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <FaGoogle />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* About Links */}
        <div>
          <h3 className="text-base font-semibold mb-2">About</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#">Home</a></li>
            <li><a href="#">Service</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-base font-semibold mb-2">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#">Why Car Doctor</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-base font-semibold mb-2">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#">Support Center</a></li>
            <li><a href="#">Feedback</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

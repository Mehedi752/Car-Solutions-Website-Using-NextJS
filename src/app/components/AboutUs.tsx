import React from 'react';
import img1 from '../../../public/about_us/person.jpg'
import img2 from '../../../public/about_us/parts.jpg';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 items-center">
        {/* Left Images */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Image
            src={img1}
            alt="Person"
            width={256}
            height={256}
            className="w-80 h-80 object-cover rounded-md shadow-md"
          />
          <Image
            src={img2}
            width={256}
            height={256}
            alt="Tools"
            className="w-80 h-64 object-cover rounded-md shadow-md -mt-16 ml-20"
          />
        </div>

        {/* Right Content */}
        <div>
          <p className="text-red-600 font-semibold mb-2">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug text-gray-900 mb-4">
            We are qualified<br />& of experience<br />in this field
          </h2>
          <p className="text-gray-600 mb-4">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.
          </p>
          <p className="text-gray-600 mb-6">
            The majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.
          </p>
          <button className="bg-red-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-orange-700 transition">
            Get More Info
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialSection = () => {
  return (
    <div className="pb-20 px-6 md:px-10 lg:px-20 bg-gradient-to-b from-white to-blue-50 text-center">
      <h2 className="text-4xl font-bold text-blue-700">
        What Our Students Say
      </h2>
      <p className="text-lg text-gray-600 mt-3 max-w-3xl mx-auto">
        Real experiences from real learners. Discover how Academix helped
        students achieve more with smarter, simpler, and structured learning.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14 text-left">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl bg-white shadow-xl transition hover:shadow-2xl duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-blue-100 rounded-t-xl">
              <img
                className="h-12 w-12 rounded-full border-2 border-blue-400"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-semibold text-blue-800">
                  {testimonial.name}
                </h1>
                <p className="text-blue-600 text-sm">{testimonial.role}</p>
              </div>
            </div>

            <div className="p-5 pb-7">
              <div className="flex gap-1">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <img
                      className="h-5"
                      key={i}
                      src={
                        i < Math.floor(testimonial.rating)
                          ? assets.star
                          : assets.star_blank
                      }
                      alt="star"
                    />
                  ))}
              </div>
              <p className="text-gray-700 mt-4 leading-relaxed">
                “{testimonial.feedback}”
              </p>
            </div>

            <div className="px-5 pb-4">
              <a
                href="#"
                className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;

import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-pink-50 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          What Our Clients Say
        </h2>

        {/* Testimonial Card */}
        <div className="bg-white rounded-3xl shadow-lg p-10 relative">
          
          {/* Quote Icon */}
          <div className="text-6xl text-pink-500 absolute -top-6 left-6">
            “
          </div>

          {/* Review Text */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8 mt-6">
            Absolutely the best salon experience I've ever had. The staff is 
            incredibly professional and the atmosphere is pure relaxation.
          </p>

          {/* Divider */}
          <div className="w-16 h-1 bg-pink-500 mx-auto mb-6 rounded-full"></div>

          {/* User Info */}
          <div className="flex flex-col items-center">
            
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-pink-200 flex items-center justify-center text-2xl font-semibold text-pink-700 mb-4">
              ER
            </div>

            {/* Name */}
            <h4 className="text-xl font-semibold text-gray-800">
              Emily Roberts
            </h4>

            {/* Role */}
            <p className="text-gray-500 text-sm">
              Regular Customer
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

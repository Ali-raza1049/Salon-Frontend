import React from "react";
import { motion } from "framer-motion";
import { services } from "../../Data.js";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const FeaturedServices = () => {
  return (
    <section className="bg-gray-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Featured <span className="text-amber-500">Services</span>
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-md">
              Curated grooming and styling treatments for the modern gentleman.
            </p>
          </div>

          {/* Desktop View All Button */}
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-block mt-6 md:mt-0 px-6 py-2 border border-amber-500 text-amber-500 rounded-full font-semibold hover:bg-amber-500 hover:text-white transition duration-300 shadow-md"
            >
              View All Services →
            </motion.button>
          </Link>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-10"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 overflow-hidden border border-gray-100"
            >
              {/* Popular Badge */}
              {service.popular && (
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-md"
                >
                  Popular
                </motion.span>
              )}

              {/* Image */}
              <div className="overflow-hidden rounded-t-3xl">
                <motion.img
                  src={`${service.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={service.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {service.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                    <span>{service.duration}</span>
                    <span>⭐ {service.rating}</span>
                  </div>

                  <p className="text-amber-500 font-bold text-xl mt-3">
                    {service.price}
                  </p>
                </div>

                {/* Book Now Button */}
                <Link to="/book">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition duration-300 shadow-md"
                  >
                    Book Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center md:hidden"
        >
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-amber-500 text-amber-500 rounded-full font-semibold hover:bg-amber-500 hover:text-white transition duration-300 shadow-md"
            >
              View All Services →
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedServices;
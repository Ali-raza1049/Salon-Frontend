import React from "react";
import { motion } from "framer-motion";
import Heroimage from "../../assets/images/Heroimage.avif";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-8">
      <div className="relative rounded-3xl overflow-hidden h-[75vh] shadow-lg">

        {/* Animated Background Image */}
        <motion.img
          src={Heroimage}
          alt="Alshanab & Alsawad Gents Salon"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        {/* Animated Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white"
        >
          
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            Welcome to
            <span className="block text-amber-500 mt-2">
              Alshanab & Alsawad
            </span>
            <span className="block text-gray-100 text-lg md:text-xl mt-1 tracking-wide uppercase">
              Gents Salon
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-gray-200 text-md md:text-lg"
          >
            Experience world-class grooming services tailored just for you.
            From classic haircuts to luxury styling, we redefine elegance and comfort.
          </motion.p>
           <Link to="/book">
          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 w-fit bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-md"
          >
            Book Your Appointment →
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

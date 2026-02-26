import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff } from "../../redux/slice/TeamSlice";
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
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ExpertSection = () => {
  const dispatch = useDispatch();
  const { staff, loading, error } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  return (
    <section className="bg-gray-50 py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2"
        >
          Meet Our <span className="text-amber-500">Experts</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-600 text-base sm:text-lg md:text-xl mb-12 sm:mb-16 max-w-2xl mx-auto"
        >
          Our professional team is ready to transform your look with precision and style.
        </motion.p>

        {loading && (
          <p className="text-gray-500 text-lg">Loading experts...</p>
        )}

        {error && (
          <p className="text-red-500 text-lg">{error}</p>
        )}

        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10"
          >
            {staff.map((expert) => (
              <motion.div
                key={expert._id}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="group relative bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500 border border-gray-100"
              >
                {/* Image */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden ring-2 ring-amber-500">
                  <motion.img
                    src={
                      expert.image
                        ? expert.image
                        : "https://via.placeholder.com/150"
                    }
                    alt={expert.name}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Name */}
                <h3 className="mt-5 text-lg sm:text-xl font-semibold text-gray-900">
                  {expert.name}
                </h3>

                {/* Role */}
                <p className="text-amber-500 text-sm sm:text-base font-medium mt-1">
                  {expert.role}
                </p>

                {expert.rating && (
                  <div className="flex justify-center mt-2 text-yellow-400 text-base sm:text-lg">
                    {"⭐".repeat(expert.rating)}
                  </div>
                )}

                <Link to="/book">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="mt-4 sm:mt-6 w-full py-2 sm:py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition duration-300 shadow-md text-sm sm:text-base"
                  >
                    Book Now
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExpertSection;
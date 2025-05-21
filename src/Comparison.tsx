import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1
    }
  }
};

function Comparison() {

  return (
    <motion.section 
      id="comparison"
      className="py-20 px-4 bg-black border-t border-primary/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto">
        <motion.h2 variants={fadeIn} className="text-4xl font-bold text-center mb-12 text-primary font-cyber uppercase tracking-widest">
          Stealth Comparison
        </motion.h2>
        <motion.p variants={fadeIn} className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto font-sans">
          Observe SHADOW's user interface versus the view during proctored screen sharing. Utterly invisible to external viewers.
        </motion.p>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-6" // Increased gap
          variants={staggerContainer} 
        >
          {/* User View Card */}
          <motion.div 
            variants={fadeIn} 
            className="text-center p-4 border-2 border-primary/50 rounded-xl shadow-xl bg-accent/10" // Increased padding
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-100 font-cyber">User View [SHADOW Active]</h3>
            <motion.video
              preload='metadata'
              autoPlay
              loop
              muted
              className="aspect-video w-full rounded-lg h-[430px] object-cover shadow-2xl border-2 border-primary/30"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <source src="https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/userpov.mov" type="video/mp4" />
            </motion.video>
            <p className="mt-4 text-gray-400 font-sans text-sm">Critical data overlaid discreetly.</p>
          </motion.div>
  
          {/* Observer View Card */}
          <motion.div 
            variants={fadeIn} 
            className="text-center p-4 border-2 border-gray-700 rounded-xl shadow-xl bg-accent/10" // Increased padding
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-100 font-cyber">Observer View [Screen Share]</h3>
            <motion.video
              preload='metadata'
              autoPlay
              loop
              muted
              className="aspect-video w-full h-[430px] rounded-lg shadow-2xl border-2 object-cover border-gray-700"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <source src="https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/observerpov.mp4" type="video/mp4" />
            </motion.video>
            <p className="mt-4 text-gray-400 font-sans text-sm">Observer sees a standard, unmodified screen.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Comparison;
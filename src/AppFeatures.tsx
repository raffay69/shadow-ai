import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Move, EyeOff, MousePointerClick, CircleHelp } from 'lucide-react';
import { Lens } from "./components/lens";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

function AppFeatures() {
  const features = [
    { icon: Move, title: "Fluid Positioning", description: "Drag and place the SHADOW interface anywhere on your screen for optimal viewing.", src: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/movement.mp4' },
    { icon: EyeOff, title: "Instant Stealth", description: "Toggle visibility instantly with a hotkey. Disappears completely from view and recordings.", src: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/toggle.mov' },
    { icon: MousePointerClick, title: "Click-Through Mode", description: "Enable click-through to interact with underlying applications without interference.", src: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/click-through.mov' },
    { icon: CircleHelp, title: "Debug Mode", description: "Enables iterative troubleshooting by allowing screenshot capture and analysis after applying a solution. If errors or unexpected behavior occur, the system can review visual output, identify issues, and refine the solution accordingly.", src: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/debug.mov' }

  ];

  return (
    <motion.section 
      id="app-features"
      className="py-20 px-4 bg-black text-white border-t border-primary/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto ">
        <motion.h2 variants={fadeIn} className="text-4xl font-bold text-center mb-16 text-primary font-cyber uppercase tracking-widest">Application Features</motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ boxShadow: '0 12px 25px rgba(220, 38, 38, 0.4)' }}
              className="relative group overflow-hidden rounded-xl shadow-2xl border-2 border-primary/30 hover:border-primary hover:shadow-3xl hover:shadow-primary/50 transition-all duration-300 flex flex-col bg-accent transform h-full min-w-[500px]"
            >
              <div className="relative w-full aspect-video bg-black overflow-hidden">
                <motion.video
                  src={feature.src}
                  loop
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-100"
                  initial={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center mb-4">
                  <feature.icon className="text-primary mr-4 flex-shrink-0" size={32} />
                  <h3 className="text-2xl font-bold text-gray-100 font-cyber uppercase tracking-wider">{feature.title}</h3>
                </div>
                <p className="text-gray-300 font-sans text-base leading-relaxed flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AppFeatures;
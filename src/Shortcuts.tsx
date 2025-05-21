import React from 'react';
import { motion } from 'framer-motion';
import { Keyboard } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

function Shortcuts() {
  const shortcuts = [
    { key: '⌘ / CTRL + Q', description: 'Quit' },
    { key: '⌘ / CTRL + L', description: 'LogOut & Quit' },
    { key: '⌘ / CTRL + → ← ↓ ↑', description: 'Movement' },
    { key: '⌘ / CTRL + D', description: 'Toggle clickthrough' },
    { key: '⌘ / CTRL + 0', description: 'Toggle window' },
    { key: '⌘ / CTRL + H', description: 'Take Screenshot' },
    { key: '⌘ / CTRL + G', description: 'Delete Screenshot' },
    { key: '⌘ / CTRL + P', description: 'Process (Problems)' },
    { key: '⌘ / CTRL + M', description: 'Process (MCQs)' },
    { key: '⌘ / CTRL + R', description: 'Reset' },
  ];

  return (
    <motion.section 
      id="shortcuts"
      className="py-20 px-4 bg-accent text-white border-t border-primary/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto">
        <motion.h2 variants={fadeIn} className="text-4xl font-bold text-center mb-12 text-primary font-cyber flex items-center justify-center gap-3 uppercase tracking-widest"><Keyboard size={36}/>Command Keys</motion.h2>
        <motion.div 
          variants={fadeIn} 
          className="max-w-2xl mx-auto bg-secondary p-8 rounded-md shadow-lg shadow-black border border-primary/30"
        >
          <motion.ul className="space-y-4" variants={staggerContainer}>
            {shortcuts.map((shortcut, index) => (
              <motion.li 
                key={index} 
                variants={fadeIn}
                className="flex justify-between items-center border-b border-gray-700 pb-3"
              >
                <span className="text-lg text-gray-300 font-sans">{shortcut.description}</span>
                <motion.kbd 
                  whileHover={{ scale: 1.1, color: '#fff', backgroundColor: '#b91c1c' }}
                  className="bg-primary text-gray-900 font-mono px-3 py-1 rounded-sm text-lg font-semibold shadow-sm shadow-primary/50"
                >
                  {shortcut.key}
                </motion.kbd>

              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Shortcuts;
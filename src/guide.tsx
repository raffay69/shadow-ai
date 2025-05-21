import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

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

function GeminiApiGuide() {
  return (
    <motion.section
      className="py-20 px-4 bg-accent text-white border-t border-primary/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.h2 variants={fadeIn} className="text-4xl font-bold text-center mb-12 text-primary font-cyber uppercase tracking-widest">Gemini API Guide</motion.h2>
        
        <motion.div variants={fadeIn} className="bg-secondary p-6 rounded-md shadow-lg shadow-black border border-primary/30 mb-12">
          <p className="text-lg text-gray-300 font-sans mb-6">
            Here's How You Can Get Your Gemini API Key and Model Name. If you're trying to use Google's Gemini API, you'll need two things: your <strong>API key</strong> and the correct <strong>model name</strong>. Here's how to get both.
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold text-primary font-cyber uppercase tracking-wider mb-2"> Step 1: Get Your Gemini API Key</h3>
              <ul className="space-y-4 text-gray-300 font-sans">
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>Go to <strong>Google AI Studio</strong>: 👉 <a href="https://aistudio.google.com" className="text-primary underline hover:text-red-400 transition-colors" target="_blank" rel="noopener noreferrer">https://aistudio.google.com</a></span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>Sign in with your Google account.</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>Once you're in, head to the API key page: 👉 <a href="https://aistudio.google.com/app/apikey" className="text-primary underline hover:text-red-400 transition-colors" target="_blank" rel="noopener noreferrer">https://aistudio.google.com/app/apikey</a></span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>Click <strong>"Create API Key"</strong> and copy it somewhere safe. You'll need it to authenticate with the Gemini API.</span>
                </li>
              </ul>
            </div>
            
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold text-primary font-cyber uppercase tracking-wider mb-2"> Step 2: Find the Correct Gemini Model Name</h3>
              <ul className="space-y-4 text-gray-300 font-sans">
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>Go to the <strong>official Gemini model documentation</strong>: 👉 <a href="https://ai.google.dev/models/gemini" className="text-primary underline hover:text-red-400 transition-colors" target="_blank" rel="noopener noreferrer">https://ai.google.dev/models/gemini</a></span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>There, you'll find a list of available models, like:</span>
                  <ul className="ml-8 mt-2 space-y-2">
                    <li><code className="bg-black/30 px-2 py-1 rounded text-primary">gemini-2.5-flash-preview-04-17</code></li>
                    <li><code className="bg-black/30 px-2 py-1 rounded text-primary">gemini-2.0-flash</code></li>
                    <li><code className="bg-black/30 px-2 py-1 rounded text-primary">gemini-1.5-flash</code></li>
                  </ul>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="text-primary mt-1 mr-2 flex-shrink-0" size={16} />
                  <span>Use the name exactly as listed. These are case-sensitive and required when specifying which model to use.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default GeminiApiGuide;
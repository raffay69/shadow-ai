import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for smoother motion
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      ease: "easeOut"
    }
  }
};

const faqData: FAQItem[] = [
  {
    question: 'Is SHADOW truly undetectable by proctoring software?',
    answer: 'SHADOW operates at a level below standard screen recording and proctoring detection methods. Its core architecture is designed for maximum stealth, making it invisible to common anti-cheat systems. However, no system is 100% foolproof against all possible future detection techniques.'
  },
  {
    question: 'What types of exams can SHADOW assist with?',
    answer: 'SHADOW excels in multiple-choice question (MCQ) exams across various platforms and can provide significant assistance for LeetCode-style coding challenges and similar technical assessments. Its adaptability makes it useful for a wide range of online tests.'
  },
  {
    question: "What's the accuracy of the answers given by SHADOW?",
    answer: "SHADOW leverages advanced AI to provide highly accurate answers across a wide range of subjects. While it's designed for precision, no AI is perfect—occasional errors can occur, especially with ambiguous or poorly framed questions. Users are encouraged to review answers critically when accuracy is crucial."
  },
  {
    question: 'What operating systems are supported?',
    answer: 'Currently, SHADOW clients are available for Windows (10 and 11) and macOS (11 Big Sur and later). We are continuously working on expanding compatibility.'
  },
];

function AccordionItem({ item, isOpen, onClick }: AccordionItemProps) {
  // Calculate content height for smoother animation
  const contentRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div className="border-b border-primary/30 overflow-hidden">
      <motion.button
        className="w-full flex justify-between items-center py-4 px-5 text-left font-cyber text-sm md:text-base text-gray-200 hover:bg-primary/10 transition-colors duration-200"
        onClick={onClick}
        whileHover={{ paddingLeft: 28 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <span className="flex-1 pr-4">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
        >
          <ChevronDown size={20} className={`transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-gray-500'}`} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            ref={contentRef}
            key={`content-${item.question}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { 
                  type: "spring",
                  stiffness: 500, 
                  damping: 30,
                  mass: 1
                },
                opacity: { duration: 0.25, ease: "easeInOut" }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { 
                  type: "spring",
                  stiffness: 500, 
                  damping: 30,
                  mass: 0.8
                },
                opacity: { duration: 0.2, ease: "easeOut" }
              }
            }}
            className="overflow-hidden"
          >
            <motion.div 
              className="px-5 pb-4 pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.1, 
                  duration: 0.3, 
                  ease: "easeOut" 
                }
              }}
              exit={{ 
                opacity: 0, 
                y: 5, 
                transition: { 
                  duration: 0.2, 
                  ease: "easeIn" 
                } 
              }}
            >
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      id="faq"
      className="py-20 px-4 bg-black text-white border-t-4 border-primary/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto max-w-3xl">
        <motion.h2 
          variants={fadeIn} 
          className="text-4xl font-bold text-center mb-12 text-primary font-cyber flex items-center justify-center gap-3 uppercase tracking-widest"
        >
          <HelpCircle size={36}/> Intel Briefing (FAQ)
        </motion.h2>
        <motion.div 
          variants={staggerContainer}
          className="bg-accent rounded-lg shadow-lg shadow-black border border-primary/50 overflow-hidden"
        >
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default FAQ;
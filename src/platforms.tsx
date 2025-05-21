import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronDown, ShieldCheck, AlertCircle } from 'lucide-react';

interface Tag {
  type: 'Undetectable' | 'Conditional';
  label: string;
}

interface PlatformItem {
  logoSrc: string; // Changed from icon to logoSrc for .avif files
  name: string; 
  description: string;
  tag: Tag;
}

interface AccordionItemProps {
  item: PlatformItem;
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
      ease: [0.22, 1, 0.36, 1]
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      ease: "easeOut"
    }
  }
};

// Glow animation variants
const greenGlow: Variants = {
  initial: { 
    boxShadow: "0 0 0 0 rgba(74, 222, 128, 0)" 
  },
  animate: { 
    boxShadow: "0 0 8px 2px rgba(74, 222, 128, 0.6)",
    transition: {
      duration: 1.25,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

const orangeGlow: Variants = {
  initial: { 
    boxShadow: "0 0 0 0 rgba(245, 158, 11, 0)" 
  },
  animate: { 
    boxShadow: "0 0 8px 2px rgba(245, 158, 11, 0.6)",
    transition: {
      duration: 1.25,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

// Sample data with different tags and .avif logo paths
const platformData: PlatformItem[] = [
  {
    logoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/zoom.avif', // Update with your actual path
    name: 'Zoom',
    description: `
    <div style="color: yellow ; margin: 10px 0;">
    To ensure everything runs smoothly, please use Zoom version 6.16 or earlier, or enable Advanced Capture with window filtering in your Zoom settings.
    </div>
    <div style="margin-top: 10px;">
    <img src="https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/zoom_setting.png" alt="Zoom Settings Guide" style="max-width: 100%; border-radius: 4px;">
    </div>`,
    tag: {
      type: 'Conditional',
      label: 'CONDITIONAL'
    }
  },
  {
    logoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/google_meet.avif',
    name: 'Google Meet',
    description: `We've thoroughly tested Shadow on this platform and can confidently confirm that it remains completely undetectable during usage, screen sharing, and recordings.
   <div style="color: white; margin: 10px 0;">
<strong>BASIC CHECK:</strong><br/>
- Download the app (no payment needed)<br/>
- Start a Google Meet<br/>
- Share your screen<br/>
- Verify that Shadow remains invisible
</div>

If it is visible during the screen share, it means Shadow is not compatible with your system.
`,
    tag: {
      type: 'Undetectable',
      label: 'UNDETECTABLE'
    }
  },
  {
    logoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/mercer.avif',
    name: 'Mettl',
    description: `We've thoroughly tested Shadow on this platform and can confidently confirm that it remains completely undetectable during usage, screen sharing, and recordings.
   <div style="color: white; margin: 10px 0;">
<strong>BASIC CHECK:</strong><br/>
- Download the app (no payment needed)<br/>
- Start a Google Meet<br/>
- Share your screen<br/>
- Verify that Shadow remains invisible
</div>

If it is visible during the screen share, it means Shadow is not compatible with your system.
`,
    tag: {
      type: 'Undetectable',
      label: 'UNDETECTABLE'
    }
  },
  {
    logoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/autoproctor.avif',
    name: 'Autoproctor',
    description: `We've thoroughly tested Shadow on this platform and can confidently confirm that it remains completely undetectable during usage, screen sharing, and recordings.
   <div style="color: white; margin: 10px 0;">
<strong>BASIC CHECK:</strong><br/>
- Download the app (no payment needed)<br/>
- Start a Google Meet<br/>
- Share your screen<br/>
- Verify that Shadow remains invisible
</div>

If it is visible during the screen share, it means Shadow is not compatible with your system.
`,
    tag: {
      type: 'Undetectable',
      label: 'UNDETECTABLE'
    }
  },
  {
    logoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/coderpad.avif',
    name: 'Coderpad', 
    description: `We've thoroughly tested Shadow on this platform and can confidently confirm that it remains completely undetectable during usage, screen sharing, and recordings.
    <div style="color: white; margin: 10px 0;">
 <strong>BASIC CHECK:</strong><br/>
 - Download the app (no payment needed)<br/>
 - Start a Google Meet<br/>
 - Share your screen<br/>
 - Verify that Shadow remains invisible
 </div>
 
 If it is visible during the screen share, it means Shadow is not compatible with your system.
 `,
     tag: {
      type: 'Undetectable',
      label: 'UNDETECTABLE'
    }
  },
  {
    logoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/codesignal.avif', 
    name: 'codesignal', 
    description: `We've thoroughly tested Shadow on this platform and can confidently confirm that it remains completely undetectable during usage, screen sharing, and recordings.
    <div style="color: white; margin: 10px 0;">
 <strong>BASIC CHECK:</strong><br/>
 - Download the app (no payment needed)<br/>
 - Start a Google Meet<br/>
 - Share your screen<br/>
 - Verify that Shadow remains invisible
 </div>
 
 If it is visible during the screen share, it means Shadow is not compatible with your system.
 `,    tag: {
      type: 'Undetectable',
      label: 'UNDETECTABLE'
    }
  },
  {
    logoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/hackerrank.avif', 
    name: 'hackerrank', 
    description: `We've thoroughly tested Shadow on this platform and can confidently confirm that it remains completely undetectable during usage, screen sharing, and recordings.
    <div style="color: white; margin: 10px 0;">
 <strong>BASIC CHECK:</strong><br/>
 - Download the app (no payment needed)<br/>
 - Start a Google Meet<br/>
 - Share your screen<br/>
 - Verify that Shadow remains invisible
 </div>
 
 If it is visible during the screen share, it means Shadow is not compatible with your system.
 `,    tag: {
      type: 'Undetectable',
      label: 'UNDETECTABLE'
    }
  },
  {
    logoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/team.avif', 
    name: 'microsoft teams', 
    description: `We've thoroughly tested Shadow on this platform and can confidently confirm that it remains completely undetectable during usage, screen sharing, and recordings.
    <div style="color: white; margin: 10px 0;">
 <strong>BASIC CHECK:</strong><br/>
 - Download the app (no payment needed)<br/>
 - Start a Google Meet<br/>
 - Share your screen<br/>
 - Verify that Shadow remains invisible
 </div>
 
 If it is visible during the screen share, it means Shadow is not compatible with your system.
 `,    tag: {
      type: 'Undetectable',
      label: 'UNDETECTABLE'
    }
  }
];

// Component to render different tag styles based on tag type
function StatusTag({ tag }: { tag: Tag }) {
  let tagClasses = "flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-lg border";
  let tagIcon = null;
  let glowVariant = null;
  let textShadow = {};
  
  switch (tag.type) {
    case 'Undetectable':
      tagClasses += " bg-green-600/20 text-green-400  border-green-600/50";
      tagIcon = <ShieldCheck size={12} />;
      glowVariant = greenGlow;
      textShadow = { textShadow: "0 0 4px rgba(74, 222, 128, 0.7)" };
      break;
    case 'Conditional':
      tagClasses += " bg-amber-600/20 text-amber-400 border-amber-600/50";
      tagIcon = <AlertCircle size={12} />;
      glowVariant = orangeGlow;
      textShadow = { textShadow: "0 0 4px rgba(245, 158, 11, 0.7)" };
      break;
  }
  
  return (
    <motion.span 
      className={tagClasses}
      initial="initial"
      animate="animate"
      variants={glowVariant}
      style={textShadow}
    >
      {tagIcon}
      {tag.label}
    </motion.span>
  );
}

function AccordionItem({ item, isOpen, onClick }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div className="border-b border-primary/30 overflow-hidden">
      <motion.button
        className="w-full flex justify-between items-center py-4 px-5 text-left hover:bg-primary/10 transition-colors duration-200"
        onClick={onClick}
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="flex items-center space-x-3">
           {/* Replace Lucide icon with .avif image */}
           <img 
             src={item.logoSrc} 
             alt={`${item.name} logo`} 
             className={`w-20 h-20  mr-5 object-contain transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-70'} filter brightness-0 invert`} 
           />
           <span className="font-cyber text-lg md:text-xl text-gray-200 tracking-wider uppercase">{item.name}</span>
        </div>
        <div className="flex items-center space-x-4">
          <StatusTag tag={item.tag} />
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ 
              duration: 0.3,
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
          >
            <ChevronDown size={20} className={`transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-gray-500'}`} />
          </motion.div>
        </div>
      </motion.button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            ref={contentRef}
            key={`content-${item.name}`}
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
              className="px-5 pb-4 pl-12 pt-2"
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
            <p className="text-gray-400 font-sans text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }}/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PlatformCompatibility(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Start with the first item open

  const handleClick = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      id="compatibility"
      className="py-20 px-4 bg-black text-white border-t border-primary/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.h2 
          variants={fadeIn} 
          className="text-4xl font-bold text-center mb-12 text-primary font-cyber flex items-center justify-center gap-3 uppercase tracking-widest"
        >
          Platform Compatibility
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          className="bg-accent rounded-lg shadow-lg shadow-black border border-primary/50 overflow-hidden"
        >
          {platformData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </motion.div>
        <motion.p 
          variants={fadeIn} 
          className="text-center text-gray-500 mt-12 text-sm font-sans italic"
        >
          SHADOW is engineered for stealth across standard desktop environments and web applications.
        </motion.p>
      </div>
    </motion.section>
  );
}

export default PlatformCompatibility;
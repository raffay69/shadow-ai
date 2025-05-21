import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, KeyRound, Bot, CheckCircle, Camera, Flag, ListChecks, RefreshCw, LanguagesIcon } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, type: 'spring', stiffness: 100 } } 
}

const cardVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const videoVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

function Workflow() {
  const steps = [
    { 
      icon: LogIn, 
      title: "User Login", 
      description: "Launch the application to access the login page and authenticate yourself.", 
      videoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/login.mov' 
    },
    { 
      icon: KeyRound, 
      title: "Payment Access", 
      description: "If not paid, a payment page will appear to initiate the transaction.", 
      videoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/notpaid.mov' 
    },
    { 
      icon: Bot, 
      title: "Payment Completion", 
      description: "Click the payment button and complete the process to unlock the full app.", 
      videoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/payment.mov' 
    },
    { 
      icon: LanguagesIcon, 
      title: "App Initialization", 
      description: (
        <>
          After payment, provide your Gemini API key, model, and preferred programming language.{""}
          <a
            href="/gemini-guide"
            className="text-primary hover:underline font-medium"
            rel="noopener noreferrer"
          >
            (view setup guide)
          </a>
        </>
      ), 
      videoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/init.mov' 
    },
    { 
      icon: Camera, 
      title: "Screenshot Capture", 
      description: "Press Cmd/Ctrl + H to capture screenshots of the content you want to analyze . You can take upto 3 screenshots.", 
      videoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/screenshot-p.mov' ,
      style : 'object-contain'
    },
    { 
      icon: Flag, 
      title: "Problem Solving", 
      description: "Press Cmd/Ctrl + P to solve the screenshots problems and get the solutionsa along with thoughts,time and space complexity and a dry run.", 
      videoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/p-solve.mov' ,
      style:"object-contain"
      
    },
    { 
      icon: ListChecks, 
      title: "MCQ Solving", 
      description: "Press Cmd/Ctrl + M to extract and solve multiple-choice questions from screenshots.It may be a bit slow, but that's to ensure the answers are accurate and well-verified.", 
      videoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/solve-m.mov' 
    },
    { 
      icon: RefreshCw, 
      title: "Workflow Reset", 
      description: "Press Cmd/Ctrl + R to reset the entire session and start a new flow.", 
      videoSrc: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/reset.mov' 
    }
  ];

  return (
    <section id="workflow" className="py-28 px-4 bg-black border-t border-primary/30 overflow-hidden">
      <div className="container mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
          className="text-5xl font-bold text-center mb-28 text-primary font-cyber uppercase tracking-widest drop-shadow-glow"
        >
          Operational Sequence
        </motion.h2>
  
        <div className="relative max-w-7xl mx-auto">
          <div className="space-y-28 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col md:flex-row items-center md:items-stretch mb-28 md:mb-0 min-h-[600px]"
              >
                {/* Info Content - Left Side */}
                <motion.div 
                  variants={cardVariant}
                  className="w-full md:w-5/12 px-6 flex flex-col justify-center order-2 md:order-1 z-10"
                >
                  <div className="relative space-y-6 text-center md:text-right">
                    <div className="inline-flex items-center md:justify-end gap-4">
                      <step.icon className="text-primary w-8 h-8" />
                      <h3 className="text-3xl font-bold text-gray-100 font-cyber uppercase tracking-wider">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed max-w-xl md:ml-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
  
                {/* Timeline Center */}
                <div className="w-full md:w-2/12 flex justify-center relative order-1 md:order-2">
                  <div className="relative h-full w-full flex items-center justify-center">
                    {/* Animated Line */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "0px 0px -25% 0px" }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      className="absolute w-1 bg-gradient-to-b from-primary via-primary/80 to-primary origin-top"
                      style={{ height: '100%' }}
                    />
                    
                    {/* Centered Dot */}
                    <motion.div
                      variants={scaleIn}
                      className="absolute w-7 h-7 bg-primary rounded-full border-4 border-black ring-4 ring-primary/50 z-10"
                      style={{ top: '50%', transform: 'translateY(-50%)' }}
                    />
                  </div>
                </div>
  
                {/* Video - Right Side */}
                <motion.div 
                  variants={videoVariant}
                  className="w-full md:w-8/12 px-6 flex items-center order-3 relative"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full border-2 border-primary/30 hover:border-primary/60 transition-all duration-300">
                    <video
                      preload='metadata'
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`w-full h-[550px] ${step.style?`${step.style}`:"object-cover"}`}
                    >
                      <source src={step.videoSrc} type="video/mp4" />
                    </video>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Workflow;
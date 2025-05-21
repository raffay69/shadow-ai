import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {  ShieldCheck, Code, ListChecks, EyeOff, Zap,  MonitorPlay, Apple } from 'lucide-react';
import Comparison from './Comparison';
import Shortcuts from './Shortcuts'; 
import Workflow from './Workflow';
import AppFeatures from './AppFeatures';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/authContext'
import { Toaster } from './components/sonner'
import Login from './login';
import SignUp from './signup';
import AuthButtons from './components/authButtons';
import Payment from './payment';
import FAQ from './faqs';
import PlatformCompatibility from './platforms';
import GeminiApiGuide from './guide';
import { Lens } from './components/lens';

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

function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-accent text-white p-4 sticky top-0 z-50 shadow-lg shadow-primary/20 border-b border-primary/30 backdrop-blur-sm bg-opacity-90"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center space-x-2 group"
        >
          <img src="icon_256x256x32.png" alt="logo" style={{height:"45px"}} />
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold font-cyber text-primary tracking-widest uppercase glitch-hover">SHADOW</span>
          </Link>
        </motion.div>
        <nav className="space-x-8 flex items-center font-cyber text-xs uppercase tracking-widest">
          <motion.a variants={fadeIn} href="/#comparison" className="text-gray-300 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Comparison</motion.a>
          <motion.a variants={fadeIn} href="/#features" className="text-gray-300 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Overview</motion.a>
          <motion.a variants={fadeIn} href="/#workflow" className="text-gray-300 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Workflow</motion.a>
          <motion.a variants={fadeIn} href="/#app-features" className="text-gray-300 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full">App Features</motion.a>
          <motion.a variants={fadeIn} href="/#shortcuts" className="text-gray-300 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Shortcuts</motion.a>
          <motion.a variants={fadeIn} href="/#pricing" className="text-gray-300 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full">Pricing</motion.a>
          {/* <motion.a
            variants={fadeIn}
            href="#download"
            className="bg-primary hover:bg-red-700 text-gray-900 font-bold py-2 px-5 transition-all duration-300 shadow-md shadow-primary/50 hover:shadow-lg hover:shadow-primary/70 transform hover:scale-105"
            style={{ clipPath: 'polygon(10px 0%, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
          >
            Download
          </motion.a> */}

          {/* <motion.div variants={fadeIn} className="flex items-center space-x-4">
             <Link to="/login" className="flex items-center gap-1 text-gray-300 hover:text-primary transition-colors duration-300">
                <LogIn size={16}/> Login
             </Link>
              <Link to="/signup" className="flex items-center gap-1 bg-primary hover:bg-red-700 text-gray-900 font-bold py-2 px-3 transition-all duration-300 shadow-md shadow-primary/50 hover:shadow-lg hover:shadow-primary/70 transform hover:scale-105 text-xs"
                style={{ clipPath: 'polygon(8px 0%, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
               >
                <UserPlus size={14}/> Sign Up
             </Link>
          </motion.div> */}
          <AuthButtons />
        </nav>
      </div>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="bg-secondary text-white py-24 px-4 border-b-4 border-primary" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODI3ODh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzQ1NjIxOTd8&ixlib=rb-4.0.3&q=80&w=1080')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(26, 26, 26, 0.8)' }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container mx-auto text-center bg-black bg-opacity-80 p-10 rounded-md border-2 border-primary/50 shadow-xl shadow-primary/30"
      >
        <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl font-bold font-cyber mb-4 leading-tight text-primary">STAY IN THE <span className='text-gray-600'> SHADOWS </span> DOMINATE ASSESSMENTS</motion.h1>
        <motion.p variants={fadeIn} className="text-xl md:text-2xl mb-8 text-gray-300 font-sans">SHADOW delivers invisible assistance for MCQs & coding challenges. Bypass proctoring and screen sharing effortlessly.</motion.p>
        <motion.a
          variants={fadeIn}
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(220, 38, 38, 0.7)' }}
          whileTap={{ scale: 0.95 }}
          href="#download"
          className="bg-primary hover:bg-red-700 text-gray-900 font-bold font-cyber py-3 px-8 rounded-sm text-lg transition-colors duration-300 inline-block shadow-lg shadow-primary/50"
        >
          ACCESS SHADOW NOW
        </motion.a>
      </motion.div>
    </section>
  );
}

function Features() {

   const features = [
    {
      icon: EyeOff,
      title: "Total Invisibility",
      description: "Operates undetected during screen shares and recordings. Your advantage remains hidden.",
      rowSpan: 'row-span-1',
      colSpan: 'md:col-span-2',
      type : "video",
      Src: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/invisible.mov',
      style : "object-contain"
    },
    {
      icon: ListChecks,
      title: "MCQ Precision",
      description: "Accurately solve multiple-choice questions on any platform",
      rowSpan: 'row-span-1',
      colSpan: 'md:col-span-1',
      Src: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/mcq.png',
      style : "object-contain",
    },
    {
      icon: ShieldCheck,
      title: "Thoughts and Dry-Run",
      description: "Provides thoughts you can say out loud to sound sharp, plus dry-run examples so you look like you know your shit — even when you're winging it",
      rowSpan: 'row-span-1',
      colSpan: 'md:col-span-1',
      Src: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/dryrun.png',
      style: "object-contain",
    },
    {
      icon: Code,
      title: "Coding Solver",
      description: "Tackle complex LeetCode-style problems with real-time, intelligent code assistance.",
      rowSpan: 'row-span-1',
      colSpan: 'md:col-span-2',
      Src: 'https://cdn.jsdelivr.net/gh/raffay69/shadow-ai@main/public/p-solve.mov',
      type: "video"
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-accent border-t border-primary/30">
      <motion.div 
        className="container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer} 
      >
        <motion.h2 variants={fadeIn} className="text-4xl font-bold text-center mb-12 text-primary font-cyber uppercase tracking-widest">Core Directives</motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]"
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ scale: 1.03, zIndex: 10, boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)' }}
              className={`relative group overflow-hidden rounded-md shadow-lg border border-primary/30 hover:border-primary hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 flex flex-col justify-between p-6 bg-black ${feature.colSpan} ${feature.rowSpan}`}
            >
              {feature.type==="video"?
              <motion.video
                preload='metadata'
                src={feature.Src}
                className={`absolute inset-0 w-full h-full ${feature.style?`${feature.style}`:"object-cover"}`}
                initial={{ scale: 1.1, opacity: 0.5}}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ duration: 0.5 }}
                autoPlay
                loop
                muted
                playsInline
              />:
              
              <motion.img
                src={feature.Src}
                className={`absolute inset-0 w-full h-full ${feature.style ? `${feature.style}` : "object-cover"}`}
                initial={{ scale: 1.1}}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                alt=""
              >
              </motion.img>
     
              }
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <feature.icon className="text-primary mr-3 flex-shrink-0" size={32} />
                  <h3 className="text-xl font-semibold text-gray-100 font-cyber uppercase tracking-wider">{feature.title}</h3>
                </div>
                <p className="text-gray-300 font-sans text-sm flex-grow">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function ScrollToHashElement() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return null;
}


function Pricing() {
  const {userLoggedIn , hasPaid} = useAuth()

  return (
    <motion.section 
      id="pricing" 
      className="py-20 px-4 bg-black text-white border-t border-primary/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
        <div className="container mx-auto text-center">
            <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-12 font-cyber text-primary uppercase tracking-widest">Acquire Access</motion.h2>
            <motion.div 
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: '0 0 30px rgba(220, 38, 38, 0.5)' }}
              className="max-w-md mx-auto bg-accent p-8 rounded-md shadow-lg shadow-black border-2 border-primary/50"
            >
                <h3 className="text-3xl font-semibold mb-4 font-cyber text-gray-100">Lifetime License</h3>
                <p className="text-5xl font-bold text-primary mb-6 font-cyber">₹500</p>
                <ul className="text-left space-y-3 mb-8 text-gray-300 font-sans">
                    <li className="flex items-center"><Zap size={16} className="mr-2 text-primary"/> Built to Stay Undetected</li>
                    <li className="flex items-center"><Zap size={16} className="mr-2 text-primary"/> Handles MCQs & Code Problems Like a Pro</li>
                    <li className="flex items-center"><Zap size={16} className="mr-2 text-primary"/> From Gemini to GoLang — You're in Charge</li>
                    <li className="flex items-center"><Zap size={16} className="mr-2 text-primary"/> No Logs. No Traces. No Worries</li>
                </ul>
                
                <motion.a
                  href={hasPaid ? '#' : (userLoggedIn ? '/payment' : '/login?redirect=/payment')}
                  className={`bg-primary text-gray-900 font-bold font-cyber py-3 px-8 rounded-sm text-lg transition-colors duration-300 block shadow-md shadow-primary/50 ${
                    hasPaid 
                      ? 'bg-gray-500 cursor-not-allowed opacity-75' 
                      : 'hover:bg-red-700'
                  }`}
                  whileHover={!hasPaid ? { scale: 1.05 } : undefined}
                  whileTap={!hasPaid ? { scale: 0.95 } : undefined}
                  onClick={(e) => hasPaid && e.preventDefault()}
                  // style={{ pointerEvents: hasPaid ? 'none' : 'auto' }}
                >
                  {hasPaid ? 'Already Paid' : 'Initiate Purchase'}
                </motion.a>
            </motion.div>
        </div>
    </motion.section>
  );
}

function Download() {
    return (
        <motion.section 
          id="download" 
          className="py-20 px-4 bg-accent border-t-4 border-primary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
            <div className="container mx-auto text-center">
                <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-6 text-primary font-cyber uppercase tracking-widest">System Interface</motion.h2>
                <motion.p variants={fadeIn} className="text-xl text-gray-300 mb-8 font-sans">Download the SHADOW client and activate your advantage.</motion.p>
                <motion.div variants={staggerContainer} className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <motion.button 
                      variants={fadeIn}
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(220, 38, 38, 0.7)' }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-gray-900 font-bold py-4 px-10 rounded-sm text-xl transition-colors duration-300 shadow-lg shadow-primary/50 w-full md:w-auto font-cyber"
                    >
                        <MonitorPlay size={24} />
                        Windows (comming soon......)
                    </motion.button>
                    <motion.a 
                      href="https://github.com/raffay69/shadow-server/releases/download/mac/Shadow-0.0.0-arm64.dmg" 
                      download="Shadow_MAC"
                      variants={fadeIn}
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(220, 38, 38, 0.7)' }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-gray-900 font-bold py-4 px-10 rounded-sm text-xl transition-colors duration-300 shadow-lg shadow-primary/50 w-full md:w-auto font-cyber"
                    >
                        <Apple size={24}/>
                        macOS
                    </motion.a>
                </motion.div>
                <motion.p variants={fadeIn} className="text-sm text-gray-500 mt-6 font-sans">Compatibility: Win 10/11 & macOS 11+</motion.p>
            </div>
        </motion.section>
    );
}

function Footer() {
  return (
    <footer className="bg-secondary text-gray-500 p-6 text-center border-t border-primary/30">
      <div className="container mx-auto font-sans">
        <p className="text-sm">&copy; {new Date().getFullYear()} SHADOW . All rights reserved.</p>
        <p className="text-xs mt-2">Disclaimer: SHADOW is intended for educational exploration only. Unauthorized use may breach academic integrity protocols.</p>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
        <Hero />
        <Comparison />
        <PlatformCompatibility />
        <Features />
        <Workflow />
        <AppFeatures />
        <Shortcuts />
        <Pricing />
        <Download />
        <FAQ />
    </>
  );
}

function Layout() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-accent">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
    <Toaster />
    <ScrollToHashElement />
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="payment" element={<Payment />} /> 
          <Route path="gemini-guide" element={<GeminiApiGuide />} /> 
          {/* Add other routes that should use the Layout here */}
        </Route>
         {/* Add routes that should NOT use the Layout here */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
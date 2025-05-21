import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn as LoginIcon } from 'lucide-react';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from './auth/auth';
import { toast } from 'sonner';
import { useAuth } from './auth/authContext';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [error , setError] = useState("")
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();

    const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

  
    useEffect(() => {
      if (userLoggedIn) {
        toast(
          <span className="glitch font-orbitron" data-text="🔴 ACCESS GRANTED 🔴">
             ACCESS GRANTED 
          </span>,
          {
            style: {
              background: "#001100", // Dark green background
              color: "#00ff00", // Neon green text
              border: "1px solid #00ff00", // Neon green border
              textShadow: "0 0 5px #00ff00, 0 0 10px #00ff55", // Glowing green effect
            },
          }
        );
        navigate('/')
      }
    }, [userLoggedIn]);
  

    const onGoogleSignIn = async (e: React.MouseEvent) => {
      e.preventDefault();
      if (!isSigningIn) {
        setIsSigningIn(true);
        try {
          await doSignInWithGoogle(); 
          if(redirectPath){
            navigate(redirectPath);
          }
        } catch (error) {
          console.error('Google Sign-In Error:', error);
          if (error instanceof Error) {
            toast(`Sign-in failed: ${error.message}`);
          }
        } finally {
          setIsSigningIn(false);
        }
      }
    };
  
  
    const onEmailSignIn = async (e: { preventDefault: () => void; }) => {
      e.preventDefault()
      if(!isSigningIn) {
          setIsSigningIn(true)
          try{
          await doSignInWithEmailAndPassword(email, password)
          if(redirectPath){
            navigate(redirectPath);
          }
          // doSendEmailVerification()
          } catch(err){
            if(err instanceof Error){
            setError(err.message)
            setIsSigningIn(false)
            }
          }
      }
  }
  
    return (
      <motion.div
        className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-gradient-to-br from-secondary to-accent p-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-full max-w-sm bg-accent p-8 rounded-lg shadow-xl shadow-primary/20 border-2 border-primary/50"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={fadeIn} className="text-3xl font-bold text-center mb-8 text-primary font-cyber uppercase tracking-widest">Access Terminal</motion.h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={onEmailSignIn} className="space-y-6">
            {/* Email Input */}
            <motion.div variants={fadeIn} className="relative group">
              <label htmlFor="email" className="absolute -top-2 left-3 inline-block bg-accent px-1 text-xs font-medium text-primary font-cyber tracking-wider z-10">EMAIL / USERNAME</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50 group-focus-within:text-primary transition-colors duration-200" size={18} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 bg-secondary text-gray-200 border border-primary/30 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200 placeholder-gray-500 font-sans text-sm"
                  placeholder="operator@shadow.sys"
                />
              </div>
            </motion.div>
  
            {/* Password Input */}
            <motion.div variants={fadeIn} className="relative group">
              <label htmlFor="password" className="absolute -top-2 left-3 inline-block bg-accent px-1 text-xs font-medium text-primary font-cyber tracking-wider z-10">PASSCODE</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50 group-focus-within:text-primary transition-colors duration-200" size={18} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 bg-secondary text-gray-200 border border-primary/30 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200 placeholder-gray-500 font-sans text-sm"
                  placeholder="************"
                />
              </div>
            </motion.div>
  
            {/* Authenticate Button */}
            <motion.button
              variants={fadeIn}
              whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(220, 38, 38, 0.7)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-gray-900 font-bold py-3 px-4 rounded-md text-lg transition-colors duration-300 shadow-lg shadow-primary/50 font-cyber tracking-wider mt-8"
            >
              <LoginIcon size={20} /> 
              {isSigningIn ? "AUTHENTICATING....." : "AUTHENTICATE"}
            </motion.button>
            <motion.div variants={fadeIn}>
            <p className='text-xs'> 
              <span className='text-red-500 font-cyber text-sm'>⚠️ Disclaimer </span> <br />
              Use the same email for website login, app login, and payment.
              Email mismatches may cause access issues.
            </p>
          </motion.div>
  
            {/* Divider */}
            <motion.div variants={fadeIn} className="relative my-8">
              <div className="bg-gradient-to-r from-transparent via-primary/30 to-transparent h-[1px] w-full" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-accent text-xs text-primary/60 font-cyber tracking-wider">
                OR
              </span>
            </motion.div>
  
            {/* Social Login Buttons */}
            <motion.div variants={fadeIn} className="flex flex-col space-y-4">
              <button 
                className={`w-full flex items-center justify-center gap-x-3 py-3 border-2 border-primary/30 rounded-md text-base font-cyber tracking-wider transition-all ${
                  isSigningIn 
                    ? 'opacity-70 cursor-not-allowed bg-red-900/20 text-red-400' 
                    : 'hover:border-primary/60 hover:bg-red-900/30 bg-red-900/20 text-primary'
                }`}
                disabled={isSigningIn}
                onClick={onGoogleSignIn}
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_17_40)">
                  <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                  <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                  <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                  <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
                </svg>
                {isSigningIn ? 'Signing In...' : 'Continue with Google'}
              </button>
            </motion.div>
          </form>
  
          <motion.p variants={fadeIn} className="text-center text-gray-400 mt-8 text-sm font-sans">
            New operative? <Link to="/signup" className="font-medium text-primary hover:text-red-400 underline underline-offset-2 transition-colors duration-200">Register here</Link>.
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

export default Login;
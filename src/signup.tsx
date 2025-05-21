import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus as SignUpIcon } from 'lucide-react';
import { doCreateUserWithEmailAndPassword } from './auth/auth';
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

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState("")
  const [isRegistering , setIsRegistering] = useState(false)
  const navigate = useNavigate()
  const {userLoggedIn} = useAuth()
  const location = useLocation()
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

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password, username);
        if(redirectPath){
          navigate(redirectPath);
        }
      } catch (err) {
        // Handle the error properly
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsRegistering(false);
      }
    }
  };

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
        <motion.h2 variants={fadeIn} className="text-3xl font-bold text-center mb-8 text-primary font-cyber uppercase tracking-widest">Register Operative</motion.h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-6">
           <motion.div variants={fadeIn} className="relative group">
             <label htmlFor="username" className="absolute -top-2 left-3 inline-block bg-accent px-1 text-xs font-medium text-primary font-cyber tracking-wider z-10">USERNAME</label>
             <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50 group-focus-within:text-primary transition-colors duration-200" size={18} />
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 bg-secondary text-gray-200 border border-primary/30 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200 placeholder-gray-500 font-sans text-sm"
                    placeholder="Agent_47"
                 />
             </div>
          </motion.div>
          <motion.div variants={fadeIn} className="relative group">
             <label htmlFor="email" className="absolute -top-2 left-3 inline-block bg-accent px-1 text-xs font-medium text-primary font-cyber tracking-wider z-10">EMAIL</label>
             <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50 group-focus-within:text-primary transition-colors duration-200" size={18} />
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-3 bg-secondary text-gray-200 border border-primary/30 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200 placeholder-gray-500 font-sans text-sm"
                    placeholder="operative@shadow.sys"
                 />
             </div>
          </motion.div>
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
                  placeholder="Create Secure Passcode"
                />
            </div>
          </motion.div>
          <motion.div variants={fadeIn} className="relative group">
             <label htmlFor="confirmPassword" className="absolute -top-2 left-3 inline-block bg-accent px-1 text-xs font-medium text-primary font-cyber tracking-wider z-10">CONFIRM PASSCODE</label>
             <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50 group-focus-within:text-primary transition-colors duration-200" size={18} />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`w-full pl-10 pr-3 py-3 bg-secondary text-gray-200 border rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200 placeholder-gray-500 font-sans text-sm ${password !== confirmPassword && confirmPassword ? 'border-red-500' : 'border-primary/30'}`}
                  placeholder="Repeat Passcode"
                />
            </div>
             {password !== confirmPassword && confirmPassword && (
                <p className="text-xs text-red-500 mt-1 absolute right-0 -bottom-5">Passcodes do not match.</p>
             )}
          </motion.div>
          <motion.button
            variants={fadeIn}
            whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(220, 38, 38, 0.7)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-gray-900 font-bold py-3 px-4 rounded-md text-lg transition-colors duration-300 shadow-lg shadow-primary/50 font-cyber tracking-wider mt-10"
          >
            <SignUpIcon size={20}/> 
            {isRegistering? "Creating Account... ":"CREATE ACCOUNT"}
          </motion.button>
          <motion.div variants={fadeIn}>
            <p className='text-xs'> 
              <span className='text-red-500 font-cyber text-sm'>⚠️ Disclaimer </span> <br />
              Use the same email for website login, app login, and payment.
              Email mismatches may cause access issues.
            </p>
          </motion.div>
        </form>
        <motion.p variants={fadeIn} className="text-center text-gray-400 mt-8 text-sm font-sans">
          Already registered? <Link to="/login" className="font-medium text-primary hover:text-red-400 underline underline-offset-2 transition-colors duration-200">Login here</Link>.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default SignUp;
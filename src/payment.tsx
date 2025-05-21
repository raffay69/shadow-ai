import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

function Payment() {
  const {userLoggedIn , hasPaid , loading} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return; 
    
    if (!userLoggedIn || hasPaid) {
      navigate('/');
    }
  }, [userLoggedIn, hasPaid, navigate, loading]);


  const handlePayment = ()=>{
    window.location.href = 'https://pages.razorpay.com/shadow-activation';
  }

  return (
    <motion.div
      className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-gradient-to-br from-secondary to-accent p-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-md bg-accent p-8 rounded-lg shadow-xl shadow-primary/20 border-2 border-primary/50"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold text-center mb-8 text-primary font-cyber uppercase tracking-widest">Complete Acquisition</motion.h2>
        
        <motion.div variants={fadeIn} className="mb-6 p-4 bg-secondary rounded-md border border-primary/30">
            <h3 className="text-lg font-semibold text-gray-100 font-cyber mb-2">Order Summary</h3>
            <div className="flex justify-between items-center font-sans text-sm text-gray-300">
                <span>SHADOW - Lifetime License</span>
                <span className="font-bold text-primary">₹500.00</span>
            </div>
        </motion.div>

        <motion.div variants={fadeIn} className="mb-8">
           <p className="text-sm text-center text-gray-400 font-sans mb-4">Proceed to secure payment via Razorpay.</p>
            <motion.button
                variants={fadeIn}
                whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(220, 38, 38, 0.7)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePayment}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-gray-900 font-bold py-3 px-4 rounded-md text-lg transition-colors duration-300 shadow-lg shadow-primary/50 font-cyber tracking-wider"
              >
                <CreditCard size={20} /> PAY ₹500 SECURELY
            </motion.button>
        </motion.div>

        <motion.div variants={fadeIn} className="flex items-center justify-center space-x-2 text-gray-500 text-xs font-sans">
            <Lock size={14} />
            <span>Secure Transaction via Razorpay</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Payment;
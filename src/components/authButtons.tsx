"use client"
import { useState } from "react"
import { LogOut, User, LogIn, UserPlus } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown"
import { toast } from "sonner";
import { useAuth } from "../auth/authContext";
import { useNavigate, Link } from "react-router-dom";
import { doSignOut } from "../auth/auth";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export default function AuthButtons() {
  const { userLoggedIn, currentUser } = useAuth()
  const navigate = useNavigate();

  const signOut = () => {
    doSignOut().then(() => {
      toast(
        <span className="glitch font-orbitron" data-text="🔴 SESSION TERMINATED 🔴">
          SESSION TERMINATED 
        </span>,
        {
          style: {
            background: "#110000",
            color: "#ff3131", 
            border: "1px solid #ff0000", 
            textShadow: "0 0 5px #ff0000, 0 0 10px #ff3131",
          },
        }
      );
      navigate('/')
    })
  }

  return (
    <div className="flex items-center">
      {!userLoggedIn ? (
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex items-center space-x-4"
        >
          <Link 
            to="/login" 
            className="flex items-center gap-1 text-gray-300 hover:text-primary transition-colors duration-300 font-orbitron text-sm"
          >
            <LogIn size={16}/> Login
          </Link>
          <Link 
            to="/signup" 
            className="flex items-center gap-1 bg-primary hover:bg-red-700 text-gray-900 font-bold py-2 px-3 transition-all duration-300 shadow-md shadow-primary/50 hover:shadow-lg hover:shadow-primary/70 transform hover:scale-105 text-xs font-orbitron"
            style={{ clipPath: 'polygon(8px 0%, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            <UserPlus size={14}/> Sign Up
          </Link>
        </motion.div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 hover:text-red-600 font-medium text-white font-orbitron"
            >
              <User className="h-4 w-4" />
              <span className="font-cyber">{currentUser?.displayName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-black shadow-lg border border-red-900">
            <DropdownMenuItem
              className="hover:bg-red-900 text-white focus:bg-red-900 focus:text-white cursor-pointer"
              onClick={signOut}
            >
              <LogOut className="mr-2 h-4 w-4 text-red-600" />
              <span className="font-cyber">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
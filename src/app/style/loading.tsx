"use client"
import { motion } from 'framer-motion'
export default function loading() {
  return (
    <div className=' w-full   h-full bg-gradient-to-b from-blue-400 to-stone-300  flex items-center content-center justify-center'
    > 
    <motion.div
              className=" w-10 h-10  rounded-lg bg-blue-300 items-center content-center  border-double border-4 border-black "
              animate={{ x: 1, y: 1, rotate: 360 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            />
    </div>
    
  )
}

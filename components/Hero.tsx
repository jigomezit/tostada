"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fondo con gradiente tipo guitarra */}
      <div className="absolute inset-0 bg-gradient-to-br from-guitar-black via-guitar-dark to-guitar-medium"></div>
      
      {/* Patrón decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 border-2 border-guitar-gold rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border-2 border-guitar-gold rounded-full"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold mb-8 text-guitar-cream"
        >
          Soy Músico
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-xl md:text-2xl mb-12 text-guitar-gold"
        >
          Guitarra y Bajo Profesional
        </motion.p>

        <motion.button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="px-8 py-4 bg-guitar-gold text-guitar-black font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          Contrátame
        </motion.button>
      </div>
    </section>
  );
}


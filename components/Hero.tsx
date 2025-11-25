"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  
  const fullText = "Jonathan";
  const typingSpeed = 100; // velocidad de escritura en ms
  const deletingSpeed = 50; // velocidad de borrado en ms
  const pauseTime = 2000; // tiempo de pausa después de escribir completo

  // Configuración de notas musicales
  const musicalNotes = [
    { emoji: "♪", top: "10%", duration: 8, delay: 0, size: "text-2xl" },
    { emoji: "♫", top: "25%", duration: 10, delay: 1, size: "text-3xl" },
    { emoji: "♬", top: "40%", duration: 12, delay: 2, size: "text-2xl" },
    { emoji: "♪", top: "55%", duration: 9, delay: 0.5, size: "text-xl" },
    { emoji: "♫", top: "70%", duration: 11, delay: 1.5, size: "text-2xl" },
    { emoji: "♬", top: "15%", duration: 13, delay: 2.5, size: "text-xl" },
    { emoji: "♪", top: "80%", duration: 9.5, delay: 0.8, size: "text-3xl" },
    { emoji: "♫", top: "35%", duration: 10.5, delay: 1.2, size: "text-xl" },
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < fullText.length) {
      // Escribiendo
      timeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex === fullText.length) {
      // Pausa después de escribir completo
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && charIndex > 0) {
      // Borrando
      timeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
      // Reiniciar ciclo
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, fullText]);

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fondo con gradiente tipo guitarra */}
      <div className="absolute inset-0 bg-gradient-to-br from-guitar-black via-guitar-dark to-guitar-medium"></div>
      
      {/* Patrón decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 border-2 border-guitar-gold rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border-2 border-guitar-gold rounded-full"></div>
      </div>

      {/* Notas musicales animadas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {musicalNotes.map((note, index) => (
          <motion.div
            key={index}
            className={`absolute ${note.size} text-guitar-gold/30`}
            style={{
              top: note.top,
              willChange: "transform",
            }}
            initial={{ x: "100vw" }}
            animate={{ x: "-100px" }}
            transition={{
              duration: note.duration,
              delay: note.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {note.emoji}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold mb-8 text-guitar-cream"
        >
          {displayedText}
          <span className="animate-pulse">|</span>
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


"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-guitar-black to-guitar-dark"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-4xl md:text-5xl font-bold mb-8 text-guitar-cream"
        >
          Sobre Mí
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="space-y-6 text-lg text-guitar-cream/90"
        >
          <p>
            Soy un músico apasionado especializado en guitarra y bajo, con años
            de experiencia en grabación, composición y actuación en vivo.
          </p>
          
          <p>
            Mi enfoque combina técnica profesional con creatividad, adaptándome
            a diferentes estilos musicales para llevar tus proyectos al siguiente
            nivel.
          </p>
          
          <p>
            Ya sea que necesites grabaciones de estudio, colaboraciones en
            composición o sesiones de práctica, estoy aquí para ayudarte a
            alcanzar tu visión musical.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-guitar-medium/50 p-6 rounded-lg border border-guitar-gold/30">
            <h3 className="text-xl font-bold text-guitar-gold mb-2">
              Guitarra
            </h3>
            <p className="text-guitar-cream/80">
              Acústica, eléctrica, clásica. Múltiples estilos y técnicas.
            </p>
          </div>
          
          <div className="bg-guitar-medium/50 p-6 rounded-lg border border-guitar-gold/30">
            <h3 className="text-xl font-bold text-guitar-gold mb-2">Bajo</h3>
            <p className="text-guitar-cream/80">
              Eléctrico, acústico. Groove y fundamento sólido para tu música.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


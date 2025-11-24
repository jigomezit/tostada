"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const pricingPlans = [
  {
    name: "Sesión Individual",
    price: "$50",
    description: "Una sesión de grabación o práctica",
    features: [
      "Hasta 2 horas",
      "Grabación incluida",
      "Revisión de material",
    ],
  },
  {
    name: "Paquete Grabación",
    price: "$200",
    description: "Paquete completo para tu proyecto",
    features: [
      "5 sesiones",
      "Grabación profesional",
      "Mezcla básica",
      "Soporte post-producción",
    ],
    popular: true,
  },
  {
    name: "Colaboración",
    price: "$150",
    description: "Trabajo en conjunto para tu proyecto",
    features: [
      "3 sesiones",
      "Composición colaborativa",
      "Grabación de demos",
      "Feedback continuo",
    ],
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="precios"
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-guitar-dark to-guitar-black"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-guitar-cream"
        >
          Paquetes de Servicios
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-guitar-gold mb-12 text-lg"
        >
          Elige el paquete que mejor se adapte a tus necesidades
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`relative bg-guitar-medium rounded-lg p-8 shadow-xl ${
                plan.popular
                  ? "border-2 border-guitar-gold scale-105"
                  : "border border-guitar-gold/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-guitar-gold text-guitar-black px-4 py-1 rounded-full text-sm font-bold">
                  Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2 text-guitar-cream">
                {plan.name}
              </h3>
              
              <div className="mb-4">
                <span className="text-4xl font-bold text-guitar-gold">
                  {plan.price}
                </span>
              </div>
              
              <p className="text-guitar-cream/80 mb-6">{plan.description}</p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-guitar-cream">
                    <span className="text-guitar-gold mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? "bg-guitar-gold text-guitar-black hover:bg-guitar-gold/90"
                    : "bg-guitar-dark text-guitar-cream hover:bg-guitar-dark/80 border border-guitar-gold"
                }`}
              >
                Seleccionar
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


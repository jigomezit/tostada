"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-guitar-black border-t border-guitar-gold/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-guitar-gold mb-4">
              Contacto
            </h3>
            <p className="text-guitar-cream/80 mb-2">Email: contacto@soymusico.com</p>
            <p className="text-guitar-cream/80">Teléfono: +34 123 456 789</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-guitar-gold mb-4">
              Redes Sociales
            </h3>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-guitar-gold hover:text-guitar-cream transition-colors"
              >
                Instagram
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-guitar-gold hover:text-guitar-cream transition-colors"
              >
                YouTube
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-guitar-gold hover:text-guitar-cream transition-colors"
              >
                Spotify
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-guitar-gold mb-4">
              Servicios
            </h3>
            <ul className="space-y-2 text-guitar-cream/80">
              <li>Grabación</li>
              <li>Composición</li>
              <li>Sesiones en vivo</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-guitar-gold/20 pt-8 text-center text-guitar-cream/60">
          <p>&copy; {new Date().getFullYear()} Soy Músico. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}


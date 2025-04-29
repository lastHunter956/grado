"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Sparkles, Cpu, Cog } from "lucide-react"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Circuit board pattern background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M0 0 L50 0 L50 50 L0 50 Z" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="2" fill="#f59e0b" />
            <circle cx="50" cy="0" r="2" fill="#f59e0b" />
            <circle cx="50" cy="50" r="2" fill="#f59e0b" />
            <circle cx="0" cy="50" r="2" fill="#f59e0b" />
            <circle cx="25" cy="25" r="3" fill="#f59e0b" />
            <path d="M25 0 L25 25" stroke="#f59e0b" strokeWidth="0.5" />
            <path d="M0 25 L25 25" stroke="#f59e0b" strokeWidth="0.5" />
            <path d="M25 25 L50 25" stroke="#f59e0b" strokeWidth="0.5" />
            <path d="M25 25 L25 50" stroke="#f59e0b" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Partículas flotantes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold-300 opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Efecto de luz radial */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-800/0 to-slate-950 opacity-80"></div>

      {/* Contenido principal */}
      <div className="z-10 text-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="flex justify-center items-center mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="relative w-16 h-16 md:w-20 md:h-20"
            >
              <Cog className="absolute inset-0 w-full h-full text-gold-500" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="relative w-10 h-10 md:w-12 md:h-12 -ml-4 mt-8"
            >
              <Cog className="absolute inset-0 w-full h-full text-gold-400" />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
            <motion.span
              animate={{
                textShadow: [
                  "0 0 5px rgba(255, 255, 255, 0)",
                  "0 0 15px rgba(255, 255, 255, 0.5)",
                  "0 0 5px rgba(255, 255, 255, 0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              Invitación Especial
            </motion.span>
          </h1>
          <motion.div
            className="flex items-center justify-center gap-2 text-gold-400 text-lg md:text-xl tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Cpu className="w-5 h-5" />
            <span>GRADUACIÓN DE INGENIERÍA 2025</span>
            <Cpu className="w-5 h-5" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative inline-flex items-center justify-center group">
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 -z-10"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 blur-xl opacity-70"></div>
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              href="/invitacion"
              className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900/80 backdrop-blur-sm border border-gold-500 text-gold-400 font-medium text-lg hover:text-white transition-colors duration-300 group"
            >
              <motion.span
                animate={
                  hovered
                    ? {
                        x: [-2, 2, -2],
                        rotate: [-5, 5, -5],
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.span>

              <span>Abrir Invitación</span>

              <motion.span
                animate={
                  hovered
                    ? {
                        x: [2, -2, 2],
                        rotate: [5, -5, 5],
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decoración de esquina - circuitos */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 overflow-hidden opacity-20">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 120,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
            <path d="M10 50 L90 50" stroke="#f59e0b" strokeWidth="0.5" />
            <path d="M50 10 L50 90" stroke="#f59e0b" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="5" fill="#f59e0b" />
            <circle cx="50" cy="20" r="3" fill="#f59e0b" />
            <circle cx="50" cy="80" r="3" fill="#f59e0b" />
            <circle cx="20" cy="50" r="3" fill="#f59e0b" />
            <circle cx="80" cy="50" r="3" fill="#f59e0b" />
          </svg>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 overflow-hidden opacity-20 rotate-180">
        <motion.div
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 120,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
            <path d="M10 50 L90 50" stroke="#f59e0b" strokeWidth="0.5" />
            <path d="M50 10 L50 90" stroke="#f59e0b" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="5" fill="#f59e0b" />
            <circle cx="50" cy="20" r="3" fill="#f59e0b" />
            <circle cx="50" cy="80" r="3" fill="#f59e0b" />
            <circle cx="20" cy="50" r="3" fill="#f59e0b" />
            <circle cx="80" cy="50" r="3" fill="#f59e0b" />
          </svg>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </main>
  )
}

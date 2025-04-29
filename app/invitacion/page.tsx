"use client";

/* @jsxImportSource react */
import React from "react";
import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  GraduationCap,
  ArrowLeft,
  Cpu,
  Cog,
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  Users,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import the 3D model component with no SSR
const EngineeringScene = dynamic<any>(() => import("./3d-model"), {
  ssr: false,
  loading: () => null,
});

export default function Invitacion(): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 5]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white overflow-hidden">
      {/* Circuit board pattern background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="circuit"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 0 L50 0 L50 50 L0 50 Z"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="0.5"
            />
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
              animation: `float ${
                Math.random() * 10 + 15
              }s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Botón de regreso con animación */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed top-6 left-6 z-50"
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fondo con parallax mejorado */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Gradiente radial */}
          <div className="absolute inset-0 bg-gradient-radial from-slate-800/30 to-slate-950 opacity-80"></div>

          {/* Líneas decorativas - circuitos */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(10)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent w-full"
                style={{ top: `${10 * (i + 1)}%` }}
              ></div>
            ))}
            {[...Array(10)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute w-px bg-gradient-to-b from-transparent via-gold-500/30 to-transparent h-full"
                style={{ left: `${10 * (i + 1)}%` }}
              ></div>
            ))}

            {/* Circuit nodes */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`node-${i}`}
                className="absolute w-2 h-2 rounded-full bg-gold-500/30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `pulse-slow ${
                    3 + Math.random() * 4
                  }s infinite ease-in-out ${Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Overlay gradiente */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950/0 via-slate-950/50 to-slate-950"></div>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div ref={containerRef} className="relative z-10">
        {/* Sección de encabezado */}
        <motion.section
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6"
          style={{ opacity: headerOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-4"
            >
              <div className="flex justify-center items-center mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="relative w-12 h-12 md:w-16 md:h-16"
                >
                  <Cog className="absolute inset-0 w-full h-full text-gold-500" />
                </motion.div>
                <motion.div
                  animate={{
                    rotateY: [0, 180, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }}
                  className="mx-4"
                >
                  <GraduationCap className="w-16 h-16 text-gold-500" />
                </motion.div>
                <motion.div
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="relative w-12 h-12 md:w-16 md:h-16"
                >
                  <Cog className="absolute inset-0 w-full h-full text-gold-500" />
                </motion.div>
              </div>
              <div className="text-gold-400 font-light tracking-widest mb-2 flex items-center justify-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>CON GRAN ORGULLO ANUNCIAMOS LA</span>
                <Cpu className="w-4 h-4" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif mb-6 text-white"
            >
              Ceremonia de Graduación
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: "6rem" }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-gold-400/0 via-gold-500 to-gold-400/0 mx-auto mb-6"
            ></motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xl sm:text-2xl font-light mb-8 max-w-2xl mx-auto text-slate-200"
            >
              Acompáñame en este momento especial donde celebraremos este logro
              académico y el inicio de nuevas oportunidades.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-3xl font-serif text-gold-400 mb-8"
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 5px rgba(245, 158, 11, 0)",
                    "0 0 15px rgba(245, 158, 11, 0.5)",
                    "0 0 5px rgba(245, 158, 11, 0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                Ingeniería de Sistemas y computación 2025
              </motion.span>
            </motion.div>

            {/* 3D Scene */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mb-8"
            >
              <EngineeringScene />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1, duration: 1 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center mx-auto text-slate-300 hover:text-white transition-colors"
                onClick={() => {
                  const infoSection =
                    document.getElementById("invitacion-formal");
                  if (infoSection) {
                    infoSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <span className="mr-2">Desplaza para más información</span>
                <ChevronDown className="animate-bounce w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Sección de la tarjeta de invitación */}
        <section
          id="invitacion-formal"
          className="min-h-screen flex items-center justify-center px-4 py-20 sm:px-6"
        >
          <motion.div
            className="max-w-4xl w-full perspective-1000"
            style={{
              scale: cardScale,
              opacity: cardOpacity,
              rotateX: rotate,
            }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border border-white/20 shadow-2xl transform-style-3d"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-8 sm:p-12 relative">
                {/* Efectos de luz */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gold-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>

                {/* Patrón decorativo */}
                <div className="absolute inset-0 opacity-5">
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Encabezado de la tarjeta */}
                <div className="text-center mb-12 relative z-10">
                  <motion.div
                    className="text-gold-400 font-light tracking-widest mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    
                    viewport={{ once: true }}
                  >
                    INVITACIÓN A
                  </motion.div>

                  <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Cena de Graduación
                  </motion.h2>

                  <motion.div
                    className="w-16 h-1 bg-gradient-to-r from-gold-400/0 via-gold-500 to-gold-400/0 mx-auto mb-6"
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: "4rem" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  ></motion.div>

                  <motion.p
                    className="text-lg text-slate-300 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Los invito a acompañarme en una cena de celebración, donde
                    cada invitado podrá elegir y cubrir su consumo. Si desean
                    acompañarme también con un detalle, habrá lluvia de sobres.
                  </motion.p>
                </div>

                {/* Detalles del evento con animaciones mejoradas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <motion.div
                    className="flex items-start space-x-4 group"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-gold-500/20 p-3 rounded-full group-hover:bg-gold-500/40 transition-colors">
                      <Calendar className="w-6 h-6 text-gold-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Fecha</h3>
                      <p className="text-slate-300">2 de Mayo, 2025</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-4 group"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-gold-500/20 p-3 rounded-full group-hover:bg-gold-500/40 transition-colors">
                      <Clock className="w-6 h-6 text-gold-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Hora</h3>
                      <p className="text-slate-300">6:00 PM</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-4 group"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-gold-500/20 p-3 rounded-full group-hover:bg-gold-500/40 transition-colors">
                      <MapPin className="w-6 h-6 text-gold-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Lugar</h3>
                      <p className="text-slate-300">nikkei fusion</p>
                      <p className="text-slate-400">
                        Cra. 78 #30B-21, Santa Mónica
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-4 group"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-gold-500/20 p-3 rounded-full group-hover:bg-gold-500/40 transition-colors">
                      <GraduationCap className="w-6 h-6 text-gold-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">
                        Código de Vestimenta
                      </h3>
                      <p className="text-slate-300">Formal - Semi formal</p>
                    </div>
                  </motion.div>
                </div>

                {/* Mensaje especial con efecto de brillo */}
                <motion.div
                  className="text-center mb-12 relative"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent animate-shimmer"></div>
                  <blockquote className="italic text-slate-300 text-lg border-l-4 border-gold-500 pl-4 py-2 relative z-10">
                    "La educación es el arma más poderosa que puedes usar para
                    cambiar el mundo."
                    <footer className="text-right text-gold-400 mt-2">
                      — Nelson Mandela
                    </footer>
                  </blockquote>
                </motion.div>

                {/* Botón de confirmación con efecto de brillo */}
                <motion.div
                  className="text-center"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <div className="relative inline-block group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                    <Link
                      href="/rsvp"
                      className="relative inline-block px-8 py-4 bg-gold-500 hover:bg-gold-600 text-slate-900 font-medium rounded-full transition-colors"
                    >
                      Confirmar Asistencia
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        @keyframes gradient-xy {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-xy {
          animation: gradient-xy 3s ease infinite;
          background-size: 400% 400%;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </main>
  );
}

"use client";

/* @jsxImportSource react */
import React from "react";
import type { ChangeEvent, FormEvent, ReactElement } from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Send, Map, X } from "lucide-react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Mesh, BufferGeometry, Material } from "three";

// Definir interfaz para las propiedades del componente FloatingParticle
interface FloatingParticleProps {
  position: [number, number, number];
  color?: string;
  size?: number;
  speed?: number;
}

// 3D floating particles
function FloatingParticles() {
  return (
    <>
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5 - 3,
          ]}
          color={Math.random() > 0.7 ? "#c9b037" : "#ffd700"}
          size={0.03 + Math.random() * 0.05}
          speed={0.2 + Math.random() * 0.3}
        />
      ))}
    </>
  );
}

function FloatingParticle({
  position,
  color = "#ffd700",
  size = 0.05,
  speed = 0.5,
}: FloatingParticleProps) {
  const ref = useRef<Mesh<BufferGeometry, Material>>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(time * speed) * 1;
      ref.current.rotation.x = Math.sin(time * speed) * 0.4;
      ref.current.rotation.z = Math.cos(time * speed) * 0.4;
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export default function RSVP(): ReactElement {
  const [formState, setFormState] = useState({
    nombre: "",
    asistencia: "si",
    acompanantes: "0",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Crear mensaje para WhatsApp
    const asistenciaText =
      formState.asistencia === "si" ? "Sí, asistiré" : "No podré asistir";
    const acompanantesText =
      formState.asistencia === "si"
        ? `\nAcompañantes: ${formState.acompanantes}`
        : "";
    const mensajeText = formState.mensaje
      ? `\nMensaje: ${formState.mensaje}`
      : "";

    const mensaje = `*Confirmación de Asistencia - Graduación 2025*\nNombre: ${formState.nombre}\nAsistencia: ${asistenciaText}${acompanantesText}${mensajeText}`;

    const telefono = "573052203282";

    // Crear URL para WhatsApp
    const whatsappURL = `https://wa.me/${telefono}?text=${encodeURIComponent(
      mensaje
    )}`;

    // Simular un pequeño retraso antes de abrir WhatsApp
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      window.open(whatsappURL, "_blank");
    }, 1000);
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <main className="min-h-[100dvh] relative bg-gradient-to-b from-slate-950 to-slate-900 text-white py-10 sm:py-16 px-4">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={0.5}
          />
          <Environment preset="city" />
          <FloatingParticles />
        </Canvas>
      </div>

      {/* Blueprint grid pattern */}
      <div className="fixed inset-0 z-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
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
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-md sm:max-w-lg mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/invitacion"
            className="inline-flex items-center text-gold-400 hover:text-gold-300 mb-6 sm:mb-8 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-4px] transition-transform" />
            <span>Volver a la Invitación</span>
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 overflow-hidden shadow-xl"
            >
              <div className="p-6 sm:p-8 relative">
                {/* Efectos de luz */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gold-500 rounded-full filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>

                <div className="text-center mb-8 relative z-10">
                  <motion.h1
                    className="text-2xl sm:text-3xl font-serif mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Confirmar Asistencia
                  </motion.h1>
                  <motion.div
                    className="w-16 h-1 bg-gradient-to-r from-gold-400/0 via-gold-500 to-gold-400/0 mx-auto mb-4"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "4rem" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  ></motion.div>
                  <motion.p
                    className="text-slate-300 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Por favor confirme su asistencia antes del 1 de mayo, 2025
                  </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label
                      htmlFor="nombre"
                      className="block text-gold-400 text-sm mb-1"
                    >
                      Nombre Completo
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={formState.nombre}
                      onChange={handleChange}
                      required
                      className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-white text-sm transition-all"
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <label className="block text-gold-400 text-sm mb-1">
                      ¿Asistirá a la ceremonia?
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center group cursor-pointer">
                        <input
                          type="radio"
                          name="asistencia"
                          value="si"
                          checked={formState.asistencia === "si"}
                          onChange={handleChange}
                          className="text-gold-500 focus:ring-gold-500 mr-2"
                        />
                        <span className="group-hover:text-gold-400 transition-colors text-sm">
                          Sí, asistiré
                        </span>
                      </label>
                      <label className="inline-flex items-center group cursor-pointer">
                        <input
                          type="radio"
                          name="asistencia"
                          value="no"
                          checked={formState.asistencia === "no"}
                          onChange={handleChange}
                          className="text-gold-500 focus:ring-gold-500 mr-2"
                        />
                        <span className="group-hover:text-gold-400 transition-colors text-sm">
                          No podré asistir
                        </span>
                      </label>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {formState.asistencia === "si" && (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label
                          htmlFor="acompanantes"
                          className="block text-gold-400 text-sm mb-1"
                        >
                          Número de acompañantes
                        </label>
                        <select
                          id="acompanantes"
                          name="acompanantes"
                          value={formState.acompanantes}
                          onChange={handleChange}
                          className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-white text-sm transition-all"
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label
                      htmlFor="mensaje"
                      className="block text-gold-400 text-sm mb-1"
                    >
                      Mensaje (opcional)
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formState.mensaje}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-2 sm:p-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 text-white text-sm transition-all"
                    ></textarea>
                  </motion.div>

                  <motion.div
                    className="pt-2 sm:pt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                      <button
                        type="submit"
                        className="relative w-full py-3 bg-gold-500 hover:bg-gold-600 text-slate-900 font-medium rounded-full transition-colors flex items-center justify-center gap-2"
                        disabled={sending}
                      >
                        {sending ? (
                          <>
                            <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Enviar Confirmación</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 overflow-hidden shadow-xl p-8 sm:p-12 text-center"
            >
              <motion.div
                className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, times: [0, 0.8, 1] }}
              >
                <Check className="h-7 w-7 sm:h-8 sm:w-8 text-green-500" />
              </motion.div>

              <motion.h1
                className="text-2xl sm:text-3xl font-serif mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                ¡Gracias!
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-slate-300 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Tu confirmación ha sido recibida correctamente.
              </motion.p>

              <motion.p
                className="text-slate-400 mb-8 text-sm sm:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Esperamos verte en la ceremonia de graduación. Hemos recibido tu
                confirmación por WhatsApp.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="relative group inline-block">
                  <button
                    onClick={toggleMap}
                    className="relative inline-block px-6 sm:px-8 py-3 bg-gold-500 hover:bg-gold-600 text-slate-900 font-medium rounded-full transition-colors flex items-center justify-center gap-2"
                  >
                    <Map className="w-4 h-4" />
                    <span>Ver en el mapa</span>
                  </button>
                </div>

                <div className="relative group inline-block">
                  <Link
                    href="https://nikkei-fusion-1.cluvi.co/nikkei-fusion/menu-digital/home"
                    className="relative inline-block px-6 sm:px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors"
                  >
                    Ver carta de menú
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal del mapa */}
        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              onClick={toggleMap}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-slate-900/95 border border-white/20 rounded-lg shadow-2xl w-full max-w-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-xl font-serif text-gold-400">
                    Ubicación del Evento
                  </h3>
                  <button
                    onClick={toggleMap}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative w-full h-64 sm:h-80 overflow-hidden">
                  {/* Mapa estático optimizado para bajo rendimiento */}
                  <img
                    src="lugar.png"
                    alt="Mapa de la ubicación del evento"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end">
                    <div className="p-4 bg-gradient-to-t from-slate-900 to-transparent w-full">
                      <p className="text-white font-medium mb-1">
                        nikkei fusion
                      </p>
                      <p className="text-slate-300 text-sm">
                        Cra. 78 #30B-21, Santa Mónica, Cartagena de Indias,
                        Provincia de Cartagena, Bolívar
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-between">
                  <p className="text-sm text-slate-400">
                    La celebarción se realizará el viernes 2 de mayo, 2025 a las
                    6:00 PM
                  </p>
                  <a
                    href="https://www.google.com/maps/dir//Cra.+78+%2330B-21,+Santa+M%C3%B3nica,+Cartagena+de+Indias,+Provincia+de+Cartagena,+Bol%C3%ADvar/@10.3892724,-75.5603619,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8ef62433a8e4485f:0x2c01f6f42d13c8dd!2m2!1d-75.4779364!2d10.3892824?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
                  >
                    Abrir en Google Maps
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
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

        @keyframes gradient-xy {
          0% {
            transform: translate(0) rotate(0deg);
          }
          50% {
            transform: translate(5%, 5%) rotate(180deg);
          }
          100% {
            transform: translate(0) rotate(360deg);
          }
        }

        .animate-gradient-xy {
          animation: gradient-xy 10s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </main>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

function MandalaDecor({ position }) {
  const isTopLeft = position === "top-left";
  return (
    <div
      className="absolute w-32 h-32 opacity-25"
      style={{
        top: isTopLeft ? -16 : "auto",
        left: isTopLeft ? -16 : "auto",
        bottom: isTopLeft ? "auto" : -16,
        right: isTopLeft ? "auto" : -16,
      }}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
          (angle) => (
            <g key={angle} transform={`rotate(${angle} 50 50)`}>
              <ellipse
                cx="50"
                cy="18"
                rx="3.5"
                ry="13"
                fill="#c9a84c"
                opacity="0.9"
              />
              <circle cx="50" cy="8" r="2.5" fill="#c9a84c" />
              <ellipse
                cx="50"
                cy="30"
                rx="2"
                ry="6"
                fill="#c9a84c"
                opacity="0.5"
              />
            </g>
          ),
        )}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={`inner-${angle}`} transform={`rotate(${angle} 50 50)`}>
            <ellipse
              cx="50"
              cy="36"
              rx="2"
              ry="7"
              fill="#c9a84c"
              opacity="0.4"
            />
          </g>
        ))}
        <circle
          cx="50"
          cy="50"
          r="10"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="6"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <circle cx="50" cy="50" r="3" fill="#c9a84c" opacity="0.8" />
      </svg>
    </div>
  );
}

export default function Envelope() {
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);
  const [pulseComplete, setPulseComplete] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => router.push("/invite"), 2000);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#fdf8f2" }}
    >
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d4b8e0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.3,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(122,78,168,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Save the date */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.65rem",
            color: "#9b72c8",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontWeight: 400,
          }}
        >
          Save The Date
        </motion.p>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 6vw, 2.8rem)",
            color: "#2d1b4e",
            fontWeight: 300,
            letterSpacing: "0.05em",
            marginBottom: "6px",
          }}
        >
          Sameera & Chathurika
        </motion.h1>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.65rem",
            color: "#9b72c8",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "48px",
          }}
        >
          August 16, 2026
        </motion.p>

        {/* Envelope container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 1,
            type: "spring",
            stiffness: 70,
            damping: 15,
          }}
          style={{ position: "relative", width: 270, height: 370 }}
        >
          {/* Envelope flap (top triangle) - animates open */}
          <motion.div
            animate={isOpening ? { rotateX: 180, y: -10 } : { rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 120,
              transformOrigin: "top center",
              zIndex: 10,
              perspective: 600,
            }}
          >
            <svg width="270" height="120" viewBox="0 0 270 120">
              <defs>
                <linearGradient
                  id="flapGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#4a2878" />
                  <stop offset="100%" stopColor="#2d1b4e" />
                </linearGradient>
              </defs>
              <polygon points="0,0 270,0 135,110" fill="url(#flapGrad)" />
              <polygon
                points="0,0 270,0 135,110"
                fill="none"
                stroke="rgba(201,168,76,0.3)"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* Envelope body */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow:
                "0 30px 80px rgba(45,27,78,0.35), 0 8px 20px rgba(45,27,78,0.2)",
              background:
                "linear-gradient(155deg, #3e2168 0%, #2d1b4e 50%, #1e1235 100%)",
            }}
          >
            {/* Mandala corners */}
            <MandalaDecor position="top-left" />
            <MandalaDecor position="bottom-right" />

            {/* Subtle inner glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 40%, rgba(122,94,167,0.2) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />

            {/* Vertical gold line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                width: 1,
                background:
                  "linear-gradient(to bottom, transparent 5%, rgba(201,168,76,0.5) 40%, rgba(201,168,76,0.5) 60%, transparent 95%)",
              }}
            />

            {/* Horizontal gold line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: 1,
                background:
                  "linear-gradient(to right, transparent 5%, rgba(201,168,76,0.3) 30%, rgba(201,168,76,0.3) 70%, transparent 95%)",
              }}
            />

            {/* Vertical side text */}
            <div
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%) rotate(-90deg)",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.35em",
                  color: "rgba(201,168,76,0.45)",
                  textTransform: "uppercase",
                }}
              >
                Sameera & Chathurika
              </span>
            </div>

            {/* Center wax seal — the clickable element */}
            <motion.button
              onClick={handleOpen}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 30px rgba(201,168,76,0.4)",
              }}
              whileTap={{ scale: 0.93 }}
              animate={
                isOpening
                  ? { scale: [1, 1.25, 0], opacity: [1, 0.8, 0] }
                  : { scale: [1, 1.04, 1] }
              }
              transition={
                isOpening
                  ? { duration: 0.55, ease: "easeIn" }
                  : {
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                      delay: 1.5,
                    }
              }
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 96,
                height: 96,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 40% 35%, #4a2878, #2d1b4e)",
                border: "2px solid #c9a84c",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.3)",
              }}
            >
              {/* Inner ring */}
              <div
                style={{
                  position: "absolute",
                  inset: 6,
                  borderRadius: "50%",
                  border: "1px solid rgba(201,168,76,0.3)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  color: "#c9a84c",
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                S&C
              </span>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.45rem",
                  letterSpacing: "0.25em",
                  color: "#e8d5a3",
                  marginTop: 4,
                  textTransform: "uppercase",
                }}
              >
                Open
              </span>
            </motion.button>

            {/* Bottom hint — pulsing */}
            <AnimatePresence>
              {!isOpening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2.2, delay: 1.8 }}
                  style={{
                    position: "absolute",
                    bottom: 18,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.45rem",
                      letterSpacing: "0.3em",
                      color: "#e8d5a3",
                      textTransform: "uppercase",
                    }}
                  >
                    Tap seal to open
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Opening light burst */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [0, 2.5] }}
                  transition={{ duration: 0.6 }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(201,168,76,0.8), transparent)",
                    pointerEvents: "none",
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.85rem",
            color: "#9b72c8",
            fontStyle: "italic",
            letterSpacing: "0.05em",
            marginTop: 32,
          }}
        >
          With Love & Joy
        </motion.p>
      </div>
    </div>
  );
}

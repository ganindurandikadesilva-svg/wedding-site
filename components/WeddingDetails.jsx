"use client";
import { useRouter } from "next/navigation";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── fade-up variant ────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* scroll-triggered wrapper */
function Section({ children, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── shared style tokens ────────────────────────── */
const S = {
  label: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.5rem",
    letterSpacing: "0.35em",
    color: "#9b72c8",
    textTransform: "uppercase",
  },
  display: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    color: "#2d1b4e",
  },
  body: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.75rem",
    color: "#7a6a8a",
    lineHeight: 1.7,
  },
  gold: { color: "#c9a84c" },
  divider: { display: "flex", alignItems: "center", gap: 12, margin: "24px 0" },
  line: (dir = "right") => ({
    flex: 1,
    height: 1,
    background: `linear-gradient(to ${dir}, transparent, #c9a84c)`,
  }),
};

/* ─── Countdown hook ─────────────────────────────── */
function useCountdown(target) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function CountdownBox({ value, label }) {
  return (
    <div style={{ textAlign: "center", minWidth: 56 }}>
      <div style={{ ...S.display, fontSize: "2.6rem", lineHeight: 1 }}>
        {String(value).padStart(2, "0")}
      </div>
      <div style={{ ...S.label, marginTop: 6 }}>{label}</div>
    </div>
  );
}

/* ─── Parent card ─────────────────────────────────── */
function PersonCard({ role, parent1, parent2, name, custom }) {
  return (
    <motion.div
      custom={custom}
      variants={fadeUp}
      style={{
        background: "rgba(255,255,255,0.62)",
        backdropFilter: "blur(14px)",
        borderRadius: 22,
        padding: "28px 24px",
        boxShadow: "0 4px 24px rgba(45,27,78,0.07)",
        border: "1px solid rgba(180,140,220,0.18)",
        textAlign: "center",
      }}
    >
      <p style={{ ...S.label, marginBottom: 10 }}>{role}</p>
      <p style={{ ...S.body, color: "#5a4070", marginBottom: 1 }}>{parent1}</p>
      <p style={{ ...S.body, color: "#5a4070", marginBottom: 18 }}>{parent2}</p>
      <h2 style={{ ...S.display, fontSize: "3rem", lineHeight: 1 }}>{name}</h2>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════ */
export default function WeddingDetails() {
  const countdown = useCountdown("2026-09-05T10:30:00");
  // inside your component:
  const router = useRouter();
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #ede4f7 0%, #fdf8f2 45%, #f7efe8 100%)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* dot grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, #c9b8e8 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.2,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* CLOSE */}
      <div
        onClick={() => router.push("/")}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 100,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          color: "#9b72c8",
          textTransform: "uppercase",
          cursor: "pointer",
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(8px)",
          padding: "6px 16px",
          borderRadius: 20,
          border: "1px solid rgba(155,114,200,0.2)",
        }}
      >
        Close
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 420,
          margin: "0 auto",
          padding: "0 28px 80px",
        }}
      >
        {/* ══ 1. HERO ══════════════════════════════════ */}
        <Section>
          <div
            style={{ textAlign: "center", paddingTop: 72, paddingBottom: 52 }}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              style={{ ...S.label, marginBottom: 36 }}
            >
              Please Join Us
            </motion.p>

            {/* watermark circle */}
            {/* Lotus petal ornament */}
            <div style={{ width: 110, height: 110, margin: "0 auto 24px" }}>
              <svg
                viewBox="0 0 110 110"
                xmlns="http://www.w3.org/2000/svg"
                width="110"
                height="110"
              >
                {/* outer ring */}
                <circle
                  cx="55"
                  cy="55"
                  r="52"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="0.8"
                  opacity="0.35"
                />

                {/* outer 8 large petals - purple */}
                <ellipse
                  cx="55"
                  cy="25"
                  rx="10"
                  ry="20"
                  fill="rgba(155,114,200,0.18)"
                  stroke="#9b72c8"
                  strokeWidth="0.6"
                  opacity="0.7"
                />
                <ellipse
                  cx="55"
                  cy="25"
                  rx="10"
                  ry="20"
                  fill="rgba(155,114,200,0.18)"
                  stroke="#9b72c8"
                  strokeWidth="0.6"
                  opacity="0.7"
                  transform="rotate(45 55 55)"
                />
                <ellipse
                  cx="55"
                  cy="25"
                  rx="10"
                  ry="20"
                  fill="rgba(155,114,200,0.18)"
                  stroke="#9b72c8"
                  strokeWidth="0.6"
                  opacity="0.7"
                  transform="rotate(90 55 55)"
                />
                <ellipse
                  cx="55"
                  cy="25"
                  rx="10"
                  ry="20"
                  fill="rgba(155,114,200,0.18)"
                  stroke="#9b72c8"
                  strokeWidth="0.6"
                  opacity="0.7"
                  transform="rotate(135 55 55)"
                />
                <ellipse
                  cx="55"
                  cy="25"
                  rx="10"
                  ry="20"
                  fill="rgba(155,114,200,0.18)"
                  stroke="#9b72c8"
                  strokeWidth="0.6"
                  opacity="0.7"
                  transform="rotate(180 55 55)"
                />
                <ellipse
                  cx="55"
                  cy="25"
                  rx="10"
                  ry="20"
                  fill="rgba(155,114,200,0.18)"
                  stroke="#9b72c8"
                  strokeWidth="0.6"
                  opacity="0.7"
                  transform="rotate(225 55 55)"
                />
                <ellipse
                  cx="55"
                  cy="25"
                  rx="10"
                  ry="20"
                  fill="rgba(155,114,200,0.18)"
                  stroke="#9b72c8"
                  strokeWidth="0.6"
                  opacity="0.7"
                  transform="rotate(270 55 55)"
                />
                <ellipse
                  cx="55"
                  cy="25"
                  rx="10"
                  ry="20"
                  fill="rgba(155,114,200,0.18)"
                  stroke="#9b72c8"
                  strokeWidth="0.6"
                  opacity="0.7"
                  transform="rotate(315 55 55)"
                />

                {/* inner 6 petals - gold */}
                <ellipse
                  cx="55"
                  cy="37"
                  rx="6"
                  ry="13"
                  fill="rgba(201,168,76,0.22)"
                  stroke="#c9a84c"
                  strokeWidth="0.6"
                  opacity="0.8"
                />
                <ellipse
                  cx="55"
                  cy="37"
                  rx="6"
                  ry="13"
                  fill="rgba(201,168,76,0.22)"
                  stroke="#c9a84c"
                  strokeWidth="0.6"
                  opacity="0.8"
                  transform="rotate(60 55 55)"
                />
                <ellipse
                  cx="55"
                  cy="37"
                  rx="6"
                  ry="13"
                  fill="rgba(201,168,76,0.22)"
                  stroke="#c9a84c"
                  strokeWidth="0.6"
                  opacity="0.8"
                  transform="rotate(120 55 55)"
                />
                <ellipse
                  cx="55"
                  cy="37"
                  rx="6"
                  ry="13"
                  fill="rgba(201,168,76,0.22)"
                  stroke="#c9a84c"
                  strokeWidth="0.6"
                  opacity="0.8"
                  transform="rotate(180 55 55)"
                />
                <ellipse
                  cx="55"
                  cy="37"
                  rx="6"
                  ry="13"
                  fill="rgba(201,168,76,0.22)"
                  stroke="#c9a84c"
                  strokeWidth="0.6"
                  opacity="0.8"
                  transform="rotate(240 55 55)"
                />
                <ellipse
                  cx="55"
                  cy="37"
                  rx="6"
                  ry="13"
                  fill="rgba(201,168,76,0.22)"
                  stroke="#c9a84c"
                  strokeWidth="0.6"
                  opacity="0.8"
                  transform="rotate(300 55 55)"
                />

                {/* dashed inner ring */}
                <circle
                  cx="55"
                  cy="55"
                  r="36"
                  fill="none"
                  stroke="#9b72c8"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                  opacity="0.35"
                />

                {/* center circle */}
                <circle
                  cx="55"
                  cy="55"
                  r="12"
                  fill="rgba(201,168,76,0.15)"
                  stroke="#c9a84c"
                  strokeWidth="1"
                  opacity="0.65"
                />
                <circle cx="55" cy="55" r="5" fill="#c9a84c" opacity="0.5" />
              </svg>
            </div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              style={{
                ...S.display,
                fontSize: "clamp(3.2rem,12vw,4.2rem)",
                lineHeight: 1.05,
              }}
            >
              Tharindu
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              style={{
                ...S.display,
                fontSize: "2.2rem",
                fontStyle: "italic",
                ...S.gold,
                margin: "4px 0",
              }}
            >
              &amp;
            </motion.p>
            <motion.h1
              custom={3}
              variants={fadeUp}
              style={{
                ...S.display,
                fontSize: "clamp(3.2rem,12vw,4.2rem)",
                lineHeight: 1.05,
              }}
            >
              Dasuni
            </motion.h1>

            <motion.p
              custom={4}
              variants={fadeUp}
              style={{ ...S.label, marginTop: 22 }}
            >
              September 05, 2026
            </motion.p>
          </div>
        </Section>

        {/* ══ 2. CORDIALLY INVITED + COUPLE PHOTO ═════ */}
        <Section style={{ marginBottom: 60 }}>
          <motion.p
            custom={0}
            variants={fadeUp}
            style={{
              ...S.label,
              textAlign: "center",
              marginBottom: 28,
              lineHeight: 2,
            }}
          >
            You are cordially invited to celebrate the
            <br />
            union of
          </motion.p>

          {/* Couple photo card */}
          <motion.div
            custom={1}
            variants={fadeUp}
            style={{
              width: 200,
              height: 200,
              borderRadius: 26,
              margin: "0 auto 36px",
              background: "linear-gradient(135deg, #e8daf5, #f5e8d8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 16px 48px rgba(45,27,78,0.14)",
              border: "1px solid rgba(201,168,76,0.22)",
              overflow: "hidden",
            }}
          >
            {/*
              Replace the block below with:
              <img src="/couple.jpg" alt="Tharindu & Dasuni"
                   style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: 8 }}>💑</div>
              <p style={{ ...S.label, fontSize: "0.38rem" }}>
                happy-couple-getting-married
                <img
                  src="../happy-couple-getting-married.jpg"
                  alt="Tharindu & Dasuni"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </p>
            </div>
          </motion.div>

          {/* <motion.div
            custom={2}
            variants={fadeUp}
            style={{ textAlign: "center" }}
          >
            <p style={{ ...S.label, marginBottom: 8 }}>Beloved daughter of</p>
            <p style={{ ...S.body, color: "#4a3060" }}>
              Mr. R. M. Sunil Jayawardena
            </p>
            <p style={{ ...S.body, color: "#4a3060" }}>
              &amp; Mrs. H. D. Nayana Jayawardena
            </p>
          </motion.div> */}
        </Section>

        {/* ══ 3. NAMES WITH PARENTS ════════════════════ */}
        <Section style={{ marginBottom: 60 }}>
          <PersonCard
            role="Beloved daughter of"
            parent1="Mr. R. M. Sunil Jayawardena"
            parent2="& Mrs. H. D. Nayana Jayawardena"
            name="Dasuni"
            custom={0}
          />

          {/* gradient & connector */}
          <motion.div
            custom={1}
            variants={fadeUp}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "6px 0",
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #9b72c8, #c9a84c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 18px rgba(155,114,200,0.38)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.7rem",
                  color: "#fff",
                  fontStyle: "italic",
                }}
              >
                &amp;
              </span>
            </div>
          </motion.div>

          <PersonCard
            role="Beloved son of"
            parent1="Mr. A. P. Dinesh Perera"
            parent2="& Mrs. S. R. Malithi Perera"
            name="Tharindu"
            custom={2}
          />
        </Section>

        {/* ══ 4. DATE & TIME ═══════════════════════════ */}
        <Section style={{ marginBottom: 60, textAlign: "center" }}>
          {/* Date */}
          <motion.div custom={0} variants={fadeUp} style={{ marginBottom: 32 }}>
            {/* Calendar SVG icon */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                border: "1.5px solid #c9a84c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                background: "rgba(201,168,76,0.06)",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="17"
                  rx="3"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                />
                <line
                  x1="3"
                  y1="9"
                  x2="21"
                  y2="9"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                />
                <line
                  x1="8"
                  y1="2"
                  x2="8"
                  y2="6"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="6"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <rect
                  x="7"
                  y="13"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="#c9a84c"
                  opacity="0.7"
                />
                <rect
                  x="10.5"
                  y="13"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="#c9a84c"
                  opacity="0.4"
                />
                <rect
                  x="14"
                  y="13"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="#c9a84c"
                  opacity="0.4"
                />
              </svg>
            </div>

            <p style={{ ...S.label, marginBottom: 12 }}>The Date</p>
            <p
              style={{
                ...S.display,
                fontSize: "1.55rem",
                fontWeight: 400,
                letterSpacing: "0.06em",
              }}
            >
              SATURDAY, 05 SEPTEMBER
            </p>
            <p
              style={{
                ...S.display,
                fontSize: "1.4rem",
                ...S.gold,
                marginTop: 2,
              }}
            >
              2026
            </p>
          </motion.div>

          <div style={S.divider}>
            <div style={S.line("right")} />
            <span style={{ ...S.gold, fontSize: "0.7rem" }}>✦</span>
            <div style={S.line("left")} />
          </div>

          {/* Time */}
          <motion.div custom={1} variants={fadeUp} style={{ marginTop: 24 }}>
            {/* Clock SVG icon */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1.5px solid #9b72c8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                background: "rgba(155,114,200,0.06)",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="#9b72c8"
                  strokeWidth="1.5"
                />
                <line
                  x1="12"
                  y1="7"
                  x2="12"
                  y2="12"
                  stroke="#9b72c8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="12"
                  y1="12"
                  x2="15.5"
                  y2="14"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="1.2" fill="#9b72c8" />
              </svg>
            </div>

            <p style={{ ...S.label, marginBottom: 12 }}>The Time</p>
            <p style={{ ...S.display, fontSize: "3rem", fontWeight: 300 }}>
              10:30 AM
            </p>
            <p style={{ ...S.body, marginTop: 6 }}>TO 04:00 PM</p>
          </motion.div>

          {/* Poruwa pill */}
          <motion.div custom={2} variants={fadeUp} style={{ marginTop: 28 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "linear-gradient(135deg, #9b72c8, #7b5ea7)",
                borderRadius: 30,
                padding: "10px 22px",
                color: "#fff",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                boxShadow: "0 4px 16px rgba(123,94,167,0.3)",
              }}
            >
              {/* Flower/ceremony SVG icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="12"
                  cy="5"
                  rx="3"
                  ry="5"
                  fill="rgba(255,255,255,0.7)"
                />
                <ellipse
                  cx="12"
                  cy="5"
                  rx="3"
                  ry="5"
                  fill="rgba(255,255,255,0.7)"
                  transform="rotate(60 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="5"
                  rx="3"
                  ry="5"
                  fill="rgba(255,255,255,0.7)"
                  transform="rotate(120 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="5"
                  rx="3"
                  ry="5"
                  fill="rgba(255,255,255,0.7)"
                  transform="rotate(180 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="5"
                  rx="3"
                  ry="5"
                  fill="rgba(255,255,255,0.7)"
                  transform="rotate(240 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="5"
                  rx="3"
                  ry="5"
                  fill="rgba(255,255,255,0.7)"
                  transform="rotate(300 12 12)"
                />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
              Poruwa Ceremony at 10:12 AM
            </div>
          </motion.div>
        </Section>

        {/* ══ 5. COUNTDOWN ═════════════════════════════ */}
        <Section style={{ marginBottom: 60, textAlign: "center" }}>
          <motion.div custom={0} variants={fadeUp}>
            <p style={{ ...S.display, fontSize: "1.9rem" }}>
              Wait for the{" "}
              <em style={{ ...S.gold, fontStyle: "italic" }}>Magic</em>
            </p>
          </motion.div>

          <motion.p
            custom={1}
            variants={fadeUp}
            style={{ ...S.label, margin: "14px 0 32px" }}
          >
            ↑ Counting Down ↑
          </motion.p>

          <motion.div
            custom={2}
            variants={fadeUp}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 28,
              flexWrap: "wrap",
            }}
          >
            <CountdownBox value={countdown.days} label="Days" />
            <CountdownBox value={countdown.hours} label="Hours" />
            <CountdownBox value={countdown.minutes} label="Minutes" />
            <CountdownBox value={countdown.seconds} label="Seconds" />
          </motion.div>
        </Section>

        {/* ══ 6. VENUE ═════════════════════════════════ */}
        <Section style={{ marginBottom: 24 }}>
          <motion.p
            custom={0}
            variants={fadeUp}
            style={{ ...S.label, marginBottom: 12 }}
          >
            The Venue
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            style={{
              ...S.display,
              fontSize: "clamp(2.6rem,10vw,3.4rem)",
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Lumina Ballroom
          </motion.h2>

          <motion.div
            custom={2}
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <span style={{ color: "#9b72c8", marginTop: 2 }}>📍</span>
            <div>
              <p style={{ ...S.body, color: "#4a3060", fontWeight: 500 }}>
                Cinnamon Grand Colombo,
              </p>
              <p style={{ ...S.body, color: "#4a3060" }}>Sri Lanka</p>
            </div>
          </motion.div>

          <motion.p
            custom={3}
            variants={fadeUp}
            style={{ ...S.body, marginBottom: 28 }}
          >
            We can't wait to celebrate together in an evening filled with love,
            music, and unforgettable memories.
          </motion.p>

          {/* Map — replace div with <iframe> */}
          <motion.div
            custom={4}
            variants={fadeUp}
            style={{
              borderRadius: 20,
              overflow: "hidden",
              height: 200,
              marginBottom: 20,
              border: "1px solid rgba(155,114,200,0.18)",
              background: "linear-gradient(135deg,#e2d4f0,#d4c5e8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.772580675548!2d79.84586477365278!3d6.917769918458876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259be2c6291d3%3A0xe9d61ae167b8738c!2sCinnamon%20Grand%20Colombo!5e0!3m2!1sen!2slk!4v1777892066764!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>

          {/* Get Directions */}
          <motion.a
            custom={5}
            variants={fadeUp}
            href="https://www.google.com/maps/place/Cinnamon+Grand+Colombo/@6.9177699,79.8458648,17z/data=!3m1!4b1!4m9!3m8!1s0x3ae259be2c6291d3:0xe9d61ae167b8738c!5m2!4m1!1i2!8m2!3d6.9177646!4d79.8484397!16s%2Fg%2F11h6t_l3f6?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 32px rgba(155,114,200,0.42)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              padding: "16px",
              borderRadius: 14,
              background: "linear-gradient(135deg, #9b72c8, #7b5ea7)",
              color: "#fff",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 6px 24px rgba(123,94,167,0.32)",
            }}
          >
            📍 Get Directions
          </motion.a>
        </Section>

        {/* ══ FOOTER ═══════════════════════════════════ */}
        <div style={{ textAlign: "center", marginTop: 52 }}>
          <div style={S.divider}>
            <div style={S.line("right")} />
            <span style={{ ...S.gold, fontSize: "0.8rem" }}>✦</span>
            <div style={S.line("left")} />
          </div>
          <p
            style={{
              ...S.display,
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "#9b72c8",
              marginTop: 16,
            }}
          >
            "Two souls, one beautiful journey"
          </p>
          <p style={{ ...S.label, marginTop: 12, fontSize: "0.42rem" }}>
            Tharindu &amp; Dasuni · September 2026
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginTop: 16,
              color: "#c9a84c",
              opacity: 0.6,
            }}
          >
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>
        </div>
      </div>
    </div>
  );
}

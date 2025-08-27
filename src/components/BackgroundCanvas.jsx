import React from "react";
import Particles from "react-tsparticles";

export default function BackgroundCanvas() {
  const reduceMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return null;

  const options = {
    background: { color: { value: "transparent" } },
    detectRetina: true,
    fpsLimit: 60,
    particles: {
      number: { value: 24, density: { enable: true, area: 800 } },
      color: { value: ["#ff6b9d", "#a855f7"] },
      links: { enable: true, color: "#a855f7", opacity: 0.12, distance: 140, width: 1 },
      move: { enable: true, speed: 0.4, outModes: { default: "out" } },
      opacity: { value: 0.25 },
      size: { value: { min: 1, max: 2 } },
    },
    interactivity: {
      detectsOn: "window",
      events: { resize: true },
    },
  };

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <Particles id="bg-particles" options={options} />
    </div>
  );
}


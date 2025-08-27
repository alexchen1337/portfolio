import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useTilt } from "./useTilt";

export default function ProjectCard({ project, onClick }) {
  const ref = useRef(null);
  const tiltOptions = useMemo(() => ({ max: 8, speed: 350, glare: true, "max-glare": 0.15, scale: 1.02 }), []);
  useTilt(ref, tiltOptions);
  return (
    <motion.div
      ref={ref}
      className="content-card"
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25 }}
    >
      <h3 className="card-title-link">{project.title}</h3>
      <p className="card-subtitle project-short-desc">{project.short}</p>
    </motion.div>
  );
}


import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TimelineItem({ exp, isMobile, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      onClick={() => onClick(exp)}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.25 }}
    >
      <div className="timeline-dot" />
      <div className="timeline-content">
        <img src={exp.logo} alt={exp.company + ' logo'} className="timeline-logo" />
        <div>
          <div className="timeline-title">{exp.title}</div>
          <div className="timeline-company">{exp.company}</div>
        </div>
        {!isMobile && <div className="timeline-period">{exp.period}</div>}
      </div>
      {isMobile && <div className="timeline-period" style={{marginTop: '0.5rem'}}>{exp.period}</div>}
    </motion.div>
  );
}


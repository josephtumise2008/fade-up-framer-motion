import { motion, useInView } from "framer-motion";
import { useRef, type PropsWithChildren } from "react";

interface FadeUpProps extends PropsWithChildren {
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  distance = 40,
  className = "",
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
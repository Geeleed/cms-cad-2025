"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FadeInWrapper({
  children,
  delay = 200,
  className = "",
  threshold = 0.1,
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  return (
    <motion.div
      ref={ref}
      style={{ willChange: "opacity, transform" }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// "use client";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { useEffect, useState } from "react";

// export default function FadeInWrapper({
//   children,
//   delay = 200,
//   className = "",
//   threshold = 0.01, // 👈 แนะนำให้ใช้ค่านี้เพื่อเริ่ม animation ไว
// }) {
//   const { ref, inView } = useInView({ triggerOnce: true, threshold });
//   const [shouldAnimate, setShouldAnimate] = useState(false);

//   // 👇 ใช้ useEffect + requestIdleCallback เพื่อเลี่ยง jank
//   useEffect(() => {
//     if (inView) {
//       if ("requestIdleCallback" in window) {
//         requestIdleCallback(() => setShouldAnimate(true));
//       } else {
//         setTimeout(() => setShouldAnimate(true), 0);
//       }
//     }
//   }, [inView]);

//   return (
//     <motion.div
//       ref={ref}
//       style={{ willChange: "opacity, transform" }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.5, ease: "easeOut", delay: delay / 1000 }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// "use client";
// import { useEffect, useRef, useState } from "react";

// export default function FadeInWrapper({
//   children,
//   className = "",
//   delay = 0,
//   threshold = 0.01,
// }) {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setTimeout(() => setVisible(true), delay);
//         }
//       },
//       { threshold }
//     );
//     if (ref.current) observer.observe(ref.current);

//     return () => {
//       if (ref.current) observer.unobserve(ref.current);
//     };
//   }, [delay, threshold]);

//   return (
//     <div
//       ref={ref}
//       className={`
//         transform transition-all duration-700 ease-out
//         ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
//         ${className}
//       `}
//     >
//       {children}
//     </div>
//   );
// }

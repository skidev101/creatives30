/* eslint-disable no-unused-vars */

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

// FadeIn: fades in from opacity 0 to 1 with no movement
export const FadeIn = ({ children, duration = 0.5 , delay = 0}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 0 });
    }
  }, [inView, controls, duration, delay]);
  
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={controls}>
      {children}
    </motion.div>
  );
};


// FadeOut: fades out from opacity 1 to 0 when in view, resets to opaque when out of view
export const FadeOut = ({ children, duration = 0.5, delay = 0  }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 0, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 1 });
    }
  }, [inView, controls, duration, delay]);
  
  return (
    <motion.div ref={ref} initial={{ opacity: 1 }} animate={controls}>
      {children}
    </motion.div>
  );
};

// FadeUp: fades in and moves upward from below
export const FadeUp = ({ children, duration = 0.5, distance = 50, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 0, y: distance });
    }
  }, [inView, controls, distance, duration, delay]);
  
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: distance }} animate={controls}>
      {children}
    </motion.div>
  );
};

// FadeDown: fades in and moves downward from above
export const FadeDown = ({ children, duration = 0.5, distance = 50, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 0, y: -distance });
    }
  }, [inView, controls, distance, duration, delay]);
  
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: -distance }} animate={controls}>
      {children}
    </motion.div>
  );
};

// FadeLeft: fades in and slides in from the left
export const FadeLeft = ({ children, duration = 0.5, distance = 50, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 0, x: -distance });
    }
  }, [inView, controls, distance, duration, delay]);
  
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -distance }} animate={controls}>
      {children}
    </motion.div>
  );
};

// FadeRight: fades in and slides in from the right
export const FadeRight = ({ children, duration = 0.5, distance = 50, delay = 0, className ='' }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0, transition: { duration, delay } });
    } else {
      controls.start({ opacity: 0, x: distance });
    }
  }, [inView, controls, distance, duration, delay]);
  
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: distance }} animate={controls} className={className}>
      {children}
    </motion.div>
  );
};

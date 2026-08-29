import React from 'react';
import { motion } from 'framer-motion';

const defaultEase = [0.22, 1, 0.36, 1] as const;

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: defaultEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleUnblur: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 1,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration, delay, ease: defaultEase }}
      style={{ transformOrigin: 'center' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, LayoutGroup } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ContactButton } from './ContactButton';

const transitionEase = [0.22, 1, 0.36, 1] as const;

export const HeroCtas: React.FC = () => {
  return (
    <LayoutGroup>
      <motion.div
        layout
        transition={{ layout: { duration: 0.55, ease: transitionEase } }}
        className="mt-2 flex flex-wrap items-center gap-3"
      >
        <ContactButton />
        <motion.div
          layout
          transition={{ layout: { duration: 0.55, ease: transitionEase } }}
        >
          <Link
            to="/projects"
            className="border border-foreground/5 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-2xl transition-colors hover:bg-foreground/4"
          >
            View My Work
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check } from 'lucide-react';

const transitionEase = [0.22, 1, 0.36, 1] as const;
const EMAIL = 'hello@example.com';

export const ContactButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleToggle = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <div ref={containerRef} className="relative inline-flex">
      <motion.button
        layout
        type="button"
        onClick={handleToggle}
        aria-label={isExpanded ? "Copy email" : "Show email"}
        className="focus-ring relative inline-flex h-11 cursor-pointer items-center justify-center bg-foreground px-5 text-sm font-medium text-background"
        style={{ borderRadius: 12 }}
        transition={{ layout: { duration: 0.45, ease: transitionEase } }}
      >
        <span className="relative inline-flex items-center">
          <AnimatePresence mode="wait" initial={false}>
            {isExpanded ? (
              <motion.span
                key="email"
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.3, ease: transitionEase }}
                className="inline-flex items-center gap-2 whitespace-nowrap"
              >
                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy to clipboard"
                  className="inline-flex items-center justify-center p-0.5 hover:opacity-80 transition-opacity"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isCopied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2, ease: transitionEase }}
                        className="inline-flex text-green-400"
                      >
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2, ease: transitionEase }}
                        className="inline-flex"
                      >
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <span className="tabular-nums select-all">{EMAIL}</span>
              </motion.span>
            ) : (
              <motion.span
                key="contact"
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.3, ease: transitionEase }}
                className="inline-flex items-center gap-2 whitespace-nowrap"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Contact</span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
};

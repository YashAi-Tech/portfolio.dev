import React from 'react';
import { Mail } from 'lucide-react';
import { ContactCardCtas } from './ContactCardCtas';
import { FadeIn } from './FadeIn';

export const ConnectCard: React.FC = () => {
  return (
    <section className="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <FadeIn>
        <div className="relative w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            {/* Background subtle radial texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)',
                maskImage:
                  'radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)',
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 h-full w-full grayscale bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]"
              />
            </div>

            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
                  Let’s connect
                </h2>
                <p className="max-w-[29ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px] mb-6">
                  I’m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Just reach out!
                </p>
                <ContactCardCtas />
              </div>

              <div className="border-foreground/8 flex flex-col items-center justify-center gap-6 rounded-[1.1rem] border bg-background p-6 sm:p-8">
                <div className="flex items-center gap-3 opacity-75">
                  <a
                    aria-label="Email"
                    className="border-foreground/8 hover:border-foreground/15 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-colors hover:text-foreground"
                    href="mailto:hello@example.com"
                  >
                    <Mail className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                  </a>
                  <a
                    aria-label="LinkedIn"
                    className="border-foreground/8 hover:border-foreground/15 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-colors hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com"
                  >
                    <img
                      src="/linkedin.svg"
                      alt=""
                      aria-hidden="true"
                      width={14}
                      height={14}
                      className="max-h-[14px] max-w-[14px] object-contain dark:invert"
                    />
                  </a>
                  <a
                    aria-label="X"
                    className="border-foreground/8 hover:border-foreground/15 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-colors hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://x.com"
                  >
                    <img
                      src="/x.svg"
                      alt=""
                      aria-hidden="true"
                      width={14}
                      height={14}
                      className="max-h-[14px] max-w-[14px] object-contain dark:invert"
                    />
                  </a>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-[13px] tracking-tight text-foreground/70">
                    2026 © Built with Next.js
                  </p>
                  <p className="text-[12px] tracking-tight text-foreground/45">
                    By React Bits Pro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInSlow, fadeUp } from "@/lib/motion";
import { heroStill, photographer } from "@/lib/public-site";

export function BleedPlate() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="plate" className="relative min-h-[100svh] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src={heroStill.src}
          alt={heroStill.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_22%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(18,16,14,0.94)] via-[rgba(18,16,14,0.45)] to-transparent"
          aria-hidden
        />
      </motion.div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-[var(--space-sm)] pb-[calc(var(--space-xl)+1.5rem)] pt-28 sm:px-[var(--space-md)] sm:pb-[var(--space-2xl)]">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.16,
                delayChildren: reduceMotion ? 0 : 0.28,
              },
            },
          }}
        >
          <motion.p
            className="mb-4 text-[0.75rem] tracking-[0.18em] uppercase text-[#faf8f5]/85"
            variants={fadeUp}
          >
            {photographer.role} · {photographer.location}
          </motion.p>
          <motion.h1
            className="font-[family-name:var(--font-display)] text-[clamp(3.25rem,8vw,7.5rem)] font-light leading-[0.92] tracking-[-0.03em] text-[#faf8f5] [text-shadow:0_2px_24px_rgba(18,16,14,0.55)]"
            variants={fadeUp}
          >
            {photographer.name}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-md text-lg leading-relaxed text-[#faf8f5]/90 sm:text-xl"
            variants={fadeInSlow}
          >
            {photographer.plateLine}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

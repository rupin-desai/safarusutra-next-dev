"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import SSButton from "../../UI/SSButton";

type Status = { type: "error" | "loading" | "success"; message: string } | null;

const containerVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 60px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.1 },
  },
};

const headingVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.3 },
  },
};

const paragraphVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 30px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.4 },
  },
};

const formVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.5 },
  },
};

const inputVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(-30px, 0px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.6 },
  },
};

const buttonVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(30px, 0px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.7 },
  },
};

const disclaimerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.8 },
  },
};

const successVariants: Variants = {
  initial: {
    opacity: 0,
    transform: "translate3d(0px, 10px, 0px)",
  },
  animate: {
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const HomeNewsletter: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<Status>(null);

  const springConfig = {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setStatus({ type: "loading", message: "Subscribing..." });

    setTimeout(() => {
      setStatus({ type: "success", message: "Thank you for subscribing!" });
      setEmail("");

      setTimeout(() => setStatus(null), 3000);
    }, 1500);
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="rounded-3xl p-12  shadow-lg relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            variants={overlayVariants}
          />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <motion.div
              className="absolute -top-7 -right-5 md:-top-5 md:right-16 w-8 h-8 md:w-10 md:h-10 z-10"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...springConfig, delay: 0.2 }}
            >
              <motion.img
                src="/graphics/star.svg"
                alt=""
                className="w-full h-full"
                aria-hidden="true"
                style={{ transformOrigin: "center" }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }}
              />
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-semibold mb-4 font-family-baloo text-white"
              variants={headingVariants}
            >
              Let&apos;s Get You Moving
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl font-light text-white mb-8"
              variants={paragraphVariants}
            >
              Got a destination in mind? We&apos;ll make it happen.
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 mb-4 max-w-xl mx-auto"
              variants={formVariants}
            >
              <motion.div className="flex-1 relative" variants={inputVariants}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
                />
                {status?.type === "error" && (
                  <p className="text-red-300 text-sm mt-1 absolute">
                    {status.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={buttonVariants}>
                <SSButton
                  variant="primary"
                  color="var(--color-orange)"
                  className="whitespace-nowrap px-5"
                  type="submit"
                >
                  Subscribe
                </SSButton>
              </motion.div>
            </motion.form>

            {status?.type === "success" && (
              <motion.p
                variants={successVariants}
                initial="initial"
                animate="animate"
                className="text-green-300 font-medium mt-2"
              >
                {status.message}
              </motion.p>
            )}

            <motion.p
              className="text-sm text-gray-200 mt-4"
              variants={disclaimerVariants}
            >
              Join our newsletter to receive updates and travel tips.
            </motion.p>
          </div>

          <motion.div
            className="absolute -bottom-4 -left-4 w-10 h-10 z-10"
            initial={{ opacity: 0, x: -20, y: 20 }}
            whileInView={{ opacity: 0.6, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...springConfig, delay: 0.3 }}
          >
            <motion.img
              src="/graphics/star2.svg"
              alt=""
              className="w-full h-full"
              aria-hidden="true"
              style={{ transformOrigin: "center" }}
              animate={{
                rotate: -360,
              }}
              transition={{
                rotate: {
                  duration: 25,
                  ease: "linear",
                  repeat: Infinity,
                },
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeNewsletter;

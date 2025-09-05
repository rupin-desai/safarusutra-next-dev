"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/UI/HeroSection";
import SectionTitle from "@/components/UI/SectionTitle";
import JoinTeamForm from "@/components/Pages/HirePage/JoinTeamForm";
import { Users } from "lucide-react";
import Illustration from "@/components/UI/Illustations";
import HomeHighlight from "@/components/Pages/HomePage/HomeHighlight";
import { initEmailJS } from "@/utils/emailjs_HireB2b.utils";

export default function HirePageClient(): React.ReactElement {
  // Initialize EmailJS when component mounts
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <HeroSection
        title="Join Our Team & Build Your Career in Travel!"
        backgroundImage="https://images.unsplash.com/photo-1502085671122-2d218cd434e6?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        overlay={0.5}
        titleSize="text-4xl md:text-5xl"
      />

      <section id="application-form" className="py-16 relative">
        {/* Ship Illustration on left side */}
        <motion.div
          className="absolute top-20 left-4 md:left-12 lg:left-24 xl:left-32 z-10 w-20 h-20 md:w-28 md:h-28 pointer-events-none"
          initial={{ opacity: 0, transform: "translate3d(-40px, -20px, 0)" }}
          whileInView={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <motion.div
            animate={{
              y: [-6, 10, -6],
              rotate: [2, -3, 2],
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 6,
                ease: [0.42, 0, 0.58, 1],
              },
              rotate: {
                repeat: Infinity,
                duration: 7,
                ease: [0.42, 0, 0.58, 1],
              },
            }}
          >
            <Illustration
              name="ship"
              color="var(--color-green)"
              className="w-full h-full"
              alt="Ship illustration"
            />
          </motion.div>
        </motion.div>

        {/* Floating Coconut Illustration */}
        <motion.div
          className="absolute top-12 right-4 md:right-12 lg:right-24 xl:right-32 z-10 w-20 h-20 md:w-28 md:h-28 pointer-events-none"
          initial={{ opacity: 0, transform: "translate3d(40px, -20px, 0)" }}
          whileInView={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotate: [-4, 3, -4],
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 5,
                ease: [0.42, 0, 0.58, 1],
              },
              rotate: {
                repeat: Infinity,
                duration: 6,
                ease: [0.42, 0, 0.58, 1],
              },
            }}
          >
            <Illustration
              name="coconut"
              color="var(--color-orange)"
              className="w-full h-full"
              alt="Coconut illustration"
            />
          </motion.div>
        </motion.div>

        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, transform: "translate3d(0, 30px, 0)" }}
            whileInView={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <SectionTitle
              icon={<Users size={16} />}
              pillText="Careers With Us"
              title="Join Our Adventure"
              color="#F89B21"
              containerClassName="mb-8"
            />

            <p className="text-gray-700 max-w-2xl mx-auto text-center mb-12">
              At Safari Sutra, we&#39;re always looking for passionate individuals
              who share our love for travel and creating unforgettable
              experiences. Fill out the form below to start your journey with
              us!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, transform: "translate3d(0, 40px, 0)" }}
            whileInView={{ opacity: 1, transform: "translate3d(0, 0, 0)" }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.15,
            }}
          >
            <JoinTeamForm />
          </motion.div>
        </div>
      </section>
      <HomeHighlight />
    </div>
  );
}
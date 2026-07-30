"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

const sections = [
  {
    id: "hero-sequence",
    title: "Início",
    subtitle: "A Precision Pen",
    icon: "solar:home-smile-linear",
  },
  {
    id: "tech-specs",
    title: "Tecnologia",
    subtitle: "Engenharia & Precisão",
    icon: "solar:settings-linear",
  },
  {
    id: "design",
    title: "Design",
    subtitle: "Arquitetura do Pensamento",
    icon: "solar:pen-new-square-linear",
  },
  {
    id: "buy",
    title: "Edições",
    subtitle: "Escolha sua ferramenta",
    icon: "solar:bag-3-linear",
  },
];

export default function FloatingIndex() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-sequence");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentSection = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-16 left-0 w-72 bg-white/90 backdrop-blur-xl border border-stone-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col gap-1 origin-bottom-left"
          >
            <div className="p-4 pb-2 flex items-center justify-between border-b border-stone-100 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500">
                Sumário
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-stone-900 transition-colors p-1"
              >
                <Icon icon="solar:close-circle-linear" className="text-xl" />
              </button>
            </div>

            <div className="flex flex-col gap-1 p-2">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-300 text-left group
                      ${
                        isActive
                          ? "bg-stone-900 text-white shadow-lg"
                          : "bg-transparent text-stone-600 hover:bg-stone-100/80"
                      }
                    `}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors
                      ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "bg-stone-200/50 text-stone-500 group-hover:bg-white group-hover:text-stone-900 group-hover:shadow-sm"
                      }
                    `}
                    >
                      <Icon icon={section.icon} className="text-xl" />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isActive ? "text-white" : "text-stone-900 group-hover:text-stone-900"
                        }`}
                      >
                        {section.title}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-mono transition-colors ${
                          isActive ? "text-stone-400" : "text-stone-500 group-hover:text-stone-600"
                        }`}
                      >
                        {section.subtitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-300 shadow-2xl border
          ${
            isOpen
              ? "bg-white text-stone-900 border-stone-200 shadow-stone-200/50 rotate-90"
              : "bg-stone-900 text-white border-stone-800 shadow-black/30 hover:scale-105 hover:bg-stone-800 hover:shadow-black/40"
          }
        `}
        aria-label="Abrir Sumário"
      >
        <Icon
          icon={isOpen ? "solar:close-square-linear" : "solar:hamburger-menu-linear"}
          className="text-2xl"
        />
      </button>
    </div>
  );
}

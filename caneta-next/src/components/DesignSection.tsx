"use client";

import React from "react";
import { Icon } from "@iconify/react";

export default function DesignSection() {
  const handleFlashlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      className="relative z-20 bg-[#EAEAE5] py-24 md:py-32 overflow-hidden border-t border-stone-300"
      id="design"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-24">
        <div className="text-center mb-24 reveal-up">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 mb-6 block">
            Architecture of Thought
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-stone-900 max-w-3xl mx-auto">
            A ferramenta invisível para
            <br />
            <span className="text-stone-400">ideias tangíveis.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="flashlight-card h-[400px] border border-stone-300 bg-white p-8 flex flex-col justify-between rounded-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group reveal-up delay-200"
            onMouseMove={handleFlashlightMove}
          >
            <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-stone-900 mb-6 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500">
              <Icon
                icon="solar:pen-new-square-linear"
                className="text-2xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-display font-medium mb-3">
                Fluxo Contínuo
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                A tinta flui sem interrupções, permitindo que seus
                pensamentos corram livremente para o papel sem fricção.
              </p>
            </div>
            <div className="h-1 w-full bg-stone-100 mt-8 overflow-hidden">
              <div className="h-full bg-stone-900 w-0 group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          </div>

          <div
            className="flashlight-card h-[400px] border border-stone-300 bg-white p-8 flex flex-col justify-between rounded-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group reveal-up delay-400"
            onMouseMove={handleFlashlightMove}
          >
            <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-stone-900 mb-6 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500">
              <Icon
                icon="solar:soundwave-square-linear"
                className="text-2xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-display font-medium mb-3">
                Silêncio Absoluto
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Mecanismo de clique silencioso e ponta amortecida. Escreva
                em qualquer ambiente sem distrações.
              </p>
            </div>
            <div className="h-1 w-full bg-stone-100 mt-8 overflow-hidden">
              <div className="h-full bg-stone-900 w-0 group-hover:w-full transition-all duration-700 ease-out delay-100" />
            </div>
          </div>

          <div
            className="flashlight-card h-[400px] border border-stone-300 bg-white p-8 flex flex-col justify-between rounded-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group reveal-up delay-600"
            onMouseMove={handleFlashlightMove}
          >
            <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-stone-900 mb-6 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500">
              <Icon icon="solar:scale-linear" className="text-2xl" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-medium mb-3">
                Equilíbrio Neutro
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Centro de gravidade estudado para repousar na junção da mão,
                reduzindo a fadiga em 40%.
              </p>
            </div>
            <div className="h-1 w-full bg-stone-100 mt-8 overflow-hidden">
              <div className="h-full bg-stone-900 w-0 group-hover:w-full transition-all duration-700 ease-out delay-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-stone-200/50 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none mix-blend-multiply" />
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function BuySection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 z-20"
      id="buy"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 mix-blend-luminosity"
      >
        <source src="/assets/raw_files/video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#111111]/70 z-10 backdrop-blur-[2px]" />

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="text-center mb-16 reveal-up">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-4 block">
            Evolua sua Escrita
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-white max-w-3xl mx-auto">
            Escolha sua Ferramenta
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {/* Standard */}
          <div className="bg-[#1c1c1c]/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col justify-between h-[420px] hover:border-white/30 transition-colors reveal-up delay-200">
            <div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white mb-6">
                <Icon icon="solar:pen-linear" className="text-xl" />
              </div>
              <h3 className="text-2xl font-display font-medium text-white mb-2">
                Standard Edition
              </h3>
              <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-6">
                Apenas a Caneta
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mb-8">
                A Precision Pen original, feita em alumínio de grau
                aeroespacial. Perfeita para quem busca o essencial com
                qualidade impecável.
              </p>
            </div>
            <div className="mt-auto">
              <div className="text-3xl font-display text-white mb-4">
                $89
                <span className="text-xs text-stone-500 font-mono ml-1 uppercase">
                  usd
                </span>
              </div>
              <Link
                href="/compra"
                className="w-full py-3 px-6 border border-white/20 text-white rounded-full text-sm font-medium hover:bg-white hover:text-[#111] transition-colors text-center block"
              >
                Comprar Agora
              </Link>
            </div>
          </div>

          {/* Pro */}
          <div className="bg-[#111111]/90 backdrop-blur-xl border border-white/10 p-10 rounded-2xl flex flex-col justify-center items-center h-[480px] shadow-2xl shadow-black/80 relative transform md:-translate-y-6 hover:scale-[1.02] transition-transform duration-500 reveal-up delay-300 w-full">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center w-full flex-grow flex flex-col justify-center items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#111] mb-6 shadow-lg">
                <Icon icon="solar:crown-bold" className="text-xl" />
              </div>

              <h3 className="text-[2.5rem] font-display text-white mb-6 tracking-tight leading-none">
                Artools<span className="font-light">Pro</span>
              </h3>

              <div className="w-6 h-[1px] bg-stone-600 mb-4" />

              <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-stone-400 mb-10">
                Signature Series • 2026
              </div>
            </div>

            <div className="w-full mt-auto">
              <Link
                href="/compra"
                className="w-full py-3.5 px-6 bg-white text-[#111] rounded-full text-[13px] font-medium hover:bg-stone-200 transition-colors flex items-center justify-center gap-2 group"
              >
                Get Early Access
                <Icon
                  icon="solar:arrow-right-linear"
                  className="text-lg group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Creator Club */}
          <div className="bg-[#1c1c1c]/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col justify-between h-[420px] hover:border-white/30 transition-colors reveal-up delay-500">
            <div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white mb-6">
                <Icon icon="solar:infinity-bold" className="text-xl" />
              </div>
              <h3 className="text-2xl font-display font-medium text-white mb-2">
                Creator Club
              </h3>
              <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-6">
                Assinatura Anual
              </div>
              <p className="text-stone-400 text-sm leading-relaxed mb-8">
                Refis de tinta ilimitados entregues na sua porta. Garantia
                estendida vitalícia e acesso antecipado a novos produtos da
                linha Artools.
              </p>
            </div>
            <div className="mt-auto">
              <div className="text-3xl font-display text-white mb-4">
                $29
                <span className="text-xs text-stone-500 font-mono ml-1 uppercase">
                  /ano
                </span>
              </div>
              <Link
                href="/compra"
                className="w-full py-3 px-6 border border-white/20 text-white rounded-full text-sm font-medium hover:bg-white hover:text-[#111] transition-colors text-center block"
              >
                Assinar Agora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

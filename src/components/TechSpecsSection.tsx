import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function TechSpecsSection() {
  return (
    <section
      className="relative z-20 bg-stone-50 text-stone-900 py-24 md:py-32 overflow-hidden border-t border-stone-200"
      id="tech-specs"
    >
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`,
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 pointer-events-none select-none opacity-[0.03] z-0 overflow-hidden hidden md:block">
          <span className="font-display font-bold text-[15rem] leading-none text-stone-900">
            PRECISION
          </span>
        </div>

        <div className="mb-24 reveal-up relative z-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400">
              Tecnologia
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-medium tracking-tight leading-none text-stone-900 max-w-4xl mix-blend-darken">
            Engenharia Suíça.
            <br />
            <span className="text-stone-400">Precisão Molecular.</span>
          </h2>
          <p className="mt-8 text-lg text-stone-500 max-w-2xl font-light leading-relaxed text-balance">
            Nossa arquitetura de fluxo proprietária sincroniza a deposição
            de tinta em tempo real. Construída sobre um chassi de alumínio
            aeroespacial usinado em CNC de 5 eixos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div
            className="lg:col-span-7 relative group"
            style={{ perspective: 1000 }}
          >
            <div className="absolute inset-0 bg-stone-200/50 rounded-2xl transform rotate-2 scale-[0.98] transition-transform duration-700 group-hover:rotate-1" />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 reveal-up delay-200 shadow-2xl shadow-stone-200/50 transform transition-transform duration-700 group-hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent z-20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
              <Image
                src="/assets/raw_files/caneta.jpeg"
                alt="Detalhe Tecnológico da Artools"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 50vw"
                className="object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 mix-blend-multiply"
              />
              <div className="absolute top-8 left-8 p-4 border border-white/40 rounded-lg backdrop-blur-md bg-white/30 shadow-lg text-stone-800 hover:bg-white/50 transition-colors cursor-crosshair">
                <Icon
                  icon="solar:database-bold-duotone"
                  className="text-2xl text-stone-800 mb-2"
                />
                <div className="text-[10px] font-mono text-stone-600 tracking-widest uppercase">
                  Core_Alu_6061
                </div>
                <div className="h-0.5 w-full bg-stone-900/20 mt-2 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-stone-900" />
                </div>
              </div>

              <div className="absolute bottom-8 right-8 p-4 border border-white/40 rounded-lg backdrop-blur-md bg-white/30 shadow-lg text-right hover:bg-white/50 transition-colors cursor-crosshair">
                <div className="text-3xl font-display font-bold text-stone-900">
                  0.3
                  <span className="text-sm text-stone-500 font-mono align-top ml-1">
                    mm
                  </span>
                </div>
                <div className="text-[10px] font-mono text-stone-600 tracking-widest uppercase">
                  Tip_Precision
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="reveal-up delay-300 group cursor-crosshair p-6 rounded-xl hover:bg-white hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 border border-transparent hover:border-stone-100">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-xs font-mono text-stone-400 group-hover:text-stone-900 group-hover:scale-110 transition-all duration-300">
                  01
                </span>
                <h3 className="text-2xl font-display font-medium text-stone-900 group-hover:translate-x-1 transition-transform duration-300">
                  Alumínio Aeroespacial
                </h3>
              </div>
              <p className="pl-8 text-stone-500 text-sm leading-relaxed group-hover:text-stone-600 transition-colors border-l border-stone-200 group-hover:border-stone-900 ml-4">
                Estrutura monobloco usinada em Alumínio 6061-T6. Leveza
                extrema (14g) com resistência estrutural de nível militar
                para durar a vida toda.
              </p>
            </div>

            <div className="reveal-up delay-500 group cursor-crosshair p-6 rounded-xl hover:bg-white hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 border border-transparent hover:border-stone-100">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-xs font-mono text-stone-400 group-hover:text-stone-900 group-hover:scale-110 transition-all duration-300">
                  02
                </span>
                <h3 className="text-2xl font-display font-medium text-stone-900 group-hover:translate-x-1 transition-transform duration-300">
                  Alta Precisão
                </h3>
              </div>
              <p className="pl-8 text-stone-500 text-sm leading-relaxed group-hover:text-stone-600 transition-colors border-l border-stone-200 group-hover:border-stone-900 ml-4">
                Sistema de fluxo contínuo milimetricamente ajustado, que
                garante traços perfeitos e sem falhas, entregando uma
                escrita cirúrgica.
              </p>
            </div>

            <div className="reveal-up delay-700 group cursor-crosshair p-6 rounded-xl hover:bg-white hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 border border-transparent hover:border-stone-100">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-xs font-mono text-stone-400 group-hover:text-stone-900 group-hover:scale-110 transition-all duration-300">
                  03
                </span>
                <h3 className="text-2xl font-display font-medium text-stone-900 group-hover:translate-x-1 transition-transform duration-300">
                  Grip Texturizado
                </h3>
              </div>
              <p className="pl-8 text-stone-500 text-sm leading-relaxed group-hover:text-stone-600 transition-colors border-l border-stone-200 group-hover:border-stone-900 ml-4">
                Micro-usinagem a laser cria uma superfície de aderência
                perfeita (Ra 0.8µm) garantindo conforto prolongado sem
                acumular resíduos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

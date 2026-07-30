"use client"; // Define que este arquivo é um Client Component (roda do lado do cliente para poder usar hooks de estado e efeito)

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "@/components/Header";

// Registra o plugin ScrollTrigger no GSAP para possibilitar animações atreladas ao scroll da página
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Cria referências (Refs) para acessar elementos da DOM diretamente sem re-renderizar o React
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Hook especializado do GSAP para React. Garante que as animações sejam limpas e canceladas automaticamente no desmonte do componente.
  useGSAP(() => {
    // ==========================================
    // 1. ANIMAÇÕES DE ENTRADA (HERO ENTRANCE)
    // ==========================================
    const tl = gsap.timeline(); // Cria uma linha do tempo (timeline) para encadear animações sequenciais

    // Animação de entrada do Header: surge do topo (-20px) com opacidade progressiva (autoAlpha)
    tl.fromTo(
      "header",
      { y: -20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
    );

    // Animação do título principal (Headline): os pedaços do texto sobem do overflow oculto com efeito stagger (escalonado)
    tl.fromTo(
      ".hero-element-text",
      { y: "110%", autoAlpha: 0 },
      {
        y: "0%",
        autoAlpha: 1,
        duration: 1.2,
        stagger: 0.15, // Atraso de 0.15s entre a animação de cada linha do título
        ease: "power4.out",
      },
      "-=0.6", // Inicia essa animação 0.6s antes do término da animação do Header
    );

    // Animação de revelação dos parágrafos, botões e indicadores periféricos da Hero
    tl.fromTo(
      ".hero-element",
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=0.8", // Inicia 0.8s antes da linha do tempo terminar
    );

    // ==========================================
    // 2. ANIMAÇÃO DO CANVAS DE IMAGENS (SCROLL 3D)
    // ==========================================
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d", { alpha: false }); // Pega o contexto 2D otimizado sem suporte a transparência (melhora performance)
      const frameCount = 192; // Quantidade total de imagens (frames) na sequência de rotação
      const currentFrame = { index: 0 }; // Objeto reativo simulado cujo valor do index será incrementado pelo GSAP
      const images: HTMLImageElement[] = [];

      // Função para pré-carregar todos os frames em memória RAM, evitando travamento visual no scroll
      const preloadImages = () => {
        for (let i = 1; i <= frameCount; i++) {
          const img = window.document.createElement("img");
          const frameNumber = i.toString().padStart(4, "0"); // Transforma 1 em "0001", 12 em "0012", etc.
          img.src = `/assets/video_frames/frame_${frameNumber}.jpg`;
          images.push(img);
        }
      };

      // Função que redesenha a imagem correspondente no canvas a cada atualização de frame
      const render = () => {
        const frameIndex = Math.floor(currentFrame.index); // Arredonda o index progressivo para obter o frame inteiro correspondente
        const img = images[frameIndex];

        if (img && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas anterior
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Desenha a imagem preenchendo a tela
        }
      };

      preloadImages();

      // Quando a primeira imagem terminar de carregar, executa o render inicial para o canvas não iniciar em branco
      if (images[0]) {
        images[0].onload = render;
      }

      let scrollInitialized = false;

      // Inicializa a timeline vinculada ao scroll para animar o canvas
      const initScrollAnimation = () => {
        if (scrollInitialized) return;
        scrollInitialized = true;

        let tlScroll = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-sequence", // Elemento que ativa a fixação da tela e o monitoramento do scroll
            start: "top top", // Inicia quando o topo da seção encosta no topo da tela
            end: "+=3500", // Extensão da área de rolagem (3500px), determina a velocidade da animação do scroll
            pin: true, // Fixa a tela impedindo o rolamento da página enquanto executa a sequência de imagens
            scrub: 1, // Suaviza a animação aplicando um delay de 1s para acompanhar o scroll do usuário
            onUpdate: () => {
              requestAnimationFrame(render); // Desenha o frame usando o motor de frames nativo do navegador para máxima performance
            },
          },
        });

        // Efeito de fade-out (sumir) dos textos da Hero logo nos primeiros 15% de rolagem
        tlScroll.to(
          ".scroll-fade-out",
          {
            opacity: 0,
            y: -30,
            duration: 0.15,
            ease: "power2.inOut",
          },
          0,
        );

        // Anima a variável 'index' do frame atual de 0 a 191 sincronizado com o scroll
        tlScroll.to(
          currentFrame,
          {
            index: frameCount - 1,
            ease: "none", // Velocidade linear para que a rotação da caneta seja diretamente proporcional ao scroll do mouse
            duration: 1,
          },
          0,
        );
      };

      initScrollAnimation();
    }

    // ==========================================
    // 3. ANIMAÇÕES DE REVELAÇÃO AO ROLAR (REVEAL UP)
    // ==========================================
    // Cria um gatilho individual para cada elemento que possui a classe '.reveal-up'
    gsap.utils.toArray(".reveal-up").forEach((elem: any) => {
      ScrollTrigger.create({
        trigger: elem,
        start: "top 85%", // Dispara quando o topo do elemento chega a 85% de altura da tela
        onEnter: () => {
          elem.classList.add("active"); // Adiciona a classe 'active' para ativar a transição CSS definida no globals.css
        },
      });
    });
  }, []);

  // ==========================================
  // EFEITO FLASHLIGHT (LANTERNA RADIAL NOS CARDS)
  // ==========================================
  // Atualiza as propriedades customizadas do CSS (--mouse-x e --mouse-y) com a posição do cursor relativa ao card
  const handleFlashlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect(); // Obtém dimensões e posição do card na tela
    const x = e.clientX - rect.left; // Coordenada X do mouse relativa ao card
    const y = e.clientY - rect.top; // Coordenada Y do mouse relativa ao card
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <>
      <Header />

      <main>
        {/* HERO SEQUENCE */}
        <section
          id="hero-sequence"
          className="relative h-screen w-full overflow-hidden bg-[#EAEAE5]"
        >
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <canvas
              ref={canvasRef}
              id="hero-canvas"
              width="1280"
              height="720"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#EAEAE5] via-[#EAEAE5]/40 to-transparent w-full h-full" />
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col justify-center">
            <div className="grid grid-cols-12 gap-8 w-full scroll-fade-out">
              <div className="col-span-12 md:col-span-8 lg:col-span-6 flex flex-col justify-center">
                <h1 className="font-display text-[3.5rem] md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tighter mb-6 text-stone-900 mix-blend-darken">
                  <div className="overflow-hidden">
                    <div className="hero-element-text">A caneta</div>
                  </div>
                  <div className="overflow-hidden py-1">
                    <div className="hero-element-text outline-text">
                      mais tecnológica
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <div className="hero-element-text">do mundo.</div>
                  </div>
                </h1>

                <p className="text-lg md:text-xl text-stone-600 font-sans font-light leading-relaxed mb-10 max-w-lg hero-element text-balance">
                  A Artools Precision Pen redefine o equilíbrio entre peso,
                  fluxo e design. Feita para criadores que exigem perfeição em
                  cada traço.
                </p>

                <div className="flex flex-wrap items-center gap-4 hero-element">
                  <Link
                    href="/compra"
                    className="px-8 py-4 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-700 transition-all shadow-xl shadow-stone-900/10 hover:-translate-y-1"
                  >
                    Comprar Agora
                  </Link>
                  <a
                    href="#tech-specs"
                    className="px-8 py-4 bg-white/70 backdrop-blur-md text-stone-900 border border-stone-200 rounded-full text-sm font-medium hover:bg-white transition-all shadow-sm flex items-center gap-2 hover:-translate-y-1 group"
                  >
                    Explorar
                    <Icon
                      icon="solar:arrow-down-linear"
                      className="text-lg group-hover:translate-y-1 transition-transform"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 hero-element scroll-fade-out">
              <span className="text-[10px] font-mono text-stone-500">01</span>
              <div className="w-[1px] h-16 bg-stone-300" />
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 hero-element scroll-fade-out">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-stone-400">
                Scroll to Control
              </span>
              <div className="scroll-line" />
            </div>
          </div>
        </section>

        {/* TECH SPECS */}
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

        {/* DESIGN / EXPERIÊNCIA */}
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

        {/* COMPRA */}
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
      </main>

      {/* FOOTER */}
      <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800 relative z-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16 reveal-up">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 text-white mb-6">
                <div className="w-7 h-7 bg-white text-stone-900 flex items-center justify-center rounded-sm">
                  <Icon icon="solar:pen-bold" />
                </div>
                <span className="font-display font-bold tracking-tight text-xl">
                  ARTOOLS
                  <span className="text-stone-500 font-light text-[1rem]">
                    .PRO
                  </span>
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                A ferramenta invisível para ideias tangíveis. Redefinindo a
                escrita no século 21.
              </p>
            </div>

            <div>
              <h4 className="text-white font-display font-medium mb-6">
                Produtos
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Precision Pen
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Signature Series
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Refis de Tinta
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Acessórios
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-display font-medium mb-6">
                Suporte
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Garantia Vitalícia
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Envio e Devoluções
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-display font-medium mb-6">
                Redes Sociais
              </h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-colors"
                >
                  <Icon icon="ri:instagram-line" className="text-lg" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-colors"
                >
                  <Icon icon="ri:twitter-x-line" className="text-lg" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-colors"
                >
                  <Icon icon="ri:youtube-line" className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono reveal-up delay-200">
            <p>&copy; 2026 Artools. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

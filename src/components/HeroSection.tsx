"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    // ==========================================
    // 1. ANIMAÇÕES DE ENTRADA (HERO ENTRANCE)
    // ==========================================
    const tl = gsap.timeline();

    tl.fromTo(
      "header",
      { y: -20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
    );

    tl.fromTo(
      ".hero-element-text",
      { y: "110%", autoAlpha: 0 },
      {
        y: "0%",
        autoAlpha: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      },
      "-=0.6",
    );

    tl.fromTo(
      ".hero-element",
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=0.8",
    );

    // ==========================================
    // 2. ANIMAÇÃO DO CANVAS DE IMAGENS (SCROLL 3D)
    // ==========================================
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d", { alpha: false });
      const frameCount = 192;
      const currentFrame = { index: 0 };
      const images: HTMLImageElement[] = [];

      const preloadImages = () => {
        for (let i = 1; i <= frameCount; i++) {
          const img = window.document.createElement("img");
          const frameNumber = i.toString().padStart(4, "0");
          img.src = `/assets/video_frames/frame_${frameNumber}.jpg`;
          images.push(img);
        }
      };

      const render = () => {
        const frameIndex = Math.floor(currentFrame.index);
        const img = images[frameIndex];

        if (img && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };

      preloadImages();

      if (images[0]) {
        images[0].onload = render;
      }

      let scrollInitialized = false;

      const initScrollAnimation = () => {
        if (scrollInitialized) return;
        scrollInitialized = true;

        let tlScroll = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-sequence",
            start: "top top",
            end: "+=3500",
            pin: true,
            scrub: 1,
            onUpdate: () => {
              requestAnimationFrame(render);
            },
          },
        });

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

        tlScroll.to(
          currentFrame,
          {
            index: frameCount - 1,
            ease: "none",
            duration: 1,
          },
          0,
        );
      };

      initScrollAnimation();
    }
  }, []);

  return (
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
  );
}

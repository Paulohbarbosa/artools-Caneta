"use client"; // Define que este arquivo é um Client Component (roda do lado do cliente para poder usar hooks de estado e efeito)

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TechSpecsSection from "@/components/TechSpecsSection";
import DesignSection from "@/components/DesignSection";
import BuySection from "@/components/BuySection";
import Footer from "@/components/Footer";

// Registra o plugin ScrollTrigger no GSAP para possibilitar animações atreladas ao scroll da página
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Hook especializado do GSAP para React. Garante que as animações sejam limpas e canceladas automaticamente no desmonte do componente.
  useGSAP(() => {
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

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TechSpecsSection />
        <DesignSection />
        <BuySection />
      </main>
      <Footer />
    </>
  );
}

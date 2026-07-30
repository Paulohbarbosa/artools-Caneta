"use client";

import React, { useEffect, useRef } from "react";

export default function CustomScrollbar() {
  const customScrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const customScrollbar = customScrollbarRef.current;
    if (!customScrollbar) return;

    let scrollTimeout: NodeJS.Timeout;

    // Função que atualiza a altura e a posição vertical do indicador visual da barra de rolagem customizada
    const updateScrollbar = () => {
      const scrollHeight = document.documentElement.scrollHeight; // Altura total rolável do documento
      const clientHeight = document.documentElement.clientHeight; // Altura visível da janela do navegador
      const scrollTop = window.scrollY; // Distância rolada a partir do topo

      // Se a página for menor ou igual à janela, oculta a scrollbar
      if (scrollHeight <= clientHeight) {
        customScrollbar.style.display = "none";
        return;
      } else {
        customScrollbar.style.display = "block";
      }

      const headerOffset = 80; // Altura aproximada do menu (top-20)
      const bottomOffset = 20; // Espaço do rodapé
      const availableHeight = clientHeight - headerOffset - bottomOffset; // A área livre para a scrollbar

      // Calcula a proporção da altura da barra baseada no tamanho da página (regra de 3)
      const scrollRatio = availableHeight / scrollHeight;
      const thumbHeight = Math.max(scrollRatio * availableHeight, 40); // Define altura do indicador (mínimo de 40px)

      // Calcula a posição do indicador com base na porcentagem de rolagem da página
      const maxScrollTop = scrollHeight - clientHeight;
      const scrollProgress = scrollTop / maxScrollTop;
      const thumbTop = scrollProgress * (availableHeight - thumbHeight);

      // Atualiza os estilos CSS diretamente na DOM por motivos de performance (evita re-renderizações lentas do React)
      customScrollbar.style.height = `${thumbHeight}px`;
      customScrollbar.style.transform = `translateY(${thumbTop}px)`;
      customScrollbar.style.opacity = "1"; // Torna visível ao rolar

      // Esconde a scrollbar após 2 segundos de inatividade
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        customScrollbar.style.opacity = "0";
      }, 2000);
    };

    window.addEventListener("scroll", updateScrollbar);
    window.addEventListener("resize", updateScrollbar);
    updateScrollbar();

    // ==========================================
    // LÓGICA DE ARRASTAR A SCROLLBAR COM O MOUSE
    // ==========================================
    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    // Início do clique na barra de rolagem customizada
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startY = e.clientY; // Coordenada Y inicial do clique do mouse
      startScrollTop = window.scrollY; // Posição atual de rolagem da janela
      document.body.style.userSelect = "none"; // Desativa a seleção de texto para não atrapalhar o arrasto
    };

    // Atualiza a posição de rolagem da janela enquanto o usuário arrasta a barra
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY; // Distância vertical percorrida pelo mouse
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const headerOffset = 80;
      const bottomOffset = 20;
      const availableHeight = clientHeight - headerOffset - bottomOffset;
      
      const thumbHeight = Math.max(
        (availableHeight / scrollHeight) * availableHeight,
        40,
      );

      // Converte o deslocamento vertical do mouse na barra de volta para pixels de rolagem na página
      const scrollRatio =
        (scrollHeight - clientHeight) / (availableHeight - thumbHeight);
      window.scrollTo(0, startScrollTop + deltaY * scrollRatio);
    };

    // Finaliza o arrasto
    const handleMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = ""; // Restaura a seleção de texto
    };

    // Adiciona escutadores de eventos para arrasto manual
    customScrollbar.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Função de limpeza (cleanup) executada quando o componente é desmontado
    return () => {
      window.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
      customScrollbar.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div
      ref={customScrollbarRef}
      id="custom-scrollbar"
      className="fixed right-[5px] top-20 w-[6px] bg-stone-400/50 hover:bg-stone-400/80 rounded-full z-[9999] transition-opacity duration-300 opacity-0 pointer-events-auto cursor-pointer"
    />
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Compra() {
  // Controle de etapa do checkout ('checkout' para preenchimento e 'success' para compra concluída)
  const [step, setStep] = useState<"checkout" | "success">("checkout");

  // Estados locais do React vinculados individualmente a cada input do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const successContentRef = useRef<HTMLDivElement>(null);
  const customScrollbarRef = useRef<HTMLDivElement>(null);

  // Função auxiliar para fins de portfólio. Preenche todos os inputs do formulário com um único clique
  const handleAutoFill = () => {
    setNome("Paulo Silva");
    setEmail("paulo@exemplo.com");
    setTelefone("(11) 99999-1234");
    setCep("01001-000");
    setEndereco("Praça da Sé");
    setNumero("100");
    setComplemento("Apto 42");
    setCidade("São Paulo");
    setEstado("SP");
  };

  // Processo simulado de finalização de compra (muda a etapa para 'success')
  const handleFinishCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  // Efeito executado apenas quando a compra é finalizada com sucesso
  useEffect(() => {
    if (step === "success" && successContentRef.current) {
      // Animação GSAP de entrada suave do recibo na tela preta cinematográfica
      gsap.fromTo(
        successContentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
      );
    }
  }, [step]);

  // Efeito responsável por redefinir e re-inicializar as animações de scroll da página sempre que a etapa mudar
  useEffect(() => {
    // Busca todos os elementos do DOM com a classe .reveal-up e registra gatilhos de scroll
    const revealTriggers = gsap.utils.toArray(".reveal-up").map((elem: any) => {
      return ScrollTrigger.create({
        trigger: elem,
        start: "top 90%", // Dispara quando o elemento atinge 90% da altura da tela de cima para baixo
        onEnter: () => {
          elem.classList.add("active"); // Insere a classe '.active' para disparar as animações do globals.css
        },
      });
    });

    // Função de cleanup: mata os gatilhos antigos do ScrollTrigger para evitar vazamento de performance
    return () => {
      revealTriggers.forEach((trigger: any) => trigger.kill());
    };
  }, [step]);

  useEffect(() => {
    const customScrollbar = customScrollbarRef.current;
    if (!customScrollbar) return;

    let scrollTimeout: NodeJS.Timeout;

    const updateScrollbar = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;

      if (scrollHeight <= clientHeight) {
        customScrollbar.style.display = "none";
        return;
      } else {
        customScrollbar.style.display = "block";
      }

      const scrollRatio = clientHeight / scrollHeight;
      const thumbHeight = Math.max(scrollRatio * clientHeight, 40);

      const maxScrollTop = scrollHeight - clientHeight;
      const scrollProgress = scrollTop / maxScrollTop;
      const thumbTop = scrollProgress * (clientHeight - thumbHeight);

      customScrollbar.style.height = `${thumbHeight}px`;
      customScrollbar.style.transform = `translateY(${thumbTop}px)`;
      customScrollbar.style.opacity = "1";

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        customScrollbar.style.opacity = "0";
      }, 2000);
    };

    window.addEventListener("scroll", updateScrollbar);
    window.addEventListener("resize", updateScrollbar);
    updateScrollbar();

    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startY = e.clientY;
      startScrollTop = window.scrollY;
      document.body.style.userSelect = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const thumbHeight = Math.max(
        (clientHeight / scrollHeight) * clientHeight,
        40,
      );

      const scrollRatio =
        (scrollHeight - clientHeight) / (clientHeight - thumbHeight);
      window.scrollTo(0, startScrollTop + deltaY * scrollRatio);
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.body.style.userSelect = "";
    };

    customScrollbar.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
      customScrollbar.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [step]);

  return (
    <>
      <div className="bg-glow" />
      <div className="bg-noise" />

      {/* Indicador de Rolagem Customizado */}
      <div
        ref={customScrollbarRef}
        id="custom-scrollbar"
        className="fixed right-[5px] top-0 w-[6px] bg-stone-400/50 hover:bg-stone-400/80 rounded-full z-[9999] transition-opacity duration-300 opacity-0 pointer-events-auto cursor-pointer"
      />

      {step === "checkout" ? (
        <div className="min-h-screen flex flex-col">
          {/* HEADER MINIMAL */}
          <header className="w-full z-50 px-6 md:px-12 py-4 flex flex-col md:flex-row justify-between items-center glass-panel border-b border-black/5 sticky top-0">
            <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
              <Link
                href="/"
                className="flex items-center gap-3 text-stone-900 hover:opacity-80 transition-opacity"
              >
                <div className="w-6 h-6 bg-stone-900 text-white flex items-center justify-center rounded-sm">
                  <Icon icon="solar:pen-bold" className="text-sm" />
                </div>
                <span className="font-display font-bold tracking-tight text-lg">
                  ARTOOLS<span className="text-stone-500 font-light">.PRO</span>
                </span>
              </Link>

              <button className="md:hidden text-stone-900 relative">
                <Icon
                  icon="solar:cart-large-minimalistic-linear"
                  className="text-xl"
                />
                <span className="absolute -top-1 -right-2 bg-stone-900 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  1
                </span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.15em] text-stone-400">
              <span className="text-stone-900">Checkout</span>
              <Icon icon="solar:alt-arrow-right-linear" />
              <span>Pagamento</span>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="text-xs font-mono text-stone-500">
                Total: <span className="text-stone-900">$149.00</span>
              </div>
              <Icon
                icon="solar:lock-password-linear"
                className="text-stone-400"
              />
            </div>
          </header>

          {/* MAIN GRID */}
          <main className="flex-grow container mx-auto px-6 md:px-12 py-12 md:py-20 flex justify-center">
            <form
              onSubmit={handleFinishCheckout}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-6xl relative"
            >
              {/* COLUNA ESQUERDA: FORMS */}
              <div className="lg:col-span-7 space-y-12">
                {/* Login Rápido */}
                <div className="glass-panel rounded-2xl p-8 reveal-up active">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-display text-stone-900">
                      Já possui conta?
                    </h2>
                    <Link
                      href="/user"
                      className="text-xs font-mono uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors border-b border-stone-300 hover:border-stone-900 pb-1"
                    >
                      Fazer Login
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-black/5 hover:bg-black/10 border border-black/10 rounded-xl transition-all text-sm font-medium"
                    >
                      <Icon
                        icon="flat-color-icons:google"
                        className="text-lg"
                      />
                      Google
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-black/5 hover:bg-black/10 border border-black/10 rounded-xl transition-all text-sm font-medium"
                    >
                      <Icon
                        icon="ic:baseline-apple"
                        className="text-xl text-stone-900"
                      />
                      Apple
                    </button>
                  </div>
                </div>

                {/* Identificação e Entrega */}
                <div className="reveal-up active">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-display text-stone-900">
                      Identificação & Entrega
                    </h2>
                    <button
                      type="button"
                      onClick={handleAutoFill}
                      className="px-4 py-2 bg-stone-900/10 hover:bg-stone-900/20 text-stone-900 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                      Preencher Demo
                    </button>
                  </div>
                  <p className="text-stone-600 text-sm mb-8">
                    Finalize sua experiência Artools preenchendo os dados
                    abaixo.
                  </p>

                  <div className="glass-panel rounded-2xl p-8 space-y-8">
                    {/* Dados Pessoais */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 border-b border-black/10 pb-2 mb-4">
                        Dados Pessoais
                      </h3>

                      <div className="input-group">
                        <input
                          type="text"
                          id="nome"
                          className="floating-input"
                          placeholder=" "
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          required
                        />
                        <label htmlFor="nome" className="floating-label">
                          Nome Completo
                        </label>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="input-group">
                          <input
                            type="email"
                            id="email"
                            className="floating-input"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label htmlFor="email" className="floating-label">
                            E-mail
                          </label>
                        </div>
                        <div className="input-group">
                          <input
                            type="tel"
                            id="telefone"
                            className="floating-input"
                            placeholder=" "
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            required
                          />
                          <label htmlFor="telefone" className="floating-label">
                            Telefone
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Endereço */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 border-b border-black/10 pb-2 mb-4 mt-8">
                        Endereço de Entrega
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="input-group md:col-span-1">
                          <input
                            type="text"
                            id="cep"
                            className="floating-input"
                            placeholder=" "
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            required
                          />
                          <label htmlFor="cep" className="floating-label">
                            CEP
                          </label>
                        </div>
                        <div className="input-group md:col-span-2">
                          <input
                            type="text"
                            id="endereco"
                            className="floating-input"
                            placeholder=" "
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            required
                          />
                          <label htmlFor="endereco" className="floating-label">
                            Endereço
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="input-group md:col-span-1">
                          <input
                            type="text"
                            id="numero"
                            className="floating-input"
                            placeholder=" "
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            required
                          />
                          <label htmlFor="numero" className="floating-label">
                            Número
                          </label>
                        </div>
                        <div className="input-group md:col-span-3">
                          <input
                            type="text"
                            id="complemento"
                            className="floating-input"
                            placeholder=" "
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                            required
                          />
                          <label
                            htmlFor="complemento"
                            className="floating-label"
                          >
                            Complemento (opcional)
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="input-group">
                          <input
                            type="text"
                            id="cidade"
                            className="floating-input"
                            placeholder=" "
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            required
                          />
                          <label htmlFor="cidade" className="floating-label">
                            Cidade
                          </label>
                        </div>
                        <div className="input-group">
                          <input
                            type="text"
                            id="estado"
                            className="floating-input"
                            placeholder=" "
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            required
                          />
                          <label htmlFor="estado" className="floating-label">
                            Estado / Província
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUNA DIREITA: STICKY SUMMARY */}
              <div className="lg:col-span-5 relative">
                <div className="sticky top-32 glass-panel rounded-3xl p-8 reveal-up active delay-200">
                  <h2 className="text-lg font-display text-stone-900 mb-6 border-b border-black/10 pb-4">
                    Resumo do Pedido
                  </h2>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-20 h-24 bg-stone-100 rounded-lg border border-black/5 overflow-hidden flex items-center justify-center relative">
                      <Image
                        src="/assets/raw_files/caneta.jpeg"
                        alt="ArtoolsPro"
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-2">
                        Signature Series
                      </p>
                      <h3 className="text-stone-900 font-medium mb-1">
                        ArtoolsPro
                      </h3>
                      <p className="text-sm font-medium text-stone-900">
                        <span className="text-stone-400 font-sans text-xs">
                          1 x{" "}
                        </span>
                        $149.00
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-8 border-b border-black/10 pb-8">
                    <input
                      type="text"
                      placeholder="Código promocional"
                      className="flex-grow bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-sm text-stone-900 outline-none focus:border-black/30 transition-colors"
                    />
                    <button
                      type="button"
                      className="bg-black/5 hover:bg-black/10 text-stone-900 px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-black/10"
                    >
                      Aplicar
                    </button>
                  </div>

                  <div className="space-y-3 text-sm mb-8">
                    <div className="flex justify-between text-stone-500">
                      <span>Subtotal</span>
                      <span className="text-stone-900">$149.00</span>
                    </div>
                    <div className="flex justify-between text-stone-500">
                      <span>Frete Expansivo</span>
                      <span className="text-stone-900">Grátis</span>
                    </div>
                    <div className="flex justify-between font-display text-xl text-stone-900 pt-4 border-t border-black/5 mt-4">
                      <span>Total</span>
                      <span>
                        $149.00{" "}
                        <span className="text-xs font-mono text-stone-400 uppercase">
                          usd
                        </span>
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center gap-2 group mb-6"
                  >
                    Finalizar Compra
                    <Icon
                      icon="solar:arrow-right-linear"
                      className="text-lg group-hover:translate-x-1 transition-transform"
                    />
                  </button>

                  <div className="grid grid-cols-3 gap-2 pt-6 border-t border-black/5 text-center">
                    <div className="flex flex-col items-center gap-2 text-stone-400">
                      <Icon
                        icon="solar:shield-check-linear"
                        className="text-xl text-stone-500"
                      />
                      <span className="text-[9px] uppercase tracking-wider text-stone-500">
                        Compra Segura
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-stone-400">
                      <Icon
                        icon="solar:box-minimalistic-linear"
                        className="text-xl text-stone-500"
                      />
                      <span className="text-[9px] uppercase tracking-wider text-stone-500">
                        Frete Rastreado
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-stone-400">
                      <Icon
                        icon="solar:medal-star-linear"
                        className="text-xl text-stone-500"
                      />
                      <span className="text-[9px] uppercase tracking-wider text-stone-500">
                        Garantia Vitalícia
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </main>
        </div>
      ) : (
        /* TELA DE SUCESSO */
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 scale-105"
          >
            <source src="/assets/raw_files/video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-stone-950/60 z-0 backdrop-blur-sm" />

          <div
            ref={successContentRef}
            className="text-center z-10 p-6 success-content"
          >
            <div className="w-20 h-20 bg-white text-stone-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <Icon icon="solar:check-read-linear" className="text-4xl" />
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
              Tecnologia enviada.
            </h1>
            <p className="text-xl text-stone-300 font-light mb-12">
              Sua Artools está a caminho.
            </p>

            <div className="glass-panel p-6 rounded-2xl max-w-sm mx-auto mb-10 text-left border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1">
                Pedido #AR-2026-892
              </div>
              <div className="text-white text-sm mb-4">
                Confirmado para paulo@exemplo.com
              </div>

              <div className="h-[1px] w-full bg-white/10 mb-4" />

              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-400">Rastreamento:</span>
                <a
                  href="#"
                  className="text-white hover:underline flex items-center gap-1"
                >
                  Acompanhar <Icon icon="solar:arrow-right-up-linear" />
                </a>
              </div>
            </div>

            <Link
              href="/"
              className="inline-block py-3 px-8 border border-white/20 text-white rounded-full text-sm hover:bg-white hover:text-stone-900 transition-colors"
            >
              Voltar à página inicial
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

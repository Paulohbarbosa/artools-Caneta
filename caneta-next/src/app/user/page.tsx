"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import gsap from "gsap";

import DashboardTab from "@/app/user/Components/DashboardTab";
import OrdersTab from "@/app/user/Components/OrdersTab";
import ProfileTab from "@/app/user/Components/ProfileTab";
import AddressesTab from "@/app/user/Components/AddressesTab";
import PaymentsTab from "@/app/user/Components/PaymentsTab";
import SecurityTab from "@/app/user/Components/SecurityTab";

type Tab =
  | "dashboard"
  | "orders"
  | "profile"
  | "addresses"
  | "payments"
  | "security";

interface Toast {
  show: boolean;
  title: string;
  message: string;
}

export default function UserPage() {
  // Controle de autenticação (simulado)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Alterna entre tela de 'login' e de 'register' (cadastro)
  const [authModal, setAuthModal] = useState<"login" | "register">("login");
  // Aba ativa atual do painel administrativo
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  // Abre/fecha menu de navegação responsivo em dispositivos mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Controle de exibição e conteúdo do balão de alerta (toast)
  const [toast, setToast] = useState<Toast>({
    show: false,
    title: "",
    message: "",
  });

  // Estados locais do React para armazenar e sincronizar os inputs das telas de login/cadastro
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");

  // Funções rápidas para preencher formulários com dados de teste (facilitador de portfólio)
  const handleFillLoginDemo = () => {
    setLoginEmail("paulo@exemplo.com");
    setLoginPass("senhaSegura123");
  };

  const handleFillRegisterDemo = () => {
    setRegName("Paulo Silva");
    setRegEmail("paulo@exemplo.com");
    setRegPass("senhaSegura123");
  };

  // Referência para aplicar animações de transição na aba ativa do painel
  const activeContentRef = useRef<HTMLDivElement>(null);
  // Armazena a referência do timeout do Toast para limpá-lo caso um novo Toast seja disparado em sequência
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dispara o Toast na tela e configura para desaparecer após 4 segundos
  const showToast = (title: string, message: string) => {
    setToast({ show: true, title, message });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current); // Cancela o timer do toast anterior, se houver
    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  // Handler de Login (simulado): dispara sucesso e autentica o usuário
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Bem-vindo", "Login realizado com sucesso.");
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 500);
  };

  // Handler de Cadastro (simulado): dispara sucesso e autentica o usuário
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Sucesso", "Conta tecnológica criada. Bem-vindo!");
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 500);
  };

  // Reseta estados para deslogar
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthModal("login");
    setIsMobileMenuOpen(false);
    showToast("Sessão encerrada", "Você saiu da sua conta.");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Perfil Atualizado", "Seus dados foram salvos com sucesso.");
  };

  // Efeito responsável por animar a transição de conteúdo do painel administrativo
  useEffect(() => {
    if (isAuthenticated && activeContentRef.current) {
      // Executa efeito GSAP de revelação suave (fade, translação Y e redução do desfoque) na aba recém-selecionada
      gsap.fromTo(
        activeContentRef.current,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
      );
    }
  }, [isAuthenticated, activeTab]);

  return (
    <>
      <div className="fixed inset-0 z-[-2] bg-[radial-gradient(circle_at_50%_0%,_rgba(0,0,0,0.03)_0%,_transparent_60%)] pointer-events-none" />
      <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none bg-noise" />

      {/* TOAST NOTIFICATION */}
      <div
        className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-6 py-4 rounded-xl glass-panel border-black/20 shadow-2xl transition-all duration-300 ${
          toast.show
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-stone-900">
          <Icon icon="solar:bell-bing-bold" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-stone-900">{toast.title}</h4>
          <p className="text-xs text-stone-500">{toast.message}</p>
        </div>
      </div>

      {/* GLOBAL HEADER */}
      <header className="w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center bg-[#111111]/80 backdrop-blur-md border-b border-black/10 sticky top-0 transition-all">
        <Link
          href="/"
          className="flex items-center gap-3 text-stone-900 hover:opacity-80 transition-opacity"
        >
          <div className="w-6 h-6 bg-white text-[#111] flex items-center justify-center rounded-sm">
            <Icon icon="solar:pen-bold" className="text-sm" />
          </div>
          <span className="font-display font-bold tracking-tight text-lg text-white">
            ARTOOLS<span className="text-stone-500 font-light">.PRO</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/compra"
            className="text-white hover:text-stone-400 transition-colors flex items-center justify-center"
          >
            <Icon icon="solar:bag-3-linear" className="text-xl" />
          </Link>

          {isAuthenticated && (
            <>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 md:hidden"
              >
                <div className="w-7 h-7 bg-white/10 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  P
                </div>
              </button>
              <div className="hidden md:flex items-center gap-3 pl-6 border-l border-white/20 cursor-pointer group">
                <div className="w-8 h-8 bg-white/10 text-white rounded-full flex items-center justify-center text-sm font-medium group-hover:bg-white group-hover:text-stone-900 transition-colors">
                  P
                </div>
                <span className="text-sm font-medium text-stone-300 group-hover:text-white transition-colors">
                  Paulo
                </span>
              </div>
            </>
          )}
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="md:hidden bg-stone-900 text-white p-6 border-b border-white/10">
          <nav className="flex flex-col gap-4">
            {(
              [
                "dashboard",
                "orders",
                "profile",
                "addresses",
                "payments",
                "security",
              ] as Tab[]
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 font-display text-lg capitalize ${
                  activeTab === tab
                    ? "text-white font-medium"
                    : "text-stone-400"
                }`}
              >
                {tab}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="text-left py-2 font-display text-lg text-red-400 mt-4 border-t border-white/10 pt-4"
            >
              Sair da Conta
            </button>
          </nav>
        </div>
      )}

      {/* ESTADO 1: DESLOGADO (LOGIN / CADASTRO) */}
      {!isAuthenticated ? (
        <div className="flex-grow flex items-center justify-center p-6 relative min-h-[calc(100vh-68px)]">
          {authModal === "login" ? (
            /* MODAL LOGIN */
            <div className="w-full max-w-md glass-panel rounded-[28px] p-8 md:p-10 shadow-2xl relative z-10">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-black/5 border border-black/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-stone-900">
                  <Icon icon="solar:user-bold" className="text-2xl" />
                </div>
                <h1 className="text-2xl font-display font-medium text-stone-900">
                  Bem-vindo novamente
                </h1>
                <div className="flex justify-between items-center mt-2 px-2">
                  <p className="text-xs text-stone-500">
                    Acesse seu ecossistema Artools.
                  </p>
                  <button
                    type="button"
                    onClick={handleFillLoginDemo}
                    className="px-3 py-1 bg-stone-900/10 hover:bg-stone-900/20 text-stone-900 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors"
                  >
                    Demo
                  </button>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="input-group">
                  <input
                    type="email"
                    id="login-email"
                    className="floating-input"
                    placeholder=" "
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="login-email" className="floating-label">
                    E-mail
                  </label>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    id="login-pass"
                    className="floating-input"
                    placeholder=" "
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    required
                  />
                  <label htmlFor="login-pass" className="floating-label">
                    Senha
                  </label>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-black/10 text-stone-900 focus:ring-0"
                    />
                    Lembrar dispositivo
                  </label>
                  <a
                    href="#"
                    className="hover:text-stone-900 transition-colors"
                  >
                    Esqueceu a senha?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 hover:scale-[1.01] transition-all mt-4"
                >
                  Entrar
                </button>
              </form>

              <div className="text-center mt-8 pt-6 border-t border-black/5">
                <p className="text-xs text-stone-500">
                  Novo por aqui?{" "}
                  <button
                    onClick={() => setAuthModal("register")}
                    className="font-mono text-stone-900 hover:underline"
                  >
                    Criar conta
                  </button>
                </p>
              </div>
            </div>
          ) : (
            /* MODAL CADASTRO */
            <div className="w-full max-w-md glass-panel rounded-[28px] p-8 md:p-10 shadow-2xl relative z-10">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-black/5 border border-black/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-stone-900">
                  <Icon icon="solar:user-plus-bold" className="text-2xl" />
                </div>
                <h1 className="text-2xl font-display font-medium text-stone-900">
                  Criar sua Conta
                </h1>
                <div className="flex justify-between items-center mt-2 px-2">
                  <p className="text-xs text-stone-500">
                    Junte-se à Precision Network.
                  </p>
                  <button
                    type="button"
                    onClick={handleFillRegisterDemo}
                    className="px-3 py-1 bg-stone-900/10 hover:bg-stone-900/20 text-stone-900 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors"
                  >
                    Demo
                  </button>
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="input-group">
                  <input
                    type="text"
                    id="reg-name"
                    className="floating-input"
                    placeholder=" "
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                  />
                  <label htmlFor="reg-name" className="floating-label">
                    Nome Completo
                  </label>
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    id="reg-email"
                    className="floating-input"
                    placeholder=" "
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="reg-email" className="floating-label">
                    E-mail
                  </label>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    id="reg-pass"
                    className="floating-input"
                    placeholder=" "
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    required
                  />
                  <label htmlFor="reg-pass" className="floating-label">
                    Senha
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 hover:scale-[1.01] transition-all mt-4"
                >
                  Criar Conta
                </button>
              </form>

              <div className="text-center mt-8 pt-6 border-t border-black/5">
                <p className="text-xs text-stone-500">
                  Já possui conta?{" "}
                  <button
                    onClick={() => setAuthModal("login")}
                    className="font-mono text-stone-900 hover:underline"
                  >
                    Fazer Login
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ESTADO 2: LOGADO (PAINEL DO USUÁRIO) */
        <div className="flex-grow container mx-auto px-6 md:px-12 py-12 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-6xl">
            {/* SIDEBAR */}
            <aside className="md:col-span-3 flex flex-col gap-2">
              <nav className="flex flex-col gap-1">
                {(
                  [
                    "dashboard",
                    "orders",
                    "profile",
                    "addresses",
                    "payments",
                    "security",
                  ] as Tab[]
                ).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-white text-stone-900 shadow-sm"
                        : "text-stone-500 hover:bg-black/5 hover:text-stone-950"
                    }`}
                  >
                    <Icon
                      icon={
                        tab === "dashboard"
                          ? "solar:widget-linear"
                          : tab === "orders"
                            ? "solar:box-linear"
                            : tab === "profile"
                              ? "solar:user-linear"
                              : tab === "addresses"
                                ? "solar:map-point-linear"
                                : tab === "payments"
                                  ? "solar:card-linear"
                                  : "solar:shield-keyhole-linear"
                      }
                      className="text-lg"
                    />
                    <span className="capitalize">{tab}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-black/10 hidden md:block">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Icon icon="solar:logout-linear" className="text-lg" />
                  Sair
                </button>
              </div>
            </aside>

            {/* TAB CONTENT CONTAINER */}
            <div ref={activeContentRef} className="md:col-span-9">
              {activeTab === "dashboard" && <DashboardTab />}
              {activeTab === "orders" && <OrdersTab />}
              {activeTab === "profile" && (
                <ProfileTab handleSaveProfile={handleSaveProfile} />
              )}
              {activeTab === "addresses" && (
                <AddressesTab showToast={showToast} />
              )}
              {activeTab === "payments" && (
                <PaymentsTab showToast={showToast} />
              )}
              {activeTab === "security" && (
                <SecurityTab
                  showToast={showToast}
                  handleLogout={handleLogout}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import gsap from "gsap";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authModal, setAuthModal] = useState<"login" | "register">("login");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<Toast>({
    show: false,
    title: "",
    message: "",
  });

  const activeContentRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (title: string, message: string) => {
    setToast({ show: true, title, message });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Bem-vindo", "Login realizado com sucesso.");
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Sucesso", "Conta tecnológica criada. Bem-vindo!");
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 500);
  };

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

  useEffect(() => {
    if (isAuthenticated && activeContentRef.current) {
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
                <p className="text-sm text-stone-500 mt-2">
                  Acesse seu ecossistema Artools.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="input-group">
                  <input
                    type="email"
                    id="login-email"
                    className="floating-input"
                    placeholder=" "
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
                <p className="text-sm text-stone-500 mt-2">
                  Junte-se à Precision Network.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="input-group">
                  <input
                    type="text"
                    id="reg-name"
                    className="floating-input"
                    placeholder=" "
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
              {activeTab === "dashboard" && (
                /* TAB: DASHBOARD */
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-display font-medium text-stone-900 mb-2">
                      Olá, Paulo
                    </h2>
                    <p className="text-stone-500 text-sm">
                      Bem-vindo à sua área exclusiva de controle.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-40">
                      <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
                        <Icon icon="solar:box-linear" className="text-xl" />
                      </div>
                      <div>
                        <span className="text-xs text-stone-500 font-mono block">
                          Último Pedido
                        </span>
                        <span className="text-lg font-medium text-stone-900 mt-1 block">
                          #AR-2026-892
                        </span>
                      </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-40">
                      <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
                        <Icon
                          icon="solar:shield-check-linear"
                          className="text-xl"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-stone-500 font-mono block">
                          Garantia
                        </span>
                        <span className="text-lg font-medium text-emerald-600 mt-1 block">
                          Vitalícia Ativa
                        </span>
                      </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-40">
                      <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
                        <Icon icon="solar:crown-linear" className="text-xl" />
                      </div>
                      <div>
                        <span className="text-xs text-stone-500 font-mono block">
                          Club Membership
                        </span>
                        <span className="text-lg font-medium text-stone-900 mt-1 block">
                          Creator Club
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                /* TAB: ORDERS */
                <div>
                  <h2 className="text-3xl font-display font-medium text-stone-900 mb-2">
                    Pedidos
                  </h2>
                  <p className="text-stone-500 mb-8">
                    Histórico de compras e envios.
                  </p>

                  <div className="glass-panel rounded-2xl overflow-hidden border border-black/10">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-black/10 text-xs font-mono uppercase tracking-widest text-stone-500">
                          <th className="p-4 pl-6">Pedido</th>
                          <th className="p-4">Data</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right pr-6">Total</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="hover:bg-white/40 transition-colors">
                          <td className="p-4 pl-6 font-mono font-medium">
                            #AR-2026-892
                          </td>
                          <td className="p-4">18/07/2026</td>
                          <td className="p-4 text-amber-600 font-medium">
                            Em trânsito
                          </td>
                          <td className="p-4 text-right pr-6 font-medium">
                            $149.00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "profile" && (
                /* TAB: PROFILE */
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-display font-medium text-stone-900 mb-2">
                    Perfil
                  </h2>
                  <p className="text-stone-500 mb-8">
                    Atualize suas informações pessoais.
                  </p>

                  <div className="glass-panel rounded-2xl p-8 border border-black/10">
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="input-group">
                        <input
                          type="text"
                          id="prof-name"
                          className="floating-input"
                          placeholder=" "
                          defaultValue="Paulo"
                        />
                        <label htmlFor="prof-name" className="floating-label">
                          Nome
                        </label>
                      </div>

                      <div className="input-group">
                        <input
                          type="email"
                          id="prof-email"
                          className="floating-input"
                          placeholder=" "
                          defaultValue="paulo@exemplo.com"
                        />
                        <label htmlFor="prof-email" className="floating-label">
                          E-mail
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="input-group">
                          <input
                            type="tel"
                            id="prof-phone"
                            className="floating-input"
                            placeholder=" "
                            defaultValue="(11) 99999-9999"
                          />
                          <label
                            htmlFor="prof-phone"
                            className="floating-label"
                          >
                            Telefone
                          </label>
                        </div>
                        <div className="input-group">
                          <input
                            type="text"
                            id="prof-cpf"
                            className="floating-input"
                            placeholder=" "
                            defaultValue="123.456.789-00"
                          />
                          <label htmlFor="prof-cpf" className="floating-label">
                            CPF
                          </label>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-black/10 flex justify-end">
                        <button
                          type="submit"
                          className="px-8 py-3 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-all shadow-xl"
                        >
                          Salvar Alterações
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                /* TAB: ADDRESSES */
                <div className="text-center py-20">
                  <Icon
                    icon="solar:map-point-linear"
                    className="text-6xl text-stone-600 mb-4 mx-auto"
                  />
                  <h3 className="text-xl text-stone-900 font-display mb-2">
                    Nenhum endereço cadastrado
                  </h3>
                  <p className="text-stone-500 mb-6">
                    Adicione um endereço para facilitar suas futuras compras.
                  </p>
                  <button
                    onClick={() =>
                      showToast("Endereço", "Recurso em desenvolvimento.")
                    }
                    className="px-6 py-3 bg-black/5 text-stone-900 rounded-xl text-sm font-medium hover:bg-black/10 transition-colors border border-black/10"
                  >
                    Adicionar Endereço
                  </button>
                </div>
              )}

              {activeTab === "payments" && (
                /* TAB: PAYMENTS */
                <div className="text-center py-20">
                  <Icon
                    icon="solar:card-linear"
                    className="text-6xl text-stone-600 mb-4 mx-auto"
                  />
                  <h3 className="text-xl text-stone-900 font-display mb-2">
                    Nenhuma forma de pagamento
                  </h3>
                  <p className="text-stone-500 mb-6">
                    Guarde seus cartões de forma criptografada para checkout em
                    1 clique.
                  </p>
                  <button
                    onClick={() =>
                      showToast("Pagamento", "Recurso em desenvolvimento.")
                    }
                    className="px-6 py-3 bg-black/5 text-stone-900 rounded-xl text-sm font-medium hover:bg-black/10 transition-colors border border-black/10"
                  >
                    Adicionar Cartão
                  </button>
                </div>
              )}

              {activeTab === "security" && (
                /* TAB: SECURITY */
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-display font-medium text-stone-900 mb-2">
                    Segurança
                  </h2>
                  <p className="text-stone-500 mb-10">
                    Proteja o seu ecossistema.
                  </p>

                  <div className="glass-panel rounded-2xl p-8 border border-black/10 mb-6">
                    <h3 className="text-lg font-medium text-stone-900 mb-4">
                      Alterar Senha
                    </h3>
                    <div className="space-y-4 mb-6">
                      <div className="input-group">
                        <input
                          type="password"
                          id="sec-current"
                          className="floating-input"
                          placeholder=" "
                        />
                        <label htmlFor="sec-current" className="floating-label">
                          Senha Atual
                        </label>
                      </div>
                      <div className="input-group">
                        <input
                          type="password"
                          id="sec-new"
                          className="floating-input"
                          placeholder=" "
                        />
                        <label htmlFor="sec-new" className="floating-label">
                          Nova Senha
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        showToast("Segurança", "Senha atualizada com sucesso.")
                      }
                      className="px-6 py-3 bg-black/5 text-stone-900 rounded-xl text-sm font-medium hover:bg-black/10 transition-colors border border-black/10"
                    >
                      Atualizar Senha
                    </button>
                  </div>

                  <div className="glass-panel rounded-2xl p-8 border border-black/10 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-stone-900 mb-1">
                        Sessões Ativas
                      </h3>
                      <p className="text-sm text-stone-500">
                        Você está logado em 1 dispositivo.
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors border border-red-500/20"
                    >
                      Encerrar Todas
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

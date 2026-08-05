"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import adminData from "./data/adminData.json";

import DashboardSection from "./Components/Sections/DashboardSection";
import ProdutosSection from "./Components/Sections/ProdutosSection";
import PedidosSection from "./Components/Sections/PedidosSection";
import ClientesSection from "./Components/Sections/ClientesSection";
import EstoqueSection from "./Components/Sections/EstoqueSection";
import PagamentosSection from "./Components/Sections/PagamentosSection";
import RelatoriosSection from "./Components/Sections/RelatoriosSection";
import NotificacoesSection from "./Components/Sections/NotificacoesSection";
import FuncionariosSection from "./Components/Sections/FuncionariosSection";
import ConfiguracoesSection from "./Components/Sections/ConfiguracoesSection";
import LogsSection from "./Components/Sections/LogsSection";

export default function AdminPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Search & Modal States
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toast, setToast] = useState<{ show: boolean; title: string; message: string; type: "success" | "info" | "warning" | "error" }>({
    show: false,
    title: "",
    message: "",
    type: "info"
  });

  // Database States
  const [products, setProducts] = useState(adminData.products);
  const [orders, setOrders] = useState(adminData.orders);
  const [customers, setCustomers] = useState(adminData.customers);
  const [employees, setEmployees] = useState(adminData.employees);
  const [logs, setLogs] = useState(adminData.logs);
  const [notifications, setNotifications] = useState(adminData.notifications);

  // Trigger Toast Notification
  const triggerToast = (title: string, message: string, type: "success" | "info" | "warning" | "error" = "success") => {
    setToast({ show: true, title, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  // Keyboard Shortcuts (Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // GSAP animations for panels
  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(
        ".admin-panel-content",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" }
      );
    }
  }, [activeTab]);

  // Sidebar Menu Items
  const menuItems = [
    { name: "Dashboard", icon: "solar:widget-2-linear" },
    { name: "Produtos", icon: "solar:box-linear" },
    { name: "Pedidos", icon: "solar:cart-large-linear" },
    { name: "Clientes", icon: "solar:users-group-two-rounded-linear" },
    { name: "Estoque", icon: "solar:archive-down-minimlistic-linear" },
    { name: "Pagamentos", icon: "solar:card-2-linear" },
    { name: "Relatórios", icon: "solar:graph-up-linear" },
    { name: "Notificações", icon: "solar:bell-linear" },
    { name: "Funcionários", icon: "solar:shield-user-linear" },
    { name: "Configurações", icon: "solar:settings-linear" },
    { name: "Logs", icon: "solar:clipboard-list-linear" },
  ];

  // Calculated Metrics
  const totalSalesToday = orders
    .filter((o: any) => o.date === "2026-07-30" && (o.status === "Aprovado" || o.status === "Enviado"))
    .reduce((sum: any, o: any) => sum + o.value, 0);

  const pendingOrders = orders.filter((o: any) => o.status === "Pendente").length;
  const sentOrders = orders.filter((o: any) => o.status === "Enviado").length;
  const lowStockProducts = products.filter((p: any) => p.stock <= 10).length;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#EAEAE5] text-stone-900 font-sans flex flex-col antialiased selection:bg-stone-900 selection:text-white">
      
      {/* TOAST SYSTEM */}
      <div className={`fixed bottom-6 right-6 z-[99999] flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-xl transition-all duration-300 ${
        toast.show ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-10 opacity-0 pointer-events-none"
      } ${
        toast.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
        toast.type === "error" ? "bg-rose-50 border-rose-200 text-rose-700" :
        toast.type === "warning" ? "bg-amber-50 border-amber-200 text-amber-700" :
        "bg-stone-900/90 border-stone-300 text-white"
      }`}>
        <Icon icon={
          toast.type === "success" ? "solar:check-circle-bold" :
          toast.type === "error" ? "solar:danger-bold" :
          toast.type === "warning" ? "solar:bell-bold" : "solar:info-circle-bold"
        } className="text-xl shrink-0" />
        <div>
          <h4 className="text-sm font-medium">{toast.title}</h4>
          <p className="text-xs opacity-80">{toast.message}</p>
        </div>
      </div>

      {/* CTRL + K SEARCH DIALOG */}
      {searchOpen && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-md z-[9999] flex items-start justify-center pt-24 px-4" onClick={() => setSearchOpen(false)}>
          <div className="bg-stone-50 border border-stone-300 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in duration-200" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-stone-200 flex items-center gap-3">
              <Icon icon="solar:magnifer-linear" className="text-stone-500 text-xl" />
              <input
                type="text"
                placeholder="Pesquisar pedidos, produtos, clientes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-stone-900 border-0 outline-none w-full text-base placeholder:text-stone-500"
                autoFocus
              />
              <span className="text-[10px] bg-stone-200 text-stone-600 px-2 py-1 rounded">ESC</span>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto p-2">
              {searchQuery ? (
                <div className="flex flex-col gap-1">
                  <div className="text-[10px] text-stone-500 font-semibold px-3 py-2 uppercase font-mono">Resultados de busca</div>
                  {/* Filter products */}
                  {products.filter((p: any) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())).map((p: any) => (
                    <button key={p.id} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-stone-100 text-left transition" onClick={() => { setActiveTab("Produtos"); setSearchOpen(false); }}>
                      <div className="flex items-center gap-3">
                        <Icon icon="solar:box-linear" className="text-stone-500" />
                        <div>
                          <div className="text-sm font-medium">{p.name}</div>
                          <div className="text-xs text-stone-500 font-mono">{p.sku}</div>
                        </div>
                      </div>
                      <span className="text-xs text-stone-500 font-mono">R$ {p.price.toFixed(2)}</span>
                    </button>
                  ))}
                  {/* Filter orders */}
                  {orders.filter((o: any) => o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.toLowerCase().includes(searchQuery.toLowerCase())).map((o: any) => (
                    <button key={o.id} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-stone-100 text-left transition" onClick={() => { setActiveTab("Pedidos"); setSearchOpen(false); }}>
                      <div className="flex items-center gap-3">
                        <Icon icon="solar:cart-large-linear" className="text-stone-500" />
                        <div>
                          <div className="text-sm font-medium">{o.customerName}</div>
                          <div className="text-xs text-stone-500 font-mono">{o.id}</div>
                        </div>
                      </div>
                      <span className="text-xs text-stone-500 font-mono">R$ {o.value.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-stone-500">
                  Digite algo para buscar pedidos, produtos ou clientes.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PAINEL LAYOUT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className={`bg-stone-50 border-r border-stone-200 transition-all duration-300 flex flex-col z-30 shrink-0 ${
          sidebarCollapsed ? "w-20" : "w-64"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} fixed md:relative h-full`}>
          {/* Logo Section */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="font-display text-lg font-bold tracking-tight text-stone-900 flex items-center gap-2">
                ARTools<span className="text-xs bg-white text-black px-1.5 py-0.5 rounded font-mono font-normal">PRO</span>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="w-8 h-8 rounded bg-white text-black font-display font-bold flex items-center justify-center text-sm mx-auto">
                AT
              </div>
            )}
            <button className="hidden md:block text-stone-500 hover:text-stone-900" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <Icon icon={sidebarCollapsed ? "solar:double-alt-arrow-right-linear" : "solar:double-alt-arrow-left-linear"} className="text-lg" />
            </button>
          </div>

          {/* Menu Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map(item => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition duration-200 ${
                    isActive
                      ? "bg-white text-black font-semibold"
                      : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <Icon icon={item.icon} className="text-lg shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </nav>

          {/* Footer User Profile (Sidebar) */}
          <div className="p-4 border-t border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center font-display font-semibold text-stone-900">
                JP
              </div>
              {!sidebarCollapsed && (
                <div className="overflow-hidden">
                  <h4 className="text-xs font-semibold truncate">João Pedro Silva</h4>
                  <p className="text-[10px] text-stone-500 font-mono truncate">joao.pedro@artools.pro</p>
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <button
                onClick={() => triggerToast("Logout", "Sessão encerrada com sucesso.", "info")}
                className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white border border-stone-300 shadow-sm text-xs text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition"
              >
                <Icon icon="solar:logout-linear" />
                <span>Sair da conta</span>
              </button>
            )}
          </div>
        </aside>

        {/* CONTENT WRAPPER */}
        <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
          
          {/* HEADER */}
          <header className="sticky top-0 bg-[#EAEAE5]/85 backdrop-blur-md border-b border-stone-200 z-20 px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile menu trigger */}
              <button className="md:hidden text-stone-500 hover:text-stone-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Icon icon="solar:hamburger-menu-linear" className="text-2xl" />
              </button>
              
              {/* Search trigger button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-3 px-4 py-2 bg-stone-50 border border-stone-200 rounded-full hover:border-stone-300 transition text-stone-500 text-xs w-48 md:w-80"
              >
                <Icon icon="solar:magnifer-linear" className="text-sm shrink-0" />
                <span>Pesquisar...</span>
                <span className="hidden md:inline-block ml-auto font-mono text-[10px] text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded">Ctrl + K</span>
              </button>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications dropdown trigger shortcut */}
              <button className="relative p-2 bg-stone-50 border border-stone-200 rounded-full hover:border-stone-300 transition text-stone-600" onClick={() => setActiveTab("Notificações")}>
                <Icon icon="solar:bell-linear" className="text-lg" />
                {notifications.some((n: any) => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
                )}
              </button>

              <div className="h-6 w-[1px] bg-white/5" />

              {/* Header profile */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-semibold">João P.</div>
                  <div className="text-[10px] text-stone-500 font-mono">Administrador</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 border border-stone-400 flex items-center justify-center font-display font-medium text-xs">
                  JP
                </div>
              </div>
            </div>
          </header>

          {/* MAIN DYNAMIC CONTENT */}
          <main className="flex-1 p-6 md:p-10 space-y-8 admin-panel-content">
            
            {/* TAB TITLE AND BREADCRUMB */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 font-mono mb-1 uppercase tracking-wider">
                  <span>ARTOOLS.PRO</span>
                  <span>/</span>
                  <span className="text-stone-600">{activeTab}</span>
                </div>
                <h1 className="text-2xl font-display font-bold text-stone-900 tracking-tight">{activeTab}</h1>
              </div>
              
              {activeTab === "Dashboard" && (
                <div className="text-xs text-stone-500 font-mono bg-stone-50 border border-stone-200 px-4 py-2 rounded-xl flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Sistemas Operacionais 100% Online</span>
                </div>
              )}
            </div>

            {/* Render Modules dynamically */}
            {activeTab === "Dashboard" && <DashboardSection orders={orders} products={products} pendingOrders={pendingOrders} sentOrders={sentOrders} totalSalesToday={totalSalesToday} lowStockProducts={lowStockProducts} triggerToast={triggerToast} />}
            {activeTab === "Produtos" && <ProdutosSection products={products} setProducts={setProducts} triggerToast={triggerToast} />}
            {activeTab === "Pedidos" && <PedidosSection orders={orders} setOrders={setOrders} triggerToast={triggerToast} />}
            {activeTab === "Clientes" && <ClientesSection customers={customers} setCustomers={setCustomers} triggerToast={triggerToast} />}
            {activeTab === "Estoque" && <EstoqueSection products={products} setProducts={setProducts} triggerToast={triggerToast} />}
            {activeTab === "Pagamentos" && <PagamentosSection orders={orders} />}
            {activeTab === "Relatórios" && <RelatoriosSection triggerToast={triggerToast} />}
            {activeTab === "Notificações" && <NotificacoesSection notifications={notifications} setNotifications={setNotifications} triggerToast={triggerToast} />}
            {activeTab === "Funcionários" && <FuncionariosSection employees={employees} setEmployees={setEmployees} triggerToast={triggerToast} />}
            {activeTab === "Configurações" && <ConfiguracoesSection triggerToast={triggerToast} />}
            {activeTab === "Logs" && <LogsSection logs={logs} />}

          </main>

          {/* DISCRETE FOOTER */}
          <footer className="mt-auto px-10 py-6 border-t border-stone-200 bg-[#EAEAE5]/80 backdrop-blur text-center text-xs text-stone-600 font-mono flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>Painel Administrativo da ARTOOLS.PRO © 2026</span>
            <span className="flex items-center gap-3">
              <span className="hover:text-stone-500 cursor-pointer">Segurança</span>
              <span>·</span>
              <span className="hover:text-stone-500 cursor-pointer">Ajuda</span>
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}

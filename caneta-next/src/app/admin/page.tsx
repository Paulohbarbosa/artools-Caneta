"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Types definition
interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  promoPrice?: number;
  stock: number;
  status: "Ativo" | "Inativo";
  brand: string;
}

interface Order {
  id: string;
  customerName: string;
  value: number;
  paymentMethod: "Cartão" | "PIX" | "Boleto";
  status: "Aprovado" | "Pendente" | "Enviado" | "Cancelado" | "Reembolsado";
  date: string;
  deliveryCompany: string;
  items: { name: string; qty: number; price: number }[];
  address: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalSpent: number;
  totalOrders: number;
  status: "Ativo" | "Bloqueado";
}

interface Employee {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  role: "Administrador" | "Gerente" | "Atendente" | "Estoquista" | "Financeiro";
  department: string;
  status: "Ativo" | "Inativo";
  lastAccess: string;
}

interface SystemLog {
  id: string;
  date: string;
  employee: string;
  action: string;
  ip: string;
  module: string;
  result: "Sucesso" | "Erro";
}

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

  // Database States (Mock)
  const [products, setProducts] = useState<Product[]>([
    { id: "1", sku: "ART-PEN-01", name: "Precision Pen Black Edition", category: "Canetas", price: 499.00, stock: 120, status: "Ativo", brand: "Artools" },
    { id: "2", sku: "ART-PEN-02", name: "Precision Pen Carbon Blue", category: "Canetas", price: 549.00, stock: 5, status: "Ativo", brand: "Artools" },
    { id: "3", sku: "ART-PEN-03", name: "Precision Pen Gold Matte", category: "Canetas", price: 599.00, stock: 0, status: "Inativo", brand: "Artools" },
    { id: "4", sku: "ART-NIB-01", name: "Refil de Pontas Titânio (3x)", category: "Acessórios", price: 89.00, stock: 350, status: "Ativo", brand: "Artools" },
    { id: "5", sku: "ART-CASE-01", name: "Estojo de Couro Premium", category: "Acessórios", price: 199.00, stock: 45, status: "Ativo", brand: "Artools" },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD-9482", customerName: "Carlos Eduardo Santos", value: 499.00, paymentMethod: "PIX", status: "Aprovado", date: "2026-07-30", deliveryCompany: "FedEx", items: [{ name: "Precision Pen Black Edition", qty: 1, price: 499.00 }], address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100" },
    { id: "ORD-9481", customerName: "Mariana Costa Ferraz", value: 1198.00, paymentMethod: "Cartão", status: "Enviado", date: "2026-07-30", deliveryCompany: "DHL Express", items: [{ name: "Precision Pen Gold Matte", qty: 2, price: 599.00 }], address: "Rua Garcia D'Avila, 50 - Ipanema, Rio de Janeiro - RJ, 22421-010" },
    { id: "ORD-9480", customerName: "Roberto Mancini", value: 89.00, paymentMethod: "Boleto", status: "Pendente", date: "2026-07-29", deliveryCompany: "Correios Sedex", items: [{ name: "Refil de Pontas Titânio (3x)", qty: 1, price: 89.00 }], address: "Rua da Praia, 450 - Centro, Porto Alegre - RS, 90010-001" },
    { id: "ORD-9479", customerName: "Ana Julia Silveira", value: 588.00, paymentMethod: "Cartão", status: "Cancelado", date: "2026-07-28", deliveryCompany: "FedEx", items: [{ name: "Precision Pen Black Edition", qty: 1, price: 499.00 }, { name: "Refil de Pontas Titânio", qty: 1, price: 89.00 }], address: "Rua XV de Novembro, 1200 - Centro, Curitiba - PR, 80020-310" },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    { id: "CST-01", name: "Carlos Eduardo Santos", email: "carlos.eduardo@gmail.com", phone: "(11) 98765-4321", city: "São Paulo", totalSpent: 1450.00, totalOrders: 3, status: "Ativo" },
    { id: "CST-02", name: "Mariana Costa Ferraz", email: "mariana.ferraz@outlook.com", phone: "(21) 97654-3210", city: "Rio de Janeiro", totalSpent: 2396.00, totalOrders: 2, status: "Ativo" },
    { id: "CST-03", name: "Roberto Mancini", email: "roberto.mancini@terra.com.br", phone: "(51) 99887-7665", city: "Porto Alegre", totalSpent: 89.00, totalOrders: 1, status: "Ativo" },
    { id: "CST-04", name: "Ana Julia Silveira", email: "anajulia.silveira@gmail.com", phone: "(41) 99112-2334", city: "Curitiba", totalSpent: 588.00, totalOrders: 1, status: "Bloqueado" },
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    { id: "EMP-01", name: "João Pedro Silva", cpf: "123.456.789-00", email: "joao.pedro@artools.pro", phone: "(11) 99999-8888", role: "Administrador", department: "Tecnologia", status: "Ativo", lastAccess: "Hoje, 12:35" },
    { id: "EMP-02", name: "Beatriz Oliveira", cpf: "987.654.321-11", email: "beatriz.o@artools.pro", phone: "(11) 98888-7777", role: "Gerente", department: "Operações", status: "Ativo", lastAccess: "Hoje, 11:20" },
    { id: "EMP-03", name: "Marcus Souza", cpf: "456.789.123-22", email: "marcus.s@artools.pro", phone: "(11) 97777-6666", role: "Estoquista", department: "Logística", status: "Ativo", lastAccess: "Ontem, 17:45" },
  ]);

  const [logs, setLogs] = useState<SystemLog[]>([
    { id: "LOG-01", date: "2026-07-30 12:35:12", employee: "João Pedro Silva", action: "Login efetuado com sucesso", ip: "192.168.3.15", module: "Autenticação", result: "Sucesso" },
    { id: "LOG-02", date: "2026-07-30 11:45:00", employee: "Beatriz Oliveira", action: "Alteração de preço: Precision Pen Gold Matte", ip: "192.168.3.22", module: "Produtos", result: "Sucesso" },
    { id: "LOG-03", date: "2026-07-30 10:15:33", employee: "Marcus Souza", action: "Baixa de estoque SKU ART-PEN-03 (-1 un)", ip: "192.168.3.48", module: "Estoque", result: "Sucesso" },
    { id: "LOG-04", date: "2026-07-29 16:30:10", employee: "Atendente Comercial", action: "Tentativa incorreta de login", ip: "177.34.122.9", module: "Autenticação", result: "Erro" },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Novo pedido ORD-9482 recebido", type: "order", time: "5 min atrás", unread: true },
    { id: 2, text: "Alerta: Baixo estoque de Precision Pen Carbon Blue", type: "stock", time: "25 min atrás", unread: true },
    { id: 3, text: "Pagamento aprovado para o pedido ORD-9481", type: "payment", time: "1h atrás", unread: false },
    { id: 4, text: "Novo funcionário Marcus Souza cadastrado", type: "system", time: "1d atrás", unread: false },
  ]);

  // Action Drawer / Modals State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productFormOpen, setProductFormOpen] = useState<boolean>(false);
  const [employeeFormOpen, setEmployeeFormOpen] = useState<boolean>(false);

  // Form Fields State
  const [productForm, setProductForm] = useState<Partial<Product>>({
    sku: "", name: "", category: "Canetas", price: 0, stock: 0, status: "Ativo", brand: "Artools"
  });
  const [employeeForm, setEmployeeForm] = useState<Partial<Employee>>({
    name: "", cpf: "", email: "", phone: "", role: "Atendente", department: "", status: "Ativo"
  });

  // Filter States
  const [productFilter, setProductFilter] = useState({ category: "Todos", status: "Todos", search: "" });
  const [orderFilter, setOrderFilter] = useState({ status: "Todos", search: "" });
  const [customerFilter, setCustomerFilter] = useState({ status: "Todos", search: "" });
  const [logFilter, setLogFilter] = useState({ module: "Todos", result: "Todos" });

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
    .filter(o => o.date === "2026-07-30" && (o.status === "Aprovado" || o.status === "Enviado"))
    .reduce((sum, o) => sum + o.value, 0);

  const pendingOrders = orders.filter(o => o.status === "Pendente").length;
  const sentOrders = orders.filter(o => o.status === "Enviado").length;
  const lowStockProducts = products.filter(p => p.stock <= 10).length;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#111111] text-white font-sans flex flex-col antialiased selection:bg-white selection:text-[#111111]">
      
      {/* TOAST SYSTEM */}
      <div className={`fixed bottom-6 right-6 z-[99999] flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-xl transition-all duration-300 ${
        toast.show ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-10 opacity-0 pointer-events-none"
      } ${
        toast.type === "success" ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300" :
        toast.type === "error" ? "bg-rose-950/80 border-rose-500/30 text-rose-300" :
        toast.type === "warning" ? "bg-amber-950/80 border-amber-500/30 text-amber-300" :
        "bg-stone-900/90 border-white/10 text-white"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-start justify-center pt-24 px-4" onClick={() => setSearchOpen(false)}>
          <div className="bg-[#171717] border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in duration-200" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-white/5 flex items-center gap-3">
              <Icon icon="solar:magnifer-linear" className="text-stone-400 text-xl" />
              <input
                type="text"
                placeholder="Pesquisar pedidos, produtos, clientes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-white border-0 outline-none w-full text-base placeholder:text-stone-500"
                autoFocus
              />
              <span className="text-[10px] bg-stone-800 text-stone-400 px-2 py-1 rounded">ESC</span>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto p-2">
              {searchQuery ? (
                <div className="flex flex-col gap-1">
                  <div className="text-[10px] text-stone-500 font-semibold px-3 py-2 uppercase font-mono">Resultados de busca</div>
                  {/* Filter products */}
                  {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                    <button key={p.id} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 text-left transition" onClick={() => { setActiveTab("Produtos"); setSearchOpen(false); }}>
                      <div className="flex items-center gap-3">
                        <Icon icon="solar:box-linear" className="text-stone-400" />
                        <div>
                          <div className="text-sm font-medium">{p.name}</div>
                          <div className="text-xs text-stone-500 font-mono">{p.sku}</div>
                        </div>
                      </div>
                      <span className="text-xs text-stone-400 font-mono">R$ {p.price.toFixed(2)}</span>
                    </button>
                  ))}
                  {/* Filter orders */}
                  {orders.filter(o => o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.toLowerCase().includes(searchQuery.toLowerCase())).map(o => (
                    <button key={o.id} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 text-left transition" onClick={() => { setActiveTab("Pedidos"); setSearchOpen(false); }}>
                      <div className="flex items-center gap-3">
                        <Icon icon="solar:cart-large-linear" className="text-stone-400" />
                        <div>
                          <div className="text-sm font-medium">{o.customerName}</div>
                          <div className="text-xs text-stone-500 font-mono">{o.id}</div>
                        </div>
                      </div>
                      <span className="text-xs text-stone-400 font-mono">R$ {o.value.toFixed(2)}</span>
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
        <aside className={`bg-[#171717] border-r border-white/5 transition-all duration-300 flex flex-col z-30 shrink-0 ${
          sidebarCollapsed ? "w-20" : "w-64"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} fixed md:relative h-full`}>
          {/* Logo Section */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="font-display text-lg font-bold tracking-tight text-white flex items-center gap-2">
                ARTools<span className="text-xs bg-white text-black px-1.5 py-0.5 rounded font-mono font-normal">PRO</span>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="w-8 h-8 rounded bg-white text-black font-display font-bold flex items-center justify-center text-sm mx-auto">
                AT
              </div>
            )}
            <button className="hidden md:block text-stone-400 hover:text-white" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
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
                      : "text-stone-400 hover:bg-[#292929] hover:text-white"
                  }`}
                >
                  <Icon icon={item.icon} className="text-lg shrink-0" />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </nav>

          {/* Footer User Profile (Sidebar) */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-800 border border-white/10 flex items-center justify-center font-display font-semibold text-white">
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
                className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-stone-900 border border-white/5 text-xs text-stone-400 hover:bg-stone-800 hover:text-white transition"
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
          <header className="sticky top-0 bg-[#111111]/85 backdrop-blur-md border-b border-white/5 z-20 px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile menu trigger */}
              <button className="md:hidden text-stone-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Icon icon="solar:hamburger-menu-linear" className="text-2xl" />
              </button>
              
              {/* Search trigger button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-3 px-4 py-2 bg-[#171717] border border-white/5 rounded-full hover:border-white/10 transition text-stone-400 text-xs w-48 md:w-80"
              >
                <Icon icon="solar:magnifer-linear" className="text-sm shrink-0" />
                <span>Pesquisar...</span>
                <span className="hidden md:inline-block ml-auto font-mono text-[10px] text-stone-600 bg-[#292929] px-1.5 py-0.5 rounded">Ctrl + K</span>
              </button>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications dropdown trigger shortcut */}
              <button className="relative p-2 bg-[#171717] border border-white/5 rounded-full hover:border-white/10 transition text-stone-300" onClick={() => setActiveTab("Notificações")}>
                <Icon icon="solar:bell-linear" className="text-lg" />
                {notifications.some(n => n.unread) && (
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
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-display font-medium text-xs">
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
                  <span className="text-stone-300">{activeTab}</span>
                </div>
                <h1 className="text-2xl font-display font-bold text-white tracking-tight">{activeTab}</h1>
              </div>
              
              {activeTab === "Dashboard" && (
                <div className="text-xs text-stone-400 font-mono bg-[#171717] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Sistemas Operacionais 100% Online</span>
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* MODULE: DASHBOARD */}
            {/* ========================================================================= */}
            {activeTab === "Dashboard" && (
              <div className="space-y-8">
                {/* Welcome Message */}
                <div className="bg-[#1F1F1F] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-display font-bold mb-1">Bom dia, João Pedro.</h2>
                    <p className="text-sm text-stone-400">Aqui está o resumo operacional das últimas 24 horas.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-stone-200 transition" onClick={() => triggerToast("Relatório Geral", "Relatório de vendas exportado com sucesso.", "success")}>
                      Exportar Resumo
                    </button>
                  </div>
                </div>

                {/* KPI Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#1F1F1F] border border-white/5 rounded-xl p-5 space-y-2 hover:border-white/10 transition">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs font-medium">Pedidos Hoje</span>
                      <Icon icon="solar:cart-large-linear" className="text-lg text-stone-500" />
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {orders.filter(o => o.date === "2026-07-30").length}
                    </div>
                    <div className="text-[10px] text-emerald-500 font-medium font-mono flex items-center gap-1">
                      <Icon icon="solar:arrow-left-up-linear" />
                      <span>+12.5% em relação a ontem</span>
                    </div>
                  </div>

                  <div className="bg-[#1F1F1F] border border-white/5 rounded-xl p-5 space-y-2 hover:border-white/10 transition">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs font-medium">Pedidos Pendentes</span>
                      <Icon icon="solar:clock-square-linear" className="text-lg text-amber-500" />
                    </div>
                    <div className="text-2xl font-bold font-mono text-amber-400">
                      {pendingOrders}
                    </div>
                    <div className="text-[10px] text-stone-500 font-mono">
                      Aguardando confirmação bancária
                    </div>
                  </div>

                  <div className="bg-[#1F1F1F] border border-white/5 rounded-xl p-5 space-y-2 hover:border-white/10 transition">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs font-medium">Faturamento Hoje</span>
                      <Icon icon="solar:banknote-linear" className="text-lg text-emerald-500" />
                    </div>
                    <div className="text-2xl font-bold font-mono text-emerald-400">
                      R$ {totalSalesToday.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-emerald-500 font-medium font-mono flex items-center gap-1">
                      <Icon icon="solar:arrow-left-up-linear" />
                      <span>+8.2% acima da meta diária</span>
                    </div>
                  </div>

                  <div className="bg-[#1F1F1F] border border-white/5 rounded-xl p-5 space-y-2 hover:border-white/10 transition">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs font-medium">Baixo Estoque</span>
                      <Icon icon="solar:box-minimalistic-linear" className="text-lg text-rose-500" />
                    </div>
                    <div className="text-2xl font-bold font-mono text-rose-400">
                      {lowStockProducts}
                    </div>
                    <div className="text-[10px] text-rose-400 font-mono">
                      Produtos precisam de reposição
                    </div>
                  </div>
                </div>

                {/* Dashboard Charts & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Sales progress card */}
                  <div className="bg-[#1F1F1F] border border-white/5 rounded-2xl p-6 lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold">Volume de Vendas (Simulação Semanal)</h3>
                      <span className="text-xs font-mono text-stone-500">Julho 2026</span>
                    </div>
                    {/* Simulated SVG Bar Chart */}
                    <div className="h-60 w-full flex items-end justify-between gap-3 pt-6">
                      {[
                        { day: "Seg", val: 40 },
                        { day: "Ter", val: 65 },
                        { day: "Qua", val: 55 },
                        { day: "Qui", val: 85 },
                        { day: "Sex", val: 95 },
                        { day: "Sáb", val: 120 },
                        { day: "Dom", val: 80 }
                      ].map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                          <div className="w-full bg-white/5 hover:bg-white/20 transition rounded-t-lg relative group flex items-end justify-center" style={{ height: `${(item.val / 130) * 100}%` }}>
                            <div className="absolute -top-8 bg-black border border-white/10 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition font-mono z-10 pointer-events-none">
                              R${(item.val * 35).toFixed(0)}
                            </div>
                            <div className="w-full bg-white rounded-t-lg transition duration-300" style={{ height: "4px" }} />
                          </div>
                          <span className="text-[10px] text-stone-500 font-mono">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Status */}
                  <div className="bg-[#1F1F1F] border border-white/5 rounded-2xl p-6 space-y-6">
                    <h3 className="text-sm font-semibold">Status Operacional</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-stone-400 mb-1">
                          <span>Pedidos Expedidos</span>
                          <span className="font-mono">{sentOrders}/{orders.length}</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${(sentOrders / orders.length) * 100}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-stone-400 mb-1">
                          <span>Estoque Abastecido</span>
                          <span className="font-mono">80%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-white" style={{ width: "80%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-stone-400 mb-1">
                          <span>Faturamento vs Meta Semanal</span>
                          <span className="font-mono">R$ 15.420 / R$ 20.000</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: "77.1%" }} />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 space-y-3">
                      <div className="text-xs text-stone-400 font-medium">Alertas Rápidos:</div>
                      <div className="flex items-center gap-2 text-xs text-rose-400">
                        <Icon icon="solar:danger-bold" className="shrink-0" />
                        <span>Produto "Precision Pen Gold Matte" está sem estoque.</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-amber-400">
                        <Icon icon="solar:bell-bold" className="shrink-0" />
                        <span>Existem {pendingOrders} pedidos pendentes de aprovação.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* MODULE: PRODUTOS */}
            {/* ========================================================================= */}
            {activeTab === "Produtos" && (
              <div className="space-y-6">
                {/* Actions and filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1F1F1F] p-4 rounded-xl border border-white/5">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Filter Category */}
                    <select
                      value={productFilter.category}
                      onChange={e => setProductFilter(prev => ({ ...prev, category: e.target.value }))}
                      className="bg-[#292929] border border-white/10 rounded-lg px-3 py-2 text-xs text-stone-300 outline-none"
                    >
                      <option value="Todos">Todas Categorias</option>
                      <option value="Canetas">Canetas</option>
                      <option value="Acessórios">Acessórios</option>
                    </select>

                    {/* Filter Status */}
                    <select
                      value={productFilter.status}
                      onChange={e => setProductFilter(prev => ({ ...prev, status: e.target.value }))}
                      className="bg-[#292929] border border-white/10 rounded-lg px-3 py-2 text-xs text-stone-300 outline-none"
                    >
                      <option value="Todos">Status (Todos)</option>
                      <option value="Ativo">Ativos</option>
                      <option value="Inativo">Inativos</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Pesquisar SKU ou Nome..."
                      value={productFilter.search}
                      onChange={e => setProductFilter(prev => ({ ...prev, search: e.target.value }))}
                      className="bg-[#292929] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-500 outline-none"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setProductForm({ sku: "", name: "", category: "Canetas", price: 0, stock: 0, status: "Ativo", brand: "Artools" });
                      setProductFormOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-white text-black hover:bg-stone-200 transition px-4 py-2.5 rounded-lg text-xs font-semibold"
                  >
                    <Icon icon="solar:add-circle-linear" />
                    <span>Novo Produto</span>
                  </button>
                </div>

                {/* Products Table */}
                <div className="bg-[#1F1F1F] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02] text-xs text-stone-400 font-mono uppercase">
                          <th className="p-4">SKU</th>
                          <th className="p-4">Nome</th>
                          <th className="p-4">Categoria</th>
                          <th className="p-4">Preço</th>
                          <th className="p-4">Estoque</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm">
                        {products
                          .filter(p => {
                            if (productFilter.category !== "Todos" && p.category !== productFilter.category) return false;
                            if (productFilter.status !== "Todos" && p.status !== productFilter.status) return false;
                            if (productFilter.search && !p.name.toLowerCase().includes(productFilter.search.toLowerCase()) && !p.sku.toLowerCase().includes(productFilter.search.toLowerCase())) return false;
                            return true;
                          })
                          .map(p => (
                            <tr key={p.id} className="hover:bg-white/[0.01] transition">
                              <td className="p-4 font-mono text-xs font-semibold text-stone-400">{p.sku}</td>
                              <td className="p-4 font-medium text-white">{p.name}</td>
                              <td className="p-4 text-stone-400">{p.category}</td>
                              <td className="p-4 font-mono text-white">R$ {p.price.toFixed(2)}</td>
                              <td className="p-4 font-mono">
                                <span className={`px-2 py-0.5 rounded text-xs ${
                                  p.stock === 0 ? "bg-rose-950/40 text-rose-400 border border-rose-500/20" :
                                  p.stock <= 10 ? "bg-amber-950/40 text-amber-400 border border-amber-500/20" :
                                  "text-stone-400"
                                }`}>
                                  {p.stock} un
                                </span>
                              </td>
                              <td className="p-4">
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                                  p.status === "Ativo" ? "bg-emerald-500/10 text-emerald-400" : "bg-stone-800 text-stone-500"
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${p.status === "Ativo" ? "bg-emerald-400" : "bg-stone-500"}`} />
                                  {p.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <div className="inline-flex gap-2">
                                  <button
                                    onClick={() => {
                                      setSelectedProduct(p);
                                      setProductForm(p);
                                      setProductFormOpen(true);
                                    }}
                                    className="p-1.5 rounded bg-stone-900 border border-white/5 text-stone-400 hover:text-white hover:bg-stone-800 transition"
                                  >
                                    <Icon icon="solar:pen-linear" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setProducts(prev => prev.filter(prod => prod.id !== p.id));
                                      triggerToast("Produto Removido", `O produto ${p.name} foi removido.`, "success");
                                    }}
                                    className="p-1.5 rounded bg-stone-900 border border-white/5 text-rose-500 hover:bg-rose-950/30 transition"
                                  >
                                    <Icon icon="solar:trash-bin-trash-linear" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* MODAL: ADD / EDIT PRODUCT */}
                {productFormOpen && (
                  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                    <div className="bg-[#1F1F1F] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                      <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-base font-semibold font-display">{selectedProduct ? "Editar Produto" : "Novo Produto"}</h3>
                        <button className="text-stone-400 hover:text-white" onClick={() => { setProductFormOpen(false); setSelectedProduct(null); }}>
                          <Icon icon="solar:close-circle-linear" className="text-xl" />
                        </button>
                      </div>
                      
                      <form onSubmit={e => {
                        e.preventDefault();
                        if (selectedProduct) {
                          setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { ...p, ...productForm } as Product : p));
                          triggerToast("Produto Atualizado", `O produto ${productForm.name} foi atualizado com sucesso.`, "success");
                        } else {
                          const newProd: Product = {
                            id: (products.length + 1).toString(),
                            sku: productForm.sku || `ART-NEW-${Math.floor(Math.random() * 1000)}`,
                            name: productForm.name || "Novo Produto",
                            category: productForm.category || "Canetas",
                            price: Number(productForm.price) || 0,
                            stock: Number(productForm.stock) || 0,
                            status: productForm.status as "Ativo" | "Inativo" || "Ativo",
                            brand: productForm.brand || "Artools"
                          };
                          setProducts(prev => [...prev, newProd]);
                          triggerToast("Produto Cadastrado", `O produto ${newProd.name} foi criado com sucesso.`, "success");
                        }
                        setProductFormOpen(false);
                        setSelectedProduct(null);
                      }} className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">Nome do Produto</label>
                            <input
                              type="text"
                              required
                              value={productForm.name}
                              onChange={e => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">SKU</label>
                            <input
                              type="text"
                              required
                              value={productForm.sku}
                              onChange={e => setProductForm(prev => ({ ...prev, sku: e.target.value }))}
                              className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm font-mono text-white outline-none focus:border-white/20 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">Categoria</label>
                            <select
                              value={productForm.category}
                              onChange={e => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                              className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20 transition"
                            >
                              <option value="Canetas">Canetas</option>
                              <option value="Acessórios">Acessórios</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">Preço (R$)</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              value={productForm.price}
                              onChange={e => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                              className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm font-mono text-white outline-none focus:border-white/20 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">Estoque inicial</label>
                            <input
                              type="number"
                              required
                              value={productForm.stock}
                              onChange={e => setProductForm(prev => ({ ...prev, stock: Number(e.target.value) }))}
                              className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm font-mono text-white outline-none focus:border-white/20 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">Status</label>
                            <select
                              value={productForm.status}
                              onChange={e => setProductForm(prev => ({ ...prev, status: e.target.value as "Ativo" | "Inativo" }))}
                              className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20 transition"
                            >
                              <option value="Ativo">Ativo</option>
                              <option value="Inativo">Inativo</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">Marca</label>
                            <input
                              type="text"
                              value={productForm.brand}
                              onChange={e => setProductForm(prev => ({ ...prev, brand: e.target.value }))}
                              className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20 transition"
                            />
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex gap-2 justify-end">
                          <button type="button" onClick={() => { setProductFormOpen(false); setSelectedProduct(null); }} className="px-4 py-2 rounded-xl bg-stone-900 border border-white/5 text-xs hover:bg-stone-800 transition">
                            Cancelar
                          </button>
                          <button type="submit" className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-stone-200 transition">
                            Salvar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* MODULE: PEDIDOS */}
            {/* ========================================================================= */}
            {activeTab === "Pedidos" && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1F1F1F] p-4 rounded-xl border border-white/5">
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={orderFilter.status}
                      onChange={e => setOrderFilter(prev => ({ ...prev, status: e.target.value }))}
                      className="bg-[#292929] border border-white/10 rounded-lg px-3 py-2 text-xs text-stone-300 outline-none"
                    >
                      <option value="Todos">Todos Status</option>
                      <option value="Aprovado">Aprovados</option>
                      <option value="Pendente">Pendentes</option>
                      <option value="Enviado">Enviados</option>
                      <option value="Cancelado">Cancelados</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Pesquisar pedido ou cliente..."
                      value={orderFilter.search}
                      onChange={e => setOrderFilter(prev => ({ ...prev, search: e.target.value }))}
                      className="bg-[#292929] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-500 outline-none"
                    />
                  </div>
                </div>

                {/* Orders table */}
                <div className="bg-[#1F1F1F] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02] text-xs text-stone-400 font-mono uppercase">
                          <th className="p-4">ID</th>
                          <th className="p-4">Cliente</th>
                          <th className="p-4">Valor</th>
                          <th className="p-4">Pagamento</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Data</th>
                          <th className="p-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm">
                        {orders
                          .filter(o => {
                            if (orderFilter.status !== "Todos" && o.status !== orderFilter.status) return false;
                            if (orderFilter.search && !o.customerName.toLowerCase().includes(orderFilter.search.toLowerCase()) && !o.id.toLowerCase().includes(orderFilter.search.toLowerCase())) return false;
                            return true;
                          })
                          .map(o => (
                            <tr key={o.id} className="hover:bg-white/[0.01] transition">
                              <td className="p-4 font-mono text-xs font-semibold text-white">{o.id}</td>
                              <td className="p-4 font-medium text-white">{o.customerName}</td>
                              <td className="p-4 font-mono text-white">R$ {o.value.toFixed(2)}</td>
                              <td className="p-4">
                                <span className="px-2 py-0.5 bg-stone-900 border border-white/5 rounded text-xs font-mono text-stone-400">{o.paymentMethod}</span>
                              </td>
                              <td className="p-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  o.status === "Aprovado" ? "bg-emerald-500/10 text-emerald-400" :
                                  o.status === "Pendente" ? "bg-amber-500/10 text-amber-400" :
                                  o.status === "Enviado" ? "bg-blue-500/10 text-blue-400" :
                                  o.status === "Cancelado" ? "bg-rose-500/10 text-rose-400" :
                                  "bg-stone-800 text-stone-400"
                                }`}>
                                  {o.status}
                                </span>
                              </td>
                              <td className="p-4 font-mono text-xs text-stone-400">{o.date}</td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => setSelectedOrder(o)}
                                  className="px-3 py-1 bg-stone-900 border border-white/5 rounded-lg text-xs text-stone-400 hover:text-white hover:bg-stone-800 transition"
                                >
                                  Ver Detalhes
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* DRAWER: ORDER DETAILS */}
                {selectedOrder && (
                  <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#1F1F1F] border-l border-white/10 z-[9999] shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
                    <div className="space-y-6 overflow-y-auto pr-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-semibold font-display">Detalhes do Pedido</h3>
                          <p className="text-xs text-stone-500 font-mono">{selectedOrder.id}</p>
                        </div>
                        <button className="text-stone-400 hover:text-white" onClick={() => setSelectedOrder(null)}>
                          <Icon icon="solar:close-circle-linear" className="text-xl" />
                        </button>
                      </div>

                      <div className="border-t border-white/5 pt-4 space-y-4">
                        <div>
                          <h4 className="text-xs font-mono uppercase text-stone-500 mb-1">Cliente</h4>
                          <p className="text-sm font-medium text-white">{selectedOrder.customerName}</p>
                          <p className="text-xs text-stone-400">Entrega via {selectedOrder.deliveryCompany}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono uppercase text-stone-500 mb-1">Endereço de Envio</h4>
                          <p className="text-xs text-stone-300 leading-relaxed">{selectedOrder.address}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono uppercase text-stone-500 mb-2">Itens do Pedido</h4>
                          <div className="space-y-2">
                            {selectedOrder.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-xs bg-stone-900/60 p-2.5 rounded-lg border border-white/5">
                                <div>
                                  <span className="font-semibold text-white">{item.name}</span>
                                  <span className="text-stone-500 font-mono ml-2">x{item.qty}</span>
                                </div>
                                <span className="font-mono text-stone-400">R$ {(item.price * item.qty).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono uppercase text-stone-500 mb-1">Resumo Financeiro</h4>
                          <div className="space-y-1.5 text-xs font-mono">
                            <div className="flex justify-between text-stone-400">
                              <span>Subtotal</span>
                              <span>R$ {selectedOrder.value.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-stone-400">
                              <span>Frete</span>
                              <span className="text-emerald-400">Grátis</span>
                            </div>
                            <div className="flex justify-between text-white font-semibold border-t border-white/5 pt-1.5 text-sm">
                              <span>Total</span>
                              <span>R$ {selectedOrder.value.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono uppercase text-stone-500 mb-1">Status de Entrega</h4>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            <span className="text-xs font-medium text-stone-300">Expedido via {selectedOrder.deliveryCompany}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 grid grid-cols-2 gap-2">
                      {selectedOrder.status !== "Enviado" && selectedOrder.status !== "Cancelado" && (
                        <button
                          onClick={() => {
                            setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: "Enviado" } : o));
                            setSelectedOrder(prev => prev ? { ...prev, status: "Enviado" } : null);
                            triggerToast("Pedido Enviado", "O pedido foi marcado como enviado.", "success");
                          }}
                          className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-stone-200 transition"
                        >
                          Marcar como Enviado
                        </button>
                      )}
                      
                      {selectedOrder.status !== "Cancelado" && selectedOrder.status !== "Reembolsado" && (
                        <button
                          onClick={() => {
                            setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: "Cancelado" } : o));
                            setSelectedOrder(prev => prev ? { ...prev, status: "Cancelado" } : null);
                            triggerToast("Pedido Cancelado", "O pedido foi cancelado e devolvido.", "warning");
                          }}
                          className="w-full py-2.5 rounded-xl bg-rose-950/50 border border-rose-500/20 text-rose-400 text-xs font-semibold hover:bg-rose-950 transition"
                        >
                          Cancelar Pedido
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* MODULE: CLIENTES */}
            {/* ========================================================================= */}
            {activeTab === "Clientes" && (
              <div className="space-y-6">
                {/* Header/Filters */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1F1F1F] p-4 rounded-xl border border-white/5">
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={customerFilter.status}
                      onChange={e => setCustomerFilter(prev => ({ ...prev, status: e.target.value }))}
                      className="bg-[#292929] border border-white/10 rounded-lg px-3 py-2 text-xs text-stone-300 outline-none"
                    >
                      <option value="Todos">Todos Status</option>
                      <option value="Ativo">Ativos</option>
                      <option value="Bloqueado">Bloqueados</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Pesquisar por nome ou e-mail..."
                      value={customerFilter.search}
                      onChange={e => setCustomerFilter(prev => ({ ...prev, search: e.target.value }))}
                      className="bg-[#292929] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-stone-500 outline-none"
                    />
                  </div>
                </div>

                {/* Table list */}
                <div className="bg-[#1F1F1F] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02] text-xs text-stone-400 font-mono uppercase">
                          <th className="p-4">Nome</th>
                          <th className="p-4">E-mail</th>
                          <th className="p-4">Cidade</th>
                          <th className="p-4">Pedidos</th>
                          <th className="p-4">Total Gasto</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm">
                        {customers
                          .filter(c => {
                            if (customerFilter.status !== "Todos" && c.status !== customerFilter.status) return false;
                            if (customerFilter.search && !c.name.toLowerCase().includes(customerFilter.search.toLowerCase()) && !c.email.toLowerCase().includes(customerFilter.search.toLowerCase())) return false;
                            return true;
                          })
                          .map(c => (
                            <tr key={c.id} className="hover:bg-white/[0.01] transition">
                              <td className="p-4 font-medium text-white">{c.name}</td>
                              <td className="p-4 text-stone-400 font-mono text-xs">{c.email}</td>
                              <td className="p-4 text-stone-300">{c.city}</td>
                              <td className="p-4 font-mono">{c.totalOrders}</td>
                              <td className="p-4 font-mono text-white">R$ {c.totalSpent.toFixed(2)}</td>
                              <td className="p-4">
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                                  c.status === "Ativo" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${c.status === "Ativo" ? "bg-emerald-400" : "bg-rose-400"}`} />
                                  {c.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => {
                                    const nextStatus = c.status === "Ativo" ? "Bloqueado" : "Ativo";
                                    setCustomers(prev => prev.map(cust => cust.id === c.id ? { ...cust, status: nextStatus } : cust));
                                    triggerToast("Status Alterado", `O cliente ${c.name} foi ${nextStatus === "Ativo" ? "desbloqueado" : "bloqueado"}.`, "info");
                                  }}
                                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                                    c.status === "Ativo"
                                      ? "bg-rose-950/30 border-rose-500/10 text-rose-400 hover:bg-rose-950"
                                      : "bg-emerald-950/30 border-emerald-500/10 text-emerald-400 hover:bg-emerald-950"
                                  }`}
                                >
                                  {c.status === "Ativo" ? "Bloquear" : "Desbloquear"}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* MODULE: ESTOQUE */}
            {/* ========================================================================= */}
            {activeTab === "Estoque" && (
              <div className="space-y-6">
                <div className="bg-[#1F1F1F] p-6 rounded-2xl border border-white/5 space-y-4">
                  <h3 className="text-sm font-semibold">Painel de Reposição & Alertas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-rose-950/20 border border-rose-500/15 p-4 rounded-xl space-y-1">
                      <span className="text-[10px] uppercase font-mono text-rose-400">Crítico: Sem Estoque</span>
                      <div className="text-2xl font-bold font-mono text-rose-400">
                        {products.filter(p => p.stock === 0).length}
                      </div>
                      <p className="text-xs text-rose-300/80">Produtos fora de catálogo temporariamente.</p>
                    </div>

                    <div className="bg-amber-950/20 border border-amber-500/15 p-4 rounded-xl space-y-1">
                      <span className="text-[10px] uppercase font-mono text-amber-400">Atenção: Estoque Baixo</span>
                      <div className="text-2xl font-bold font-mono text-amber-400">
                        {products.filter(p => p.stock > 0 && p.stock <= 10).length}
                      </div>
                      <p className="text-xs text-amber-300/80">Necessita emissão de ordem de compra.</p>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-500/15 p-4 rounded-xl space-y-1">
                      <span className="text-[10px] uppercase font-mono text-emerald-400">Estoque Saudável</span>
                      <div className="text-2xl font-bold font-mono text-emerald-400">
                        {products.filter(p => p.stock > 10).length}
                      </div>
                      <p className="text-xs text-emerald-300/80">Nenhum risco de ruptura imediata.</p>
                    </div>
                  </div>
                </div>

                {/* Stock adjustments list */}
                <div className="bg-[#1F1F1F] border border-white/5 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02] text-xs text-stone-400 font-mono uppercase">
                        <th className="p-4">Produto</th>
                        <th className="p-4">SKU</th>
                        <th className="p-4">Estoque Atual</th>
                        <th className="p-4">Ajuste Rápido</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {products.map(p => (
                        <tr key={p.id} className="hover:bg-white/[0.01] transition">
                          <td className="p-4 font-medium text-white">{p.name}</td>
                          <td className="p-4 font-mono text-xs text-stone-500">{p.sku}</td>
                          <td className="p-4 font-mono text-white font-semibold">{p.stock} un</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  if (p.stock > 0) {
                                    setProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, stock: prod.stock - 1 } : prod));
                                    triggerToast("Estoque Atualizado", `${p.name} (-1 un)`, "warning");
                                  }
                                }}
                                className="px-2.5 py-1 rounded bg-stone-900 border border-white/5 text-stone-400 hover:text-white transition"
                              >
                                -1
                              </button>
                              <button
                                onClick={() => {
                                  setProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, stock: prod.stock + 1 } : prod));
                                  triggerToast("Estoque Atualizado", `${p.name} (+1 un)`, "success");
                                }}
                                className="px-2.5 py-1 rounded bg-stone-900 border border-white/5 text-stone-400 hover:text-white transition"
                              >
                                +1
                              </button>
                              <button
                                onClick={() => {
                                  setProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, stock: prod.stock + 10 } : prod));
                                  triggerToast("Estoque Reposto", `Lote de reposição (+10 un) adicionado a ${p.name}.`, "success");
                                }}
                                className="px-2 py-1 rounded bg-white text-black font-semibold text-xs hover:bg-stone-200 transition"
                              >
                                Repor +10
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* MODULE: PAGAMENTOS */}
            {/* ========================================================================= */}
            {activeTab === "Pagamentos" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-[#1F1F1F] border border-white/5 rounded-xl p-5 space-y-1">
                    <span className="text-xs text-stone-500 font-mono">PIX Aprovados</span>
                    <div className="text-xl font-bold font-mono text-emerald-400">R$ {orders.filter(o => o.paymentMethod === "PIX" && o.status !== "Cancelado").reduce((acc, o) => acc + o.value, 0).toFixed(2)}</div>
                  </div>
                  <div className="bg-[#1F1F1F] border border-white/5 rounded-xl p-5 space-y-1">
                    <span className="text-xs text-stone-500 font-mono">Cartão Aprovados</span>
                    <div className="text-xl font-bold font-mono text-emerald-400">R$ {orders.filter(o => o.paymentMethod === "Cartão" && o.status !== "Cancelado").reduce((acc, o) => acc + o.value, 0).toFixed(2)}</div>
                  </div>
                  <div className="bg-[#1F1F1F] border border-white/5 rounded-xl p-5 space-y-1">
                    <span className="text-xs text-stone-500 font-mono">Boletos Pendentes</span>
                    <div className="text-xl font-bold font-mono text-amber-400">R$ {orders.filter(o => o.paymentMethod === "Boleto" && o.status === "Pendente").reduce((acc, o) => acc + o.value, 0).toFixed(2)}</div>
                  </div>
                  <div className="bg-[#1F1F1F] border border-white/5 rounded-xl p-5 space-y-1">
                    <span className="text-xs text-stone-500 font-mono">Total Reembolsos</span>
                    <div className="text-xl font-bold font-mono text-stone-500">R$ 0,00</div>
                  </div>
                </div>

                <div className="bg-[#1F1F1F] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/5 bg-white/[0.01] text-xs font-semibold text-stone-400 uppercase font-mono">Fluxo de Transações</div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02] text-xs text-stone-400 font-mono uppercase">
                        <th className="p-4">Transação</th>
                        <th className="p-4">Cliente</th>
                        <th className="p-4">Método</th>
                        <th className="p-4">Valor</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-white/[0.01] transition">
                          <td className="p-4 font-mono text-xs font-semibold text-stone-400">TXN-{o.id}</td>
                          <td className="p-4 text-white font-medium">{o.customerName}</td>
                          <td className="p-4 text-stone-400 font-mono text-xs">{o.paymentMethod}</td>
                          <td className="p-4 font-mono text-white">R$ {o.value.toFixed(2)}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              o.status === "Cancelado" ? "bg-rose-500/10 text-rose-400" :
                              o.status === "Pendente" ? "bg-amber-500/10 text-amber-400" :
                              "bg-emerald-500/10 text-emerald-400"
                            }`}>
                              {o.status === "Pendente" ? "Aguardando" : o.status === "Cancelado" ? "Recusado" : "Aprovado"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* MODULE: RELATÓRIOS */}
            {/* ========================================================================= */}
            {activeTab === "Relatórios" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Export Options */}
                  <div className="bg-[#1F1F1F] p-6 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-sm font-semibold font-display">Exportação de Dados</h3>
                    <p className="text-xs text-stone-400">Gere e baixe arquivos consolidados em múltiplos formatos para fins fiscais e de auditoria.</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => triggerToast("Relatório PDF", "Relatório PDF gerado e iniciado o download.", "success")}
                        className="py-3 rounded-xl bg-stone-900 border border-white/5 text-stone-300 hover:bg-stone-800 hover:text-white transition flex flex-col items-center justify-center gap-2"
                      >
                        <Icon icon="solar:file-text-linear" className="text-xl text-rose-400" />
                        <span className="text-xs font-medium">PDF</span>
                      </button>
                      <button
                        onClick={() => triggerToast("Relatório Excel", "Relatório XLSX gerado e iniciado o download.", "success")}
                        className="py-3 rounded-xl bg-stone-900 border border-white/5 text-stone-300 hover:bg-stone-800 hover:text-white transition flex flex-col items-center justify-center gap-2"
                      >
                        <Icon icon="solar:document-text-linear" className="text-xl text-emerald-400" />
                        <span className="text-xs font-medium">Excel</span>
                      </button>
                      <button
                        onClick={() => triggerToast("Relatório CSV", "Exportação de CSV finalizada com sucesso.", "success")}
                        className="py-3 rounded-xl bg-stone-900 border border-white/5 text-stone-300 hover:bg-stone-800 hover:text-white transition flex flex-col items-center justify-center gap-2"
                      >
                        <Icon icon="solar:code-file-linear" className="text-xl text-blue-400" />
                        <span className="text-xs font-medium">CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick stats summary */}
                  <div className="bg-[#1F1F1F] p-6 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-sm font-semibold font-display">Resumo de Performance</h3>
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-stone-500">Ticket Médio</span>
                        <span className="text-white">R$ 571,25</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-stone-500">Conversão de Carrinho</span>
                        <span className="text-white">3.4%</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-stone-500">Taxa de Rejeição</span>
                        <span className="text-white">22%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* MODULE: NOTIFICAÇÕES */}
            {/* ========================================================================= */}
            {activeTab === "Notificações" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-[#1F1F1F] p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-stone-400">{notifications.filter(n => n.unread).length} notificações não lidas</span>
                  <button
                    onClick={() => {
                      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
                      triggerToast("Notificações", "Todas as notificações foram marcadas como lidas.", "info");
                    }}
                    className="text-xs text-white hover:underline font-semibold"
                  >
                    Marcar todas como lidas
                  </button>
                </div>

                <div className="bg-[#1F1F1F] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
                  {notifications.map(notif => (
                    <div key={notif.id} className={`p-5 flex items-center justify-between transition ${notif.unread ? "bg-white/[0.02]" : "opacity-60"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notif.type === "order" ? "bg-emerald-500/10 text-emerald-400" :
                          notif.type === "stock" ? "bg-rose-500/10 text-rose-400" :
                          notif.type === "payment" ? "bg-blue-500/10 text-blue-400" : "bg-stone-800 text-stone-400"
                        }`}>
                          <Icon icon={
                            notif.type === "order" ? "solar:cart-large-linear" :
                            notif.type === "stock" ? "solar:box-linear" :
                            notif.type === "payment" ? "solar:card-2-linear" : "solar:settings-linear"
                          } />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{notif.text}</p>
                          <span className="text-[10px] text-stone-500 font-mono">{notif.time}</span>
                        </div>
                      </div>
                      
                      {notif.unread && (
                        <button
                          onClick={() => {
                            setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, unread: false } : n));
                          }}
                          className="px-2 py-1 bg-stone-900 border border-white/5 rounded text-[10px] text-stone-400 hover:text-white"
                        >
                          Marcar como lida
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* MODULE: FUNCIONÁRIOS */}
            {/* ========================================================================= */}
            {activeTab === "Funcionários" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-[#1F1F1F] p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-stone-400 font-mono">{employees.length} funcionários cadastrados</span>
                  <button
                    onClick={() => {
                      setEmployeeForm({ name: "", cpf: "", email: "", phone: "", role: "Atendente", department: "", status: "Ativo" });
                      setEmployeeFormOpen(true);
                    }}
                    className="flex items-center gap-2 bg-white text-black hover:bg-stone-200 transition px-4 py-2 rounded-lg text-xs font-semibold"
                  >
                    <Icon icon="solar:add-circle-linear" />
                    <span>Novo Funcionário</span>
                  </button>
                </div>

                <div className="bg-[#1F1F1F] border border-white/5 rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.02] text-xs text-stone-400 font-mono uppercase">
                        <th className="p-4">Nome</th>
                        <th className="p-4">Cargo / Nível</th>
                        <th className="p-4">Departamento</th>
                        <th className="p-4">Acesso</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {employees.map(emp => (
                        <tr key={emp.id} className="hover:bg-white/[0.01] transition">
                          <td className="p-4 font-medium text-white">{emp.name}</td>
                          <td className="p-4 text-white font-mono text-xs">{emp.role}</td>
                          <td className="p-4 text-stone-400">{emp.department}</td>
                          <td className="p-4 text-stone-500 font-mono text-xs">{emp.lastAccess}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                              emp.status === "Ativo" ? "bg-emerald-500/10 text-emerald-400" : "bg-stone-850 text-stone-500"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${emp.status === "Ativo" ? "bg-emerald-400" : "bg-stone-500"}`} />
                              {emp.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                const nextStatus = emp.status === "Ativo" ? "Inativo" : "Ativo";
                                setEmployees(prev => prev.map(e => e.id === emp.id ? { ...e, status: nextStatus } : e));
                                triggerToast("Funcionário Modificado", `${emp.name} está agora ${nextStatus === "Ativo" ? "Ativo" : "Inativo"}.`, "info");
                              }}
                              className="px-2.5 py-1 bg-stone-900 border border-white/5 rounded text-xs text-stone-400 hover:text-white"
                            >
                              Tweak Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MODAL: ADD EMPLOYEE */}
                {employeeFormOpen && (
                  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                    <div className="bg-[#1F1F1F] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                      <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-base font-semibold font-display">Cadastrar Novo Funcionário</h3>
                        <button className="text-stone-400 hover:text-white" onClick={() => setEmployeeFormOpen(false)}>
                          <Icon icon="solar:close-circle-linear" className="text-xl" />
                        </button>
                      </div>

                      <form onSubmit={e => {
                        e.preventDefault();
                        const newEmp: Employee = {
                          id: (employees.length + 1).toString(),
                          name: employeeForm.name || "Novo Colaborador",
                          cpf: employeeForm.cpf || "000.000.000-00",
                          email: employeeForm.email || "",
                          phone: employeeForm.phone || "",
                          role: employeeForm.role as any || "Atendente",
                          department: employeeForm.department || "Operações",
                          status: employeeForm.status as any || "Ativo",
                          lastAccess: "Sem acessos"
                        };
                        setEmployees(prev => [...prev, newEmp]);
                        setEmployeeFormOpen(false);
                        triggerToast("Funcionário Cadastrado", `${newEmp.name} cadastrado com sucesso.`, "success");
                      }} className="p-6 space-y-4">
                        <div>
                          <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">Nome Completo</label>
                          <input
                            type="text"
                            required
                            value={employeeForm.name}
                            onChange={e => setEmployeeForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20 transition"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">CPF</label>
                            <input
                              type="text"
                              required
                              placeholder="000.000.000-00"
                              value={employeeForm.cpf}
                              onChange={e => setEmployeeForm(prev => ({ ...prev, cpf: e.target.value }))}
                              className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm font-mono text-white outline-none focus:border-white/20 transition"
                            />
                          </div>

                          <div>
                            <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">Cargo / Nível</label>
                            <select
                              value={employeeForm.role}
                              onChange={e => setEmployeeForm(prev => ({ ...prev, role: e.target.value as any }))}
                              className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20 transition"
                            >
                              <option value="Administrador">Administrador</option>
                              <option value="Gerente">Gerente</option>
                              <option value="Atendente">Atendente</option>
                              <option value="Estoquista">Estoquista</option>
                              <option value="Financeiro">Financeiro</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">E-mail Corporativo</label>
                          <input
                            type="email"
                            required
                            placeholder="exemplo@artools.pro"
                            value={employeeForm.email}
                            onChange={e => setEmployeeForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20 transition"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-stone-400 mb-1 font-mono uppercase">Departamento</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Comercial, Logística"
                            value={employeeForm.department}
                            onChange={e => setEmployeeForm(prev => ({ ...prev, department: e.target.value }))}
                            className="w-full bg-[#171717] border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/20 transition"
                          />
                        </div>

                        <div className="pt-4 border-t border-white/5 flex gap-2 justify-end">
                          <button type="button" onClick={() => setEmployeeFormOpen(false)} className="px-4 py-2 rounded-xl bg-stone-900 border border-white/5 text-xs hover:bg-stone-800 transition">
                            Cancelar
                          </button>
                          <button type="submit" className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-stone-200 transition">
                            Salvar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* MODULE: CONFIGURAÇÕES */}
            {/* ========================================================================= */}
            {activeTab === "Configurações" && (
              <div className="space-y-6">
                <div className="bg-[#1F1F1F] p-6 rounded-2xl border border-white/5 space-y-6">
                  <h3 className="text-sm font-semibold font-display">Configurações Gerais do Sistema</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div>
                        <h4 className="text-xs font-semibold">Duplo Fator de Autenticação (2FA)</h4>
                        <p className="text-[11px] text-stone-400">Forçar todos os funcionários a autenticar via app autenticador.</p>
                      </div>
                      <span className="w-9 h-5 bg-emerald-500 rounded-full p-0.5 cursor-pointer flex items-center justify-end">
                        <span className="w-4 h-4 bg-white rounded-full" />
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div>
                        <h4 className="text-xs font-semibold">Modo de Manutenção</h4>
                        <p className="text-[11px] text-stone-400">Suspende o e-commerce externo para atualizações estruturais.</p>
                      </div>
                      <span className="w-9 h-5 bg-stone-800 rounded-full p-0.5 cursor-pointer flex items-center justify-start">
                        <span className="w-4 h-4 bg-stone-600 rounded-full" />
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-semibold">Backups Diários Automáticos</h4>
                        <p className="text-[11px] text-stone-400">Salvar snapshots de transações no bucket Amazon S3 de contingência.</p>
                      </div>
                      <span className="w-9 h-5 bg-emerald-500 rounded-full p-0.5 cursor-pointer flex items-center justify-end">
                        <span className="w-4 h-4 bg-white rounded-full" />
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => triggerToast("Configurações", "Configurações de sistema salvas com sucesso.", "success")}
                      className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-stone-200 transition"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* MODULE: LOGS */}
            {/* ========================================================================= */}
            {activeTab === "Logs" && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1F1F1F] p-4 rounded-xl border border-white/5">
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={logFilter.module}
                      onChange={e => setLogFilter(prev => ({ ...prev, module: e.target.value }))}
                      className="bg-[#292929] border border-white/10 rounded-lg px-3 py-2 text-xs text-stone-300 outline-none"
                    >
                      <option value="Todos">Todos Módulos</option>
                      <option value="Autenticação">Autenticação</option>
                      <option value="Produtos">Produtos</option>
                      <option value="Estoque">Estoque</option>
                    </select>

                    <select
                      value={logFilter.result}
                      onChange={e => setLogFilter(prev => ({ ...prev, result: e.target.value }))}
                      className="bg-[#292929] border border-white/10 rounded-lg px-3 py-2 text-xs text-stone-300 outline-none"
                    >
                      <option value="Todos">Todos Resultados</option>
                      <option value="Sucesso">Sucessos</option>
                      <option value="Erro">Erros</option>
                    </select>
                  </div>
                </div>

                <div className="bg-[#1F1F1F] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02] text-xs text-stone-400 font-mono uppercase">
                          <th className="p-4">Timestamp</th>
                          <th className="p-4">Operador</th>
                          <th className="p-4">Ação</th>
                          <th className="p-4">Módulo</th>
                          <th className="p-4">Endereço IP</th>
                          <th className="p-4">Resultado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-sm font-mono text-xs">
                        {logs
                          .filter(l => {
                            if (logFilter.module !== "Todos" && l.module !== logFilter.module) return false;
                            if (logFilter.result !== "Todos" && l.result !== logFilter.result) return false;
                            return true;
                          })
                          .map(l => (
                            <tr key={l.id} className="hover:bg-white/[0.01] transition">
                              <td className="p-4 text-stone-400">{l.date}</td>
                              <td className="p-4 font-semibold text-white">{l.employee}</td>
                              <td className="p-4 text-stone-300 font-sans text-sm">{l.action}</td>
                              <td className="p-4 text-stone-400">{l.module}</td>
                              <td className="p-4 text-stone-500">{l.ip}</td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] ${
                                  l.result === "Sucesso" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20" : "bg-rose-950/40 text-rose-400 border border-rose-500/20"
                                }`}>
                                  {l.result}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* DISCRETE FOOTER */}
          <footer className="mt-auto px-10 py-6 border-t border-white/5 bg-[#111111]/80 backdrop-blur text-center text-xs text-stone-600 font-mono flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>Painel Administrativo da ARTOOLS.PRO © 2026</span>
            <span className="flex items-center gap-3">
              <span className="hover:text-stone-400 cursor-pointer">Segurança</span>
              <span>·</span>
              <span className="hover:text-stone-400 cursor-pointer">Ajuda</span>
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}

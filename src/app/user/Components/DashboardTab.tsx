import React, { useState } from "react";
import { Icon } from "@iconify/react";

// Importando os dados json
import dashboardData from "../data/dashboardData.json";

// Importando os componentes das seções
import ComprasSection from "./Sections/ComprasSection";
import PerfilSection from "./Sections/PerfilSection";
import PagamentoSection from "./Sections/PagamentoSection";
import StatusSection from "./Sections/StatusSection";
import MenuCards, { MenuCardsProps } from "./MenuCards";

export default function DashboardTab() {
  const [activeSection, setActiveSection] = useState<
    "compras" | "perfil" | "pagamento" | "status"
  >("compras");

  const { orders, userInfo, enderecos } = dashboardData;

  const cardsData: MenuCardsProps[] = [
    {
      id: "compras",
      isActive: activeSection === "compras",
      setActiveSection,
      tituloPrincipal: orders.length,
      sufixoPrincipal: "Pedidos",
      subTitulo: "Histórico de Pedidos",
      subTituloResumido: "Pedidos",
      icon: "solar:bag-bold",
      isEspecial: false,
    },
    {
      id: "perfil",
      isActive: activeSection === "perfil",
      setActiveSection,
      tituloPrincipal: `${userInfo.name[0].firstName} ${userInfo.name[0].lastName}`,
      subTitulo: "Perfil e Segurança",
      subTituloResumido: "Perfil",
      icon: "solar:user-bold",
      isEspecial: false,
    },
    {
      id: "pagamento",
      isActive: activeSection === "pagamento",
      setActiveSection,
      tituloPrincipal: "Meus dados",
      subTitulo: "Formas de Pagamento",
      subTituloResumido: "Pagamento",
      icon: "solar:wallet-money-bold",
      isEspecial: false,
    },
    {
      id: "status",
      isActive: activeSection === "status",
      setActiveSection,
      tituloPrincipal: userInfo.statusinfo.title,
      stausPontos: userInfo.statusinfo.points,
      subTitulo: "Status no Club",
      subTituloResumido: "Status",
      icon: "solar:star-bold",
      isEspecial: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER DA ABA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-medium text-stone-900 mb-1">
            Olá, {userInfo.name[0].firstName}
          </h2>
          <p className="text-stone-500 text-sm">
            Bem-vindo de volta ao seu painel exclusivo.
          </p>
        </div>

        {/* Profile Info (opcional se não quiser colocar no top header global) */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-stone-400 hover:text-stone-700 transition">
            <Icon icon="solar:bell-linear" className="text-xl" />
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-stone-900">
                {userInfo.name[0].firstName} {userInfo.name[0].lastName}
              </div>
              <div className="text-[10px] font-mono tracking-wider text-stone-400 uppercase">
                {userInfo.status}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden border border-stone-300">
              <img
                src={userInfo.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* TOP CARDS (MENU) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {cardsData.map((card) => (
          <MenuCards key={card.id} {...card} />
        ))}
      </div>

      {/* BOTTOM LAYOUT */}
      {activeSection === "compras" && <ComprasSection orders={orders} />}
      {activeSection === "perfil" && <PerfilSection />}
      {activeSection === "pagamento" && (
        <PagamentoSection enderecos={enderecos} />
      )}
      {activeSection === "status" && <StatusSection userInfo={userInfo} />}
    </div>
  );
}

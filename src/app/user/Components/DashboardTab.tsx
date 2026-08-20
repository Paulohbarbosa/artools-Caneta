import React, { useState } from "react";
import { Icon } from "@iconify/react";

// Importando os dados json
import dashboardData from "../data/dashboardData.json";

// Importando os componentes das seções
import ComprasSection from "./Sections/ComprasSection";
import PerfilSection from "./Sections/PerfilSection";
import PagamentoSection from "./Sections/PagamentoSection";
import StatusSection from "./Sections/StatusSection";
import MenuCards from "./MenuCards";

export default function DashboardTab() {
  const [activeSection, setActiveSection] = useState<
    "compras" | "perfil" | "pagamento" | "status"
  >("compras");

  const { orders, userInfo, enderecos } = dashboardData;

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
      <MenuCards
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        ordersCount={orders.length}
        userInfo={userInfo}
      />

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

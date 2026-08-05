import React, { useState } from "react";
import { Icon } from "@iconify/react";

// Importando os dados json
import dashboardData from "../data/dashboardData.json";

// Importando os componentes das seções
import ComprasSection from "./Sections/ComprasSection";
import PerfilSection from "./Sections/PerfilSection";
import PagamentoSection from "./Sections/PagamentoSection";
import StatusSection from "./Sections/StatusSection";

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Compras */}
        <div
          onClick={() => setActiveSection("compras")}
          className={`bg-white rounded-2xl p-4 md:p-6 shadow-sm relative overflow-hidden flex flex-col items-center justify-center md:items-start md:justify-between min-h-[100px] md:h-48 group hover:scale-[1.02] transition-all duration-300 cursor-pointer ${activeSection === "compras" ? "ring-2 ring-stone-900 border-transparent shadow-lg" : "border border-stone-100 hover:shadow-md"}`}
        >
          <Icon
            icon="solar:bag-bold"
            className={`hidden md:block absolute -bottom-6 -right-6 text-9xl transition-opacity ${activeSection === "compras" ? "text-stone-900 opacity-10" : "text-stone-900 opacity-5 group-hover:opacity-10"}`}
          />
          <div className="flex justify-center md:justify-between items-start relative z-10 w-full mb-2 md:mb-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors mx-auto md:mx-0 ${activeSection === "compras" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`}
            >
              <Icon icon="solar:bag-linear" className="text-xl" />
            </div>
          </div>
          <div className="relative z-10 text-center md:text-left w-full">
            <p className="text-[11px] md:text-sm font-semibold md:font-normal text-stone-700 md:text-stone-500 md:mb-1 uppercase md:capitalize tracking-wider md:tracking-normal">
              <span className="md:hidden">Pedidos</span>
              <span className="hidden md:inline">Histórico de Pedidos</span>
            </p>
            <h3 className="hidden md:block text-xl font-display font-bold text-stone-900 mb-3">
              {orders.length}
              <span className="ml-2 text-xs text-stone-500">Pedidos</span>
            </h3>
            <div
              className={`hidden md:flex text-xs font-medium items-center gap-1 transition ${activeSection === "compras" ? "text-stone-900" : "text-stone-500 group-hover:text-stone-900"}`}
            >
              Visualizar
              <Icon icon="solar:alt-arrow-right-linear" />
            </div>
          </div>
        </div>

        {/* Perfil */}
        <div
          onClick={() => setActiveSection("perfil")}
          className={`bg-white rounded-2xl p-4 md:p-6 shadow-sm relative overflow-hidden flex flex-col items-center justify-center md:items-start md:justify-between min-h-[100px] md:h-48 group hover:scale-[1.02] transition-all duration-300 cursor-pointer ${activeSection === "perfil" ? "ring-2 ring-stone-900 border-transparent shadow-lg" : "border border-stone-100 hover:shadow-md"}`}
        >
          <Icon
            icon="solar:user-bold"
            className={`hidden md:block absolute -bottom-6 -right-6 text-9xl transition-opacity ${activeSection === "perfil" ? "text-stone-900 opacity-10" : "text-stone-900 opacity-5 group-hover:opacity-10"}`}
          />
          <div className="flex justify-center md:justify-between items-start relative z-10 w-full mb-2 md:mb-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors mx-auto md:mx-0 ${activeSection === "perfil" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`}
            >
              <Icon icon="solar:user-linear" className="text-xl" />
            </div>
          </div>
          <div className="relative z-10 text-center md:text-left w-full">
            <p className="text-[11px] md:text-sm font-semibold md:font-normal text-stone-700 md:text-stone-500 md:mb-1 uppercase md:capitalize tracking-wider md:tracking-normal">
              <span className="md:hidden">Perfil</span>
              <span className="hidden md:inline">Perfil e Segurança</span>
            </p>
            <h3 className="hidden md:block text-xl font-display font-bold text-stone-900 mb-3">
              {userInfo.name[0].firstName} {userInfo.name[0].lastName}
            </h3>
            <div
              className={`hidden md:flex text-xs font-medium items-center gap-1 transition ${activeSection === "perfil" ? "text-stone-900" : "text-stone-500 group-hover:text-stone-900"}`}
            >
              Editar perfil
              <Icon icon="solar:alt-arrow-right-linear" />
            </div>
          </div>
        </div>

        {/* Pagamento */}
        <div
          onClick={() => setActiveSection("pagamento")}
          className={`bg-white rounded-2xl p-4 md:p-6 shadow-sm relative overflow-hidden flex flex-col items-center justify-center md:items-start md:justify-between min-h-[100px] md:h-48 group hover:scale-[1.02] transition-all duration-300 cursor-pointer ${activeSection === "pagamento" ? "ring-2 ring-stone-900 border-transparent shadow-lg" : "border border-stone-100 hover:shadow-md"}`}
        >
          <Icon
            icon="solar:wallet-money-bold"
            className={`hidden md:block absolute -bottom-6 -right-6 text-9xl transition-opacity ${activeSection === "pagamento" ? "text-stone-900 opacity-10" : "text-stone-900 opacity-5 group-hover:opacity-10"}`}
          />
          <div className="flex justify-center md:justify-between items-start relative z-10 w-full mb-2 md:mb-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors mx-auto md:mx-0 ${activeSection === "pagamento" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`}
            >
              <Icon icon="solar:wallet-money-linear" className="text-xl" />
            </div>
          </div>
          <div className="relative z-10 text-center md:text-left w-full">
            <p className="text-[11px] md:text-sm font-semibold md:font-normal text-stone-700 md:text-stone-500 md:mb-1 uppercase md:capitalize tracking-wider md:tracking-normal">
              <span className="md:hidden">Pagamento</span>
              <span className="hidden md:inline">Formas de Pagamento</span>
            </p>
            <h3 className="hidden md:block text-xl font-display font-bold text-stone-900 mb-3">
              Meus dados
            </h3>
            <div
              className={`hidden md:flex text-xs font-medium items-center gap-1 transition ${activeSection === "pagamento" ? "text-stone-900" : "text-stone-500 group-hover:text-stone-900"}`}
            >
              Gerenciar
              <Icon icon="solar:alt-arrow-right-linear" />
            </div>
          </div>
        </div>

        {/* Status no Club */}
        <div
          onClick={() => setActiveSection("status")}
          className={`bg-[#1C1C1C] rounded-2xl p-4 md:p-6 shadow-xl relative overflow-hidden flex flex-col items-center justify-center md:items-start md:justify-between min-h-[100px] md:h-48 group hover:scale-[1.02] transition-all duration-300 cursor-pointer ${activeSection === "status" ? "ring-2 ring-white border-transparent" : "border border-transparent hover:border-white/20"}`}
        >
          <Icon
            icon="solar:star-bold"
            className={`hidden md:block absolute -bottom-6 -right-6 text-9xl transition-opacity ${activeSection === "status" ? "text-white opacity-10" : "text-white opacity-5 group-hover:opacity-10"}`}
          />
          <div className="flex justify-center md:justify-between items-center relative z-10 w-full mb-2 md:mb-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors mx-auto md:mx-0 ${activeSection === "status" ? "bg-white text-[#1C1C1C]" : "bg-white/10 text-white backdrop-blur-sm"}`}
            >
              <Icon icon="solar:star-linear" className="text-xl" />
            </div>
            <span className="hidden md:inline-block bg-stone-200 text-stone-600 text-xs font-bold px-3 py-1 rounded-full">
              {userInfo.statusinfo.points} <small>pts</small>
            </span>
          </div>
          <div className="relative z-10 text-center md:text-left w-full">
            <p className="text-[11px] md:text-sm font-semibold md:font-normal text-stone-300 md:text-stone-400 md:mb-1 uppercase md:capitalize tracking-wider md:tracking-normal">
              <span className="md:hidden">Status</span>
              <span className="hidden md:inline">Status no Club</span>
            </p>
            <h3 className="hidden md:block text-2xl font-display font-bold text-white mb-3">
              {userInfo.statusinfo.title}
            </h3>
            <div
              className={`hidden md:flex text-xs font-medium items-center gap-1 transition ${activeSection === "status" ? "text-white" : "text-stone-400 group-hover:text-white"}`}
            >
              Benefícios
              <Icon icon="solar:alt-arrow-right-linear" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM LAYOUT */}
      {activeSection === "compras" && <ComprasSection orders={orders} />}
      {activeSection === "perfil" && <PerfilSection />}
      {activeSection === "pagamento" && <PagamentoSection enderecos={enderecos} />}
      {activeSection === "status" && <StatusSection userInfo={userInfo} />}
    </div>
  );
}

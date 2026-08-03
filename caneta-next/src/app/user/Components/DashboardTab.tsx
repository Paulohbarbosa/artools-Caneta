import React from "react";
import { Icon } from "@iconify/react";

export default function DashboardTab() {
  const orders = [
    {
      id: "#98421-BR",
      date: "14 Out 2023",
      value: "R$ 459,90",
      garantiaType: "Normal",
      status: "ENTREGUE",
      statusColor: "text-emerald-700 bg-emerald-50",
      action: "Detalhes",
    },
    {
      id: "#98399-BR",
      date: "02 Out 2023",
      value: "R$ 1.200,00",
      garantiaType: "Extendida",
      status: "EM TRÂNSITO",
      statusColor: "text-amber-700 bg-amber-50",
      action: "Rastrear",
    },
    {
      id: "#97120-BR",
      date: "15 Set 2023",
      value: "R$ 89,00",
      garantiaType: "Normal",
      status: "ENTREGUE",
      statusColor: "text-emerald-700 bg-emerald-50",
      action: "Recomprar",
    },
  ];
  const userInfo = {
    name: [
      {
        firstName: "Paulo",
        lastName: "Souza",
      },
    ],
    avatar: "https://api.dicebear.com/10.x/miniavs/svg?seed=Aneka",
    status: "Premium Partner",
    points: "12.450 pts",
    garantiainfo: {
      type: "Garantia Estendida",
      dataCompra: "25/08/2025",
      status: "Ativa",
    },
    statusinfo: {
      title: "Diamante",
      status: "Ativa",
      points: "12.450",
    },
  };

  // data de hoje é 03/08/2026, data de compra é 25/08/2025, então faltam 11 meses e 2 dias
  // para calcular isso, subtraia a data de compra da data de hoje
  // e converta o resultado para meses
  function timeRemainingGarantia(date: string, type: string) {
    const [dia, mes, ano] = userInfo.garantiainfo.dataCompra.split("/");
    const dataCompra = new Date(Number(ano), Number(mes) - 1, Number(dia));
    const dataHoje = new Date();
    const diff = dataHoje.getTime() - dataCompra.getTime();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${dias} Dias`;
  }

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

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Garantia */}
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm relative flex flex-col justify-between h-48 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
              <Icon icon="solar:bag-linear" className="text-xl" />
            </div>
            <span className="bg-stone-900 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
              {userInfo.garantiainfo.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-stone-500 mb-1">Histórico de Pedidos</p>
            <h3 className="text-xl font-display font-bold text-stone-900 mb-3">
              {orders.length}
              <span className="ml-2 text-xs text-stone-500">Pedidos</span>
            </h3>
            <button className="text-xs font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1 transition">
              Ver todos os pedidos
              <Icon icon="solar:alt-arrow-right-linear" />
            </button>
          </div>
        </div>

        {/* Pontos */}
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm relative flex flex-col justify-between h-48 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
              <Icon icon="solar:wallet-money-linear" className="text-xl" />
            </div>
            <span className="bg-stone-200 text-stone-600 text-xs font-bold px-3 py-1 rounded-full">
              R$ 1.250,00
            </span>
          </div>
          <div>
            <p className="text-sm text-stone-500 mb-1">Pontos Acumulados</p>
            <h3 className="text-xl font-display font-bold text-stone-900 mb-3">
              12.450 pts
            </h3>
            <button className="text-xs font-medium text-stone-500 hover:text-stone-900 flex items-center gap-1 transition">
              Resgatar agora <Icon icon="solar:alt-arrow-right-linear" />
            </button>
          </div>
        </div>

        {/* Status no Club */}
        <div className="bg-[#1C1C1C] rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-48 group hover:scale-[1.02] transition-transform duration-300">
          <Icon
            icon="solar:star-bold"
            className="absolute -bottom-6 -right-6 text-9xl text-white opacity-5 group-hover:opacity-10 transition-opacity"
          />
          <div className="flex justify-between items-center relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
              <Icon icon="solar:star-linear" className="text-xl" />
            </div>
            <span className="bg-stone-200 text-stone-600 text-xs font-bold px-3 py-1 rounded-full">
              {userInfo.statusinfo.points} <small>pts</small>
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-sm text-stone-400 mb-1">Status no Club</p>
            <h3 className="text-2xl font-display font-bold text-white mb-3">
              {userInfo.statusinfo.title}
            </h3>
            <button className="text-xs font-medium text-stone-400 hover:text-white flex items-center gap-1 transition">
              Benefícios Exclusivos <Icon icon="solar:alt-arrow-right-linear" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Historico de Pedidos */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-100 shadow-sm p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-display font-bold text-stone-900">
              Histórico de Pedidos
            </h2>
            <button className="px-4 py-1.5 border border-stone-200 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50 transition">
              Ver Todos
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-xs font-mono text-stone-400 border-b border-stone-100 uppercase tracking-wider">
                  <th className="pb-4 font-medium">Pedido</th>
                  <th className="pb-4 font-medium">Data</th>
                  <th className="pb-4 font-medium">Valor</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Garantia</th>
                  <th className="pb-4 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="group hover:bg-stone-50/50 transition-colors"
                  >
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500">
                          <Icon icon="solar:bag-3-linear" className="text-lg" />
                        </div>
                        <span className="font-semibold text-stone-900">
                          {order.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 text-stone-500 w-24">
                      <div className="flex flex-col">
                        <span>
                          {order.date.split(" ")[0]} {order.date.split(" ")[1]}
                        </span>
                        <span className="text-xs">
                          {order.date.split(" ")[2]}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 font-semibold text-stone-900">
                      {order.value}
                    </td>
                    <td className="py-5">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${order.statusColor}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-5 text-stone-500">
                      {order.garantiaType}
                    </td>
                    <td className="py-5 text-right">
                      <button className="text-sm font-semibold text-stone-700 hover:text-black transition">
                        {order.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

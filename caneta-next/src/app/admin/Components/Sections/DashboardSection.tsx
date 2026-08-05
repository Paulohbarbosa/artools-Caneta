import React from "react";
import { Icon } from "@iconify/react";

export default function DashboardSection({ orders, pendingOrders, sentOrders, totalSalesToday, lowStockProducts, triggerToast }: any) {
  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-display font-bold mb-1">Bom dia, João Pedro.</h2>
          <p className="text-sm text-stone-500">Aqui está o resumo operacional das últimas 24 horas.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-stone-200 transition" onClick={() => triggerToast("Relatório Geral", "Relatório de vendas exportado com sucesso.", "success")}>
            Exportar Resumo
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-2 hover:border-stone-300 transition">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Pedidos Hoje</span>
            <Icon icon="solar:cart-large-linear" className="text-lg text-stone-500" />
          </div>
          <div className="text-2xl font-bold font-mono">
            {orders.filter((o: any) => o.date === "2026-07-30").length}
          </div>
          <div className="text-[10px] text-emerald-500 font-medium font-mono flex items-center gap-1">
            <Icon icon="solar:arrow-left-up-linear" />
            <span>+12.5% em relação a ontem</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-2 hover:border-stone-300 transition">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Pedidos Pendentes</span>
            <Icon icon="solar:clock-square-linear" className="text-lg text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600">
            {pendingOrders}
          </div>
          <div className="text-[10px] text-stone-500 font-mono">
            Aguardando confirmação bancária
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-2 hover:border-stone-300 transition">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Faturamento Hoje</span>
            <Icon icon="solar:banknote-linear" className="text-lg text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600">
            R$ {totalSalesToday.toFixed(2)}
          </div>
          <div className="text-[10px] text-emerald-500 font-medium font-mono flex items-center gap-1">
            <Icon icon="solar:arrow-left-up-linear" />
            <span>+8.2% acima da meta diária</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-2 hover:border-stone-300 transition">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-medium">Baixo Estoque</span>
            <Icon icon="solar:box-minimalistic-linear" className="text-lg text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-600">
            {lowStockProducts}
          </div>
          <div className="text-[10px] text-rose-600 font-mono">
            Produtos precisam de reposição
          </div>
        </div>
      </div>

      {/* Dashboard Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales progress card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 lg:col-span-2 space-y-6">
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
                <div className="w-full bg-stone-100 hover:bg-stone-200 transition rounded-t-lg relative group flex items-start justify-center" style={{ height: `${(item.val / 130) * 100}%` }}>
                  <div className="absolute -top-8 bg-stone-900 text-white shadow-md text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition font-mono z-10 pointer-events-none whitespace-nowrap">
                    R${(item.val * 35).toFixed(0)}
                  </div>
                  <div className="w-full bg-emerald-500 rounded-t-lg transition duration-300" style={{ height: "4px" }} />
                </div>
                <span className="text-[10px] text-stone-500 font-mono">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Status */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-semibold">Status Operacional</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-stone-500 mb-1">
                <span>Pedidos Expedidos</span>
                <span className="font-mono">{sentOrders}/{orders.length}</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${(sentOrders / orders.length) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-stone-500 mb-1">
                <span>Estoque Abastecido</span>
                <span className="font-mono">80%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-white" style={{ width: "80%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-stone-500 mb-1">
                <span>Faturamento vs Meta Semanal</span>
                <span className="font-mono">R$ 15.420 / R$ 20.000</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: "77.1%" }} />
              </div>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-4 space-y-3">
            <div className="text-xs text-stone-500 font-medium">Alertas Rápidos:</div>
            <div className="flex items-center gap-2 text-xs text-rose-600">
              <Icon icon="solar:danger-bold" className="shrink-0" />
              <span>Produto "Precision Pen Gold Matte" está sem estoque.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-600">
              <Icon icon="solar:bell-bold" className="shrink-0" />
              <span>Existem {pendingOrders} pedidos pendentes de aprovação.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function PagamentosSection({ orders }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-1">
          <span className="text-xs text-stone-500 font-mono">PIX Aprovados</span>
          <div className="text-xl font-bold font-mono text-emerald-600">R$ {orders.filter((o: any) => o.paymentMethod === "PIX" && o.status !== "Cancelado").reduce((acc: any, o: any) => acc + o.value, 0).toFixed(2)}</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-1">
          <span className="text-xs text-stone-500 font-mono">Cartão Aprovados</span>
          <div className="text-xl font-bold font-mono text-emerald-600">R$ {orders.filter((o: any) => o.paymentMethod === "Cartão" && o.status !== "Cancelado").reduce((acc: any, o: any) => acc + o.value, 0).toFixed(2)}</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-1">
          <span className="text-xs text-stone-500 font-mono">Boletos Pendentes</span>
          <div className="text-xl font-bold font-mono text-amber-600">R$ {orders.filter((o: any) => o.paymentMethod === "Boleto" && o.status === "Pendente").reduce((acc: any, o: any) => acc + o.value, 0).toFixed(2)}</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-1">
          <span className="text-xs text-stone-500 font-mono">Total Reembolsos</span>
          <div className="text-xl font-bold font-mono text-stone-500">R$ 0,00</div>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-stone-200 bg-white/[0.01] text-xs font-semibold text-stone-500 uppercase font-mono">Fluxo de Transações</div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500 font-mono uppercase">
              <th className="p-4">Transação</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Método</th>
              <th className="p-4">Valor</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {orders.map((o: any) => (
              <tr key={o.id} className="hover:bg-stone-50 transition">
                <td className="p-4 font-mono text-xs font-semibold text-stone-500">TXN-{o.id}</td>
                <td className="p-4 text-stone-900 font-medium">{o.customerName}</td>
                <td className="p-4 text-stone-500 font-mono text-xs">{o.paymentMethod}</td>
                <td className="p-4 font-mono text-stone-900">R$ {o.value.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    o.status === "Cancelado" ? "bg-rose-500/10 text-rose-600" :
                    o.status === "Pendente" ? "bg-amber-500/10 text-amber-600" :
                    "bg-emerald-500/10 text-emerald-600"
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
  );
}

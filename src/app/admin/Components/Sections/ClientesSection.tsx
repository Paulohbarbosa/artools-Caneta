import React, { useState } from "react";

export default function ClientesSection({ customers, setCustomers, triggerToast }: any) {
  const [customerFilter, setCustomerFilter] = useState({ status: "Todos", search: "" });

  return (
    <div className="space-y-6">
      {/* Header/Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={customerFilter.status}
            onChange={e => setCustomerFilter(prev => ({ ...prev, status: e.target.value }))}
            className="bg-stone-100 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-600 outline-none"
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
            className="bg-stone-100 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder:text-stone-500 outline-none"
          />
        </div>
      </div>

      {/* Table list */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500 font-mono uppercase">
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
                .filter((c: any) => {
                  if (customerFilter.status !== "Todos" && c.status !== customerFilter.status) return false;
                  if (customerFilter.search && !c.name.toLowerCase().includes(customerFilter.search.toLowerCase()) && !c.email.toLowerCase().includes(customerFilter.search.toLowerCase())) return false;
                  return true;
                })
                .map((c: any) => (
                  <tr key={c.id} className="hover:bg-stone-50 transition">
                    <td className="p-4 font-medium text-stone-900">{c.name}</td>
                    <td className="p-4 text-stone-500 font-mono text-xs">{c.email}</td>
                    <td className="p-4 text-stone-600">{c.city}</td>
                    <td className="p-4 font-mono">{c.totalOrders}</td>
                    <td className="p-4 font-mono text-stone-900">R$ {c.totalSpent.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                        c.status === "Ativo" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.status === "Ativo" ? "bg-emerald-400" : "bg-rose-400"}`} />
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          const nextStatus = c.status === "Ativo" ? "Bloqueado" : "Ativo";
                          setCustomers((prev: any) => prev.map((cust: any) => cust.id === c.id ? { ...cust, status: nextStatus } : cust));
                          triggerToast("Status Alterado", `O cliente ${c.name} foi ${nextStatus === "Ativo" ? "desbloqueado" : "bloqueado"}.`, "info");
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                          c.status === "Ativo"
                            ? "bg-rose-950/30 border-rose-500/10 text-rose-600 hover:bg-rose-950"
                            : "bg-emerald-950/30 border-emerald-500/10 text-emerald-600 hover:bg-emerald-950"
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
  );
}

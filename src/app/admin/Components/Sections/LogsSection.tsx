import React, { useState } from "react";

export default function LogsSection({ logs }: any) {
  const [logFilter, setLogFilter] = useState({ module: "Todos", result: "Todos" });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={logFilter.module}
            onChange={e => setLogFilter(prev => ({ ...prev, module: e.target.value }))}
            className="bg-stone-100 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-600 outline-none"
          >
            <option value="Todos">Todos Módulos</option>
            <option value="Autenticação">Autenticação</option>
            <option value="Produtos">Produtos</option>
            <option value="Estoque">Estoque</option>
          </select>

          <select
            value={logFilter.result}
            onChange={e => setLogFilter(prev => ({ ...prev, result: e.target.value }))}
            className="bg-stone-100 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-600 outline-none"
          >
            <option value="Todos">Todos Resultados</option>
            <option value="Sucesso">Sucessos</option>
            <option value="Erro">Erros</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500 font-mono uppercase">
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
                .filter((l: any) => {
                  if (logFilter.module !== "Todos" && l.module !== logFilter.module) return false;
                  if (logFilter.result !== "Todos" && l.result !== logFilter.result) return false;
                  return true;
                })
                .map((l: any) => (
                  <tr key={l.id} className="hover:bg-stone-50 transition">
                    <td className="p-4 text-stone-500">{l.date}</td>
                    <td className="p-4 font-semibold text-stone-900">{l.employee}</td>
                    <td className="p-4 text-stone-600 font-sans text-sm">{l.action}</td>
                    <td className="p-4 text-stone-500">{l.module}</td>
                    <td className="p-4 text-stone-500">{l.ip}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        l.result === "Sucesso" ? "bg-emerald-950/40 text-emerald-600 border border-emerald-500/20" : "bg-rose-950/40 text-rose-600 border border-rose-500/20"
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
  );
}

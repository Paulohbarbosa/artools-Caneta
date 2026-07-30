import React from "react";

export default function OrdersTab() {
  return (
    <div>
      <h2 className="text-3xl font-display font-medium text-stone-900 mb-2">
        Pedidos
      </h2>
      <p className="text-stone-500 mb-8">Histórico de compras e envios.</p>

      <div className="glass-panel rounded-2xl overflow-hidden border border-black/10">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-black/10 text-xs font-mono uppercase tracking-widest text-stone-500">
              <th className="p-4 pl-6">Pedido</th>
              <th className="p-4">Data</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right pr-6">Total</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="hover:bg-white/40 transition-colors">
              <td className="p-4 pl-6 font-mono font-medium">#AR-2026-892</td>
              <td className="p-4">18/07/2026</td>
              <td className="p-4 text-amber-600 font-medium">Em trânsito</td>
              <td className="p-4 text-right pr-6 font-medium">$149.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

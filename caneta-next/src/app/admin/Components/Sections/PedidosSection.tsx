import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function PedidosSection({ orders, setOrders, triggerToast }: any) {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderFilter, setOrderFilter] = useState({ status: "Todos", search: "" });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={orderFilter.status}
            onChange={e => setOrderFilter(prev => ({ ...prev, status: e.target.value }))}
            className="bg-stone-100 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-600 outline-none"
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
            className="bg-stone-100 border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder:text-stone-500 outline-none"
          />
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500 font-mono uppercase">
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
                .filter((o: any) => {
                  if (orderFilter.status !== "Todos" && o.status !== orderFilter.status) return false;
                  if (orderFilter.search && !o.customerName.toLowerCase().includes(orderFilter.search.toLowerCase()) && !o.id.toLowerCase().includes(orderFilter.search.toLowerCase())) return false;
                  return true;
                })
                .map((o: any) => (
                  <tr key={o.id} className="hover:bg-stone-50 transition">
                    <td className="p-4 font-mono text-xs font-semibold text-stone-900">{o.id}</td>
                    <td className="p-4 font-medium text-stone-900">{o.customerName}</td>
                    <td className="p-4 font-mono text-stone-900">R$ {o.value.toFixed(2)}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-white border border-stone-300 shadow-sm rounded text-xs font-mono text-stone-500">{o.paymentMethod}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        o.status === "Aprovado" ? "bg-emerald-500/10 text-emerald-600" :
                        o.status === "Pendente" ? "bg-amber-500/10 text-amber-600" :
                        o.status === "Enviado" ? "bg-blue-500/10 text-blue-400" :
                        o.status === "Cancelado" ? "bg-rose-500/10 text-rose-600" :
                        "bg-stone-200 text-stone-600"
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs text-stone-500">{o.date}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="px-3 py-1 bg-white border border-stone-300 shadow-sm rounded-lg text-xs text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
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
        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-stone-300 z-[9999] shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          <div className="space-y-6 overflow-y-auto pr-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold font-display">Detalhes do Pedido</h3>
                <p className="text-xs text-stone-500 font-mono">{selectedOrder.id}</p>
              </div>
              <button className="text-stone-500 hover:text-stone-900" onClick={() => setSelectedOrder(null)}>
                <Icon icon="solar:close-circle-linear" className="text-xl" />
              </button>
            </div>

            <div className="border-t border-stone-200 pt-4 space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase text-stone-500 mb-1">Cliente</h4>
                <p className="text-sm font-medium text-stone-900">{selectedOrder.customerName}</p>
                <p className="text-xs text-stone-500">Entrega via {selectedOrder.deliveryCompany}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-stone-500 mb-1">Endereço de Envio</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{selectedOrder.address}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-stone-500 mb-2">Itens do Pedido</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center text-xs bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                      <div>
                        <span className="font-semibold text-stone-900">{item.name}</span>
                        <span className="text-stone-500 font-mono ml-2">x{item.qty}</span>
                      </div>
                      <span className="font-mono text-stone-500">R$ {(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-stone-500 mb-1">Resumo Financeiro</h4>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span>R$ {selectedOrder.value.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Frete</span>
                    <span className="text-emerald-600">Grátis</span>
                  </div>
                  <div className="flex justify-between text-stone-900 font-semibold border-t border-stone-200 pt-1.5 text-sm">
                    <span>Total</span>
                    <span>R$ {selectedOrder.value.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-stone-500 mb-1">Status de Entrega</h4>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-xs font-medium text-stone-600">Expedido via {selectedOrder.deliveryCompany}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-4 grid grid-cols-2 gap-2">
            {selectedOrder.status !== "Enviado" && selectedOrder.status !== "Cancelado" && (
              <button
                onClick={() => {
                  setOrders((prev: any) => prev.map((o: any) => o.id === selectedOrder.id ? { ...o, status: "Enviado" } : o));
                  setSelectedOrder((prev: any) => prev ? { ...prev, status: "Enviado" } : null);
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
                  setOrders((prev: any) => prev.map((o: any) => o.id === selectedOrder.id ? { ...o, status: "Cancelado" } : o));
                  setSelectedOrder((prev: any) => prev ? { ...prev, status: "Cancelado" } : null);
                  triggerToast("Pedido Cancelado", "O pedido foi cancelado e devolvido.", "warning");
                }}
                className="w-full py-2.5 rounded-xl bg-rose-950/50 border border-rose-500/20 text-rose-600 text-xs font-semibold hover:bg-rose-950 transition"
              >
                Cancelar Pedido
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

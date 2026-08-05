import React from "react";
import { Icon } from "@iconify/react";

export default function ComprasSection({ orders }: { orders: any[] }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-8">
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

        <div className="w-full mt-4 md:mt-0">
          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
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
                          <Icon
                            icon="solar:bag-3-linear"
                            className="text-lg"
                          />
                        </div>
                        <span className="font-semibold text-stone-900">
                          {order.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 text-stone-500 w-24">
                      <div className="flex flex-col">
                        <span>
                          {order.date.split(" ")[0]}{" "}
                          {order.date.split(" ")[1]}
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

          {/* MOBILE LIST */}
          <div className="flex flex-col gap-4 md:hidden">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-100 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      order.status === "ENTREGUE"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    <Icon icon="solar:bag-3-bold" className="text-2xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-stone-900 text-sm">
                      {order.id}
                    </span>
                    <span className="text-xs text-stone-500 mt-1">
                      {order.date} •{" "}
                      <span className="capitalize">
                        {order.status.toLowerCase()}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`font-bold text-sm ${
                      order.status === "ENTREGUE"
                        ? "text-stone-900"
                        : "text-amber-600"
                    }`}
                  >
                    {order.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

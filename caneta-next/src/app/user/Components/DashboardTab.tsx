import React from "react";
import { Icon } from "@iconify/react";

export default function DashboardTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-medium text-stone-900 mb-2">
          Olá, Paulo
        </h2>
        <p className="text-stone-500 text-sm">
          Bem-vindo à sua área exclusiva de controle.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-40">
          <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
            <Icon icon="solar:box-linear" className="text-xl" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-mono block">
              Último Pedido
            </span>
            <span className="text-lg font-medium text-stone-900 mt-1 block">
              #AR-2026-892
            </span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-40">
          <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
            <Icon icon="solar:shield-check-linear" className="text-xl" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-mono block">
              Garantia
            </span>
            <span className="text-lg font-medium text-emerald-600 mt-1 block">
              Vitalícia Ativa
            </span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-40">
          <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
            <Icon icon="solar:crown-linear" className="text-xl" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-mono block">
              Club Membership
            </span>
            <span className="text-lg font-medium text-stone-900 mt-1 block">
              Creator Club
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

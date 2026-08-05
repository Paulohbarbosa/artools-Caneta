import React from "react";
import { Icon } from "@iconify/react";

export default function RelatoriosSection({ triggerToast }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Options */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
          <h3 className="text-sm font-semibold font-display">Exportação de Dados</h3>
          <p className="text-xs text-stone-500">Gere e baixe arquivos consolidados em múltiplos formatos para fins fiscais e de auditoria.</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => triggerToast("Relatório PDF", "Relatório PDF gerado e iniciado o download.", "success")}
              className="py-3 rounded-xl bg-white border border-stone-300 shadow-sm text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition flex flex-col items-center justify-center gap-2"
            >
              <Icon icon="solar:file-text-linear" className="text-xl text-rose-600" />
              <span className="text-xs font-medium">PDF</span>
            </button>
            <button
              onClick={() => triggerToast("Relatório Excel", "Relatório XLSX gerado e iniciado o download.", "success")}
              className="py-3 rounded-xl bg-white border border-stone-300 shadow-sm text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition flex flex-col items-center justify-center gap-2"
            >
              <Icon icon="solar:document-text-linear" className="text-xl text-emerald-600" />
              <span className="text-xs font-medium">Excel</span>
            </button>
            <button
              onClick={() => triggerToast("Relatório CSV", "Exportação de CSV finalizada com sucesso.", "success")}
              className="py-3 rounded-xl bg-white border border-stone-300 shadow-sm text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition flex flex-col items-center justify-center gap-2"
            >
              <Icon icon="solar:code-file-linear" className="text-xl text-blue-400" />
              <span className="text-xs font-medium">CSV</span>
            </button>
          </div>
        </div>

        {/* Quick stats summary */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
          <h3 className="text-sm font-semibold font-display">Resumo de Performance</h3>
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Ticket Médio</span>
              <span className="text-stone-900">R$ 571,25</span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Conversão de Carrinho</span>
              <span className="text-stone-900">3.4%</span>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Taxa de Rejeição</span>
              <span className="text-stone-900">22%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

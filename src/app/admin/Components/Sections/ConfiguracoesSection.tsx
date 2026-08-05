import React from "react";

export default function ConfiguracoesSection({ triggerToast }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-6">
        <h3 className="text-sm font-semibold font-display">Configurações Gerais do Sistema</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h4 className="text-xs font-semibold">Duplo Fator de Autenticação (2FA)</h4>
              <p className="text-[11px] text-stone-500">Forçar todos os funcionários a autenticar via app autenticador.</p>
            </div>
            <span className="w-9 h-5 bg-emerald-500 rounded-full p-0.5 cursor-pointer flex items-center justify-end">
              <span className="w-4 h-4 bg-white rounded-full" />
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h4 className="text-xs font-semibold">Modo de Manutenção</h4>
              <p className="text-[11px] text-stone-500">Suspende o e-commerce externo para atualizações estruturais.</p>
            </div>
            <span className="w-9 h-5 bg-stone-300 rounded-full p-0.5 cursor-pointer flex items-center justify-start">
              <span className="w-4 h-4 bg-stone-600 rounded-full" />
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold">Backups Diários Automáticos</h4>
              <p className="text-[11px] text-stone-500">Salvar snapshots de transações no bucket Amazon S3 de contingência.</p>
            </div>
            <span className="w-9 h-5 bg-emerald-500 rounded-full p-0.5 cursor-pointer flex items-center justify-end">
              <span className="w-4 h-4 bg-white rounded-full" />
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => triggerToast("Configurações", "Configurações de sistema salvas com sucesso.", "success")}
            className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-stone-200 transition"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";

interface SecurityTabProps {
  showToast: (title: string, message: string) => void;
  handleLogout: () => void;
}

export default function SecurityTab({ showToast, handleLogout }: SecurityTabProps) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-display font-medium text-stone-900 mb-2">
        Segurança
      </h2>
      <p className="text-stone-500 mb-10">Proteja o seu ecossistema.</p>

      <div className="glass-panel rounded-2xl p-8 border border-black/10 mb-6">
        <h3 className="text-lg font-medium text-stone-900 mb-4">
          Alterar Senha
        </h3>
        <div className="space-y-4 mb-6">
          <div className="input-group">
            <input
              type="password"
              id="sec-current"
              className="floating-input"
              placeholder=" "
            />
            <label htmlFor="sec-current" className="floating-label">
              Senha Atual
            </label>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="sec-new"
              className="floating-input"
              placeholder=" "
            />
            <label htmlFor="sec-new" className="floating-label">
              Nova Senha
            </label>
          </div>
        </div>
        <button
          onClick={() =>
            showToast("Segurança", "Senha atualizada com sucesso.")
          }
          className="px-6 py-3 bg-black/5 text-stone-900 rounded-xl text-sm font-medium hover:bg-black/10 transition-colors border border-black/10"
        >
          Atualizar Senha
        </button>
      </div>

      <div className="glass-panel rounded-2xl p-8 border border-black/10 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-stone-900 mb-1">
            Sessões Ativas
          </h3>
          <p className="text-sm text-stone-500">
            Você está logado em 1 dispositivo.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors border border-red-500/20"
        >
          Encerrar Todas
        </button>
      </div>
    </div>
  );
}

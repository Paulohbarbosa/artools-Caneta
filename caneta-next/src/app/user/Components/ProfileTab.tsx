import React from "react";

interface ProfileTabProps {
  handleSaveProfile: (e: React.FormEvent) => void;
}

export default function ProfileTab({ handleSaveProfile }: ProfileTabProps) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-display font-medium text-stone-900 mb-2">
        Perfil
      </h2>
      <p className="text-stone-500 mb-8">
        Atualize suas informações pessoais.
      </p>

      <div className="glass-panel rounded-2xl p-8 border border-black/10">
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="input-group">
            <input
              type="text"
              id="prof-name"
              className="floating-input"
              placeholder=" "
              defaultValue="Paulo"
            />
            <label htmlFor="prof-name" className="floating-label">
              Nome
            </label>
          </div>

          <div className="input-group">
            <input
              type="email"
              id="prof-email"
              className="floating-input"
              placeholder=" "
              defaultValue="paulo@exemplo.com"
            />
            <label htmlFor="prof-email" className="floating-label">
              E-mail
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="input-group">
              <input
                type="tel"
                id="prof-phone"
                className="floating-input"
                placeholder=" "
                defaultValue="(11) 99999-9999"
              />
              <label htmlFor="prof-phone" className="floating-label">
                Telefone
              </label>
            </div>
            <div className="input-group">
              <input
                type="text"
                id="prof-cpf"
                className="floating-input"
                placeholder=" "
                defaultValue="123.456.789-00"
              />
              <label htmlFor="prof-cpf" className="floating-label">
                CPF
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-black/10 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-all shadow-xl"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

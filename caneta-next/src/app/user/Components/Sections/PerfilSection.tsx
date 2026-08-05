import React from "react";

export default function PerfilSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
      {/* Perfil Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-display font-medium text-stone-900 mb-1">
            Perfil
          </h2>
          <p className="text-stone-500 text-sm">
            Atualize suas informações pessoais.
          </p>
        </div>

        <div className="bg-[#F5F5F4] rounded-[1.5rem] p-6 md:p-8 space-y-6">
          <div className="bg-[#EAEAEA] border border-stone-200/60 rounded-xl px-4 py-2.5 transition-colors focus-within:border-stone-400 focus-within:bg-white">
            <label className="block text-[10px] font-semibold tracking-wider text-stone-500 uppercase mb-0.5">
              Nome
            </label>
            <input
              type="text"
              defaultValue="Paulo"
              className="w-full bg-transparent border-none p-0 text-stone-900 focus:ring-0 outline-none text-sm font-medium"
            />
          </div>

          <div className="bg-[#EAEAEA] border border-stone-200/60 rounded-xl px-4 py-2.5 transition-colors focus-within:border-stone-400 focus-within:bg-white">
            <label className="block text-[10px] font-semibold tracking-wider text-stone-500 uppercase mb-0.5">
              E-mail
            </label>
            <input
              type="email"
              defaultValue="paulo@exemplo.com"
              className="w-full bg-transparent border-none p-0 text-stone-900 focus:ring-0 outline-none text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#EAEAEA] border border-stone-200/60 rounded-xl px-4 py-2.5 transition-colors focus-within:border-stone-400 focus-within:bg-white">
              <label className="block text-[10px] font-semibold tracking-wider text-stone-500 uppercase mb-0.5">
                Telefone
              </label>
              <input
                type="text"
                defaultValue="(11) 99999-9999"
                className="w-full bg-transparent border-none p-0 text-stone-900 focus:ring-0 outline-none text-sm font-medium"
              />
            </div>
            <div className="bg-[#EAEAEA] border border-stone-200/60 rounded-xl px-4 py-2.5 transition-colors focus-within:border-stone-400 focus-within:bg-white">
              <label className="block text-[10px] font-semibold tracking-wider text-stone-500 uppercase mb-0.5">
                CPF
              </label>
              <input
                type="text"
                defaultValue="123.456.789-00"
                className="w-full bg-transparent border-none p-0 text-stone-900 focus:ring-0 outline-none text-sm font-medium"
              />
            </div>
          </div>

          <hr className="border-stone-200/80 my-2" />

          <div className="flex justify-end">
            <button className="bg-[#1a1a1a] text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-black transition shadow-lg shadow-stone-900/10">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>

      {/* Segurança Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-display font-medium text-stone-900 mb-1">
            Segurança
          </h2>
          <p className="text-stone-500 text-sm">
            Proteja o seu ecossistema.
          </p>
        </div>

        <div className="space-y-6">
          {/* Alterar Senha Card */}
          <div className="bg-[#F5F5F4] rounded-[1.5rem] p-6 md:p-8 space-y-6">
            <h3 className="text-base font-semibold text-stone-900">
              Alterar Senha
            </h3>

            <div className="space-y-4">
              <div className="bg-[#EAEAEA] border border-stone-200/60 rounded-xl px-4 py-3.5 transition-colors focus-within:border-stone-400 focus-within:bg-white">
                <input
                  type="password"
                  placeholder="Senha Atual"
                  className="w-full bg-transparent border-none p-0 text-stone-900 placeholder:text-stone-500 focus:ring-0 outline-none text-sm font-medium"
                />
              </div>
              <div className="bg-[#EAEAEA] border border-stone-200/60 rounded-xl px-4 py-3.5 transition-colors focus-within:border-stone-400 focus-within:bg-white">
                <input
                  type="password"
                  placeholder="Nova Senha"
                  className="w-full bg-transparent border-none p-0 text-stone-900 placeholder:text-stone-500 focus:ring-0 outline-none text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <button className="bg-stone-200/80 text-stone-800 border border-stone-200 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-stone-300 transition">
                Atualizar Senha
              </button>
            </div>
          </div>

          {/* Sessões Ativas Card */}
          <div className="bg-[#F5F5F4] rounded-[1.5rem] p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-semibold text-stone-900 mb-1">
                Sessões Ativas
              </h3>
              <p className="text-sm text-stone-500">
                Você está logado em 1 dispositivo.
              </p>
            </div>
            <button className="bg-red-50 text-[#ff5a5f] border border-red-100/80 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-red-100 transition whitespace-nowrap">
              Encerrar Todas
            </button>
          </div>
          
          {/* Excluir conta Card */}
          <div className="bg-[#F5F5F4] rounded-[1.5rem] p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-semibold text-stone-900 mb-1">
                Excluir conta
              </h3>
              <p className="text-sm text-stone-500">
                Ao excluir sua conta, você perderá todos os seus dados.
              </p>
            </div>
            <button className="bg-red-50 text-[#ff5a5f] border border-red-100/80 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-red-100 transition whitespace-nowrap">
              Excluir conta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

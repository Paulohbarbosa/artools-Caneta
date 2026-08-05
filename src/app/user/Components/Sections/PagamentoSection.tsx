import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function PagamentoSection({ enderecos }: { enderecos: any[] }) {
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(enderecos[0]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
      {/* Endereço Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-display font-medium text-stone-900 mb-1">
            Endereços
          </h2>
          <p className="text-stone-500 text-sm">
            Gerencie seus locais de entrega.
          </p>
        </div>

        <div className="bg-[#F5F5F4] rounded-[1.5rem] p-6 md:p-8 space-y-6">
          {/* card endereços */}
          <div className="bg-[#EAEAEA] rounded-xl p-6 border border-stone-200/60 relative group hover:border-stone-300 transition-colors">
            <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-stone-400 hover:text-stone-900 transition">
                <Icon icon="solar:pen-linear" className="text-lg" />
              </button>
              <button className="text-stone-400 hover:text-red-500 transition">
                <Icon
                  icon="solar:trash-bin-trash-linear"
                  className="text-lg"
                />
              </button>
            </div>
            <span className="bg-[#1a1a1a] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {enderecoSelecionado.isPrincipal ? "Principal" : ""}
            </span>
            <h4 className="font-semibold text-stone-900 mt-4 mb-2">
              {enderecoSelecionado.nome}
            </h4>
            <p className="text-sm text-stone-500 leading-relaxed">
              {enderecoSelecionado.logradouro}, {enderecoSelecionado.numero}{" "}
              - {enderecoSelecionado.complemento}{" "}
              {enderecoSelecionado.bairro},
              <br />
              {enderecoSelecionado.cidade}- {enderecoSelecionado.estado}.{" "}
              {enderecoSelecionado.cep}
            </p>
          </div>

          <button className="w-full py-4 border-2 border-dashed border-stone-300 rounded-xl text-stone-500 font-medium hover:border-stone-400 hover:text-stone-800 transition flex items-center justify-center gap-2">
            <Icon icon="solar:add-circle-linear" className="text-xl" />
            Adicionar Novo Endereço
          </button>
        </div>
      </div>

      {/* Pagamento Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-display font-medium text-stone-900 mb-1">
            Pagamento
          </h2>
          <p className="text-stone-500 text-sm">
            Gerencie seus cartões e métodos.
          </p>
        </div>

        <div className="bg-[#F5F5F4] rounded-[1.5rem] p-6 md:p-8">
          <div className="bg-[#1C1C1C] rounded-[1.25rem] p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-stone-900/10 group hover:-translate-y-1 transition-transform duration-300">
            <Icon
              icon="solar:card-bold"
              className="absolute -bottom-6 -right-6 text-[10rem] text-white opacity-5"
            />
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className="flex gap-2 relative">
                {/* Master Card overlap circles */}
                <div className="w-8 h-8 bg-red-500/80 rounded-full mix-blend-multiply"></div>
                <div className="w-8 h-8 bg-amber-500/80 rounded-full mix-blend-multiply -ml-4"></div>
              </div>
              <button className="text-white/40 hover:text-red-400 transition">
                <Icon
                  icon="solar:trash-bin-trash-linear"
                  className="text-lg"
                />
              </button>
            </div>
            <div className="relative z-10">
              <p className="text-xl font-mono tracking-widest mb-3">
                **** **** **** 4242
              </p>
              <div className="flex justify-between items-end text-sm text-white/60">
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-0.5">
                    Nome no Cartão
                  </p>
                  <p className="font-medium text-white text-xs">
                    PAULO SOUZA
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-0.5">
                    Validade
                  </p>
                  <p className="font-medium text-white text-xs">12/28</p>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full py-4 border-2 border-dashed border-stone-300 rounded-xl text-stone-500 font-medium hover:border-stone-400 hover:text-stone-800 transition flex items-center justify-center gap-2 mt-6">
            <Icon icon="solar:card-linear" className="text-xl" />
            Adicionar Novo Cartão
          </button>
        </div>
      </div>
    </section>
  );
}

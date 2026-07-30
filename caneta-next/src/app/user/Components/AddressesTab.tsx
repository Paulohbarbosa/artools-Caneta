import React from "react";
import { Icon } from "@iconify/react";

interface AddressesTabProps {
  showToast: (title: string, message: string) => void;
}

export default function AddressesTab({ showToast }: AddressesTabProps) {
  return (
    <div className="text-center py-20">
      <Icon
        icon="solar:map-point-linear"
        className="text-6xl text-stone-600 mb-4 mx-auto"
      />
      <h3 className="text-xl text-stone-900 font-display mb-2">
        Nenhum endereço cadastrado
      </h3>
      <p className="text-stone-500 mb-6">
        Adicione um endereço para facilitar suas futuras compras.
      </p>
      <button
        onClick={() => showToast("Endereço", "Recurso em desenvolvimento.")}
        className="px-6 py-3 bg-black/5 text-stone-900 rounded-xl text-sm font-medium hover:bg-black/10 transition-colors border border-black/10"
      >
        Adicionar Endereço
      </button>
    </div>
  );
}

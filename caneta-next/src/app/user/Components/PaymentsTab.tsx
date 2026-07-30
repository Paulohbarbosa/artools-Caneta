import React from "react";
import { Icon } from "@iconify/react";

interface PaymentsTabProps {
  showToast: (title: string, message: string) => void;
}

export default function PaymentsTab({ showToast }: PaymentsTabProps) {
  return (
    <div className="text-center py-20">
      <Icon
        icon="solar:card-linear"
        className="text-6xl text-stone-600 mb-4 mx-auto"
      />
      <h3 className="text-xl text-stone-900 font-display mb-2">
        Nenhuma forma de pagamento
      </h3>
      <p className="text-stone-500 mb-6">
        Guarde seus cartões de forma criptografada para checkout em 1 clique.
      </p>
      <button
        onClick={() => showToast("Pagamento", "Recurso em desenvolvimento.")}
        className="px-6 py-3 bg-black/5 text-stone-900 rounded-xl text-sm font-medium hover:bg-black/10 transition-colors border border-black/10"
      >
        Adicionar Cartão
      </button>
    </div>
  );
}

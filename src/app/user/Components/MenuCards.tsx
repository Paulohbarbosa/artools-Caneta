import React from "react";
import { Icon } from "@iconify/react";

export interface MenuCardsProps {
  id: "compras" | "perfil" | "pagamento" | "status";
  isActive: boolean;
  setActiveSection: (
    section: "compras" | "perfil" | "pagamento" | "status",
  ) => void;
  stausPontos?: string | number;
  tituloPrincipal: string | number;
  sufixoPrincipal?: string;
  subTitulo: string;
  subTituloResumido: string;
  icon: string;
  isEspecial?: boolean;
}

export default function MenuCards({
  id,
  isActive,
  setActiveSection,
  stausPontos,
  tituloPrincipal,
  sufixoPrincipal,
  subTitulo,
  subTituloResumido,
  icon,
  isEspecial,
}: MenuCardsProps) {
  const bgClass = isEspecial ? "bg-[#1C1C1C]" : "bg-white";

  const activeClasses = isEspecial
    ? "ring-2 ring-white border-transparent"
    : "ring-2 ring-stone-900 border-transparent shadow-lg";

  const inactiveClasses = isEspecial
    ? "border border-transparent hover:border-white/20"
    : "border border-stone-100 hover:shadow-md";

  const ringClass = isActive ? activeClasses : inactiveClasses;

  const iconColorClass = isEspecial
    ? isActive
      ? "text-white opacity-10"
      : "text-white opacity-5 group-hover:opacity-10"
    : isActive
      ? "text-stone-900 opacity-10"
      : "text-stone-900 opacity-5 group-hover:opacity-10";

  const smallIconBgClass = isEspecial
    ? isActive
      ? "bg-white text-[#1C1C1C]"
      : "bg-white/10 text-white backdrop-blur-sm"
    : isActive
      ? "bg-stone-900 text-white"
      : "bg-stone-100 text-stone-700";

  const titleColorClass = isEspecial ? "text-white" : "text-stone-900";

  const subTitleColorClass = isEspecial
    ? "text-stone-300 md:text-stone-400"
    : "text-stone-700 md:text-stone-500";

  return (
    <div
      onClick={() => setActiveSection(id)}
      className={`${bgClass} rounded-2xl p-4 md:p-6 shadow-xl relative overflow-hidden flex flex-col items-center justify-center md:items-start md:justify-between min-h-[100px] md:h-48 group hover:scale-[1.02] transition-all duration-300 cursor-pointer ${ringClass}`}
    >
      <Icon
        icon={icon}
        className={`absolute -bottom-6 -right-6 text-9xl transition-opacity ${iconColorClass}`}
      />
      <div className="flex justify-center md:justify-between items-start md:items-center relative z-10 w-full mb-2 md:mb-0">
        <div
          className={`hidden md:flex w-10 h-10 rounded-full items-center justify-center transition-colors mx-auto md:mx-0 ${smallIconBgClass}`}
        >
          <Icon icon={icon} className="text-xl" />
        </div>
        {stausPontos !== undefined && (
          <span className="hidden md:inline-block bg-stone-200 text-stone-600 text-xs font-bold px-3 py-1 rounded-full">
            {stausPontos} <small>pts</small>
          </span>
        )}
      </div>
      <div className="relative z-10 text-center md:text-left w-full">
        <p
          className={`text-[11px] md:text-sm font-semibold md:font-normal md:mb-1 uppercase md:capitalize tracking-wider md:tracking-normal ${subTitleColorClass}`}
        >
          <span className="md:hidden text-lg font-bold">
            {subTituloResumido}
          </span>
          <span className="hidden md:inline">{subTitulo}</span>
        </p>
        <h3
          className={`hidden md:block text-xl md:text-2xl font-display font-bold mb-3 ${titleColorClass}`}
        >
          {tituloPrincipal}
          {sufixoPrincipal && (
            <span className="ml-2 text-xs text-stone-500">
              {sufixoPrincipal}
            </span>
          )}
        </h3>
      </div>
    </div>
  );
}

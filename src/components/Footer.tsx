import React from "react";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16 reveal-up">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 text-white mb-6">
              <div className="w-7 h-7 bg-white text-stone-900 flex items-center justify-center rounded-sm">
                <Icon icon="solar:pen-bold" />
              </div>
              <span className="font-display font-bold tracking-tight text-xl">
                ARTOOLS
                <span className="text-stone-500 font-light text-[1rem]">
                  .PRO
                </span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              A ferramenta invisível para ideias tangíveis. Redefinindo a
              escrita no século 21.
            </p>
          </div>

          <div>
            <h4 className="text-white font-display font-medium mb-6">
              Produtos
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Precision Pen
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Signature Series
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Refis de Tinta
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Acessórios
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-medium mb-6">
              Suporte
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Garantia Vitalícia
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Envio e Devoluções
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-medium mb-6">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-colors"
              >
                <Icon icon="ri:instagram-line" className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-colors"
              >
                <Icon icon="ri:twitter-x-line" className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-colors"
              >
                <Icon icon="ri:youtube-line" className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono reveal-up delay-200">
          <p>&copy; 2026 Artools. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

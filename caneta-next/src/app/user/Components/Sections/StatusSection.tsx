import React from "react";
import { Icon } from "@iconify/react";

export default function StatusSection({ userInfo }: { userInfo: any }) {
  return (
    <section className="bg-[#1C1C1C] rounded-[1.5rem] p-8 md:p-12 mt-8 text-white flex flex-col items-center justify-center text-center min-h-[300px]">
      <Icon
        icon="solar:star-bold"
        className="text-6xl text-amber-400 mb-6"
      />
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
        Seu Status: {userInfo.statusinfo.title}
      </h2>
      <p className="text-stone-400 max-w-lg text-lg">
        Você tem{" "}
        <strong className="text-white">
          {userInfo.statusinfo.points} pontos
        </strong>
        . Continue acumulando para desbloquear benefícios exclusivos,
        convites vip e ofertas especiais em nosso ecossistema.
      </p>
    </section>
  );
}

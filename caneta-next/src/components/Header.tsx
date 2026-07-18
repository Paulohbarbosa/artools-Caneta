"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 transition-all duration-300 flex justify-between items-center ${
        isScrolled
          ? "bg-[#eaeae5]/70 backdrop-blur-md py-4 shadow-sm"
          : "bg-[#eaeae5] py-6"
      }`}
    >
      <Link
        href="/"
        className="flex items-center gap-3 text-stone-900 cursor-pointer"
      >
        <div className="w-7 h-7 bg-stone-900 text-white flex items-center justify-center rounded-sm">
          <Icon icon="solar:pen-bold" className="text-lg" />
        </div>
        <span className="font-display font-bold tracking-tight text-xl">
          ARTOOLS
          <span className="text-stone-500 font-light text-[1rem]">.PRO</span>
        </span>
      </Link>

      <nav className="hidden md:flex gap-10 text-[10px] font-mono uppercase tracking-[0.15em] text-stone-500">
        <a
          href="#tech-specs"
          className="hover:text-stone-900 transition-colors duration-300"
        >
          Especificações
        </a>
        <a
          href="#design"
          className="hover:text-stone-900 transition-colors duration-300"
        >
          Design
        </a>
        <a
          href="#buy"
          className="hover:text-stone-900 transition-colors duration-300"
        >
          Comprar
        </a>
      </nav>

      <div className="flex items-center gap-6 text-stone-900">
        <Link
          href="/user"
          className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-stone-500 hover:text-stone-900 transition-colors duration-300"
        >
          <Icon icon="solar:user-linear" className="text-lg" />
          Entrar
        </Link>
        <Link
          href="/compra"
          className="hover:text-stone-500 transition-colors duration-300 flex items-center justify-center"
        >
          <Icon icon="solar:bag-3-linear" className="text-xl" />
        </Link>
        <div className="w-[1px] h-4 bg-stone-300 hidden md:block"></div>
      </div>
    </header>
  );
}

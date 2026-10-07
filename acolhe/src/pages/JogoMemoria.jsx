import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import MemoryGame from "@/components/calma/MemoryGame";

export default function JogoMemoria() {
  return (
    <div className="animate-fade-in px-5 pt-3">
      <Link
        to="/calma"
        className="inline-flex w-fit items-center gap-1 rounded-full py-2 pr-3 text-[15px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar
      </Link>

      <h1 className="mt-3 font-display text-[24px] font-semibold tracking-tight text-foreground">
        Memória dos pares
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        Vire duas cartas por vez. Não tem pressa nem placar para bater.
      </p>

      <div className="mt-7">
        <MemoryGame />
      </div>
    </div>
  );
}
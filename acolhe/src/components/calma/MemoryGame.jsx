import React, { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { playBlip } from "@/lib/ambientAudio";
import { cn } from "@/lib/utils";

const PARES = ["🌿", "🌙", "🕊️", "🌊", "🌸", "⭐"];

function montarBaralho() {
  return [...PARES, ...PARES]
    .map((face, index) => ({ key: `${face}-${index}`, face }))
    .sort(() => Math.random() - 0.5);
}

export default function MemoryGame() {
  const [baralho, setBaralho] = useState(montarBaralho);
  const [viradas, setViradas] = useState([]);
  const [encontrados, setEncontrados] = useState([]);
  const [tentativas, setTentativas] = useState(0);

  useEffect(() => {
    if (viradas.length !== 2) return;
    const [primeira, segunda] = viradas.map((index) => baralho[index]);
    setTentativas((total) => total + 1);

    if (primeira.face === segunda.face) {
      setEncontrados((prev) => [...prev, primeira.face]);
      playBlip(880);
      setViradas([]);
      return;
    }
    const timer = setTimeout(() => setViradas([]), 950);
    return () => clearTimeout(timer);
  }, [viradas, baralho]);

  const virar = (index) => {
    if (viradas.length === 2 || viradas.includes(index)) return;
    if (encontrados.includes(baralho[index].face)) return;
    playBlip(560);
    setViradas((prev) => [...prev, index]);
  };

  const reiniciar = () => {
    setBaralho(montarBaralho());
    setViradas([]);
    setEncontrados([]);
    setTentativas(0);
  };

  const ganhou = encontrados.length === PARES.length;

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {baralho.map((carta, index) => {
          const revelada = viradas.includes(index) || encontrados.includes(carta.face);
          const casada = encontrados.includes(carta.face);
          return (
            <button
              key={carta.key}
              type="button"
              onClick={() => virar(index)}
              aria-label={revelada ? carta.face : "Carta virada"}
              className={cn(
                "flex aspect-square items-center justify-center rounded-3xl text-[34px] ring-1 transition-colors duration-500",
                casada
                  ? "bg-emerald-300/15 ring-emerald-300/20"
                  : revelada
                    ? "bg-primary/20 ring-primary/30"
                    : "bg-card ring-white/5"
              )}
            >
              <span
                className={cn(
                  "transition-opacity duration-500",
                  revelada ? "opacity-100" : "opacity-0"
                )}
              >
                {carta.face}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center text-[15px] text-muted-foreground">
        {ganhou
          ? `Você encontrou todos os pares em ${tentativas} tentativas.`
          : `Tentativas: ${tentativas}`}
      </p>

      <button
        type="button"
        onClick={reiniciar}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-3xl bg-primary/15 py-4 font-heading text-[15px] font-semibold text-primary transition-colors duration-300 hover:bg-primary/25"
      >
        <RotateCcw className="h-4 w-4" />
        {ganhou ? "Jogar de novo" : "Embaralhar"}
      </button>
    </div>
  );
}
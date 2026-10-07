import React, { useEffect, useState } from "react";
import { playBlip } from "@/lib/ambientAudio";

const TONS = [
  "from-violet-300/35 to-violet-200/10",
  "from-sky-300/35 to-sky-200/10",
  "from-emerald-200/30 to-emerald-100/10",
  "from-amber-200/30 to-amber-100/10",
];
const TAMANHOS = ["h-14 w-14", "h-16 w-16", "h-20 w-20", "h-24 w-24"];

const sortear = (lista) => lista[Math.floor(Math.random() * lista.length)];

function criarBolha() {
  return {
    id: `${Date.now()}-${Math.random()}`,
    left: Math.round(Math.random() * 66) + 2,
    duration: 10 + Math.random() * 5,
    size: sortear(TAMANHOS),
    tone: sortear(TONS),
  };
}

export default function BubbleGame() {
  const [bolhas, setBolhas] = useState([criarBolha(), criarBolha(), criarBolha()]);
  const [tocadas, setTocadas] = useState(0);

  useEffect(() => {
    const semear = setInterval(() => {
      setBolhas((prev) => (prev.length >= 7 ? prev : [...prev, criarBolha()]));
    }, 1200);
    return () => clearInterval(semear);
  }, []);

  const estourar = (id) => {
    playBlip(480 + Math.random() * 420);
    setTocadas((total) => total + 1);
    setBolhas((prev) => prev.filter((bolha) => bolha.id !== id));
  };

  return (
    <div>
      <div className="relative h-[60vh] overflow-hidden rounded-[32px] bg-gradient-to-b from-sky-400/5 to-violet-400/10 ring-1 ring-white/5">
        {bolhas.map((bolha) => (
          <button
            key={bolha.id}
            type="button"
            aria-label="Estourar bolha"
            onClick={() => estourar(bolha.id)}
            onAnimationEnd={() =>
              setBolhas((prev) => prev.filter((item) => item.id !== bolha.id))
            }
            className={`animate-bubble absolute bottom-[-6rem] rounded-full bg-gradient-to-br ring-1 ring-white/10 ${bolha.tone} ${bolha.size}`}
            style={{ left: `${bolha.left}%`, animationDuration: `${bolha.duration}s` }}
          />
        ))}
      </div>

      <p className="mt-5 text-center text-[15px] text-muted-foreground">
        Bolhas tocadas: {tocadas}
      </p>
      <p className="mt-1 text-center text-[13px] leading-relaxed text-muted-foreground/70">
        Sem tempo, sem erro. Toque só nas que te chamarem.
      </p>
    </div>
  );
}
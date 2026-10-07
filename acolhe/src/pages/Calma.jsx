import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Droplets, LayoutGrid } from "lucide-react";
import SoundscapePlayer from "@/components/calma/SoundscapePlayer";
import TextoLeitura from "@/components/calma/TextoLeitura";
import { paisagensSonoras, textosCalma } from "@/lib/acolheMockData";

const jogos = [
  {
    to: "/calma/memoria",
    titulo: "Memória dos pares",
    descricao: "Encontre os pares iguais. Sem cronômetro, no seu ritmo.",
    Icone: LayoutGrid,
  },
  {
    to: "/calma/bolhas",
    titulo: "Bolhas de luz",
    descricao: "Toque nas bolhas que sobem devagar.",
    Icone: Droplets,
  },
];

export default function Calma() {
  const [textoAberto, setTextoAberto] = useState(null);

  return (
    <div className="animate-fade-in px-5 pt-7">
      <h1 className="font-display text-[26px] font-semibold tracking-tight text-foreground">
        Calma
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        Sons, leituras e jogos leves para atravessar este momento.
      </p>

      <h2 className="mt-8 font-heading text-lg font-semibold text-foreground">
        Paisagens sonoras
      </h2>
      <SoundscapePlayer paisagens={paisagensSonoras} />

      <h2 className="mt-9 font-heading text-lg font-semibold text-foreground">
        Textos que acalmam
      </h2>
      <div className="mt-3 space-y-3">
        {textosCalma.map((texto) => (
          <button
            key={texto.id}
            type="button"
            onClick={() => setTextoAberto(texto)}
            className="w-full rounded-3xl bg-card p-5 text-left ring-1 ring-white/5 transition-colors duration-300 hover:ring-white/10"
          >
            <span className="text-[11px] uppercase tracking-wider text-primary/80">
              {texto.tema}
            </span>
            <h3 className="mt-1.5 font-heading text-[17px] font-semibold text-foreground">
              {texto.titulo}
            </h3>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
              {texto.resumo}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 font-heading text-[14px] font-semibold text-primary">
              Ler agora
              <ChevronRight className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      <h2 className="mt-9 font-heading text-lg font-semibold text-foreground">
        Jogos de distração
      </h2>
      <div className="mt-3 space-y-3">
        {jogos.map(({ to, titulo, descricao, Icone }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-4 rounded-3xl bg-card p-5 ring-1 ring-white/5 transition-colors duration-300 hover:ring-white/10"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-300/12 text-sky-100/90">
              <Icone className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-heading text-[16px] font-semibold text-foreground">
                {titulo}
              </span>
              <span className="mt-0.5 block text-[14px] leading-snug text-muted-foreground">
                {descricao}
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <p className="mt-10 text-center text-[14px] leading-relaxed text-muted-foreground/70">
        Se a angústia apertar, o SOS fica sempre ali em cima.
      </p>

      <TextoLeitura texto={textoAberto} onClose={() => setTextoAberto(null)} />
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { CloudRain, Moon, Music, Pause, Play, Waves } from "lucide-react";
import { playPaisagem, stopPaisagem } from "@/lib/ambientAudio";
import { cn } from "@/lib/utils";

const ICONES = { chuva: CloudRain, mar: Waves, ninar: Moon, acalanto: Music };

export default function SoundscapePlayer({ paisagens }) {
  const [tocando, setTocando] = useState(null);

  useEffect(() => () => stopPaisagem(), []);

  const alternar = (id) => {
    if (tocando === id) {
      stopPaisagem();
      setTocando(null);
      return;
    }
    if (playPaisagem(id)) setTocando(id);
  };

  return (
    <div className="mt-3 space-y-3">
      {paisagens.map((paisagem) => {
        const Icone = ICONES[paisagem.id] || Music;
        const ativa = tocando === paisagem.id;
        return (
          <button
            key={paisagem.id}
            type="button"
            onClick={() => alternar(paisagem.id)}
            className={cn(
              "flex w-full items-center gap-4 rounded-3xl p-4 text-left ring-1 transition-colors duration-500",
              ativa ? "bg-primary/15 ring-primary/30" : "bg-card ring-white/5"
            )}
          >
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors duration-500",
                ativa ? "bg-primary/25 text-primary" : "bg-secondary/70 text-muted-foreground"
              )}
            >
              <Icone className="h-5 w-5" strokeWidth={2} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block font-heading text-[16px] font-semibold text-foreground">
                {paisagem.nome}
              </span>
              <span className="mt-0.5 block text-[14px] leading-snug text-muted-foreground">
                {ativa ? "Tocando agora..." : paisagem.descricao}
              </span>
            </span>

            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                ativa ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/80"
              )}
            >
              {ativa ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </span>
          </button>
        );
      })}
      <p className="pt-1 text-[13px] leading-relaxed text-muted-foreground/70">
        Som gerado no próprio aparelho. Se puder, use fones de ouvido.
      </p>
    </div>
  );
}
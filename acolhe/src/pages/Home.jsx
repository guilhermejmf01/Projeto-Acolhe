import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Hand, Wind } from "lucide-react";
import DiarioDialog from "@/components/DiarioDialog";
import { lerDesabafos } from "@/lib/diarioLocal";

export default function Home() {
  const [diarioOpen, setDiarioOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const countEntries = () => {
    setTotal(lerDesabafos().length);
  };

  useEffect(() => {
    countEntries();
  }, []);

  return (
    <div className="animate-fade-in px-5 pt-7">
      <p className="font-heading text-[15px] font-medium text-primary">
        Que bom que você está aqui hoje.
      </p>
      <h1 className="mt-2 font-display text-[27px] font-semibold leading-tight tracking-tight text-foreground">
        Como está se sentindo agora?
      </h1>
      <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
        Sem pressa. Escolha o que fizer bem para você neste momento.
      </p>

      <Link
        to="/respirar"
        className="mt-7 block rounded-[30px] bg-gradient-to-br from-violet-400/25 via-violet-300/12 to-sky-300/10 p-6 ring-1 ring-violet-300/20 transition-transform duration-500 active:scale-[0.98]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-200/15 text-violet-100">
          <Wind className="h-6 w-6" strokeWidth={2} />
        </span>
        <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-foreground">
          Respirar Agora
        </h2>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
          Ciclos de 4 · 7 · 8 para o corpo desacelerar.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 font-heading text-[15px] font-semibold text-primary">
          Começar
          <ChevronRight className="h-4 w-4" />
        </span>
      </Link>

      <Link
        to="/ancoragem"
        className="mt-4 block rounded-[30px] bg-gradient-to-br from-sky-300/15 to-emerald-200/10 p-6 ring-1 ring-sky-300/15 transition-transform duration-500 active:scale-[0.98]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-200/15 text-sky-100/90">
          <Hand className="h-6 w-6" strokeWidth={2} />
        </span>
        <h2 className="mt-5 font-heading text-xl font-semibold tracking-tight text-foreground">
          Ancoragem 5-4-3-2-1
        </h2>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
          Cinco sentidos para voltar ao agora.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 font-heading text-[15px] font-semibold text-primary">
          Começar
          <ChevronRight className="h-4 w-4" />
        </span>
      </Link>

      <button
        type="button"
        onClick={() => setDiarioOpen(true)}
        className="mt-4 w-full rounded-[30px] bg-card p-6 text-left ring-1 ring-white/5 transition-transform duration-500 active:scale-[0.98]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-200/10 text-emerald-100/90">
          <BookOpen className="h-6 w-6" strokeWidth={2} />
        </span>
        <h2 className="mt-5 font-heading text-xl font-semibold tracking-tight text-foreground">
          Diário de Desabafo
        </h2>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
          Escreva só para você. Some em 24 horas.
        </p>
        <span className="mt-4 flex items-center justify-between">
          <span className="font-heading text-[15px] font-semibold text-primary">
            Escrever agora
          </span>
          {total > 0 && (
            <span className="text-[13px] text-muted-foreground/80">
              {total} {total === 1 ? "guardado" : "guardados"}
            </span>
          )}
        </span>
      </button>

      <p className="mt-10 text-center text-[14px] leading-relaxed text-muted-foreground/70">
        Você não precisa passar por isso sozinho.
      </p>

      <DiarioDialog
        open={diarioOpen}
        onClose={() => setDiarioOpen(false)}
        onSaved={countEntries}
      />
    </div>
  );
}
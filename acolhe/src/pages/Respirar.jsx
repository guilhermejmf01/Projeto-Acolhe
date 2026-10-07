import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const FASES = [
  { key: "inspire", label: "Inspire...", seconds: 4, scale: 1, vibra: 70 },
  { key: "segure", label: "Segure...", seconds: 7, scale: 1, vibra: [30, 90, 30] },
  { key: "expire", label: "Expire...", seconds: 8, scale: 0.6, vibra: [60, 140, 60] },
];

const temVibracao =
  typeof navigator !== "undefined" &&
  typeof navigator.vibrate === "function" &&
  window.matchMedia?.("(pointer: coarse)")?.matches === true;

export default function Respirar() {
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(FASES[0].seconds);
  const [started, setStarted] = useState(false);
  const phase = FASES[index];

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    navigator.vibrate?.(FASES[index].vibra);
    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % FASES.length);
    }, FASES[index].seconds * 1000);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    setRemaining(FASES[index].seconds);
    const ticker = setInterval(() => {
      setRemaining((value) => (value > 1 ? value - 1 : 1));
    }, 1000);
    return () => clearInterval(ticker);
  }, [index]);

  const scale = started ? phase.scale : 0.6;

  return (
    <div className="animate-fade-in flex min-h-[78vh] flex-col px-5 pt-3">
      <Link
        to="/"
        className="inline-flex w-fit items-center gap-1 rounded-full py-2 pr-3 text-[15px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar
      </Link>

      <div className="flex flex-1 flex-col items-center justify-center pb-8">
        <p className="mb-12 text-[12px] uppercase tracking-[0.3em] text-muted-foreground/60">
          Técnica 4 · 7 · 8
        </p>

        <div className="relative flex h-64 w-64 items-center justify-center">
          <div
            className="absolute inset-8 rounded-full bg-primary/25 blur-3xl transition-transform ease-in-out"
            style={{ transform: `scale(${scale})`, transitionDuration: `${phase.seconds}s` }}
          />
          <div
            className="relative flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-300/25 to-sky-300/15 shadow-[0_0_90px_-25px_rgba(167,139,250,0.6)] transition-transform ease-in-out"
            style={{ transform: `scale(${scale})`, transitionDuration: `${phase.seconds}s` }}
          >
            <span className="font-heading text-3xl font-semibold text-foreground/85">
              {remaining}
            </span>
          </div>
        </div>

        <h1
          key={phase.key}
          className="animate-fade-in mt-14 font-display text-4xl font-semibold tracking-tight text-foreground"
        >
          {phase.label}
        </h1>
        <p className="mt-3 max-w-[15rem] text-center text-[15px] leading-relaxed text-muted-foreground">
          Acompanhe o círculo com a sua respiração.
        </p>
        {temVibracao && (
          <p className="mt-2 text-[12.5px] text-muted-foreground/60">
            O celular vibra a cada mudança de fase.
          </p>
        )}
      </div>
    </div>
  );
}
import React from "react";

export default function PassoAncoragem({ passo, indice, total, valores, onValor, onContinuar, onVoltar }) {
  const preenchido = valores.some((valor) => valor.trim().length > 0);

  return (
    <div className="animate-fade-in">
      <p className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground/60">
        Passo {indice + 1} de {total}
      </p>

      <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight tracking-tight text-foreground">
        {passo.titulo}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{passo.ajuda}</p>

      <div className="mt-6 space-y-3">
        {valores.map((valor, posicao) => (
          <input
            key={posicao}
            value={valor}
            onChange={(event) => onValor(posicao, event.target.value)}
            placeholder={`${posicao + 1}. ${passo.exemplo}`}
            aria-label={`${passo.titulo} — item ${posicao + 1}`}
            className="h-14 w-full rounded-2xl bg-card px-4 text-[16px] text-foreground outline-none ring-1 ring-white/5 transition-colors duration-300 placeholder:text-muted-foreground/50 focus:ring-primary/40"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onContinuar}
        disabled={!preenchido}
        className="mt-6 h-14 w-full rounded-2xl bg-primary font-heading text-base font-semibold text-primary-foreground transition-opacity duration-300 disabled:opacity-40"
      >
        Continuar
      </button>

      {indice > 0 && (
        <button
          type="button"
          onClick={onVoltar}
          className="mt-3 w-full rounded-full py-3 text-[15px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          Voltar um passo
        </button>
      )}

      <p className="mt-4 text-center text-[13px] leading-relaxed text-muted-foreground/60">
        Você também pode parar por aqui. Só o que conseguir já ajuda.
      </p>
    </div>
  );
}
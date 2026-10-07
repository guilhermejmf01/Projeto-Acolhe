import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Waves } from "lucide-react";
import PassoAncoragem from "@/components/ancoragem/PassoAncoragem";

const PASSOS = [
  {
    titulo: "5 coisas que você pode ver",
    ajuda: "Olhe ao redor bem devagar e nomeie o que está aí.",
    exemplo: "a luminária do quarto",
    quantidade: 5,
  },
  {
    titulo: "4 coisas que você pode tocar",
    ajuda: "Encoste a mão e descreva a textura.",
    exemplo: "o tecido da minha blusa",
    quantidade: 4,
  },
  {
    titulo: "3 coisas que você pode ouvir",
    ajuda: "Escute o mais longe que conseguir.",
    exemplo: "o barulho do ventilador",
    quantidade: 3,
  },
  {
    titulo: "2 cheiros que você pode sentir",
    ajuda: "Se não sentir nenhum agora, lembre de um cheiro bom.",
    exemplo: "o sabonete do banheiro",
    quantidade: 2,
  },
  {
    titulo: "1 coisa boa sobre você hoje",
    ajuda: "Pode ser bem pequena. Só uma.",
    exemplo: "eu pedi ajuda hoje",
    quantidade: 1,
  },
];

const RESPOSTAS_VAZIAS = PASSOS.map((passo) => Array(passo.quantidade).fill(""));

export default function Ancoragem() {
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState(RESPOSTAS_VAZIAS);
  const [concluido, setConcluido] = useState(false);

  const registrar = (posicao, valor) => {
    setRespostas((prev) =>
      prev.map((linha, i) =>
        i === indice ? linha.map((item, j) => (j === posicao ? valor : item)) : linha
      )
    );
  };

  const continuar = () => {
    if (indice === PASSOS.length - 1) {
      setConcluido(true);
      return;
    }
    setIndice((atual) => atual + 1);
  };

  const refazer = () => {
    setRespostas(RESPOSTAS_VAZIAS);
    setIndice(0);
    setConcluido(false);
  };

  return (
    <div className="animate-fade-in px-5 pt-3">
      <Link
        to="/"
        className="inline-flex w-fit items-center gap-1 rounded-full py-2 pr-3 text-[15px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar
      </Link>

      <h1 className="mt-3 font-display text-[24px] font-semibold tracking-tight text-foreground">
        Ancoragem 5-4-3-2-1
      </h1>

      <div className="mt-6">
        {concluido ? (
          <div className="animate-fade-in">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-200/15 text-sky-100/90">
              <Waves className="h-6 w-6" strokeWidth={2} />
            </span>
            <h2 className="mt-5 font-display text-[24px] font-semibold leading-tight text-foreground">
              Você voltou para o agora
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Repare como o corpo está neste instante. A dor não sumiu, mas você conseguiu se
              ancorar no que existe de verdade ao seu redor — e isso é seu.
            </p>

            <div className="mt-6 space-y-3">
              {PASSOS.map((passo, i) => {
                const itens = respostas[i].filter((valor) => valor.trim());
                if (!itens.length) return null;
                return (
                  <div key={passo.titulo} className="rounded-3xl bg-card p-5 ring-1 ring-white/5">
                    <p className="text-[12px] uppercase tracking-wider text-primary/80">
                      {passo.titulo}
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {itens.map((item, j) => (
                        <li key={j} className="text-[15px] leading-relaxed text-foreground/85">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={refazer}
              className="mt-6 h-14 w-full rounded-2xl bg-primary/15 font-heading text-base font-semibold text-primary transition-colors duration-300 hover:bg-primary/25"
            >
              Refazer a ancoragem
            </button>
            <Link
              to="/"
              className="mt-3 block w-full rounded-2xl bg-secondary py-4 text-center font-heading text-[15px] font-semibold text-foreground/85"
            >
              Voltar ao início
            </Link>
          </div>
        ) : (
          <PassoAncoragem
            passo={PASSOS[indice]}
            indice={indice}
            total={PASSOS.length}
            valores={respostas[indice]}
            onValor={registrar}
            onContinuar={continuar}
            onVoltar={() => setIndice((atual) => atual - 1)}
          />
        )}
      </div>
    </div>
  );
}
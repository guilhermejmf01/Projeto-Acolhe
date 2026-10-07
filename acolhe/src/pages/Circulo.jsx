import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, MessageCircle, Trash2 } from "lucide-react";
import {
  LIMITE_CONTATOS,
  MENSAGEM_PADRAO,
  lerContatos,
  salvarContatos,
} from "@/lib/circuloConfianca";

export default function Circulo() {
  const [contatos, setContatos] = useState(lerContatos);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const cheio = contatos.length >= LIMITE_CONTATOS;

  const adicionar = (event) => {
    event.preventDefault();
    if (cheio || !nome.trim() || !telefone.trim()) return;

    const lista = [
      ...contatos,
      { id: `c-${Date.now()}`, nome: nome.trim(), telefone: telefone.trim() },
    ];
    setContatos(lista);
    salvarContatos(lista);
    setNome("");
    setTelefone("");
  };

  const remover = (id) => {
    const lista = contatos.filter((contato) => contato.id !== id);
    setContatos(lista);
    salvarContatos(lista);
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
        Círculo de Confiança
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        Escolha até {LIMITE_CONTATOS} pessoas em quem você confia. Elas aparecem no botão SOS, com
        um toque para avisar que você precisa de apoio.
      </p>

      <div className="mt-6 space-y-3">
        {contatos.map((contato) => (
          <div
            key={contato.id}
            className="flex items-center gap-3 rounded-3xl bg-card p-4 ring-1 ring-white/5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 font-heading text-[16px] font-semibold text-primary">
              {contato.nome.charAt(0).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-heading text-[16px] font-semibold text-foreground">
                {contato.nome}
              </span>
              <span className="mt-0.5 block text-[13.5px] text-muted-foreground">
                {contato.telefone}
              </span>
            </span>
            <button
              type="button"
              onClick={() => remover(contato.id)}
              aria-label={`Remover ${contato.nome}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {!cheio && (
        <form onSubmit={adicionar} className="mt-5 rounded-3xl bg-card p-5 ring-1 ring-white/5">
          <h2 className="font-heading text-[16px] font-semibold text-foreground">
            Nova pessoa de confiança
          </h2>
          <input
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Nome (ex: Mãe, João, Dra. Ana)"
            aria-label="Nome do contato"
            className="mt-4 h-14 w-full rounded-2xl bg-secondary/60 px-4 text-[16px] text-foreground outline-none ring-1 ring-white/5 transition-colors duration-300 placeholder:text-muted-foreground/50 focus:ring-primary/40"
          />
          <input
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            inputMode="tel"
            placeholder="Telefone com DDD"
            aria-label="Telefone do contato"
            className="mt-3 h-14 w-full rounded-2xl bg-secondary/60 px-4 text-[16px] text-foreground outline-none ring-1 ring-white/5 transition-colors duration-300 placeholder:text-muted-foreground/50 focus:ring-primary/40"
          />
          <button
            type="submit"
            disabled={!nome.trim() || !telefone.trim()}
            className="mt-4 h-14 w-full rounded-2xl bg-primary font-heading text-base font-semibold text-primary-foreground transition-opacity duration-300 disabled:opacity-40"
          >
            Adicionar ao círculo
          </button>
        </form>
      )}

      <div className="mt-5 rounded-3xl bg-emerald-300/10 p-5 ring-1 ring-emerald-300/15">
        <p className="flex items-center gap-2 font-heading text-[15px] font-semibold text-emerald-100/90">
          <MessageCircle className="h-4 w-4" />
          A mensagem enviada
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">“{MENSAGEM_PADRAO}”</p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground/70">
          Neste protótipo, o Acolhe abre o WhatsApp ou o SMS com a mensagem já escrita — você só
          confirma o envio. Seus contatos ficam salvos apenas neste aparelho.
        </p>
      </div>
    </div>
  );
}
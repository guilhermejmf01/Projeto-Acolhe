import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, ShieldAlert, UserPlus } from "lucide-react";
import { lerContatos } from "@/lib/circuloConfianca";

export default function AvisoRisco({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [open]);

  const contatos = open ? lerContatos() : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Cuidado imediato"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-[#0b1020]/97 backdrop-blur-md"
        >
          <div className="mx-auto w-full max-w-[430px] px-6 py-12">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
              <ShieldAlert className="h-7 w-7" strokeWidth={2.1} />
            </span>

            <h2 className="mt-7 font-display text-[27px] font-semibold leading-tight tracking-tight text-foreground">
              O que você escreveu soa muito pesado.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              Você não precisa segurar isso sozinho agora. Falar com alguém neste momento pode
              aliviar um pouco o peso.
            </p>

            <a
              href="tel:188"
              className="mt-8 flex items-center justify-center gap-2.5 rounded-3xl bg-amber-400 px-6 py-5 font-heading text-lg font-bold text-slate-900 transition-colors duration-300 hover:bg-amber-300"
            >
              <Phone className="h-5 w-5" strokeWidth={2.4} />
              Ligar 188 — CVV
            </a>
            <a
              href="tel:192"
              className="mt-3 flex items-center justify-center gap-2.5 rounded-3xl bg-sky-300/15 px-6 py-4 font-heading text-base font-semibold text-sky-100/90 transition-colors duration-300 hover:bg-sky-300/25"
            >
              <Phone className="h-5 w-5" strokeWidth={2.2} />
              Ligar 192 — SAMU
            </a>

            {contatos.length > 0 && (
              <div className="mt-6 space-y-2">
                <p className="text-[13px] uppercase tracking-wider text-muted-foreground/70">
                  Seu círculo de confiança
                </p>
                {contatos.map((contato) => (
                  <a
                    key={contato.id}
                    href={`https://wa.me/${String(contato.telefone).replace(/\D/g, "")}?text=${encodeURIComponent(
                      "Não estou me sentindo bem agora e preciso de apoio. Você pode falar comigo?"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl bg-card px-4 py-3.5 ring-1 ring-white/5 transition-colors duration-300 hover:ring-white/10"
                  >
                    <span className="font-heading text-[15px] font-semibold text-foreground">
                      {contato.nome}
                    </span>
                    <MessageCircle className="h-4 w-4 text-emerald-200/80" />
                  </a>
                ))}
              </div>
            )}

            <Link
              to="/circulo"
              onClick={onClose}
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-secondary py-3.5 text-[14.5px] font-medium text-foreground/85"
            >
              <UserPlus className="h-4 w-4" />
              {contatos.length ? "Editar círculo de confiança" : "Cadastrar pessoas de confiança"}
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-full py-3 text-[15px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Continuar escrevendo
            </button>

            <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground/60">
              Esta leitura é automática e feita só de palavras-chave, no seu aparelho: nada do que
              você escreveu saiu daqui. Se o aviso não fizer sentido, siga em frente sem culpa.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, UserPlus, X } from "lucide-react";
import { lerContatos, linkSms, linkWhatsapp, MENSAGEM_PADRAO } from "@/lib/circuloConfianca";

export default function SosModal({ open, onClose }) {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    if (open) setContatos(lerContatos());
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Ajuda imediata"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0b1020]/97 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-foreground/70 transition-colors duration-300 hover:bg-white/10 hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mx-auto w-full max-w-[430px] px-6 py-16">
            <p className="text-center text-[15px] leading-relaxed text-muted-foreground">
              Você não precisa passar por isso sozinho. Fale com alguém agora.
            </p>

            <a
              href="tel:188"
              className="mt-8 block rounded-3xl bg-amber-400 px-6 py-6 text-center transition-colors duration-300 hover:bg-amber-300"
            >
              <span className="flex items-center justify-center gap-2.5 font-heading text-3xl font-bold text-slate-900">
                <Phone className="h-7 w-7" strokeWidth={2.4} />
                Ligar 188
              </span>
              <span className="mt-1.5 block text-[14.5px] font-medium text-slate-900/75">
                CVV — Centro de Valorização da Vida · 24 horas
              </span>
            </a>

            <a
              href="tel:192"
              className="mt-3 block rounded-3xl bg-sky-300/15 px-6 py-5 text-center ring-1 ring-sky-300/20 transition-colors duration-300 hover:bg-sky-300/25"
            >
              <span className="flex items-center justify-center gap-2.5 font-heading text-2xl font-semibold text-sky-50">
                <Phone className="h-6 w-6" strokeWidth={2.3} />
                Ligar 192
              </span>
              <span className="mt-1 block text-[14px] text-foreground/70">
                SAMU — emergência médica
              </span>
            </a>

            <h2 className="mt-9 font-heading text-lg font-semibold text-foreground">
              Círculo de Confiança
            </h2>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
              Pessoas que você autoriza a saber quando não está bem.
            </p>

            <div className="mt-4 space-y-3">
              {contatos.map((contato) => (
                <div key={contato.id} className="rounded-3xl bg-card p-4 ring-1 ring-white/5">
                  <p className="font-heading text-[16px] font-semibold text-foreground">
                    {contato.nome}
                  </p>
                  <p className="mt-0.5 text-[13.5px] text-muted-foreground">{contato.telefone}</p>
                  <div className="mt-3 flex gap-2">
                    <a
                      href={linkWhatsapp(contato.telefone)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-300/15 py-3 font-heading text-[14.5px] font-semibold text-emerald-100 transition-colors duration-300 hover:bg-emerald-300/25"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <a
                      href={linkSms(contato.telefone)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary py-3 font-heading text-[14.5px] font-semibold text-foreground/85 transition-colors duration-300 hover:bg-secondary/70"
                    >
                      <Phone className="h-4 w-4" />
                      SMS
                    </a>
                  </div>
                </div>
              ))}

              {contatos.length === 0 && (
                <p className="rounded-3xl bg-card p-4 text-[14.5px] leading-relaxed text-muted-foreground ring-1 ring-white/5">
                  Você ainda não cadastrou ninguém. Pode escolher até 3 pessoas de confiança.
                </p>
              )}
            </div>

            <Link
              to="/circulo"
              onClick={onClose}
              className="mt-4 flex items-center justify-center gap-2 rounded-3xl bg-primary/15 py-4 font-heading text-[15px] font-semibold text-primary transition-colors duration-300 hover:bg-primary/25"
            >
              <UserPlus className="h-4 w-4" />
              {contatos.length ? "Gerenciar contatos" : "Cadastrar contatos"}
            </Link>

            {contatos.length > 0 && (
              <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground/60">
                A mensagem já vai escrita: “{MENSAGEM_PADRAO}” — você só toca em enviar.
              </p>
            )}

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full py-3 text-[15px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Voltar para o app
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
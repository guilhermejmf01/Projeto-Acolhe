import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, ShieldCheck } from "lucide-react";

const CHAVE = "acolhe_termos";

function precisaAceitar() {
  try {
    return localStorage.getItem(CHAVE) !== "ok";
  } catch {
    return true;
  }
}

export default function OnboardingTermos() {
  const [visivel, setVisivel] = useState(precisaAceitar);

  const aceitar = () => {
    try {
      localStorage.setItem(CHAVE, "ok");
    } catch {
      /* segue sem gravar */
    }
    setVisivel(false);
  };

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Bem-vindo ao Acolhe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-[#0b1020]/98 backdrop-blur-md"
        >
          <div className="mx-auto flex min-h-full w-full max-w-[430px] flex-col justify-center px-6 py-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <ShieldCheck className="h-7 w-7" strokeWidth={2.1} />
            </span>

            <h1 className="mt-6 font-display text-[30px] font-semibold leading-tight tracking-tight text-foreground">
              Bem-vindo ao Acolhe
            </h1>
            <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">
              Um espaço para respirar, desabafar e ser ouvido — de madrugada, quando for preciso.
            </p>

            <div className="mt-7 rounded-3xl bg-amber-400/10 p-5 ring-1 ring-amber-300/20">
              <p className="font-heading text-[17px] font-semibold leading-snug text-amber-100">
                Não somos um serviço médico.
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">
                Se a sua vida estiver em perigo imediato, ligue 192 (SAMU) ou 188 (CVV). O botão SOS
                fica sempre no alto da tela.
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href="tel:188"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-amber-400 py-3.5 font-heading text-[15px] font-bold text-slate-900"
                >
                  <Phone className="h-4 w-4" strokeWidth={2.4} />
                  188 · CVV
                </a>
                <a
                  href="tel:192"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary py-3.5 font-heading text-[15px] font-semibold text-foreground/90"
                >
                  <Phone className="h-4 w-4" strokeWidth={2.2} />
                  192 · SAMU
                </a>
              </div>
            </div>

            <ul className="mt-7 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
              <li>Você pode usar tudo sem se identificar. Ninguém precisa saber quem você é.</li>
              <li>
                Neste protótipo, o seu diário e o seu círculo de confiança ficam salvos apenas neste
                aparelho — não vão para nenhum servidor.
              </li>
              <li>Você pode sair a qualquer momento, sem explicação.</li>
            </ul>

            <button
              type="button"
              onClick={aceitar}
              className="mt-9 h-15 w-full rounded-3xl bg-primary py-5 font-heading text-[17px] font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
            >
              Entendi, quero continuar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
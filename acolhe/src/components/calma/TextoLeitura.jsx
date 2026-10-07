import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export default function TextoLeitura({ texto, onClose }) {
  useEffect(() => {
    if (!texto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [texto]);

  return (
    <AnimatePresence>
      {texto && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={texto.titulo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0b1020]/98 backdrop-blur-md"
        >
          <div className="mx-auto w-full max-w-[430px] px-7 pb-16 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 rounded-full py-2 pr-3 text-[15px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </button>

            <p className="mt-7 text-[11px] uppercase tracking-[0.25em] text-primary/80">
              {texto.tema}
            </p>
            <h2 className="mt-3 font-display text-[30px] font-semibold leading-tight tracking-tight text-foreground">
              {texto.titulo}
            </h2>

            <div className="mt-7 space-y-5">
              {texto.paragrafos.map((paragrafo, index) => (
                <p key={index} className="text-[18px] leading-[1.75] text-foreground/85">
                  {paragrafo}
                </p>
              ))}
            </div>

            <p className="mt-10 text-[14px] leading-relaxed text-muted-foreground/70">
              Leia no seu ritmo. Você pode voltar a este texto quando quiser.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
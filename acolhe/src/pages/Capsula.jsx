import React, { useEffect, useState } from "react";
import { Plus, Quote } from "lucide-react";
import { Image } from "@/components/ui/image";
import AddMemoriaDialog from "@/components/AddMemoriaDialog";
import { galeriaInicial } from "@/lib/acolheMockData";

export default function Capsula() {
  const [items, setItems] = useState(galeriaInicial);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("acolhe_capsula") || "[]");
      if (Array.isArray(saved) && saved.length) setItems([...saved, ...galeriaInicial]);
    } catch {
      setItems(galeriaInicial);
    }
  }, []);

  const addMemoria = (text) => {
    const item = { id: `u-${Date.now()}`, type: "quote", text, author: "Você" };
    setItems((prev) => [item, ...prev]);
    try {
      const saved = JSON.parse(localStorage.getItem("acolhe_capsula") || "[]");
      const list = Array.isArray(saved) ? saved : [];
      localStorage.setItem("acolhe_capsula", JSON.stringify([item, ...list]));
    } catch {
      /* se o armazenamento falhar, a memória continua visível nesta sessão */
    }
  };

  return (
    <div className="animate-fade-in px-5 pt-7">
      <h1 className="font-display text-[26px] font-semibold tracking-tight text-foreground">
        Cápsula da Esperança
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        Coisas boas que você quer lembrar nos dias difíceis.
      </p>

      <div className="mt-6 columns-2 gap-3">
        {items.map((item) =>
          item.type === "photo" ? (
            <figure
              key={item.id}
              className="mb-3 break-inside-avoid overflow-hidden rounded-3xl bg-card ring-1 ring-white/5"
            >
              <Image
                src={item.src}
                alt={item.caption}
                className={`w-full ${item.height} object-cover`}
              />
              <figcaption className="px-3.5 py-3 text-[13px] leading-snug text-muted-foreground">
                {item.caption}
              </figcaption>
            </figure>
          ) : (
            <blockquote
              key={item.id}
              className="mb-3 break-inside-avoid rounded-3xl bg-gradient-to-br from-violet-400/20 to-sky-300/10 p-5 ring-1 ring-violet-300/15"
            >
              <Quote className="h-4 w-4 text-primary/80" />
              <p className="mt-3 font-heading text-[15px] leading-relaxed text-foreground/90">
                {item.text}
              </p>
              <footer className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground/80">
                {item.author}
              </footer>
            </blockquote>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Adicionar nova memória feliz"
        className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/25 transition-transform duration-300 active:scale-95 md:right-[calc(50%-215px+20px)]"
      >
        <Plus className="h-6 w-6" strokeWidth={2.4} />
      </button>

      <AddMemoriaDialog open={open} onClose={() => setOpen(false)} onAdd={addMemoria} />
    </div>
  );
}
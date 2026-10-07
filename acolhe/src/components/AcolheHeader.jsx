import React from "react";
import { Link } from "react-router-dom";
import { Heart, Phone } from "lucide-react";

export default function AcolheHeader({ onOpenSos }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 py-3.5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Heart className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
          <span className="font-heading text-[19px] font-semibold tracking-tight text-foreground">
            Acolhe
          </span>
        </Link>

        <button
          type="button"
          onClick={onOpenSos}
          aria-label="Pedir ajuda agora"
          className="flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-sm font-bold tracking-wide text-slate-900 shadow-lg shadow-amber-400/20 transition-colors duration-300 hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
        >
          <Phone className="h-4 w-4" strokeWidth={2.4} />
          SOS
        </button>
      </div>
    </header>
  );
}
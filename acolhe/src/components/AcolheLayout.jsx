import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AcolheHeader from "@/components/AcolheHeader";
import BottomNav from "@/components/BottomNav";
import SosModal from "@/components/SosModal";
import OnboardingTermos from "@/components/OnboardingTermos";

export default function AcolheLayout() {
  const [sosOpen, setSosOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full justify-center bg-slate-950">
      <div className="relative flex min-h-screen w-full max-w-[430px] flex-col bg-background shadow-2xl shadow-black/50">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-sky-400/5" />
        <AcolheHeader onOpenSos={() => setSosOpen(true)} />
        <main className="relative flex-1 pb-28">
          <Outlet />
        </main>
        <BottomNav />
        <SosModal open={sosOpen} onClose={() => setSosOpen(false)} />
        <OnboardingTermos />
      </div>
    </div>
  );
}
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, MessageCircle, Sparkles, Waves } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Início", icon: Home },
  { to: "/conversar", label: "Conversar", icon: MessageCircle },
  { to: "/calma", label: "Calma", icon: Waves },
  { to: "/capsula", label: "Cápsula", icon: Sparkles },
];

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-30 border-t border-white/5 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
      <ul className="flex items-stretch">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 py-3 text-[11px] font-medium transition-colors duration-300",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-300",
                      isActive && "bg-primary/15"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 2} />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
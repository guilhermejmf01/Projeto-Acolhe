import React from "react";
import { cn } from "@/lib/utils";

export default function ChatBubble({ from, text, author, time }) {
  const isMine = from === "voce";

  return (
    <div className={cn("flex flex-col", isMine ? "items-end" : "items-start")}>
      {!isMine && author && (
        <span className="mb-1 pl-1 text-[11px] font-medium tracking-wide text-muted-foreground/80">
          {author}
        </span>
      )}
      <div
        className={cn(
          "max-w-[82%] px-4 py-3 text-[15px] leading-relaxed shadow-sm animate-fade-in",
          isMine
            ? "rounded-3xl rounded-br-lg bg-primary/85 text-primary-foreground"
            : "rounded-3xl rounded-bl-lg bg-secondary text-secondary-foreground"
        )}
      >
        {text}
      </div>
      <span className="mt-1 px-1 text-[11px] text-muted-foreground/60">{time}</span>
    </div>
  );
}
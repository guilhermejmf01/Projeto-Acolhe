import React, { useEffect, useRef, useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import ChatBubble from "@/components/ChatBubble";
import AvisoRisco from "@/components/AvisoRisco";
import { conversaInicial, respostasGuardiao } from "@/lib/acolheMockData";
import { temRisco } from "@/lib/triagem";

export default function Conversar() {
  const [messages, setMessages] = useState(conversaInicial);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [replyIndex, setReplyIndex] = useState(0);
  const [aviso, setAviso] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, typing]);

  const send = (event) => {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    if (temRisco(value)) setAviso(true);

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "voce", text: value, time: "agora" },
    ]);
    setText("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "guardiao",
          author: "Ana · voluntária",
          text: respostasGuardiao[replyIndex % respostasGuardiao.length],
          time: "agora",
        },
      ]);
      setReplyIndex((current) => current + 1);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in flex min-h-[78vh] flex-col">
      <div className="mx-5 mt-5 flex items-start gap-3 rounded-3xl bg-emerald-300/10 p-4 ring-1 ring-emerald-300/15">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200/80" strokeWidth={2} />
        <p className="text-[14.5px] leading-relaxed text-emerald-50/85">
          Você está anônimo e seguro. Um voluntário vai te ouvir agora.
        </p>
      </div>

      <div className="flex-1 space-y-4 px-5 py-6">
        {messages.map((message) => (
          <ChatBubble key={message.id} {...message} />
        ))}

        {typing && (
          <div className="flex flex-col items-start">
            <span className="mb-1 pl-1 text-[11px] font-medium tracking-wide text-muted-foreground/80">
              Ana · voluntária
            </span>
            <div className="animate-pulse rounded-3xl rounded-bl-lg bg-secondary px-4 py-3 text-[15px] text-muted-foreground">
              Ana está escrevendo...
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      <form
        onSubmit={send}
        className="sticky bottom-[70px] z-20 px-4 pb-3 pt-2"
      >
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-card/95 p-1.5 pl-4 shadow-lg shadow-black/20 backdrop-blur-xl">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Escreva como está se sentindo..."
            aria-label="Escreva como está se sentindo"
            className="h-11 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            aria-label="Enviar mensagem"
            disabled={!text.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity duration-300 disabled:opacity-40"
          >
            <Send className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </button>
        </div>
      </form>

      <AvisoRisco open={aviso} onClose={() => setAviso(false)} />
    </div>
  );
}
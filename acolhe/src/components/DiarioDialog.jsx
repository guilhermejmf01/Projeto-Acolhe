import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AvisoRisco from "@/components/AvisoRisco";
import { salvarDesabafo } from "@/lib/diarioLocal";
import { temRisco } from "@/lib/triagem";

export default function DiarioDialog({ open, onClose, onSaved }) {
  const [text, setText] = useState("");
  const [aviso, setAviso] = useState(false);
  const { toast } = useToast();

  const save = () => {
    const value = text.trim();
    if (!value) return;

    salvarDesabafo(value);
    const risco = temRisco(value);

    setText("");
    onSaved();
    onClose();

    if (risco) {
      setAviso(true);
      return;
    }
    toast({
      title: "Guardado só para você",
      description: "Some sozinho daqui a 24 horas.",
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
        <DialogContent className="rounded-3xl border-white/10 bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Diário de Desabafo</DialogTitle>
            <DialogDescription className="text-[15px] leading-relaxed text-muted-foreground">
              Escreva livremente. Ninguém além de você vai ler — e o texto desaparece em 24 horas.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={7}
            placeholder="Hoje eu senti..."
            className="min-h-[160px] rounded-2xl border-white/10 bg-secondary/60 text-[16px] leading-relaxed placeholder:text-muted-foreground/60"
          />

          <Button
            onClick={save}
            disabled={!text.trim()}
            className="h-14 w-full rounded-2xl font-heading text-base font-semibold"
          >
            Guardar para mim
          </Button>
        </DialogContent>
      </Dialog>

      <AvisoRisco open={aviso} onClose={() => setAviso(false)} />
    </>
  );
}
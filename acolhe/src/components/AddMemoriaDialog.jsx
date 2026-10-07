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

export default function AddMemoriaDialog({ open, onClose, onAdd }) {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const save = () => {
    const value = text.trim();
    if (!value) return;

    onAdd(value);
    setText("");
    onClose();
    toast({
      title: "Memória guardada",
      description: "Ela vai ficar aqui para quando você precisar.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="rounded-3xl border-white/10 bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Nova memória feliz</DialogTitle>
          <DialogDescription className="text-[15px] leading-relaxed text-muted-foreground">
            Uma lembrança, um lugar, uma música, alguém que te faz bem.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          placeholder="Ex: o cheiro de café da manhã na casa da minha avó"
          className="min-h-[110px] rounded-2xl border-white/10 bg-secondary/60 text-[16px] leading-relaxed placeholder:text-muted-foreground/60"
        />

        <Button
          onClick={save}
          disabled={!text.trim()}
          className="h-14 w-full rounded-2xl font-heading text-base font-semibold"
        >
          Guardar na cápsula
        </Button>
      </DialogContent>
    </Dialog>
  );
}
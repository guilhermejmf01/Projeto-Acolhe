const CHAVE = "acolhe_circulo";

export const LIMITE_CONTATOS = 3;

export const MENSAGEM_PADRAO =
  "Não estou me sentindo bem agora e preciso de apoio. Você pode falar comigo?";

function apenasDigitos(telefone) {
  return String(telefone || "").replace(/\D/g, "");
}

export function lerContatos() {
  try {
    const salvos = JSON.parse(localStorage.getItem(CHAVE) || "[]");
    return Array.isArray(salvos) ? salvos.slice(0, LIMITE_CONTATOS) : [];
  } catch {
    return [];
  }
}

export function salvarContatos(contatos) {
  localStorage.setItem(CHAVE, JSON.stringify(contatos.slice(0, LIMITE_CONTATOS)));
}

export function linkWhatsapp(telefone, mensagem = MENSAGEM_PADRAO) {
  return `https://wa.me/${apenasDigitos(telefone)}?text=${encodeURIComponent(mensagem)}`;
}

export function linkSms(telefone, mensagem = MENSAGEM_PADRAO) {
  return `sms:${apenasDigitos(telefone)}?body=${encodeURIComponent(mensagem)}`;
}
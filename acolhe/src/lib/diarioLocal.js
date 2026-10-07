const CHAVE = "acolhe_diario";

export const VALIDADE_HORAS = 24;

export function lerDesabafos() {
  try {
    const salvos = JSON.parse(localStorage.getItem(CHAVE) || "[]");
    if (!Array.isArray(salvos)) return [];

    const limite = Date.now() - VALIDADE_HORAS * 60 * 60 * 1000;
    const validos = salvos.filter(
      (item) => new Date(item.date).getTime() > limite && typeof item.text === "string"
    );

    if (validos.length !== salvos.length) {
      localStorage.setItem(CHAVE, JSON.stringify(validos));
    }
    return validos;
  } catch {
    return [];
  }
}

export function salvarDesabafo(texto) {
  const lista = lerDesabafos();
  lista.push({ text: texto, date: new Date().toISOString() });
  localStorage.setItem(CHAVE, JSON.stringify(lista));
  return lista.length;
}
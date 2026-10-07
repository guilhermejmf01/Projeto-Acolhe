const TERMOS_DE_RISCO = [
  "me matar",
  "me mato",
  "quero morrer",
  "vontade de morrer",
  "quero desaparecer",
  "nao quero mais viver",
  "nao quero viver",
  "nao quero mais acordar",
  "acabar com a minha vida",
  "tirar a minha vida",
  "me cortar",
  "me cortei",
  "me enforcar",
  "me envenenar",
  "nao vale a pena viver",
  "nao aguento mais viver",
  "melhor sem mim",
  "vou acabar com tudo",
  "planejei como",
];

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function temRisco(texto) {
  const normalizado = normalizar(texto);
  return TERMOS_DE_RISCO.some((termo) => normalizado.includes(normalizar(termo)));
}
import { api } from "./client.js";
import "../components/article-card.js";

const API_BASE = "https://newsapi.ecn.cl/NewsApi/inversiones/subseccion";

const subsectionEl = document.getElementById("article-subsections");
const sizeEl = document.getElementById("size-filter");
const dateEl = document.getElementById("date-filter");
const articlesEl = document.getElementById("articles");
const statusEl = document.getElementById("articles-status");
const subsection = subsectionEl.value.toLowerCase();

function buildUrl() {
  const params = new URLSearchParams();
  if (sizeEl.value) params.set("size", sizeEl.value);
  if (dateEl.value) params.set("fechaPublicacion", dateEl.value);
  return `${API_BASE}/${encodeURIComponent(subsection)}?${params.toString()}`;
};


function renderArticles(results) {
  articlesEl.replaceChildren();

  if (!results || results.length === 0) {
    statusEl.textContent = "No se encontraron artículos para estos filtros.";
    return;
  }
  statusEl.textContent = `${results.length} artículo(s).`;
  const frag = document.createDocumentFragment();
  for (const item of results) {
    const card = document.createElement("article-card");
    card.article = {
      ...item,
      fechaFiltro: dateEl.value,
      size: sizeEl.value
    };
    frag.appendChild(card);
  }
  articlesEl.appendChild(frag);
};


async function getArticles() {
  statusEl.textContent = "Cargando...";
  const url = buildUrl();
  try {
    const data = await api(url);
    console.log(data)
    const results = (data?.hits?.hits ?? []).map(item => ({
      ...item._source
    }));
    renderArticles(results);
  } catch (error) {
    console.error("Error", error);
    articlesEl.replaceChildren();
    statusEl.textContent = "Error al cargar los artículos.";
  }
};


[subsectionEl, sizeEl, dateEl].forEach((el) =>
  el.addEventListener("change", getArticles)
);

getArticles();

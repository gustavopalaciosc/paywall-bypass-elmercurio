import { api } from "./client.js";

let params = new URLSearchParams(document.location.search);
let id = params.get("id");
let subSection = params.get("subsection");
let size = params.get("size");
let date = params.get("date");

async function getArticle() {
  const response = await api(`https://newsapi.ecn.cl/NewsApi/inversiones/subseccion/${subSection}?size=${size}&fechaPublicacion=${date}`);
  let articles = response?.hits?.hits || [];
  
  let selectedArticle = articles.find(article => article._id === id);

  if (selectedArticle !== undefined) {
    const source = selectedArticle._source;

    document.getElementById('article-title').textContent = source.titulo;
    document.getElementById('article-breadcrumb').textContent = `${source.seccion} · ${source.subSeccion}`;

    if (source.autor) {
      document.getElementById('article-author').textContent = `Por: ${source.autor}`;
    }
    
    if (source.fechaPublicacion) {
      const fecha = new Date(source.fechaPublicacion);
      document.getElementById('article-date').textContent = fecha.toLocaleDateString("es-CL", {
        year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
      });
    }

    const imagenUrl = source.tablas?.tablaMedios?.[0]?.Url;
    const imageContainer = document.getElementById('article-image-container');
    if (imagenUrl) {
      imageContainer.innerHTML = `<img src="${imagenUrl}" alt="Imagen de la noticia" class="main-image">`;
    }

    const bodyEl = document.getElementById('article-body');
    bodyEl.innerHTML = source.texto || "<p>Contenido no disponible.</p>";

  } else {
    document.getElementById('article-title').textContent = "Artículo no encontrado.";
  }
}

getArticle();
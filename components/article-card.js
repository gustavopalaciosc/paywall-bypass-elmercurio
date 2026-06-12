
class ArticleCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set article(value) {
    this._source = value;
    this.render();
  }

  get article() {
    return this._source;
  }

  formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  render() {
  const a = this._source;
  if (!a) return;

  const imagen =
    a.tablas?.tablaMedios?.[0]?.Url ||
    a.tablas?.tablaMedios?.[0]?.ruta ||
    "";

  const resumen =
    a.bajada?.[0]?.texto ||
    "";

  this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
      }

      .card {
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 10px;
        overflow: hidden;
        font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        transition: box-shadow 0.2s ease, transform 0.2s ease;
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .image {
        width: 100%;
        height: 180px;
        object-fit: cover;
        background: #f2f2f2;
      }

      .content {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        flex: 1;
      }

      .breadcrumb {
        font-size: 0.7rem;
        text-transform: uppercase;
        color: #103af3;
        font-weight: 600;
      }

      .title {
        font-size: 1.05rem;
        margin: 0;
        line-height: 1.3;
      }

      .title a {
        text-decoration: none;
        color: #111;
      }

      .title a:hover {
        text-decoration: underline;
      }

      .summary {
        font-size: 0.9rem;
        color: #444;
        flex: 1;
      }

      .meta {
        font-size: 0.75rem;
        color: #777;
        border-top: 1px solid #eee;
        padding-top: 0.5rem;
      }
    </style>

    <article class="card">
      ${
        imagen
          ? `<img class="image" src="${imagen}" alt="imagen noticia" />`
          : ""
      }

      <div class="content">
        <span class="breadcrumb">
          ${a.seccion ?? ""}${a.subSeccion ? ` · ${a.subSeccion}` : ""}
        </span>

        <h2 class="title">
          <a href="article.html?id=${a.id}&subsection=${a.subSeccion}&date=${a.fechaFiltro}&size=${a.size}" target="_blank" rel="noopener noreferrer">
            ${a.titulo ?? ""}
          </a>
        </h2>

        <p class="summary">${resumen}</p>

        <div>
          <a
            class="" 
            href="article.html?id=${a.id}&subsection=${a.subSeccion}&date=${a.fechaFiltro}&size=${a.size}" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Ver
          </a>
        </div> 
  
        <div class="meta">
          ${a.autor ? `<span>${a.autor}</span> · ` : ""}
          <span>${this.formatDate(a.fechaPublicacion)}</span>
        </div>
      </div>
    </article>
  `;
}
}

customElements.define("article-card", ArticleCard);

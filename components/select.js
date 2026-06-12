


class Select extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
        .card {
          border: 1px solid #ffffff;
          padding: 1rem;
          border-radius: 8px;
          font-family: sans-serif;
        }
        h2 { color: #007bff; }
      </style>
      <div class="card">
        <h2>Hola desde mi componente!</h2>
        <p><slot name="descripcion">Contenido por defecto si no se pasa nada.</slot></p>
      </div>
    `;
  }
}

customElements.define('mi-tarjeta', Select);

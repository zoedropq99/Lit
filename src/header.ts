import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('mi-header')
export class Header extends LitElement {
  @state()
  private isLoggedIn = false;

  @state()
  private username = '';

  connectedCallback(): void {
    super.connectedCallback();

    const userData = localStorage.getItem('usuario');
    if (userData) {
      this.username = userData;
      this.isLoggedIn = true;
    }
  }

  private cerrarSesion() {
    localStorage.removeItem('usuario');
    this.isLoggedIn = false;
    this.username = '';

    this.dispatchEvent(new CustomEvent('logout', {
      bubbles: true,
      composed: true,
      detail: { mensaje: 'Usuario cerró sesión' }
    }));
    
    // Por defecto, redireccionamos
    window.location.href = '/cerrar-sesion'; 
  }

  render() {
    if (!this.isLoggedIn) return html``;

    return html`
      <header>
        <h1>Bienvenido entrenador, <span>${this.username}</span></h1>
        <button @click=${this.cerrarSesion} aria-label="Cerrar sesión">Cerrar sesión</button>
      </header>
    `;
  }

  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: hsl(276, 47.60%, 55.90%);
      padding: 1rem 2rem;
      color: white;
      font-family: Arial, sans-serif;
    }
    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    span {
      font-weight: bold;
    }
    button {
      background: transparent;
      border: 2px solid white;
      color: white;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s, color 0.3s;
    }
    button:hover {
      background-color: white;
      color: hsl(276, 47.60%, 55.90%);
    }
  `;
}

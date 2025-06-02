import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import logoImage from './assets/iconos/axity.png'

@customElement('my-footer')
export class MyFooter extends LitElement {
  render() {
    return html`
      <footer class="footer-container">
        <div class="footer-content">
          <img src=${logoImage} alt="Logo" class="footer-logo" />
          <p class="rights">© 2025 Axity. Todos los derechos reservados.</p>
        </div>
      </footer>
    `
  }

  static styles = css`
    :host {
      flex-shrink: 0; /* Importante para que no se reduzca en flex container */
      display: block;
      background: rgb(130, 59, 163);
      color: #fff;
      padding: 2rem 1rem;
      font-family: Arial, sans-serif;
      width: 100%;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }

    .footer-logo {
      width: 150px;
      margin-bottom: 1rem;
    }

    .rights {
      font-size: 0.9rem;
      margin: 0.5rem 0 1rem;
      color: #ccc;
    }

    .social-icons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
    }

    .social-icons img {
      width: 24px;
      height: 24px;
      filter: invert(1);
      transition: transform 0.3s;
    }

    .social-icons a:hover img {
      transform: scale(1.2);
    }

    @media (max-width: 600px) {
      .footer-logo {
        width: 120px;
      }

      .social-icons img {
        width: 20px;
        height: 20px;
      }

      .rights {
        font-size: 0.8rem;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-footer': MyFooter
  }
}

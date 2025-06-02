import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import userIcon from './assets/iconos/usuario.png'
import lockIcon from './assets/iconos/contraseña.png'
import logoImage from './assets/iconos/axity.png'

@customElement('my-element')
export class MyElement extends LitElement {
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  @property({ type: Number })
  count = 0

  @property()
  loggedUser = ''

  connectedCallback() {
    super.connectedCallback()
    const savedUser = localStorage.getItem('usuario')
    if (savedUser) {
      this.loggedUser = savedUser
    }
  }

  private _handleSubmit(event: Event) {
    event.preventDefault()

    const form = this.shadowRoot?.getElementById('loginForm') as HTMLFormElement
    const usuario = (form?.usuario as HTMLInputElement)?.value.trim()
    const contraseña = (form?.contraseña as HTMLInputElement)?.value.trim()
    const feedback = this.shadowRoot?.getElementById('feedback') as HTMLDivElement

    if (!usuario || !contraseña) {
      if (feedback) {
        feedback.textContent = 'Por favor completa todos los campos.'
        feedback.style.color = 'red'
      }
      return
    }
if (
  (usuario === 'zoeabdiel' && contraseña === 'zoeabdiel') ||
  (usuario === 'admin' && contraseña === '1234') 
) {
  if (feedback) {
    feedback.textContent = 'Inicio de sesión exitoso.'
    feedback.style.color = 'green'
  }

  localStorage.setItem('usuario', usuario)

  setTimeout(() => {
    window.location.href = 'inicio.html'
  }, 1000)
} else {
  if (feedback) {
    feedback.textContent = 'Usuario o contraseña incorrectos.'
    feedback.style.color = 'red'
  }
}

  }

  private _handleForgotPassword() {
    alert('Funcionalidad para recuperar contraseña aún no implementada.')
  }

  render() {
    return html`
      <div class="contorno">
        <img src=${logoImage} alt="Logo" class="logo" />
        <form id="loginForm" novalidate @submit=${this._handleSubmit}>
          <h2 class="inicios">Login</h2>

          <div class="input-group">
            <img src=${userIcon} alt="icono usuario" />
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              required
              aria-label="Usuario"
            />
          </div>

          <div class="input-group">
            <img src=${lockIcon} alt="icono contraseña" />
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              placeholder="Contraseña"
              required
              aria-label="Contraseña"
            />
          </div>

          <button
            type="button"
            class="olvide-contra"
            @click=${this._handleForgotPassword}
          >
            ¿Olvidaste tu contraseña?
          </button>

          <button type="submit">Iniciar sesión</button>

          <div id="feedback" class="feedback" role="alert" aria-live="polite"></div>
        </form>
      </div>
    `
  }

  static styles = css`
    :host * {
      box-sizing: border-box;
    }

    :host {
      background: #7d2a9b;
      background: linear-gradient(
        90deg,
        rgba(125, 42, 155, 1) 0%,
        rgba(96, 87, 199, 1) 50%,
        rgba(83, 104, 237, 1) 100%
      );
      display: flex;
      height: 100vh;
      justify-content: center;
      align-items: center;
      margin: 0;
      box-sizing: border-box;
      padding: 0;
    }

    .contorno {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      overflow: hidden;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    h2 {
      text-align: center;
      margin-bottom: 1rem;
    }

    .input-group {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    .input-group img {
      position: absolute;
      left: 0.75rem;
      width: 20px;
      height: 20px;
      pointer-events: none;
    }

    .input-group input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 2px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
      box-sizing: border-box;
      transition: border-color 0.3s ease;
    }

    .input-group input:focus {
      border-color: #7d2a9b;
      outline: none;
      box-shadow: 0 0 5px rgba(125, 42, 155, 0.5);
    }

    button {
      width: 100%;
      padding: 0.75rem;
      border: none;
      background-color: #3498db;
      color: white;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 1rem;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #0056b3;
    }

    .olvide-contra {
      background: none;
      color: #555;
      font-size: 0.9rem;
      text-decoration: underline;
      cursor: pointer;
      margin-top: -0.5rem;
      margin-bottom: 1rem;
      width: auto;
      padding: 0;
      text-align: center;
      border-radius: 0;
    }

    .olvide-contra:hover {
      color: #3498db;
      background: none;
    }

    .feedback {
      margin-top: 1rem;
      color: red;
      font-weight: bold;
      min-height: 1.5em;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .inicios {
      font-size: 2rem;
      background: purple;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: purple;
      font-family: Verdana;
    }

    .logo {
      position: absolute;
      top: 1rem;
      left: 1rem;
      width: 300px;
      height: auto;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}

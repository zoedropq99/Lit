import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

interface Pokemon {
  name: string;
  image: string | null;
  weight: number;
  height: number;
  types: any[];
}

@customElement('mi-inicio')
export class Inicio extends LitElement {
  @state()
  pokemons: Pokemon[] = [];

  @state()
  error: string | null = null;

  @state()
  selectedPokemon: Pokemon | null = null;

  async firstUpdated() {
    console.log('firstUpdated iniciado');
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
      if (!res.ok) throw new Error('Error al obtener la lista de pokemones');
      const data = await res.json();
      console.log('Datos recibidos:', data.results);

      const pokemonLista = await Promise.all(
        data.results.map(async (poke: any) => {
          const pokeRes = await fetch(poke.url);
          if (!pokeRes.ok) throw new Error('Error al obtener datos de un pokemon');
          const pokeData = await pokeRes.json();
          return {
            name: poke.name,
            image: pokeData.sprites.front_default || null,
            weight: pokeData.weight,
            height: pokeData.height,
            types: pokeData.types,
          };
        })
      );

      this.pokemons = pokemonLista;
      this.error = null;
      console.log('Pokemons cargados:', this.pokemons.length);
    } catch (error: any) {
      this.error = error.message || 'Error desconocido';
      this.pokemons = [];
      console.error('Error fetching pokemons:', error);
    }
  }

  mostrarDetalles(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  cerrarModal() {
    this.selectedPokemon = null;
  }

  render() {
    if (this.error) {
      return html`<p style="color:red;">Error: ${this.error}</p>`;
    }
    if (this.pokemons.length === 0) {
      return html`<p>Cargando pokemones...</p>`;
    }
    return html`
  <h1>Lista de Pokemones</h1>
  <div class="pokemon-lista">
    ${this.pokemons.map(
      (p) => html`
        <div class="pokemon-card" @click=${() => this.mostrarDetalles(p)}>
          <p>${p.name}</p>
        </div>
      `
    )}
  </div>

  ${this.selectedPokemon
    ? html`
        <div class="modal-overlay" @click=${this.cerrarModal}>
          <div class="modal-content" @click=${(e: Event) => e.stopPropagation()}>
            <button class="close-btn" @click=${this.cerrarModal}>✖</button>
            <h2>${this.selectedPokemon.name}</h2>
            <img src=${this.selectedPokemon.image} alt=${this.selectedPokemon.name} />
            <p><strong>Peso:</strong> ${this.selectedPokemon.weight}</p>
            <p><strong>Altura:</strong> ${this.selectedPokemon.height}</p>
            <p><strong>Tipos:</strong> ${this.selectedPokemon.types.map(t => t.type.name).join(', ')}</p>
          </div>
        </div>
      `
    : ''}
`;

  }

  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: sans-serif;
      background-color: #f9f9f9;
      text-align: center;
    }
    h1 {
      color: #333;
      margin-bottom: 1rem;
    }
    .pokemon-lista {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
    .pokemon-card {
      background: white;
      border-radius: 10px;
      padding: 1rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      width: 120px;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    .pokemon-card:hover {
      transform: scale(1.05);
    }
    .pokemon-card img {
      width: 96px;
      height: 96px;
      object-fit: contain;
    }
    .pokemon-card p {
      margin-top: 0.5rem;
      font-weight: bold;
      color: #444;
      text-transform: capitalize;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      width: 90%;
      max-width: 400px;
      text-align: center;
      position: relative;
    }

    .close-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: transparent;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
    }
  `;
}

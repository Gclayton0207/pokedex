const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () =>
  Array(793)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then((response) => response.json())
    );

const generateHTML = (pokemons) =>
  pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map((TypeInfo) => TypeInfo.type.name);

    accumulator += `
            <li class="card ${elementTypes[0]}">
            <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"/>
            <h2 class="card-title">${id}. ${name}</h2>
            <p class='card-subtitle'>${elementTypes.join(" | ")}</p>
            </li>`;
    return accumulator;
  }, "");
const inserirPokemon = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};
const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(inserirPokemon);

$("#submit").click(function (event) {
  event.preventDefault();
  pesquisar();
});

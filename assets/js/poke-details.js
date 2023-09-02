const content = document.getElementById('pokemon');
const pokeId = window.location.href.split('=')[1];
const pokeApi = {};
const closeBtn = document.getElementById('closeBtn');

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.gif = pokeDetail.sprites.versions["generation-v"]["black-white"].animated.front_default;
    const abilities = pokeDetail.abilities.map((abilities)=> abilities.ability.name);
    pokemon.abilities = abilities;


    return pokemon;
}
function convertPokemonToHtml(pokemon) {
    return `
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
            <div class="detail">
                <section>
                    <h2>Types</h2>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </section>
                <section>
                    <h2>Abilities</h2>
                    <ol class="abilities">
                        ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join('')}
                </ol>
                </section>
                <img src="${pokemon.gif}"
                     alt="${pokemon.name}">
            </div>
    `;
}
pokeApi.getPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
}

function loadPokemonDetails(pokeId) {
    pokeApi.getPokemon(pokeId).then((pokemon) => {
        const newHtml = convertPokemonToHtml(pokemon);

        content.innerHTML = newHtml;
    });
}

closeBtn.addEventListener("click",()=>{
    window.close();
})

loadPokemonDetails(pokeId);
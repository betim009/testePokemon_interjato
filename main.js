import { fetchPokemons } from "./fetchPokemons.js";

const divPokemons = document.getElementById('div-pokemons');
const btnPrevious = document.getElementById('btn-previous');
const btnNext = document.getElementById('btn-next');

let pokemonsDisplay = [];
let data = null;

window.addEventListener('DOMContentLoaded', async () => {
    data = await fetchPokemons();
    pokemonsDisplay = data.results;


    pokemonsDisplay.forEach((e, i) => {
        divPokemons.innerHTML += `
            <div>
                <h4>${e.name}</h4>
            </div>
        `
    });
});

btnNext.addEventListener('click', async () => {
    const req = await fetch(data.next);
    const res = await req.json();

    pokemonsDisplay = res.results;
    
    divPokemons.innerHTML = "";
    pokemonsDisplay.forEach((e, i) => {
        divPokemons.innerHTML += `
            <div>
                <h4>${e.name}</h4>
            </div>
        `
    });
    
});
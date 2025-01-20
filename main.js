import { fetchPokemons } from "./fetchPokemons.js";

const divPokemons = document.getElementById('div-pokemons');        //Pega a div no html;
const btnPrevious = document.getElementById('btn-previous');        //Pega o botão de previous;
const btnNext = document.getElementById('btn-next');        //Pega o botão de next;
const inputNamePokemon = document.getElementById('name-pokemon')     //Pega o input e o valor que está inserido nele;
const researchPokemon = document.getElementById('research-pokemon');        //Pega o input submit;
const pokemonTrue = document.getElementById('pokemon-true');

let pokemonsDisplay = [];       //Cria um array vazio para armazenar os podemons que serão exibidos;
let data = null;

window.addEventListener('DOMContentLoaded', async () => {       //
    data = await fetchPokemons();       //Armazena o aguardo da api; 
    pokemonsDisplay = data.results;


    pokemonsDisplay.map((e, i) => {     //Cria uma div com o nome para cada pokemon;
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
    
    divPokemons.innerHTML = "";     //Limpa a tela;
    pokemonsDisplay.forEach((e, i) => {
        divPokemons.innerHTML += `
            <div>
                <h4>${e.name}</h4>
            </div>
        `
    });
});

researchPokemon.addEventListener('click', async () => {     //Função que vai renderizar nome do pokemon pesquisado na tela;

    const name = inputNamePokemon.value

    if(name === "") {
        return alert('Digite algum nome!');
    }

    try {
        const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const res = await req.json();

        console.log('estou aqui', res);
        const arrAbilities = res.abilities;

        pokemonTrue.innerHTML += `
            <h3>${res.name}</h3>
            <img class="thumb" src="${res.sprites.front_default}" />
            <h5>Habilidades:</h5>
            <ul id="div-abilities"></ul>
        `
        const divAbilities = document.getElementById('div-abilities');
        arrAbilities.forEach((e, i) => {
            divAbilities.innerHTML += `
                <li>${e.ability.name}</li>
            `
        });

        divPokemons.innerHTML = ""
        console.log(res)
    } catch (error) {
        alert('a')
    }
});

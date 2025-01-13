export const fetchPokemons = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/";

    const req = await fetch(url);
    const res = await req.json();

    return res;
};

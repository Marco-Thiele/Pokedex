const typeColors = {
    'grass': 'green',
    'fire': 'red',
    'water': 'blue',
    'bug': 'oliv',
    'normal': 'grey',
    'poison': 'purple',
    'electric': 'yellow',
    'ground': 'sand',
    'fairy': 'pink',
    'fighting': 'darkred',
    'rock': 'brown',
    'psychic': 'orange',
    'ice': 'ice',
    'ghost': 'violet'
};
let loadedPokemons = 0;
let pokemonsToLoad = 20;
let isLoading = false;
let overlay = false;
let filter = false;


async function loadAllPokemons() {
    let container = document.getElementById('allPokemons');
    for (let i = 1; i < 21; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJOIN = await response.json();
        let pokemonImage = responseAsJOIN['sprites']['other']['official-artwork']['front_default'];
        container.innerHTML += await returnHtmlAllPokemons(i, responseAsJOIN, pokemonImage);
        bgChange(responseAsJOIN, i);
    }
    loadedPokemons = 20;
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 0 && !isLoading && !filter) {
        loadMorePokemons();
    }
});


async function loadMorePokemons() {
    const container = document.getElementById('allPokemons');
    isLoading = true;
    for (let i = loadedPokemons + 1; i <= loadedPokemons + pokemonsToLoad; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const response = await fetch(url);
        const responseAsJOIN = await response.json();
        const pokemonImage = responseAsJOIN['sprites']['other']['official-artwork']['front_default'];
        container.innerHTML += await returnHtmlAllPokemons(i, responseAsJOIN, pokemonImage);
        bgChange(responseAsJOIN, i);
    }
    loadedPokemons += pokemonsToLoad;
    isLoading = false;
}

async function pokemonType(responseAsJOIN) {
    let typs = await responseAsJOIN['types'];
    let typesHTML = '';
    for (let i = 0; i < typs.length; i++) {
        const typ = typs[i]['type']['name'];
        typesHTML += `<div>${typ}</div>`;
    }
    return typesHTML;
}


async function capitalize(s) {
    return await s[0].toUpperCase() + s.slice(1);
}

async function bgChange(typs, i) {
    const typ = await typs['types'][0]['type']['name'];
    const color = typeColors[typ] || 'darkblue';
    document.getElementById(`card${i}`).classList.add(`bg-color-${color}`);
}


async function loadSingelPokemon(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let contant = document.getElementById('overlay');
    let firstContent = returnHtmlSinglePokemon(i);
    let secondContent = await returnHtmlSinglePokemon2(i);
    document.getElementById('overlay-background').classList.add('overlay-background');
    contant.innerHTML = firstContent + secondContent;
    renderPokemonInfo(currentPokemon, i);
    overlay = true;
}


async function renderPokemonInfo(currentPokemon, i) {
    document.getElementById('pokemonName').innerHTML = await capitalize(currentPokemon['name']);
    document.getElementById('pokemonPic').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('allPokemons').style.opacity = '0.5';
    overlayChange(currentPokemon, i);
    about(i);
}


async function about(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let container = document.getElementById('information');
    let height = currentPokemon['height'] / 10;
    let weight = currentPokemon['weight'] / 10;
    let abilities = currentPokemon['abilities']
    let abilityString = 'Abilities: ';
    let contant = returnHtmlAbout(height, weight)
    container.innerHTML = contant;
    document.getElementById('abilities').innerHTML = abilityString.slice(0, -2);
    aboutBTN(abilities, abilityString);
}


function aboutBTN(abilities, abilityString) {
    document.getElementById('about').classList.add('active');
    document.getElementById('baseStats').classList.remove('active');
    document.getElementById('moves').classList.remove('active');
    for (let j = 0; j < abilities.length; j++) {
        const ability = abilities[j]['ability']['name'];
        abilityString += `${ability}, `;
    }
}


async function baseStats(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let HP = currentPokemon['stats'][0]['base_stat'];
    let Attack = currentPokemon['stats'][1]['base_stat'];
    let Defence = currentPokemon['stats'][2]['base_stat'];
    let SpAttack = currentPokemon['stats'][3]['base_stat'];
    let SpDefence = currentPokemon['stats'][4]['base_stat'];
    let Speed = currentPokemon['stats'][5]['base_stat'];
    let firstcontant = returmHtmlBaseStats1(HP);
    let secondcontant = returmHtmlBaseStats2(Attack, Defence);
    let thirdcontant = returmHtmlBaseStats3(SpAttack, SpDefence);
    let fourthcontant = returmHtmlBaseStats4(Speed);
    let container = document.getElementById('information');
    container.innerHTML = firstcontant + secondcontant + thirdcontant + fourthcontant;
    calkulateProgressBar(currentPokemon)
    BaseStatsBtn()
}


function calkulateProgressBar(currentPokemon) {
    let HP = currentPokemon['stats'][0]['base_stat'];
    let hpshow = HP / 2.5;
    let Attack = currentPokemon['stats'][1]['base_stat'];
    let attackShow = Attack / 2.5;
    let Defence = currentPokemon['stats'][2]['base_stat'];
    let defenceShow = Defence / 2.5;
    let SpAttack = currentPokemon['stats'][3]['base_stat'];
    let spAttackShow = SpAttack / 2.5;
    let SpDefence = currentPokemon['stats'][4]['base_stat'];
    let spDefenceShow = SpDefence / 2.5;
    let Speed = currentPokemon['stats'][5]['base_stat'];
    let speedShow = Speed / 2.5;
    showProgressBar(hpshow, attackShow, defenceShow, spAttackShow, spDefenceShow, speedShow);
}


function BaseStatsBtn() {
    document.getElementById('baseStats').classList.add('active');
    document.getElementById('about').classList.remove('active');
    document.getElementById('moves').classList.remove('active');
}


function showProgressBar(hpshow, attackShow, defenceShow, spAttackShow, spDefenceShow, speedShow) {
    const hpElement = document.querySelector('.HP');
    hpElement.style.width = `${hpshow}%`;
    const attackElement = document.querySelector('.Attack');
    attackElement.style.width = `${attackShow}%`;
    const defenceElement = document.querySelector('.Defence');
    defenceElement.style.width = `${defenceShow}%`;
    const spAttackElement = document.querySelector('.SpAttack');
    spAttackElement.style.width = `${spAttackShow}%`;
    const spDefenceElement = document.querySelector('.SpDefence');
    spDefenceElement.style.width = `${spDefenceShow}%`;
    const speedElement = document.querySelector('.Speed');
    speedElement.style.width = `${speedShow}%`;
}


async function moves(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let moves = currentPokemon['moves'];
    document.getElementById('moves').classList.add('active');
    document.getElementById('baseStats').classList.remove('active');
    document.getElementById('about').classList.remove('active');
    movesHtml(moves);
}


function movesHtml(moves) {
    let container = document.getElementById('information');
    container.innerHTML = '';
    for (let j = 0; j < moves.length; j++) {
        const move = moves[j]['move']['name'];
        container.innerHTML += /*html*/`
    <span >
        <button class="moves-btn">${move}</button>
    </span>`;
    }
}


async function overlayChange(currentPokemon) {
    const typ = await currentPokemon['types'][0]['type']['name'];
    const color = typeColors[typ] || 'darkblue';
    document.getElementById(`pokedex`).classList.add(`bg-color-${color}`);
}


function closeOverlay() {
   if (overlay) {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('overlay-background').classList.remove('overlay-background');
    document.getElementById(`pokedex`).classList.remove('bg-color-green', 'bg-color-red', 'bg-color-blue', 'bg-color-oliv',
        'bg-color-grey', 'bg-color-purple', 'bg-color-yellow', 'bg-color-sand', 'bg-color-pink', 'bg-color-darkred', 'bg-color-brown',
        'bg-color-orange', 'bg-color-ice', 'bg-color-violet', 'bg-color-darkblue');
    document.getElementById('allPokemons').style.opacity = '1';
   }

}


function nextPokemon(i) {
    if (i < 151) {
        i++
    } else {
        i = 1
    }
    loadSingelPokemon(i)
}


function previousPokemon(i) {
    if (i < 2) {
        i = 151
    } else {
        i--
    }
    loadSingelPokemon(i)
}


async function filterPokemons() {
    let search = document.getElementById('search').value;
    filter= true;
    search = search.toLowerCase();
    document.getElementById('allPokemons').classList.add('cards-search');
    document.getElementById('allPokemons').classList.remove('cards');
    let container = document.getElementById('allPokemons');
    container.innerHTML = '';
    renderFilterPokemons(container, search)
}


async function renderFilterPokemons(container, search) {
    for (let i = 1; i < 152; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJOIN = await response.json();
        let name = responseAsJOIN['name'];
        let pokemonImage = responseAsJOIN['sprites']['other']['official-artwork']['front_default'];
        if (name.toLowerCase().includes(search)) {
            container.innerHTML += await filterPokemonsHtml(pokemonImage, name, responseAsJOIN, i);
            bgChange(responseAsJOIN, i)
        }
    }
    container.innerHTML += '<div><img onclick="closeSearch()" class="close-search" src="img/x.ico" alt=""></div> '
}


function closeSearch() {
    document.getElementById('allPokemons').classList.remove('cards-search');
    document.getElementById('allPokemons').classList.add('cards');
    let container = document.getElementById('allPokemons');
    container.innerHTML = '';
    let search = document.getElementById('search');
    search.value = '';
    filter = false;
    loadAllPokemons()
}


function doNotClose(event){
    event.stopPropagation();
}
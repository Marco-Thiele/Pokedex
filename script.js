



async function loadAllPokemons() {
    let container = document.getElementById('allPokemons');
    for (let i = 1; i < 152; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJOIN = await response.json();
        let pokemonImage = responseAsJOIN['sprites']['other']['official-artwork']['front_default'];
        console.log(responseAsJOIN);
        container.innerHTML += /*html*/`
    <div onclick="loadSingelPokemon(${i})" class="card" id="card${i}">
        <div class="pokemon-name">
            ${await capitalize(responseAsJOIN['name'],)}
        </div>
        <div class="pokemon-img-div">
            <div class="typs" id="typs${i}">
            <a href="">#${i}</a>
            ${await pokemonType(responseAsJOIN, i)}
            </div>
            <div>
            <img class="pokemon-img" src="${pokemonImage}" alt="">
            </div>
        </div>
    </div>`;
        bgChange(responseAsJOIN, i)
    }
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
    return s[0].toUpperCase() + s.slice(1);
}

async function bgChange(typs, i) {
    let typ = await typs['types'][0]['type']['name'];
    if (await typ == 'grass') {
        document.getElementById(`card${i}`).classList.add('bg-color-green');
    } else if (await typ == 'fire') {
        document.getElementById(`card${i}`).classList.add('bg-color-red');
    } else if (await typ == 'water') {
        document.getElementById(`card${i}`).classList.add('bg-color-blue');
    } else if (await typ == 'bug') {
        document.getElementById(`card${i}`).classList.add('bg-color-oliv');
    } else if (await typ == 'normal') {
        document.getElementById(`card${i}`).classList.add('bg-color-grey');
    } else if (await typ == 'poison') {
        document.getElementById(`card${i}`).classList.add('bg-color-purple');
    } else if (await typ == 'electric') {
        document.getElementById(`card${i}`).classList.add('bg-color-yellow');
    } else if (await typ == 'ground') {
        document.getElementById(`card${i}`).classList.add('bg-color-sand');
    } else if (await typ == 'fairy') {
        document.getElementById(`card${i}`).classList.add('bg-color-pink');
    } else if (await typ == 'fighting') {
        document.getElementById(`card${i}`).classList.add('bg-color-darkred');
    } else if (await typ == 'rock') {
        document.getElementById(`card${i}`).classList.add('bg-color-brown');
    } else if (await typ == 'psychic') {
        document.getElementById(`card${i}`).classList.add('bg-color-orange');
    } else if (await typ == 'ice') {
        document.getElementById(`card${i}`).classList.add('bg-color-ice');
    } else if (await typ == 'ghost') {
        document.getElementById(`card${i}`).classList.add('bg-color-violet');
    } else {
        document.getElementById(`card${i}`).classList.add('bg-color-darkblue');
    }
}


async function loadSingelPokemon(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    
    let contant = document.getElementById('overlay');
    contant.innerHTML= /*html*/`
            <div class="pokedex" id="pokedex">
            <div>
                <img onclick="closeOverlay()" class="img-x" src="img/x.ico" alt="">
            </div>
            <div class="pokecard">
                <h1 id="pokemonName">Name</h1>
                <div class="img-div">
                    <img onclick="previousPokemon(${i})" class="pointer" src="img/left.ico">
                    <img class="pokemon-pic" id="pokemonPic" src="" alt="">
                    <img onclick="nextPokemon(${i})" class="pointer" src="img/right.ico" alt="">
                </div>
            </div>
        </div>

        <div class="pokemonInfo" id="pokemonInfo">
            <div class="stats-btn">
                <button id="about" onclick="about()" class="info-btn active">About</button>
                <button id="baseStats" onclick="baseStats()" class="info-btn">Base Stats</button>
                <button id="evolution" onclick="evolution()" class="info-btn">Evolution</button>
                <button id="moves" onclick="moves()" class="info-btn">Moves</button>
            </div>

        </div>`;
    renderPokemonInfo(currentPokemon, i);       
}


async function renderPokemonInfo(currentPokemon, i) {
    
    document.getElementById('pokemonName').innerHTML = await currentPokemon['name'];
    document.getElementById('pokemonPic').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('overlay').classList.remove('d-none');
    overlayChange(currentPokemon, i)
    
}


function about() {
    document.getElementById('about').classList.add('active');
    document.getElementById('baseStats').classList.remove('active');
    document.getElementById('evolution').classList.remove('active');
    document.getElementById('moves').classList.remove('active');
}


function baseStats() {
    document.getElementById('baseStats').classList.add('active');
    document.getElementById('about').classList.remove('active');
    document.getElementById('evolution').classList.remove('active');
    document.getElementById('moves').classList.remove('active');
}


function evolution() {
    document.getElementById('evolution').classList.add('active');
    document.getElementById('baseStats').classList.remove('active');
    document.getElementById('about').classList.remove('active');
    document.getElementById('moves').classList.remove('active');
}


function moves() {
    document.getElementById('moves').classList.add('active');
    document.getElementById('baseStats').classList.remove('active');
    document.getElementById('evolution').classList.remove('active');
    document.getElementById('about').classList.remove('active');
}


async function overlayChange(currentPokemon) {
    let typ = await currentPokemon['types'][0]['type']['name'];
    if (await typ == 'grass') {
        document.getElementById(`pokedex`).classList.add('bg-color-green');
    } else if (await typ == 'fire') {
        document.getElementById(`pokedex`).classList.add('bg-color-red');
    } else if (await typ == 'water') {
        document.getElementById(`pokedex`).classList.add('bg-color-blue');
    } else if (await typ == 'bug') {
        document.getElementById(`pokedex`).classList.add('bg-color-oliv');
    } else if (await typ == 'normal') {
        document.getElementById(`pokedex`).classList.add('bg-color-grey');
    } else if (await typ == 'poison') {
        document.getElementById(`pokedex`).classList.add('bg-color-purple');
    } else if (await typ == 'electric') {
        document.getElementById(`pokedex`).classList.add('bg-color-yellow');
    } else if (await typ == 'ground') {
        document.getElementById(`pokedex`).classList.add('bg-color-sand');
    } else if (await typ == 'fairy') {
        document.getElementById(`pokedex`).classList.add('bg-color-pink');
    } else if (await typ == 'fighting') {
        document.getElementById(`pokedex`).classList.add('bg-color-darkred');
    } else if (await typ == 'rock') {
        document.getElementById(`pokedex`).classList.add('bg-color-brown');
    } else if (await typ == 'psychic') {
        document.getElementById(`pokedex`).classList.add('bg-color-orange');
    } else if (await typ == 'ice') {
        document.getElementById(`pokedex`).classList.add('bg-color-ice');
    } else if (await typ == 'ghost') {
        document.getElementById(`pokedex`).classList.add('bg-color-violet');
    } else {
        document.getElementById(`pokedex`).classList.add('bg-color-darkblue');
    }
}


function closeOverlay(){
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById(`pokedex`).classList.remove('bg-color-green', 'bg-color-red','bg-color-blue','bg-color-oliv',
    'bg-color-grey','bg-color-purple','bg-color-yellow','bg-color-sand','bg-color-pink','bg-color-darkred','bg-color-brown',
    'bg-color-orange','bg-color-ice','bg-color-violet','bg-color-darkblue');
}


function nextPokemon(i){
    if (i < 151) {
        i++
    } else {
       i = 1 
    }
    loadSingelPokemon(i)
}


function previousPokemon(i){
    if (i < 2) {
        i = 151
    } else {
        i--
    }
    loadSingelPokemon(i)
}
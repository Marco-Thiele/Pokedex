



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
            ${await capitalize(responseAsJOIN['name'])}
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
    contant.innerHTML = /*html*/`
            <div class="pokedex" id="pokedex">
            <div class="overlay-head">
                <div>
                # ${i}
                </div>
                <div>
                <img onclick="closeOverlay()" class="img-x" src="img/x.ico" alt="">
                </div>
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
                <button id="about" onclick="about(${i})" class="info-btn active"><b>About</b></button>
                <button id="baseStats" onclick="baseStats(${i})" class="info-btn"><b>Base Stats</b></button>
                <button id="moves" onclick="moves(${i})" class="info-btn"><b>Moves</b></button>
            </div>
            <div class="moves-container" id="information" >

            </div>

        </div>`;
    renderPokemonInfo(currentPokemon, i);
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
    document.getElementById('about').classList.add('active');
    document.getElementById('baseStats').classList.remove('active');
    document.getElementById('moves').classList.remove('active');
    for (let j = 0; j < abilities.length; j++) {
        const ability = abilities[j]['ability']['name'];
        abilityString += `${ability}, `;
    }
    container.innerHTML = /*html*/`
    <div class="about-info">
        <span>
            Height: ${height} m
        </span>
        <span>
            Weight: ${weight} Kg
        </span>
        <span id="abilities">
             
        </span>

    </div>`;

    document.getElementById('abilities').innerHTML = abilityString.slice(0, -2);
}


async function baseStats(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let HP = currentPokemon['stats'][0]['base_stat'];
    let hpshow = HP / 1.6;
    let Attack = currentPokemon['stats'][1]['base_stat'];
    let attackShow = Attack / 1.6;
    let Defence = currentPokemon['stats'][2]['base_stat'];
    let defenceShow = Defence / 1.6;
    let SpAttack = currentPokemon['stats'][3]['base_stat'];
    let spAttackShow = SpAttack / 1.6;
    let SpDefence = currentPokemon['stats'][4]['base_stat'];
    let spDefenceShow = SpDefence / 1.6;
    let Speed = currentPokemon['stats'][5]['base_stat'];
    let speedShow = Speed / 1.6;

    let container = document.getElementById('information');
    document.getElementById('baseStats').classList.add('active');
    document.getElementById('about').classList.remove('active');
    document.getElementById('moves').classList.remove('active');
    container.innerHTML = /*html*/`
    <div class="container">
        <div class="skills">
            <h2 class="base-stats-info">HP</h2>
            <div class="progress-bar">
                <div class="HP">
                    <span>${HP}</span>
                </div>
            </div>
            <h2 class="base-stats-info">Attack</h2>
            <div class="progress-bar">
                <div class="Attack">
                    <span>${Attack}</span>
                </div>
            </div>
            <h2 class="base-stats-info">Defence</h2>
            <div class="progress-bar">
                <div class="Defence">
                    <span>${Defence}</span>
                </div>
            </div>
            <h2 class="base-stats-info">Sp.Attack</h2>
            <div class="progress-bar">
                <div class="SpAttack">
                    <span>${SpAttack}</span>
                </div>
            </div>
            <h2 class="base-stats-info">Sp.Defence</h2>
            <div class="progress-bar">
                <div class="SpDefence">
                    <span>${SpDefence}</span>
                </div>
            </div>
            <h2 class="base-stats-info">Speed</h2>
            <div class="progress-bar">
                <div class="Speed">
                    <span>${Speed}</span>
                </div>
            </div>

        </div>
    </div>`;
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
    let container = document.getElementById('information');
    document.getElementById('moves').classList.add('active');
    document.getElementById('baseStats').classList.remove('active');
    document.getElementById('about').classList.remove('active');
    container.innerHTML = ``;
    for (let j = 0; j < moves.length; j++) {
        const move = moves[j]['move']['name'];
        container.innerHTML += /*html*/`
    <span >
        <button class="moves-btn">${move}</button>
    </span>`;
    }

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


function closeOverlay() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById(`pokedex`).classList.remove('bg-color-green', 'bg-color-red', 'bg-color-blue', 'bg-color-oliv',
        'bg-color-grey', 'bg-color-purple', 'bg-color-yellow', 'bg-color-sand', 'bg-color-pink', 'bg-color-darkred', 'bg-color-brown',
        'bg-color-orange', 'bg-color-ice', 'bg-color-violet', 'bg-color-darkblue');
    document.getElementById('allPokemons').style.opacity = '1';
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
    search = search.toLowerCase();
    document.getElementById('allPokemons').classList.add('cards-search');
    document.getElementById('allPokemons').classList.remove('cards');
    let container = document.getElementById('allPokemons');
    container.innerHTML = '';
    for (let i = 1; i < 152; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJOIN = await response.json();
        let name = responseAsJOIN['name'];
        let pokemonImage = responseAsJOIN['sprites']['other']['official-artwork']['front_default'];
        if (name.toLowerCase().includes(search)) {
            container.innerHTML += /*html*/`
            
            <div onclick="loadSingelPokemon(${i})" class="card" id="card${i}">
                <div class="pokemon-name">
                    ${await capitalize(name)}
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
    container.innerHTML += '<div><img onclick="closeSearch()" class="close-search" src="img/x.ico" alt=""></div> '
}


function closeSearch(){
    document.getElementById('allPokemons').classList.remove('cards-search');
    document.getElementById('allPokemons').classList.add('cards');
    let container = document.getElementById('allPokemons');
    container.innerHTML = '';
    let search = document.getElementById('search');
    search.value='';
    loadAllPokemons()
}
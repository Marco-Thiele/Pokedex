async function returnHtmlAllPokemons(i, responseAsJOIN, pokemonImage){
    return /*html*/`
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
}


 function returnHtmlSinglePokemon(i){
    return`
    <div class="pokedex" id="pokedex">
    <div class="overlay-head">
        <div># ${i}</div>
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
</div>`;
}


async function returnHtmlSinglePokemon2(i){
 return `
 <div class="pokemonInfo" id="pokemonInfo">
    <div class="stats-btn">
     <button id="about" onclick="about(${i})" class="info-btn active"><b>About</b></button>
     <button id="baseStats" onclick="baseStats(${i})" class="info-btn"><b>Base Stats</b></button>
     <button id="moves" onclick="moves(${i})" class="info-btn"><b>Moves</b></button>
    </div>
    <div class="moves-container" id="information" >
    </div>
 </div>`;
}


function returnHtmlAbout(height, weight){
    return `
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
}


function returmHtmlBaseStats1(HP){
    return  `
    <div class="container">
        <div class="skills">
            <h2 class="base-stats-info">HP</h2>
            <div class="progress-bar">
                <div class="HP">
                    <span>${HP}</span>
                </div>
            </div>`;
}


function returmHtmlBaseStats2(Attack, Defence){
    return`
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
            </div>`
}


function returmHtmlBaseStats3(SpAttack, SpDefence){
    return`
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
            </div>`
}


function returmHtmlBaseStats4(Speed){
    return`
    <h2 class="base-stats-info">Speed</h2>
            <div class="progress-bar">
                <div class="Speed">
                    <span>${Speed}</span>
                </div>
            </div>

        </div>
    </div>`
}


async function filterPokemonsHtml(pokemonImage, name,  responseAsJOIN, i){
    return `        
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
    </div>`
}
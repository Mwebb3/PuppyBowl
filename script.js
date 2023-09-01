const playerList = document.querySelector("#playerList");
const info = document.querySelector("#info");
const returnHome = document.querySelector("#return");

let playerNames;

async function fetchPlayers(){
    const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players");
    const json = await response.json();
    playerNames = json.data.players;
    console.log(playerNames);
    render();
}

function render(){
    const hash = window.location.hash.slice(1)*1;
    const html = playerNames.map((player) => {
        return `
            <a href="#${player.id !== hash ? player.id : ""}" class=${player.id === hash ? "selected": ""}>
                <div class="name">${player.name}</div> 
                <br/>
                <div class="breed">Breed(s):${player.breed}</div>
            </a>
        `
    })
    playerList.innerHTML = html.join("");

    const player = playerNames.find((player) => {
        return player.id === hash
    })

    let infoHtml = "Click on a Player to See More Info"
    if(player){
        infoHtml = `
            
            <div class="background" style="background-image:url(${player.imageUrl})">
                <div id="details">
                    <h2>Meet ${player.name}!</h2>
                    <ul>
                        <li>Breed(s): ${player.breed}</li>
                        <li>Status: ${player.status}</li>
                    </ul>
                </div>
                <div id="home">
                    <a href="#${player.id !== hash ? "": ""}">Back to Home</a>
                </div>
            </div>
            
        `
    }
    info.innerHTML = infoHtml
}

window.addEventListener("hashchange", () => {
    render()
})

fetchPlayers();
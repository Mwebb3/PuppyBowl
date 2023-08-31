const playerList = document.querySelector("#playerList");

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
                    ${player.name}: ${player.breed}
            </a>
        `
    })
    playerList.innerHTML = html.join("")
}

window.addEventListener("hashchange", () => {
    render()
})

fetchPlayers();
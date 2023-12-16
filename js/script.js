window.onload = init;

let playerComponent, player, playlist, controllers, visualizer, echo;

function init() {
    console.log("page chargée");
    playerComponent = document.querySelector("my-audio-player");
    console.log(playerComponent);
    playlist = document.querySelector("#playlist");
    controllers = document.querySelector("#controllers");
    visualizer = document.querySelector("#visualizer-component");

    controllers.addEventListener('adjustVolume', (event) => {
        console.log("adjustVolume event received");
        console.log(event.detail);
        playerComponent.setVolume(event.detail);
    });
    
    playlist.addEventListener('changeSong', (event) => {
        console.log("changeSong event received");
        console.log(event.detail);
        playerComponent.setCurrentMusic(event.detail);
        visualizer.dispatchEvent(new CustomEvent('changeSong', { detail: event.detail }));
    });
}

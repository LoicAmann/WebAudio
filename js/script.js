window.onload = init;

let player, playlist;
function init() {
    console.log('page chargée');
    player = document.querySelector('#player');
    playlist = document.querySelector('#playlist');

    playlist.addEventListener('changeSong', (event) => {
        console.log("changeSong event received");
        console.log(event.detail);
        player.setCurrentMusic(event.detail);
    });
}


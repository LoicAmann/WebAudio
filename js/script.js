window.onload = init;

let player, playlist, visualizer;

function init() {
  console.log("page chargée");
  player = document.querySelector("#player");
  playlist = document.querySelector("#playlist");
  visualizer = document.querySelector("visualizer-component");

  playlist.addEventListener("changeSong", (event) => {
    console.log("changeSong event received");
    console.log(event.detail);
    player.setCurrentMusic(event.detail);
    visualizer.dispatchEvent(new CustomEvent('changeSong', { detail: event.detail }));
  });
}

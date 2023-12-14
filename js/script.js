window.onload = init;

let player, playlist, visualizer, eq, echo;

function init() {
    console.log("page chargée");
    player = document.querySelector("#player");
    playlist = document.querySelector("#playlist");
    visualizer = document.querySelector("visualizer-component");
    eq = document.querySelector('#equalizer');
    echo = document.querySelector('#echo');

    playlist.addEventListener('changeSong', (event) => {
        console.log("changeSong event received");
        console.log(event.detail);
        player.setCurrentMusic(event.detail);
        visualizer.dispatchEvent(new CustomEvent('changeSong', { detail: event.detail }));

        eq.setContext(player.getContext());

        player.connect(eq.inputNode, eq.outputNode);
    });
}

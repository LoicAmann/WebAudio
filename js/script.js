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

// Function to handle the song upload
function uploadSong() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (file) {
      const fileName = file.name;
      const filePath = URL.createObjectURL(file);

      // Assuming you have a function to add a new song to the playlist
      playlist.addNewSong({ name: fileName, file: filePath, image: 'img/default.png' });

      // You may want to trigger a changeSong event with the new song
      const newIndex = playlist.songs.length - 1; // Index of the newly added song
      playlist.changeSong(newIndex);
  } else {
      alert('Please select a valid MP3 file.');
  }
}

window.uploadSong = uploadSong; 
window.onload = init;
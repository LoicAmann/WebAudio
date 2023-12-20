window.onload = init;

let playerComponent, player, playlist, controllers, visualizer, echo;

function init() {
    console.log("page chargée");
    playerComponent = document.querySelector("my-audio-player");
    console.log(playerComponent);
    playlist = document.querySelector("#playlist");
    controllers = document.querySelector("#controllers");

    controllers.addEventListener('adjustVolume', (event) => {
        console.log("adjustVolume event received");
        console.log(event.detail);
        playerComponent.setVolume(event.detail);
    });

    playlist.addEventListener('changeSong', (event) => {
        console.log("changeSong event received");
        console.log(event.detail);
        playerComponent.setCurrentMusic(event.detail);
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
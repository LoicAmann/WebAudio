window.onload = init;

let playerComponent, player, playlist, controllers, visualizer, echo;

function init() {
    console.log("page chargée");
    playerComponent = document.querySelector("my-audio-player");
    console.log(playerComponent);
    playlist = document.querySelector("#playlist");
    controllers = document.querySelector("#controllers");

    //Volume
    controllers.addEventListener('adjustVolume', (event) => {
        console.log("adjustVolume event received");
        console.log("The volume is : " + parseInt(event.detail*10));
        playerComponent.setVolume(event.detail);
    });

    //Playlist
    playlist.addEventListener('changeSong', (event) => {
        console.log("changeSong event received");
        playerComponent.setCurrentMusic(event.detail);
    });

    //Echo
    controllers.addEventListener('activateEcho', (event) => {
        console.log("createEcho event received");
        console.log("Activation : " + event.detail);
        playerComponent.activateEcho();
    });
    controllers.addEventListener('deactivateEcho', (event) => {
        console.log("createEcho event received");
        console.log("Deactivation : " + event.detail);
        playerComponent.deactivateEcho();
    });

    //Balance
    controllers.addEventListener('adjustBalance', (event) => {
        console.log("adjustBalance event received");
        console.log("Set balance value : " + event.detail*100);
        playerComponent.setBalance(parseInt(event.detail*100));
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
window.onload = init;

let playerComponent, player, playlist, controllers, visualizer, equalizer;

function init() {
    console.log("page chargée");
    playerComponent = document.querySelector("my-audio-player");
    console.log("Player Component récupéré");
    console.log(playerComponent);
    playlist = document.querySelector("#playlist");
    console.log("Playlist récupérée");
    console.log(playlist);
    controllers = document.querySelector("#controllers");
    console.log("Controllers récupérés");
    console.log(controllers);
    equalizer = controllers.getEqualizerComponent();
    console.log("Equalizer récupéré");
    console.log(equalizer);

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

    //Stereo
    controllers.addEventListener('adjustStereo', (event) => {
        console.log("adjustStereo event received");
        console.log("Set stereo value : " + event.detail);
        playerComponent.setStereo(parseInt(event.detail));
    });

    //Equalizer
    equalizer.addEventListener('clearEqualizer', (event) => {
        console.log("clearEqualizer event received");
        playerComponent.clearEqualizer();
    });
    equalizer.addEventListener('adjustFiltre1', (event) => {
        console.log("adjustFiltre1 event received");
        console.log("Set filtre1 value : " + event.detail);
        playerComponent.setFiltre1(parseInt(event.detail));
    });
    equalizer.addEventListener('adjustFiltre2', (event) => {
        console.log("adjustFiltre2 event received");
        console.log("Set filtre2 value : " + event.detail);
        playerComponent.setFiltre2(parseInt(event.detail));
    });
    equalizer.addEventListener('adjustFiltre3', (event) => {
        console.log("adjustFiltre3 event received");
        console.log("Set filtre3 value : " + event.detail);
        playerComponent.setFiltre3(parseInt(event.detail));
    });
    equalizer.addEventListener('adjustFiltre4', (event) => {
        console.log("adjustFiltre4 event received");
        console.log("Set filtre4 value : " + event.detail);
        playerComponent.setFiltre4(parseInt(event.detail));
    });
    equalizer.addEventListener('adjustFiltre5', (event) => {
        console.log("adjustFiltre5 event received");
        console.log("Set filtre5 value : " + event.detail);
        playerComponent.setFiltre5(parseInt(event.detail));
    });
    equalizer.addEventListener('adjustFiltre6', (event) => {
        console.log("adjustFiltre6 event received");
        console.log("Set filtre6 value : " + event.detail);
        playerComponent.setFiltre6(parseInt(event.detail));
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
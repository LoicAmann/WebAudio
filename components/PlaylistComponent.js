export class PlaylistComponent extends HTMLElement {
    constructor() {

        super(); 
        this.songs = []; 
        this.audio = "assets/songs/CleanGuitarRiff.mp3"; 
        console.log("Current audio : " + this.audio);

        this.playlistContainer = document.createElement('div'); 
        this.playlistContainer.classList.add('playlist-container');
    
        this.appendChild(this.playlistContainer);
        this.fetchSongs();
      
    } 
    
    fetchSongs(){
        const folderPath =  './assets/songs';
        fetch(folderPath + '/songs.json')
        .then(response => response.json())
        .then(data => {
            this.songs = data.songs;
            this.renderPlaylist();
        })
        .catch(error => console.log(error));
    }

    renderPlaylist() {
        this.songs.forEach((song, index) => {
          const songElement = document.createElement('div');
          songElement.textContent = song.name;
          songElement.classList.add('playlist-item');
      
          // Add a click event listener to change the current song when clicked
          songElement.addEventListener('click', () => this.changeSong(index));
      
          this.playlistContainer.appendChild(songElement);
          this.getCurrentSong(); 
          console.log("Current audio from playlist: " + this.audio);

        });
    }

    changeSong(index) {
      // Remove the 'selected-song' class from all playlist items
      const playlistItems = this.playlistContainer.getElementsByClassName('playlist-item');
      for (const item of playlistItems) {
        item.classList.remove('selected-song');
      }
    
      
      // Set the source of the audio element to the selected song
      this.audio = `assets/songs/${this.songs[index].file}`;
      console.log("New audio : " + this.audio);
      this.dispatchEvent(
        new CustomEvent('changeSong', { detail: this.audio })
      );
    
      // Add the 'selected-song' class to the clicked playlist item
      playlistItems[index].classList.add('selected-song');
      //this.setCurrentMusic(this.audio);
    }

    getCurrentSong() {
      return this.audio;
    }

    getIndexOfCurrentSong() {
      return this.songs.findIndex(song => song.file === this.audio);
    }
}
customElements.define('playlist-component', PlaylistComponent);
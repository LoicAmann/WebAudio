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

  fetchSongs() {
    const folderPath = './assets/songs';
    fetch(folderPath + '/songs.json')
      .then(response => response.json())
      .then(data => {
        this.songs = data.songs;
        this.renderPlaylist();
      })
      .catch(error => console.log(error));
  }

  renderPlaylist() {
    this.playlistContainer.innerHTML = ''; 

    this.songs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.textContent = song.name;
        songElement.classList.add('playlist-item');

        const imgElement = document.createElement('img');
        imgElement.src = `assets/${song.image}`;
        imgElement.classList.add('playlist-image');
        songElement.appendChild(imgElement);

        songElement.addEventListener('click', () => this.changeSong(index));

        this.playlistContainer.appendChild(songElement);
    });
    if (this.songs.length > 0) {
        this.changeSong(0);
    }
}

changeSong(index) {
  const playlistItems = this.playlistContainer.getElementsByClassName('playlist-item');
  for (const item of playlistItems) {
      item.classList.remove('selected-song');
  }
  if (this.songs[index] && this.songs[index].file) {
      const songFile = this.songs[index].file;

      if (songFile.startsWith('blob:')) {
          this.audio = songFile;
      } else {
          this.audio = `assets/songs/${songFile}`;
      }

      console.log("New audio : " + this.audio);
      this.dispatchEvent(new CustomEvent('changeSong', { detail: this.audio }));
      playlistItems[index].classList.add('selected-song');
  } else {
      console.error("Invalid song or file path.");
  }
}

  getCurrentSong() {
    return this.audio;
  }

  getIndexOfCurrentSong() {
    return this.songs.findIndex(song => song.file === this.audio);
  }

  addNewSong(song) {
    this.songs.push(song);
    this.renderPlaylist();
}
}

customElements.define('playlist-component', PlaylistComponent);

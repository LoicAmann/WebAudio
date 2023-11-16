export class MyAudioPlayer extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <audio id="player" controls="controls">
        </audio>

        <div id="playerBtnContainer">
          <svg class="buttonsDiv" id="rewindBtn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
          </svg>
          <svg class="buttonsDiv" id="playBtn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
          </svg>
          <svg class="buttonsDiv" id="pauseBtn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
          </svg>
          <svg class="buttonsDiv" id="forwardBtn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
          <svg class="buttonDiv" id="nextTrackBtn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"/>
          </svg>
        </div>
        
        <div id="volumeContainer"> 
          <input type="range" id="volumeRange" min="0" max="1" step="0.1" value="1">
        </div>
      `;
      this.playlist = [];
      this.currentTrack = 0; // Index de la piste actuelle
      console.log('MyAudioPlayer constructor');
    }
  
    connectedCallback() {
      this.defineListeners();
      console.log("connected callback");
    }
  
    attributeChangedCallback() {
      this.player = this.shadowRoot.querySelector('#player');
        this.loadAudio();
    }
  
    static get observedAttributes() {
      return ['src', 'playlist'];
    }
  
    defineListeners() {
      this.player = this.shadowRoot.querySelector('#player');
      this.playBtn = this.shadowRoot.querySelector('#playBtn');
      this.pauseBtn = this.shadowRoot.querySelector('#pauseBtn');
      this.rewindBtn = this.shadowRoot.querySelector('#rewindBtn');
      this.forwardBtn = this.shadowRoot.querySelector('#forwardBtn');
      this.volumeRange = this.shadowRoot.querySelector('#volumeRange');
      this.progressBar = this.shadowRoot.querySelector('#progressBar');
      this.nextTrackBtn = this.shadowRoot.querySelector('#nextTrackBtn');
      
      this.playBtn.addEventListener('click', () => this.play());
      this.pauseBtn.addEventListener('click', () => this.pause());
      this.rewindBtn.addEventListener('click', () => this.rewind());
      this.forwardBtn.addEventListener('click', () => this.forward());
      this.volumeRange.addEventListener('input', () => this.adjustVolume());
      this.player.addEventListener('timeupdate', () => this.updateProgressBar());
      this.nextTrackBtn.addEventListener('click', () => this.nextTrack());
    }
  
    loadAudio() {
      this.player = this.shadowRoot.querySelector('#player');
  
      if (this.hasAttribute('playlist')) {
        const playlist = this.getAttribute('playlist').split(',').map(url => url.trim());
        this.loadPlaylist(playlist);
        console.log(this.player.playlist);
      } else if (this.hasAttribute('src')) {
        const src = this.getAttribute('src');
        this.player.src = src;
        console.log(this.player.src);
      }
    }
  
    loadPlaylist(playlist) {
      this.player = this.shadowRoot.querySelector('#player');
  
      if (playlist.length > 0) {
        this.player.src = playlist[0];
        this.currentTrack = 0;
      }
    }
  
    play() {
      this.player.play();
    }
  
    pause() {
      this.player.pause();
    }
  
    rewind() {
      this.player.currentTime -= 5;
    }
  
    forward() {
      this.player.currentTime += 5;
    }
  
    adjustVolume() {
      this.player.volume = this.volumeRange.value;
    }
  
    updateProgressBar() {
      const currentTime = this.player.currentTime;
      const duration = this.player.duration;
      const progress = (currentTime / duration) * 100;
      this.progressBar.style.width = progress + '%';
    }
  
    nextTrack() {
      if (this.playlist.length > 0) {
        this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
        this.player.src = this.playlist[this.currentTrack];
        this.play();
      }
      else{
        this.player.currentTime = 0;
        this.play();
      }
    }
  }
  
  customElements.define('my-audio-player', MyAudioPlayer);
  
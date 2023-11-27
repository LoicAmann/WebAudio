/**
 * @class MyAudioPlayer
 * @extends HTMLElement
 * @description Custom element pour un lecteur audio
 */

export class MyAudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" type="text/css" href="css/myAudioPlayer.css">

      <audio id="player" controls="controls" preload="metadata">
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
    `;
    console.log('MyAudioPlayer constructor');
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
    this.nextTrackBtn = this.shadowRoot.querySelector('#nextTrackBtn');
    
    this.playBtn.addEventListener('click', () => this.play());
    this.pauseBtn.addEventListener('click', () => this.pause());
    this.rewindBtn.addEventListener('click', () => this.rewind());
    this.forwardBtn.addEventListener('click', () => this.forward());
    this.nextTrackBtn.addEventListener('click', () => this.nextTrack());

    //this.play(); //Play the audio when the page is loaded
  }

  connectedCallback() {
    this.defineListeners();
    console.log("connected callback");
  }

  loadAudio() {
    this.player = this.shadowRoot.querySelector('#player');
    this.player.src = this.getAttribute('src');
  }

  attributeChangedCallback() {
    this.player = this.shadowRoot.querySelector('#player');
    this.loadAudio();
  }

  play() {
    this.player.play();
    this.updatePlayPauseButtonStyle(true); // true pour lecture en cours
  }

  pause() {
    this.player.pause();
    this.updatePlayPauseButtonStyle(false); // true pour lecture en cours

  }

  updatePlayPauseButtonStyle(isPlaying) {
    const playBtn = this.shadowRoot.querySelector('#playBtn');
    const pauseBtn = this.shadowRoot.querySelector('#pauseBtn');

    if (isPlaying) {
        playBtn.style.backgroundColor = '#1DB954'; 
        playBtn.style.fill = "black";
        pauseBtn.style.backgroundColor = 'black'; 
        pauseBtn.style.fill = "#1DB954";
    } else {
        pauseBtn.style.backgroundColor = '#1DB954'; 
        pauseBtn.style.fill = "black";
        playBtn.style.backgroundColor = 'black'; 
        playBtn.style.fill = "#1DB954";
    }
  }

  rewind() {
    this.player.currentTime -= 5;
  }

  forward() {
    this.player.currentTime += 5;
  }
  
}
  
customElements.define('my-audio-player', MyAudioPlayer);
  
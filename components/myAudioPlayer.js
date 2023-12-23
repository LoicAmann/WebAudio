/**
 * @class MyAudioPlayer
 * @extends HTMLElement
 * @description Custom element pour un lecteur audio
 */

let delayNode, panNode, filtres = [], filter60Hz, filter170Hz, filter350Hz, filter1000Hz, filter3500Hz, filter10000Hz;

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
      <canvas id="visualization" width="400" height="100"></canvas>
    `;
    console.log('MyAudioPlayer constructor');

    // Code fourni par le professeur
    this.ctx = new AudioContext();
  }

  static get observedAttributes() {
    return ['src', 'playlist'];
  }

  defineListeners() {
    this.player = this.shadowRoot.querySelector('#player');
    this.player._sourceNode = this.ctx.createMediaElementSource(this.player);
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
    // Code fourni par le professeur
    this.buildAudioGraph();
  
    // Initialize visualization canvas here after a delay
    setTimeout(() => {
      this.visualizationCanvas = this.shadowRoot.querySelector('#visualization');
      this.visualizationContext = this.visualizationCanvas.getContext('2d');
  
      // Connect the analyzer to the source node
      this.analyzer = this.ctx.createAnalyser();
      this.player._sourceNode.connect(this.analyzer);
  
      // Set up the visualization
      this.analyzer.fftSize = 256; // You can adjust this value based on your needs
      const bufferLength = this.analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
  
      // Draw the visualization on the canvas
      const drawVisualization = () => {
        this.analyzer.getByteFrequencyData(dataArray);
  
        this.visualizationContext.clearRect(0, 0, this.visualizationCanvas.width, this.visualizationCanvas.height);
  
        const barWidth = (this.visualizationCanvas.width / bufferLength) * 2.5;
        let x = 0;
  
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 2;
  
          this.visualizationContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
          this.visualizationContext.fillRect(x, this.visualizationCanvas.height - barHeight, barWidth, barHeight);
  
          x += barWidth + 1;
        }
  
        requestAnimationFrame(drawVisualization);
      };
  
      // Start the visualization loop
      drawVisualization();
    }, 0);
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

  setCurrentMusic(music) {
    console.log("set current music : " + music);
    this.player.src = music;
    this.play();
  }

  setVolume(value) {
    // Régler le volume du lecteur audio
    // La valeur de volume doit être entre 0 et 1
    this.player.volume = value;
  }

  activateEcho() {
    // Vérifier si l'effet d'écho n'est pas déjà activé
    if (!delayNode || delayNode === null) {
      // Créer un nœud de retard (delay node) pour l'écho
      delayNode = this.ctx.createDelay();
      delayNode.delayTime.value = 0.5; // Délai de 0.5 seconde pour l'écho
  
      // Connecter le nœud de retard au contexte audio
      delayNode.connect(this.ctx.destination);
  
      // Connecter le nœud de retard entre la source audio et le reste de la chaîne audio
      this.player._sourceNode.connect(delayNode);
      delayNode.connect(this.ctx.destination);
    }
    this.dispatchEvent(
        new CustomEvent('activateEcho', { detail: this.delayNode })
      );
  }
  
  deactivateEcho() {
      // Vérifier si l'effet d'écho est activé
      if (delayNode) {
        // Déconnecter le nœud de retard
        this.player._sourceNode.disconnect(delayNode);
        delayNode.disconnect(this.ctx.destination);
        
        // Réinitialiser la variable du nœud de retard
        delayNode = null;
      }
      this.dispatchEvent(
          new CustomEvent('deactivateEcho', { detail: this.delayNode })
        );
  }

  setStereo(value) {
    if(panNode!=null){
      panNode.disconnect(this.ctx.destination)
    }

    panNode = this.ctx.createStereoPanner();

    // Définir la valeur de panoramique (de -1 à 1)
    // -1 pour tout à gauche, 0 pour au centre, 1 pour tout à droite
    panNode.pan.value = value; // Ajustez la valeur selon vos besoins

    // Connecter la source au nœud de panoramique, puis au contexte de destination
    this.player._sourceNode.connect(panNode);
    panNode.connect(this.ctx.destination);

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

  clearEqualizer() {
    filtres.forEach(filter => {
      // Déconnectez le filtre
      filter.disconnect();
    });
    console.log("clear equalizer");
  }

  setFiltre1(value) {
    if(filter60Hz!=null){
      filter60Hz.disconnect(this.ctx.destination)
    }
    filter60Hz = this.ctx.createBiquadFilter();
    filter60Hz.type = 'peaking'; // Type de filtre peaking
    filter60Hz.frequency.value = 60; // Fréquence cible en Hz
    filter60Hz.Q.value = 1; // Facteur de qualité (ajustez selon vos besoins)
    filter60Hz.gain.value = 0; // Gain (ajustez selon vos besoins)

    filter60Hz.gain.value = value;

    // Connecter la source au filtre 60 Hz, puis au contexte de destination
    this.player._sourceNode.connect(filter60Hz);
    filter60Hz.connect(this.ctx.destination);

    
    console.log("set filtre 1");
    console.log("gain : " + filter60Hz.gain.value);
    console.log("frequency : " + filter60Hz.frequency.value);
  }

  setFiltre2(value) {
    if(filter170Hz!=null){
      filter170Hz.disconnect(this.ctx.destination)
    }
    filter170Hz = this.ctx.createBiquadFilter();
    filter170Hz.type = 'peaking'; // Type de filtre peaking
    filter170Hz.frequency.value = 170; // Fréquence cible en Hz
    filter170Hz.Q.value = 1; // Facteur de qualité (ajustez selon vos besoins)
    filter170Hz.gain.value = 0; // Gain (ajustez selon vos besoins)

    filter170Hz.gain.value = value;

    filtres.push(filter170Hz);

    // Connecter la source au filtre 170 Hz, puis au contexte de destination
    this.player._sourceNode.connect(filter170Hz);
    filter170Hz.connect(this.ctx.destination);

    console.log("set filtre 2");
    console.log("gain : " + filter170Hz.gain.value);
    console.log("frequency : " + filter170Hz.frequency.value);
  }

  setFiltre3(value) {
    if(filter350Hz!=null){
      filter350Hz.disconnect(this.ctx.destination)
    }
    filter350Hz = this.ctx.createBiquadFilter();
    filter350Hz.type = 'peaking'; // Type de filtre peaking
    filter350Hz.frequency.value = 350; // Fréquence cible en Hz
    filter350Hz.Q.value = 1; // Facteur de qualité (ajustez selon vos besoins)
    filter350Hz.gain.value = 0; // Gain (ajustez selon vos besoins)

    filter350Hz.gain.value = value;

    filtres.push(filter350Hz);

    // Connecter la source au filtre 350 Hz, puis au contexte de destination
    this.player._sourceNode.connect(filter350Hz);
    filter350Hz.connect(this.ctx.destination);

    console.log("set filtre 3");
    console.log("gain : " + filter350Hz.gain.value);
    console.log("frequency : " + filter350Hz.frequency.value);
  }

  setFiltre4(value) {
    if(filter1000Hz!=null){
      filter1000Hz.disconnect(this.ctx.destination)
    }
    filter1000Hz = this.ctx.createBiquadFilter();
    filter1000Hz.type = 'peaking'; // Type de filtre peaking
    filter1000Hz.frequency.value = 1000; // Fréquence cible en Hz
    filter1000Hz.Q.value = 1; // Facteur de qualité (ajustez selon vos besoins)
    filter1000Hz.gain.value = 0; // Gain (ajustez selon vos besoins)

    filter1000Hz.gain.value = value;

    filtres.push(filter1000Hz);

    // Connecter la source au filtre 1000 Hz, puis au contexte de destination
    this.player._sourceNode.connect(filter1000Hz);
    filter1000Hz.connect(this.ctx.destination);

    console.log("set filtre 4");
    console.log("gain : " + filter1000Hz.gain.value);
    console.log("frequency : " + filter1000Hz.frequency.value);
  }

  setFiltre5(value) {
    if(filter3500Hz!=null){
      filter3500Hz.disconnect(this.ctx.destination)
    }
    filter3500Hz = this.ctx.createBiquadFilter();
    filter3500Hz.type = 'peaking'; // Type de filtre peaking
    filter3500Hz.frequency.value = 3500; // Fréquence cible en Hz
    filter3500Hz.Q.value = 1; // Facteur de qualité (ajustez selon vos besoins)
    filter3500Hz.gain.value = 0; // Gain (ajustez selon vos besoins)

    filter3500Hz.gain.value = value;

    filtres.push(filter3500Hz);

    // Connecter la source au filtre 3500 Hz, puis au contexte de destination
    this.player._sourceNode.connect(filter3500Hz);
    filter3500Hz.connect(this.ctx.destination);

    console.log("set filtre 5");
    console.log("gain : " + filter3500Hz.gain.value);
    console.log("frequency : " + filter3500Hz.frequency.value);
  }

  setFiltre6(value) {
    if(filter10000Hz!=null){
      filter10000Hz.disconnect(this.ctx.destination)
    }
    filter10000Hz = this.ctx.createBiquadFilter();
    filter10000Hz.type = 'peaking'; // Type de filtre peaking
    filter10000Hz.frequency.value = 10000; // Fréquence cible en Hz
    filter10000Hz.Q.value = 1; // Facteur de qualité (ajustez selon vos besoins)
    filter10000Hz.gain.value = 0; // Gain (ajustez selon vos besoins)

    filter10000Hz.gain.value = value;

    filtres.push(filter10000Hz);

    // Connecter la source au filtre 10000 Hz, puis au contexte de destination
    this.player._sourceNode.connect(filter10000Hz);
    filter10000Hz.connect(this.ctx.destination);

    console.log("set filtre 6");
    console.log("gain : " + filter10000Hz.gain.value);
    console.log("frequency : " + filter10000Hz.frequency.value);
  }



  /**
   * Code fourni par le professeur
   */
  buildAudioGraph() {
    this.source = this.player._sourceNode;
    this.pannerNode = this.ctx.createPanner();

    this.source.connect(this.pannerNode);
    this.pannerNode.connect(this.ctx.destination);

    this.lastNode = this.pannerNode;
  }

  /**
   * Code fourni par le professeur
   */
  connect(inputNode, outputNode) {
    // ex: inputNode est le premier d'une equalizer
    // et outputNode est le dernier d'un equalizer
    this.lastNode.connect(inputNode);
    outputNode.connect(this.ctx.destination);
    
  }
  
}
  
customElements.define('my-audio-player', MyAudioPlayer);
  
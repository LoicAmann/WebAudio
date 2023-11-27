let sharedAudioContext = null;

export class VisualizerComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        canvas {
          width: 100%;
          height: 40%;
        }
      </style>
      <canvas id="canvas"></canvas>
    `;
    this.canvas = this.shadowRoot.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.analyser = null;
    this.player = null;

    this.addEventListener('changeSong', () => {
      this.setupAnalyser();
      this.renderFrame();
    });
  }

  setupAnalyser() {
    if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
      sharedAudioContext = new AudioContext();
    }
  
    if (this.analyser) {
      this.analyser.disconnect();
    }
  
    const audioPlayer = document.querySelector('my-audio-player');
    const playerAudioElement = audioPlayer.shadowRoot.querySelector('#player');
  
    if (sharedAudioContext.state !== 'closed') {
      // Check if the audio element is already connected
      if (!playerAudioElement._sourceNode) {
        playerAudioElement._sourceNode = sharedAudioContext.createMediaElementSource(playerAudioElement);
      }
  
      this.analyser = sharedAudioContext.createAnalyser();
      playerAudioElement._sourceNode.connect(this.analyser);
      this.analyser.connect(sharedAudioContext.destination);
      this.analyser.fftSize = 256;
    }
  }
  
  renderFrame() {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const WIDTH = this.canvas.width;
    const HEIGHT = this.canvas.height;
    const barWidth = (WIDTH / bufferLength) * 2.5;
    let x = 0;

    const render = () => {
      requestAnimationFrame(render);

      x = 0;

      this.analyser.getByteFrequencyData(dataArray);

      this.ctx.fillStyle = "#000";
      this.ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];

        const r = barHeight + (25 * (i / bufferLength));
        const g = 250 * (i / bufferLength);
        const b = 50;

        this.ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        this.ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    render();
  }
}

customElements.define("visualizer-component", VisualizerComponent);

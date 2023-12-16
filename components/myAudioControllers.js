/**
 * @class MyAudioController
 * @extends HTMLElement
 * @description Use for control audio player with buttons, like echo, equalizer, frequency, etc.
 */

import './myEqualizer.js';

export class MyAudioControllers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" type="text/css" href="css/myAudioControllers.css">

        <div id="audio-controllers">
            <div id="div-equ">
                <p>Equalizer</p>

                </div>
            <div id="div-vol"> 
                <p>Volume</p>
                <webaudio-knob id="volume" min="0" max="1" step="0.1" value="0.5" colors="#1DB954;#535f50;#535f50">
                </webaudio-knob>
            </div>
            <div id="div-bal">
                <p>Balance  </p>
                <webaudio-slider
                    style="margin-right: 20px;"
                    id="filtre_1"
                    value=1
                    min=-30
                    max=30
                    step=0.1
                    basewidth=24
                    baseheight=128
                    knobwidth=24
                    knobheight=24
                    ditchlength=100
                    colors="#1DB954;#535f50;#535f50"
                ></webaudio-slider>
                <p>Echo</p>
                <webaudio-switch
                    id="echo"
                    colors="#1DB954;#535f50;#535f50"
                ></webaudio-switch>
            </div>
        </div>
        `;  
        console.log('My audio controller constructor');
    }

    defineListeners() {
        this.equalizer = this.shadowRoot.querySelector('#equalizer');
        this.player = document.querySelector("#player");
        this.volume = this.shadowRoot.querySelector('#volume');

        this.volume.addEventListener('input', () => this.adjustVolume());
    }

    connectedCallback() {
        this.defineListeners();
        console.log("connected callback connectors");
    }

    adjustVolume() {
        this.dispatchEvent(
            new CustomEvent('adjustVolume', { detail: this.volume.value })
          );
    }

    getVolume() {
        console.log("Controller Volume value get : " + this.volume.value);
        return this.volume.value;
    }

    createEcho(audioContext, source) {
        const echoNode = audioContext.createDelay();
        echoNode.delayTime.value = 0.5; // Ajustez le délai selon vos besoins
  
        // Connectez le nœud d'écho entre la source audio et la destination audio
        source.connect(echoNode);
        echoNode.connect(audioContext.destination);
  
        return echoNode;
      }

}
customElements.define('my-audio-controllers', MyAudioControllers);
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
                <webaudio-knob id="volume" min="0" max="1" step="0.1" value="1" colors="#1DB954;#535f50;#535f50">
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
        this.echo = this.shadowRoot.querySelector('#echo');

        this.volume.addEventListener('input', () => this.adjustVolume());
        this.echo.addEventListener('change', (event) => {
            const isEchoEnabled = this.echo.value; // Vérifiez si le bouton est activé ou désactivé
          
            // En fonction de l'état du bouton, activez ou désactivez l'écho
            if (isEchoEnabled) {
              // Activer l'écho
              // Appeler une fonction ou émettre un événement pour activer l'écho
              this.activateEcho();
            } else {
              // Désactiver l'écho
              // Appeler une fonction ou émettre un événement pour désactiver l'écho
              this.deactivateEcho();
            }
          });
    }

    connectedCallback() {
        this.defineListeners();

        console.log("connected callback controllers");

    }

    activateEcho() {
        this.dispatchEvent(
            new CustomEvent('activateEcho', { detail: this.echo.value })
          );
    }

    deactivateEcho() {
        this.dispatchEvent(
            new CustomEvent('deactivateEcho', { detail: this.echo.value })
          );
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

    

}
customElements.define('my-audio-controllers', MyAudioControllers);
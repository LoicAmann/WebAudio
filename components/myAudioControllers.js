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
                <h2>Equalizer</2>
            </div>
            <div id="div-vol" style="display: flex; flex-direction: column; align-items: center; text-align: center;"> 
                <h2>Volume</h2>
                <p id="volumeValue">10<p>
                <webaudio-knob id="volume" min="0" max="1" step="0.1" value="1" colors="#1DB954;#535f50;#535f50">
                </webaudio-knob>
            </div>
            <div id="div-bal" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <h2>Balance</h2>
                <div style="display: grid;
                grid-template-columns: 1fr 1fr;">
                    <webaudio-slider
                        style="margin-right: 20px;"
                        id="balance"
                        value=0
                        min=0
                        max=24
                        step=0.1
                        basewidth=24
                        baseheight=128
                        knobwidth=24
                        knobheight=24
                        ditchlength=100
                        colors="#1DB954;#535f50;#535f50"
                    ></webaudio-slider>
                    <p style="font-size=;">< Aigue</p>
                </div>
                <h2>Echo</h2>
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
        this.volumeValue = this.shadowRoot.querySelector('#volumeValue');
        this.balance = this.shadowRoot.querySelector('#balance');
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
          this.balance.addEventListener('input', () => this.adjustBalance());
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
        this.volumeValue.innerHTML = parseInt(this.volume.value*10);
        this.dispatchEvent(
            new CustomEvent('adjustVolume', { detail: this.volume.value })
          );
    }

    adjustBalance() {
        this.dispatchEvent(
            new CustomEvent('adjustBalance', { detail: this.balance.value *10 })
          );
    }

    getVolume() {
        console.log("Controller Volume value get : " + this.volume.value);
        return this.volume.value;
    }

    

}
customElements.define('my-audio-controllers', MyAudioControllers);
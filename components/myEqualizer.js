/**
 * @class MyFreq
 * @param {HTMLElement} element
 * @extends HTMLElement
 * @description Custom element Frequency pour un lecteur audio
 */

import '../librairies/webaudio-controls.js';

export class MyEqualizer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="css/myEqualizer.css">
            <button id="clearEqualizer">Clear</button>
            <div id="grid-equ">
                <div id="div-60hz" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <h3>60hz</h3>
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
                    <p id="filtre1Value">1</p>
                </div>

                <div id="div-170hz" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <h3>170hz</h3>
                    <webaudio-slider
                        style="margin-right: 20px;"
                        id="filtre_2"
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
                    <p id="filtre2Value">1</p>
                </div>

                <div id="div-350hz" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <h3>350hz</h3>
                    <webaudio-slider
                        style="margin-right: 20px;"
                        id="filtre_3"
                        value=1
                        min=-30
                        max=30
                        step=0.1
                        basewidth=240
                        baseheight=128
                        knobwidth=24
                        knobheight=24
                        ditchlength=100
                        colors="#1DB954;#535f50;#535f50"
                    ></webaudio-slider>
                    <p id="filtre3Value">1</p>
                </div>

                <div id="div-1000hz" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <h3>1000hz</h3>
                    <webaudio-slider
                        style="margin-right: 20px;"
                        id="filtre_4"
                        value=1
                        min=-30
                        max=30
                        step=0.1
                        basewidth=24
                        baseheight=128
                        knobwidth=24
                        knobheight=24
                        ditchlength=100
                        tooltip="freq 1000hz"
                        colors="#1DB954;#535f50;#535f50"
                    ></webaudio-slider>
                    <p id="filtre4Value">1</p>
                </div>

                <div id="div-3500hz" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <h3>3500hz</h3>
                    <webaudio-slider
                        style="margin-right: 20px;"
                        id="filtre_5"
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
                    <p id="filtre5Value">1</p>
                </div>

                <div id="div-10000hz" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <h3>10000hz</h3>
                    <webaudio-slider
                        style="margin-right: 20px;"
                        id="filtre_6"
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
                    <p id="filtre6Value">1</p>
                </div>
            </div>
        `;
        console.log('MyEqualizer constructor');
    }

    defineListeners() {
        this.filter1 = this.shadowRoot.querySelector('#filtre_1');
        this.filter2 = this.shadowRoot.querySelector('#filtre_2');
        this.filter3 = this.shadowRoot.querySelector('#filtre_3');
        this.filter4 = this.shadowRoot.querySelector('#filtre_4');
        this.filter5 = this.shadowRoot.querySelector('#filtre_5');
        this.filter6 = this.shadowRoot.querySelector('#filtre_6');
        this.clearEqualizerButton = this.shadowRoot.querySelector('#clearEqualizer');

        this.dispatchEvent(new CustomEvent('setNodesFiltres', { detail: "set nodes filtres"}));
        

        this.clearEqualizerButton.addEventListener('click', () => this.clearEqualizer());
        this.filter1.addEventListener('input', () => this.adjustFiltre1());
        this.filter2.addEventListener('input', () => this.adjustFiltre2());
        this.filter3.addEventListener('input', () => this.adjustFiltre3());
        this.filter4.addEventListener('input', () => this.adjustFiltre4());
        this.filter5.addEventListener('input', () => this.adjustFiltre5());
        this.filter6.addEventListener('input', () => this.adjustFiltre6());
    }

    connectedCallback() {
        this.defineListeners();
        console.log("connected callback equalizer");
    }

    adjustFiltre1() {
        this.shadowRoot.querySelector('#filtre1Value').innerHTML = parseInt(this.filter1.value);
        this.dispatchEvent(
            new CustomEvent('adjustFiltre1', { detail: this.filter1.value })
          );
    }

    adjustFiltre2() {
        this.shadowRoot.querySelector('#filtre2Value').innerHTML = parseInt(this.filter2.value);
        this.dispatchEvent(
            new CustomEvent('adjustFiltre2', { detail: this.filter2.value })
          );
    }

    adjustFiltre3() {
        this.shadowRoot.querySelector('#filtre3Value').innerHTML = parseInt(this.filter3.value);
        this.dispatchEvent(
            new CustomEvent('adjustFiltre3', { detail: this.filter3.value })
          );
    }

    adjustFiltre4() {
        this.shadowRoot.querySelector('#filtre4Value').innerHTML = parseInt(this.filter4.value);
        this.dispatchEvent(
            new CustomEvent('adjustFiltre4', { detail: this.filter4.value })
          );
    }

    adjustFiltre5() {
        this.shadowRoot.querySelector('#filtre5Value').innerHTML = parseInt(this.filter5.value);
        this.dispatchEvent(
            new CustomEvent('adjustFiltre5', { detail: this.filter5.value })
          );
    }

    adjustFiltre6() {
        this.shadowRoot.querySelector('#filtre6Value').innerHTML = parseInt(this.filter6.value);
        this.dispatchEvent(
            new CustomEvent('adjustFiltre6', { detail: this.filter6.value })
          );
    }

    clearEqualizer() {
        console.log("clear equalizer");

        this.filter1.value = 1;
        this.filter2.value = 1;
        this.filter3.value = 1;
        this.filter4.value = 1;
        this.filter5.value = 1;
        this.filter6.value = 1;

        this.shadowRoot.querySelector('#filtre1Value').innerHTML = parseInt(this.filter1.value);
        this.shadowRoot.querySelector('#filtre2Value').innerHTML = parseInt(this.filter2.value);
        this.shadowRoot.querySelector('#filtre3Value').innerHTML = parseInt(this.filter3.value);
        this.shadowRoot.querySelector('#filtre4Value').innerHTML = parseInt(this.filter4.value);
        this.shadowRoot.querySelector('#filtre5Value').innerHTML = parseInt(this.filter5.value);
        this.shadowRoot.querySelector('#filtre6Value').innerHTML = parseInt(this.filter6.value);

        this.dispatchEvent(
            new CustomEvent('clearEqualizer', { detail: "clear equalizer" })
          );
    }
        
}
customElements.define('my-equ', MyEqualizer);
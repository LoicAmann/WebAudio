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
            <my-equ id="equalizer"></my-equ>
        `;  
        console.log('My audio controller constructor');
    }

    defineListeners() {
        this.freq = this.shadowRoot.querySelector('#freq');
        this.freq.addEventListener('input', () => this.changeFreq());
    }

    callback() {
        this.defineListeners();
        console.log("connected callback");
    }

}
customElements.define('my-audio-controllers', MyAudioControllers);
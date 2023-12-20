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
        <webaudio-knob min="0" max="1" step="0.1" value="1" colors="#1DB954;#535f50;#535f50">
        </webaudio-knob>
        `;
        console.log('MyEqualizer constructor');
    }

    defineListeners() {
    }

    connectedCallback() {
        this.defineListeners();
        console.log("connected callback");
    }

    /**
     * Code fourni par le professeur
     * @param {*} ctx context audio vu dans le MyAudioPlayer
     */
    setContext(ctx) {
        this.ctx = ctx;
        this.buildAudioGraph();
    }

    /**
     * Code fourni par le professeur
     * @param {*} ctx audio context vu dans le MyAudioPlayer
     * @param {*} sourceNode sortie du node précédent
     */
    buildAudioGraph(ctx, sourceNode) {
        // on construit les 6 filtres
        this.filter1 = ctx.createBiquadFilter();
        this.filter2 = ctx.createBiquadFilter();
        this.filter3 = ctx.createBiquadFilter();
        this.filter4 = ctx.createBiquadFilter();
        this.filter5 = ctx.createBiquadFilter();
        this.filter6 = ctx.createBiquadFilter();
        // connect them in series for an eq
        sourceNode.connect(this.filter1);
        this.filter1.connect(this.filter2);
        this.filter2.connect(this.filter3);
        this.filter3.connect(this.filter4);
        this.filter4.connect(this.filter5);
        this.filter5.connect(this.filter6);
    
        // on definit le noeud de sortie
        this.inputNode = this.filter1;
        this.outputNode = this.filter6;
      }
        
}
customElements.define('my-vol', MyEqualizer);
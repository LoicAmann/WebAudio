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

            <p>60hz</p>
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
                tooltip="freq 60hz"
                colors="#1DB954;#535f50;#ff0"
            ></webaudio-slider>

            <p>170hz</p>
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
                tooltip="freq 170hz"
                colors="#1DB954;#535f50;#ff0"
            ></webaudio-slider>

            <p>350hz</p>
            <webaudio-slider
                style="margin-right: 20px;"
                id="filtre_3"
                value=1
                min=-30
                max=30
                step=0.1
                basewidth=24
                baseheight=128
                knobwidth=24
                knobheight=24
                ditchlength=100
                tooltip="freq 350hz"
                colors="#1DB954;#535f50;#ff0"
            ></webaudio-slider>

            <p>1000hz</p>
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
                colors="#1DB954;#535f50;#ff0"
            ></webaudio-slider>

            <p>3500hz</p>
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
                tooltip="freq 3500hz"   
                colors="#1DB954;#535f50;#ff0"
            ></webaudio-slider>

            <p>10000hz</p>
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
                tooltip="freq 10000hz"
                colors="#1DB954;#535f50;#ff0"
            ></webaudio-slider>
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
customElements.define('my-equ', MyEqualizer);
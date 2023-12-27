# WebAudio

This is a university project for M. Buffa's M2 MIAGE INTENSE course.

Here's the link to our publicly hosted site:
https://loicamann.github.io/WebAudio/

To download the code, and access it in your development environment, here's how to do it :
- To install git, follow this link: https://git-scm.com/downloads
- Once done, open a terminal on your computer
- Go to the folder of your choice to download the project
- Issue the command `git clone https://github.com/LoicAmann/WebAudio.git`
The project is now on your computer, congrats!

If you'd like to run the project locally, please follow these tips. This only applies if you're using Visual Studio Code.
- Download the "Live Server" plugin
![image](https://github.com/LoicAmann/WebAudio/assets/70748202/4eaeb22a-8880-4a8c-8622-4a7f0fd18740)
- Once you've done this, you'll see the text "Go live" in the bottom right-hand corner of the VSCode window. Simply click on it, and a web page will open up
![image](https://github.com/LoicAmann/WebAudio/assets/70748202/64fd3a44-684f-4fb9-a76b-0208f7860292)

# Fonctionnalités : 
Nous mettons à disposition une playlist comprenant des chansons préétablies. Vous avez la possibilité d'ajouter un (ou plusieurs !) fichier audio à cette playlist en cliquant sur "Add a song !". De plus, il est possible d'interrompre, de faire avancer ou reculer la lecture de la chanson selon vos préférences.
![image](https://github.com/LoicAmann/WebAudio/assets/77619552/f5cb04f2-d9c3-49c6-9fd2-706519475131)

Visualisez le song produit : ![image](https://github.com/LoicAmann/WebAudio/assets/77619552/49629acb-1bfe-4774-8c42-9ce13ab65e8a)

Au sein de la section Equalizer, vous avez la liberté de modifier le morceau en cours de lecture. 
![image](https://github.com/LoicAmann/WebAudio/assets/77619552/60953fbd-a860-4ebd-9038-853d69700618)

# Développement et difficultés rencontrées : 
Notre compréhension du développement des Web Components à l'aide de JavaScript, HTML et CSS s'est révélée relativement solide. Cependant, nous avons rencontré certaines difficultés lors de la manipulation des éléments de Web Audio et de la visualisation des chansons.

Nous avons pris soin de maintenir une séparation claire entre les différents composants du projet. Néanmoins, la partie dédiée à la visualisation des chansons a nécessité une fusion avec le composant Audio Player en raison de défis liés à la gestion des contextes audio.

Afin de vous donner un aperçu du projet originalement, ci-dessous se trouve un extrait avec le composant de visualisation séparé :

https://github.com/LoicAmann/WebAudio/assets/77619552/a5dcfccd-a6fb-4890-9bf3-301b4ec82ae2

Nous avons également testé l'intégration de plusieurs visualiser : Butterchurn, wave.js ...

# Inspiration : 
Nous avons utilisé et modifié le code open source suivant pour l'ajout d'une chanson et la visualisation du song : 
https://codepen.io/nfj525/pen/rVBaab?editors=1111 
Les codes couleurs du site sont inspirées de ceux de Spotify : ![image](https://github.com/LoicAmann/WebAudio/assets/77619552/aeaaa0ba-04be-46eb-ad8f-da84e8a80f1d)


"use strict";

class Audio {

    constructor() {
        this.fadein;
        this.fadeinMus;
    }

    /**
     * DÉFINIR LA MUSIQUE
     * @param {Le chemin relatif vers la musique} srcMusique
     */
    setMusique(srcMusique) {
        this.srcMusique = srcMusique;
        if (document.getElementById('musique') == undefined) {
            this.musique = document.createElement('audio');
            this.musique.setAttribute('id', "musique");

            this.creerSrc(srcMusique, this.musique);

            // this.musique.setAttribute('autoplay', "true");
            this.musique.setAttribute('loop', "true");
            document.body.appendChild(this.musique);
        }
    }

    /**
     * DÉFINIR LE SON DU BONUS
     * @param {Le chemin relatif vers le son ok} srcOk
     */
    setOk(srcOk) {
        if (document.getElementById('sonOk') == undefined) {
            this.srcOk = srcOk;
            this.sonOk = document.createElement('audio');
            this.sonOk.setAttribute('id', "sonOk");

            this.creerSrc(srcOk, this.sonOk);

            document.body.appendChild(this.sonOk);
        }
    }

    /**
     * DÉFINIR LE SON D'UN PROBLÈME
     * @param {Le chemin relatif vers le son pb} srcPb
     */
    setPb(srcPb) {
        if (document.getElementById('sonPb') == undefined) {
            this.srcPb = srcPb;
            this.sonPb = document.createElement('audio');
            this.sonPb.setAttribute('id', "sonPb");

            this.creerSrc(srcPb, this.sonPb);

            document.body.appendChild(this.sonPb);
        } else {
            this.sonOk.setAttribute('src', this.srcPb);
        }
    }

    /**
     * DÉFINIR LE SON FAIRE VITE
     * @param {Le chemin relatif vers le son faire vite} srcVite
     */
    setVite(srcVite) {
        if (document.getElementById('sonVite') == undefined) {
            this.srcVite = srcVite;
            this.sonVite = document.createElement('audio');
            this.sonVite.setAttribute('id', "sonVite");
            this.sonVite.setAttribute('loop', "true");

            this.creerSrc(srcVite, this.sonVite);

            document.body.appendChild(this.sonVite);
        } else {
            this.sonOk.setAttribute('src', this.srcVite);
        }
    }

    /**
     * DÉFINIR LE SON PERDU
     * @param {Le chemin relatif vers le son perdu} srcPerdu
     */
    setPerdu(srcPerdu) {
        if (document.getElementById('sonPerdu') == undefined) {
            this.srcPerdu = srcPerdu;
            this.sonPerdu = document.createElement('audio');
            this.sonPerdu.setAttribute('id', "sonPerdu");

            this.creerSrc(srcPerdu, this.sonPerdu);

            document.body.appendChild(this.sonPerdu);
        } else {
            this.sonOk.setAttribute('src', this.srcPerdu);
        }
    }

    /**
     * DÉFINIR LE SON GAGNE
     * @param {Le chemin relatif vers le son gagne} srcGagne
     */
    setGagne(srcGagne) {
        if (document.getElementById('sonGagne') == undefined) {
            this.srcGagne = srcGagne;
            this.sonGagne = document.createElement('audio');
            this.sonGagne.setAttribute('id', "sonGagne");

            this.creerSrc(srcGagne, this.sonGagne);

            document.body.appendChild(this.sonGagne);
        } else {
            this.sonOk.setAttribute('src', this.srcGagne);
        }
    }

    /**
     * DÉFINIR LE SON SCORE
     * @param {Le chemin relatif vers le son score} srcScore
     */
    setScore(srcScore) {
        if (document.getElementById('sonScore') == undefined) {
            this.srcScore = srcScore;
            this.sonScore = document.createElement('audio');
            this.sonScore.setAttribute('id', "sonScore");

            this.creerSrc(srcScore, this.sonScore);

            document.body.appendChild(this.sonScore);
        } else {
            this.sonOk.setAttribute('src', this.srcScore);
        }
    }

    /**
     * DÉFINIR LE SON EXTRA-CHOU
     * @param {Le chemin relatif vers le son extreChou} srcExChou
     */
    setExChou(srcExChou) {
        if (document.getElementById('sonExChou') == undefined) {
            this.srcExChou = srcExChou;
            this.sonExChou = document.createElement('audio');
            this.sonExChou.setAttribute('id', "sonExChou");

            this.creerSrc(srcExChou, this.sonExChou);

            document.body.appendChild(this.sonExChou);
        } else {
            this.sonOk.setAttribute('src', this.srcExChou);
        }
    }

    /**
     * LIRE LA MUSIQUE
     */
    getMusique() {
        this.musique.play();
    }

    /**
     * LIRE LE SON DU BONUS
     */
    getOk() {
        this.sonOk.play();
    }

    /**
     * LIRE LE SON DU PROBLÈME
     */
    getPb() {
        this.sonPb.play();
    }

    /**
     * LIRE LE SON FAIRE VITE
     */
    getStartVite() {
        clearInterval(this.fadeinMus);
        clearInterval(this.fadein);
        this.musique.volume = 0.15;
        this.sonVite.play();
    }

    /**
     * STOPPER LE SON FAIRE VITE
     */
    getStopVite() {
        this.sonVite.pause();
    }

    /**
     * LIRE LE SON PERDU
     */
    getPerdu() {
        clearInterval(this.fadeinMus);
        clearInterval(this.fadein);
        this.musique.volume = 0.2;
        this.sonPerdu.play();
        let o = this;
        this.sonPerdu.onended = function () {
            o.fadeInMusique();
        };
    }

    /**
     * LIRE LE SON GAGNE
     */
    getGagne() {
        clearInterval(this.fadeinMus);
        clearInterval(this.fadein);
        this.musique.volume = 0;
        this.sonExChou.pause();
        this.sonExChou.currentTime = 0;
        this.sonGagne.currentTime = 0;
        this.sonGagne.play();
        let o = this;
        this.sonGagne.onended = function () {
            o.fadeInRapMusique();
        };
    }

    /**
     * LIRE LE SON EXTRA CHOU
     */
    getExChou() {
        clearInterval(this.fadeinMus);
        clearInterval(this.fadein);
        this.musique.volume = 0.1;
        this.sonVite.volume = 0.5;
        this.sonExChou.currentTime = 0;
        this.sonGagne.currentTime = 0;
        this.sonExChou.play();
        let o = this;
        this.sonExChou.onended = function () {
            o.fadeInRapMusique();
        };
    }

    /**
     * FADE IN POUR LA MUSIQUE
     */
    fadeInMusique() {
        let o=this;
        this.fadeinMus = setInterval(
            function () {
                let vol=o.musique.volume;
                if ((vol+0.09) < 1) {
                    vol += 0.09;
                    o.musique.volume=vol;
                } else {
                    o.musique.volume=1;
                    clearInterval(this.fadeinMus);
                }
            }, 200);
    }

    /**
     * FADE IN RAPIDE POUR LA MUSIQUE
     */
    fadeInRapMusique() {
        let o=this;
        this.fadein = setInterval(
            function () {
                let vol=o.musique.volume;
                if ((vol+0.14) < 1) {
                    vol += 0.14;
                    o.musique.volume=vol;
                } else {
                    o.musique.volume=1;
                    clearInterval(this.fadein);
                }
            }, 200);
    }

    /**
     * RETIRER LE FADE IN
     */
    fadeInSupp(){
        clearInterval(this.fadeinMus);
        clearInterval(this.fadein);
        this.sonExChou.pause();
        this.sonGagne.pause();
        this.musique.volume=1
    }

    /**
     * LIRE LE SON SCORE
     */
    getScore() {
        if(this.sonScore.currentTime>0.03)this.sonScore.currentTime = 0;
        this.sonScore.play();
    }

    /**
     *  AJOUTER LES SOURCES AUX DIFFERENTS FORMATS
     */
    creerSrc(tabSrc, objJoue) {
        for (let i = 0; i < tabSrc.length; i++) {
            let elemSrc = document.createElement('source');
            elemSrc.setAttribute('src', tabSrc[i]);
            if (tabSrc[i].split(".", 1) === "ogg") elemSrc.setAttribute('type', "audio/ogg");
            else if (this.srcMusique[i].split(".", 1) === "mp3") elemSrc.setAttribute('type', "audio/mpeg");
            objJoue.appendChild(elemSrc);
        }
    }
}
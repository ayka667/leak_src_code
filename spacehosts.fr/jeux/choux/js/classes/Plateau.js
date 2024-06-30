"use strict";

class Plateau {

    /**
     * CONSTRUCTEUR DU PLATEAU
     * @param {*Le numéro de l'image à charger} number
     * @param {*La largeur du plateau} width
     * @param {*La hauteur du plateau} height
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cptImages = 0;

        /**
         * INIT DU CANVAS
         */
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', "jeux");
    }

    /**
     * Initialiser le fond
     */
    init(o, i, ttImages) {
        let hv, w, h;
        window.innerWidth > window.innerHeight ? hv = true : hv = false;
        this.fond = new Array(ttImages);
        if (hv) {
            /**
             * INIT DU FOND (+LARGE QUE HAUT 2239 2235)
             */
            this.canvas.setAttribute('width', this.height / (2235 / 2239));
            this.canvas.setAttribute('height', this.height);
            w = this.height / (2235 / 2239);
            h = this.height;
        } else {
            /**
             * INIT DU FOND (-LARGE QUE HAUT 2239 2235)
             */
            this.canvas.setAttribute('width', this.width / (2235 / 2239));
            this.canvas.setAttribute('height', this.width);
            w = this.height / (2235 / 2239);
            h = this.width;
        }
        this.setFond(i);
        this.charger(o, w, h);
    }

    /**
     * Charger le dernier fond puis continuer
     * @param o L'objet Main
     * @param width La largeur de l'image
     * @param height La hauteur de l'image
     */
    charger(o, width, height) {
        for (let a = 0; a < this.fond.length; a++) {
            this.fond[a] = new Image(width, height)
            this.fond[a].src = './img/' + a + '.jpg';
            this.chargement(o, this.fond[a]);
        }
    }

    /**
     * Informations de chargement
     * @param ob L'objet Main
     * @param image Image courante à charger
     */
    chargement(ob, image) {
        let o = this;
        // Quand l'image est chargée
        image.onload = function () {
            o.cptImages++;
            if (o.fond.length === o.cptImages) {
                document.body.appendChild(o.canvas);
                ob.pret();
            } else {
                ob.chargementImage((Math.round((o.cptImages/o.fond.length)*100)).toString())
            }
        }
    }

    /**
     * Définir le fond
     * @param i L'indice de l'image à charger
     */
    setFond(i) {
        this.iFond = i;
    }

    /**
     * RÉCUPÉRER L'IMAGE ACTUELLE
     */
    getIFond() {
        return this.iFond;
    }

    /**
     * RÉCUPÉRER L'IMAGE
     */
    getFond() {
        return this.fond[this.iFond];
    }

    /**
     * RÉCUPÉRER LE CANVAS
     */
    getCanvas() {
        return this.canvas;
    }

    /**
     * RÉCUPÉRER LA LARGEUR DU CANVAS
     */
    getWidth() {
        return this.canvas.width;
    }

    /**
     * RÉCUPÉRER LA HAUTEUR DU CANVAS
     */
    getHeight() {
        return this.canvas.height;
    }

}
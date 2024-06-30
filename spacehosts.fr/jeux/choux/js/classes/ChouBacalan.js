"use strict";

class ChouBacalan extends Element {
    /**
     * CONSTRUCTEUR DU CHOU BACALAN
     * @param {*Le chamin relatif de l'image du chou bacalan} src
     * @param {*Largeur du chou bacalan} imgW
     * @param {*Hauteur du chou bacalan} imgH
     * @param {*Le plateau pour le positionner} plateau 
     * @param {*La position horizontale du chou bacalan} x
     * @param {*La position verticale du chou bacalan} y
     */
    constructor(src, imgW, imgH, plateau, x, y) {
        // INITIALISER LE HERO
        var img = new Image(imgW, imgH);
        img.src = src;

        super("chouBacalan", plateau, x, y, imgW, imgH, x, y, 0);
        this.img = img;
        this.w = imgW;
        this.h = imgH;
    }
    /**
    * RÉCUPÉRER L'IMAGE DU CHOU BACALAN
    */
    getImage() {
        return this.img;
    }
}
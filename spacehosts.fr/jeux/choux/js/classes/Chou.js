"use strict";

class Chou extends Element {
    /**
     * CONSTRUCTEUR DU CHOU
     * @param {*Le chamin relatif de l'image du chou} src
     * @param {*Largeur du chou} imgW
     * @param {*Hauteur du chou} imgH
     * @param {*Le plateau pour le positionner} plateau 
     * @param {*La position horizontale du chou} x
     * @param {*La position verticale du chou} y
     */
    constructor(src, imgW, imgH, plateau, x, y) {
        // INITIALISER LE HERO
        var img = new Image(imgW, imgH);
        img.src = src;

        super("chou", plateau, x, y, imgW, imgH, x, y, 0);
        this.img = img;
        this.w = imgW;
        this.h = imgH;
    }
    /**
    * RÉCUPÉRER L'IMAGE DU CHOU
    */
    getImage() {
        return this.img;
    }
}
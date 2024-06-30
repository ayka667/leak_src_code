"use strict";

class Maire extends Element {
    /**
     * CONSTRUCTEUR DU MAIRE
     * @param {*Le chamin relatif de l'image de la maire} src
     * @param {*Largeur de la maire} imgW
     * @param {*Hauteur de la maire} imgH
     * @param {*La position horizontale de la maire} x
     * @param {*La position verticale de la maire} y
     */
    constructor(src, imgW, imgH, plateau, x, y) {
        var img = new Image(imgW, imgH);
        img.src = src;

        super("maire", plateau, x, y, imgW, imgH);
        this.img = img;
        this.w = imgW;
        this.h = imgH;
    }
    /**
     * RÉCUPÉRER L'IMAGE DE L'OBSTACLE
     */
    getImage() {
        return this.img;
    }

}
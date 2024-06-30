"use strict";

class Perso extends Element {
    /**
     * CONSTRUCTEUR DU HERO
     * @param {*Le chamin relatif des images du héro} src
     * @param {*Largeur du héro} imgW 
     * @param {*Hauteur du héro} imgH 
     * @param {*Le plateau pour le positionner} plateau 
     * @param {*La vitesse du héro} vitesse 
     */
    constructor(src, imgW, imgH, plateau, vitesse) {
        var milieuX = (plateau.getWidth() / 2) - (imgW / 2);
        var milieuY = (plateau.getHeight() / 2) - (imgH / 2);

        super("hero", plateau, milieuX, milieuY, imgW, imgH, parseInt((plateau.getWidth() / 2) - (imgW / 2)), parseInt((plateau.getHeight() / 2) - (imgH / 2)), vitesse,1);

        this.img = new Array();
        this.charger(src,imgW, imgH);

        this.w = imgW;
        this.h = imgH;
        this.humanoide = super.getHumanoide();
        // INITIALISER LE HERO POUR LIRE LE MSG
        this.humanoide.y = this.humanoide.originY+this.h;
        this.imgCourante = 0;
    }

    /**
     * Charger les images
     * @param src Le tableau des images
     * @param width La largeur de l'image
     * @param height La hauteur de l'image
     */
    charger(src,width, height) {
        for (let a = 0; a < src.length; a++) {
            this.img[a] = new Image(width, height)
            this.img[a].src = src[a];
        }
    }
    /**
     * DEFINIR L'IMAGE DU HÉRO
     */
    setIndiceImage(i) {
        this.imgCourante=i;
    }
    /**
     * RÉCUPÉRER L'INDICE DE L'IMAGE
     */
    getIndiceImage(i) {
        return this.imgCourante;
    }
    /**
     * RÉCUPÉRER L'IMAGE DU HÉRO
     */
    getImage() {
        return this.img[this.imgCourante];
    }
     /**
     * INITIALISER LA POSITION DU HÉRO (AU CENTRE DE L'ÉCRAN)
     * POUR LIRE LE MSG
     */
    init() {
        this.humanoide.x = this.humanoide.originX;
        this.humanoide.y = this.humanoide.originY+this.h;
    }
}


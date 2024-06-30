"use strict";

class Element {
    /**
     * CONSTRUCTEUR DE L'ELEMENT
     * @param {*Le type d'element (héro,monstre)} leType
     * @param {*Le plateau pour le positionner} plateau
     * @param {*la position horizontale de l'element} x
     * @param {*La position verticale de l'element} y
     * @param {*La largeur de l'element} w
     * @param {*La hauteur de l'element} h
     * @param {*La postion horizontale par défaut de l'element} originX
     * @param {*La postion verticale par défaut de l'element}} originY
     * @param {*La vitesse de l'element} vitesse
     */
    constructor(leType, plateau, x, y, w, h, originX, originY, vitesse, velo) {
        this.veloH = 0;
        this.veloB = 0;
        this.veloG = 0;
        this.veloD = 0;
        this.plateau = plateau;
        this.plateauW = plateau.getWidth();
        this.plateauH = plateau.getHeight();
        this.vitesse = vitesse;
        this.element = {
            velo: velo,
            type: leType,
            x: parseInt(x),
            y: parseInt(y),
            h: parseInt(h),
            w: parseInt(w),
            originX: parseInt(originX),
            originY: parseInt(originY),
            visible: true,
            haut: false,
            bas: false,
            gauche: false,
            droite: false
        }
    }

    /**
     * RÉCUPERER L'ELEMENT
     */
    getHumanoide() {
        return this.element;
    }

    /**
     * RÉCUPÉRER LA POSITION HORIZONTALE DE L'ELEMENT
     */
    getPositionX() {
        return this.element.x;
    }

    /**
     * RÉCUPÉRER LA POSITION VERTICALE DE L'ELEMENT
     */
    getPositionY() {
        return this.element.y;
    }

    /**
     * RÉCUPÉRER LA LARGEUR DE L'ELEMENT
     */
    getW() {
        return this.element.w;
    }

    /**
     * RÉCUPÉRER LA HAUTEUR DE L'ELEMENT
     */
    getH() {
        return this.element.h;
    }

    /**
     * SAVOIR SI L'ELEMENT EST VISIBLE
     */
    isVisible() {
        return this.element.visible;
    }

    /**
     * INITIALISER LA POSITION DE L'ELEMENT
     * @param {*la position horizontale de l'element} originX
     * @param {*la position verticale de l'element} originY
     */
    setOrigin(originX, originY) {
        this.element.originX = originX;
        this.element.originY = originY;
    }

    /**
     * RENDRE L'ELEMENT VISIBLE OU PAS
     */
    setVisible(bool) {
        this.element.visible = bool;
    }

    /**
     *  DÉFINIR LA POSITION HORIZONTALE DE L'ELEMENT
     */
    setPositionX(posX) {
        this.element.x = posX;
    }

    /**
     *  DÉFINIR LA POSITION VERTICALE DE L'ELEMENT
     */
    setPositionY(posY) {
        this.element.y = posY;
    }

    /**
     *  DÉFINIR LES ACTIONS SUR LES TOUCHES
     */
    gauche(g) {
        this.element.gauche = g;
    }

    droite(d) {
        this.element.droite = d;
    }

    haut(h) {
        this.element.haut = h;
    }

    bas(b) {
        this.element.bas = b;
    }

    /**
     * DEPLACER L'ELEMENT AVEC DE LA VELOCITÉ
     */
    deplacer() {
        if (this.element.droite) {
            this.veloD += 3;
            this.element.x += this.vitesse + (this.element.velo + this.veloD);
        } else this.veloD = 0;
        if (this.element.bas) {
            this.veloB += 3;
            this.element.y += this.vitesse + (this.element.velo + this.veloB);
        } else this.veloB = 0;
        if (this.element.gauche) {
            this.veloG += 3;
            this.element.x -= this.vitesse + (this.element.velo + this.veloG);
        } else this.veloG = 0;
        if (this.element.haut) {
            this.veloH += 3;
            this.element.y -= this.vitesse + (this.element.velo + this.veloH);
        } else this.veloH = 0;
    }

    /**
     * AJOUTER DE LA VÉLOCITÉ
     * @param velo {*Ajouter de la vélocité}
     */
    veloPlus() {
        this.element.velo += 2;
    }

    /**
     * RAZ DE LA VÉLOCITÉ
     * @returns {*RAZ de la vélocité}
     */
    veloRAZ() {
        this.element.velo = 0;
    }

    /**
     * RETOURNER LES VALEURS HAUT BAS GAUCHE DROIT DE L'ELEMENT POUR GERER LES COLLISIONS
     */
    left() {
        return this.element.x;
    }

    right() {
        return this.element.x + this.element.w;
    }

    top() {
        return this.element.y;
    }

    bottom() {
        return this.element.y + this.element.h;
    }


    /***
     * DÉPLACER LE HÉRO
     */
    contenu() {
        /**
         * GAUCHE
         */
        if (this.element.x < -this.element.w/2) {
            this.element.x = this.plateauW-this.element.w/2;
        }
        /**
        * DROITE
        */
        if (this.element.x > this.plateauW-this.element.w/2) {
            this.element.x = -this.element.w/2;
        }
        /**
         * HAUT
         */
        if (this.element.y < -this.element.h/2) {
            this.element.y = this.plateauH - this.element.h/2;
        }
        /**
         * BAS
         */
        if (this.element.y > this.plateauH -this.element.h/2) {
            this.element.y = -this.element.h/2;
        }
    }

    /**
     * RÉCUPÉRER LE MILIEU
     */
    milieuW() {
        return this.element.w / 2
    }
    milieuH() {
        return this.element.h / 2;
    }

    /**
     * RÉCUPÉRER LE TYPE D'ELEMENT
     */
    type() {
        return this.element.type;
    }


}

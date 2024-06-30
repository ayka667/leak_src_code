"use strict";


class Main {

    /**
     * CONSTRUCTEUR DU JEU GNOME
     * @param tps0 Compte à rebourd
     * @param score0 Score du joueur
     * @param QteMonstres La quantité de monstres à charger
     * @param QteBombes La quantité de bombes à charger
     */
    constructor(tps0, score0, QteMonstres, QteBombes) {
        /**
         * Ajouter le texte de chargement
         */
        let el = document.getElementById("chargement");
        this.mijotage = document.createElement('P');
        this.mijotage.innerHTML = "Mijotage...";
        el.appendChild(this.mijotage);
        /**
         * INITIALISER
         */
        this.init(tps0, score0, QteMonstres, QteBombes);
    }

    /**
     * NOMBRE D'IMAGES PAR SECONDE (30 fps)
     * @param o This
     */
    boucle(o) {
        o.fps = setInterval(function () {
            o.maj();
        }, parseInt(1000 / 30, 10));
    }


    /**
     * INIT DU JEU (POS | VIES | ETC)
     * @param tps0 Compte à rebourd
     * @param score0 Score du joueur
     * @param QteMonstres La quantité de monstres à charger
     * @param QteBombes La quantité de bombes à charger
     */
    init(tps0, score0, QteMonstres, QteBombes) {
        this.ttImages = 15;
        this.fps;
        this.police;
        this.ScaledPolice;
        this.ratio;
        this.velo = 1;
        this.touche = 0;
        this.pauseMobile = false;
        this.padding = 10;
        this.audio;
        this.plateau;
        this.ctx;
        this.hero;
        this.score;
        this.scoreAffiche = 0;
        this.scoreTemporaire = 0;
        this.lgScore = 2500;
        this.gagne = false;
        this.tps;
        this.w;
        this.h;
        this.car;
        this.vite = false;
        this.niveau = new Array();
        // INIT DE L'AUDIO
        this.audio = new Audio();
        // LOGIQUE DU JEU
        this.tps = this.car = this.tps0 = tps0;
        this.score = score0;
        // TXT SCORE
        this.angle = 0;
        this.tourne = false;
        // ELEMENTS
        this.NbreMontres = this.QteMonstres = this.QteMontresDef = QteMonstres;
        this.QteBombes = this.QteBombesDef = QteBombes;
        // MODE NORMAL OU EXTRA CHOU
        this.normal = true;
        this.exChou;
        this.clignote;
        // AFFICHER LES REGLES
        this.timerMsgRegles;
        this.affMsgRegles = 0;

        this.charge();
    }

    /**
     * CHARGER LES RESSOURCES
     */
    charge() {
        /**
         * LA MUSIQUE ET LES SONS
         */
        this.audio.setMusique(["./media/LaSoupe.ogg", "./media/LaSoupe.mp3"]);
        this.audio.setOk(["./media/aah.ogg", "./media/aah.mp3"]);
        this.audio.setPb(["./media/boum.ogg", "./media/boum.mp3"]);
        this.audio.setVite(["./media/woodblock.ogg", "./media/woodblock.mp3"]);
        this.audio.setPerdu(["./media/loose.ogg", "./media/loose.mp3"]);
        this.audio.setGagne(["./media/win.ogg", "./media/win.mp3"]);
        this.audio.setScore(["./media/point.ogg", "./media/point.mp3"]);
        this.audio.setExChou(["./media/extraChou.ogg", "./media/extraChou.mp3"]);

        this.plateau = new Plateau(window.innerWidth - this.padding * 2, window.innerHeight - this.padding * 2)
        this.plateau.init(this, this.getRandomInt(this.ttImages), this.ttImages);
    }

    chargementImage(pct) {
        this.mijotage.innerHTML = "Mijotage à " + pct + "%";
    }

    /**
     * Quand toutes les images sont chargées
     */
    pret() {
        // RETIRER LE MESSAGE DE CHARGEMENT
        let el = document.getElementById("chargement");
        el.parentNode.removeChild(el);

        this.h = this.plateau.getHeight();
        this.w = this.plateau.getWidth();
        /**
         * LA TAILLE DE LA POLICE
         *
         */
        this.police = this.w / 14;
        /**
         *  LE RATIO (PIXELS A AJOUTER)
         */
        this.police > 15 ? this.ratio = parseInt((this.police - 14) / 3, 10) : this.ratio = 0;
        this.ScaledPolice = this.police;
        /**
         * LA VITESSE CORRESPONDANTE
         */
        this.vitesse = parseInt(2 + (this.ratio / 3), 10);
        /**
         * LE CONTEXTE
         */
        this.ctx = this.plateau.getCanvas().getContext('2d');
        this.plateau.getCanvas().style.padding = this.padding + "px";
        /**
         * LE TEXTE
         */
        this.leTexte();
        /**
         * INSTANCIER LE HEROS
         */
        this.hero = new Perso(['./img/hero.png', './img/heroEx.png'], 65 + this.ratio, 20 + this.ratio, this.plateau, this.vitesse);
        /**
         * ECOUTEURS DU HERO (CLAVIER)
         */
        this.clavier(this);
        /**
         * CHARGER LE PREMIER NIVEAU
         */
        this.premierNiveau();
        this.enAttente = true;
        /**
         * EFFET INTRO + CHARGEMENT DE WAOUH
         */
        this.intro();
        this.plateau.getCanvas().classList.add("wow");
        document.getElementById("jeux").focus();
        this.boucle(this);

    }

    /**
     * CHARGER LE NIVEAU
     */
    premierNiveau() {
        // REINITIALISER
        this.niveau.splice(0, this.niveau.length);
        this.NbreMontres = this.QteMonstres = this.QteMontresDef;
        this.QteBombes = this.QteBombesDef;
        this.car = this.tps = this.tps0;

        // INSTANCIER LES MONSTRES+LES BOMBES ET LES PLACER
        for (let i = 0; i < Math.max(this.QteBombes, this.QteMonstres); i++) {
            // COMPTER POUR LES MAIRES
            if (i < this.QteBombes) {
                let bombe = new Maire('./img/cosmonaute.png', 28 + this.ratio, 32 + this.ratio, this.plateau, 0, 0)
                this.niveau.push(bombe);
                this.positionner(bombe, this.niveau.length - 1, true);
            }
            // COMPTER POUR LES CHOUX

            if (i === this.QteMonstres - 1) {
                let streum = new ChouBacalan('./img/chou+.png', 53 + this.ratio, 30 + this.ratio, this.plateau, 0, 0);
                this.niveau.push(streum);
                this.positionner(streum, this.niveau.length - 1, true);
            }

            if (i < this.QteMonstres - 1) {
                let streum = new Chou('./img/chou.png', 32 + this.ratio, 30 + this.ratio, this.plateau, 0, 0);
                this.niveau.push(streum);
                this.positionner(streum, this.niveau.length - 1, true);
            }
        }
    }

    /**
     * CHARGER UN NOUVEAU NIVEAU AVEC 1 MONSTRE ET 1 BOMBE EN PLUS SANS DEPASSER LE PLATEAU
     */
    nouveauNiveau() {
        let qte = this.plateau.getWidth() / (32 + this.ratio);

        if (this.QteBombes > qte) {
        } else {
            this.QteBombes += 1;
            this.QteMonstres += 1;
            if (this.QteMonstres > qte - (qte / 4)) {
                this.car += 1;
            }

            let bombe = new Maire('./img/cosmonaute.png', 28 + this.ratio, 32 + this.ratio, this.plateau, 0, 0)
            this.niveau.push(bombe);

            let streum = new Chou('./img/chou.png', 32 + this.ratio, 30 + this.ratio, this.plateau, 0, 0);
            this.niveau.push(streum);

        }
        this.recharger();
    }

    // POSITIONNER AVEC LES COORDONNEES DISPONIBLES
    /**
     * @param o Objet à positionner
     * @param i Dans le cas de l'initialisation correspond à l'objet précédent
     * @param init Savoir si l'on est dans l'initialisation ou si tous les objets sont déjà positionnés
     */
    positionner(o, i, init) {
        // CONDITION DE SORTIE
        let test = false;
        while (!test) {
            // GENERER DES COORDONNEES
            let x = (this.getRandomInt(this.w - o.getW()));
            let y = (this.getRandomInt(this.h - o.getH()));
            // POSITIONNER LE NOUVEL OBJET
            o.setPositionX(x);
            o.setPositionY(y);
            // TEST COLLISION AVEC LE HERO
            let ok = this.intersects(o, this.hero);
            // SI PAS DE COLLISION AVEC LE HERO
            if (!ok) {
                if (init) {
                    // TEST AVEC LES OBJETS -1 (VIENT D'ÊTRE AJOUTÉ)
                    if (this.niveau.length > 1) {
                        for (let j = 0; j < i; j++) {
                            if (this.intersects(o, this.niveau[j])) {
                                ok = false;
                                break;
                            } else ok = true;
                        }
                    } else ok = true;
                } else {
                    // TEST AVEC LES OBJETS SAUF CELUI-LÀ
                    for (let j = 0; j < this.niveau.length; j++) {
                        if (j === i) continue;
                        if (this.intersects(o, this.niveau[j])) {
                            ok = false;
                            break;
                        } else ok = true;
                    }
                }
            } // REPOSITIONNER SI COLLISION AVEC LE HERO
            else {
                ok = false;
            }
            test = ok;
        }
    }

    /**
     * RECHARGER AVEC LA TOUCHE ESPACE
     */
    recharger() {
        // RAZ AUDIO
        this.audio.fadeInSupp();
        // RETIRER LE MSG DES RÈGLES
        this.affMsgRegles = 0;
        clearTimeout(this.timerMsgRegles);
        this.timerMsgRegles = undefined;
        // REPOSITIONNER
        for (let i = 0; i < this.niveau.length; i++) {
            this.positionner(this.niveau[i], i, false);
        }
    }

    /**
     * BOUCLE DU JEU
     */
    maj() {
        // VIDER
        this.clear();

        console.log(this.tps)
        // FOND HORS/INTRO JEU
        if (this.tps <= 0 || this.enAttente) {
            this.ctx.globalAlpha = 0.3;
        }   

        this.ctx.drawImage(this.plateau.getFond(), 0, 0, this.plateau.getWidth(), this.plateau.getHeight());

        // COLLISIONS
        this.collisions();

        // DESSINS DES ELEMENTS
        for (let i = 0; i < this.niveau.length; i++) {
            if (this.niveau[i].isVisible()) this.ctx.drawImage(this.niveau[i].getImage(), this.niveau[i].getPositionX(), this.niveau[i].getPositionY(), this.niveau[i].getW(), this.niveau[i].getH());
        }

        // RETIRER L'OPACITE SI BESOIN
        this.ctx.globalAlpha = 1;

        // HERO
        this.hero.deplacer();
        this.hero.contenu();
        if (this.tps > 0) this.ctx.drawImage(this.hero.getImage(), this.hero.getPositionX(), this.hero.getPositionY(), this.hero.getW(), this.hero.getH());

        // SCORE
        this.tourne ?
            this.animerTxtScore() :
            this.ctx.fillText((this.scoreAffiche < parseInt(this.score, 10) ? this.ajouter() : this.afficher()), this.police * 4, this.hero.getH() * 2);

        // IMG SCORE
        let lineW = this.ctx.measureText(this.score).width / 2;
        let lineH = this.ctx.measureText("8").width;
        this.ctx.font = (this.police / 1.5).toString() + "px FontAwesome";
        // FAIRE TOURNER LA CUILLERE
        this.ctx.save();
        if (this.tourne) {
            this.ctx.translate(this.police * 4 + lineW + lineH / 3, (this.hero.getH() * 2) - lineH / 8);
            this.ctx.rotate(this.angle > 360 ? this.angle = 0 : this.angle++);

        } else {
            this.ctx.translate(this.police * 4 + lineW, (this.hero.getH() * 2) - lineH / 8);
            this.ctx.rotate(0);
        }
        this.ctx.translate(-(this.police * 4 + lineW), -((this.hero.getH() * 2) - (lineH) / 8));
        // LA CUILLERE
        this.tourne ?
            this.ctx.fillText("\uf1b1", this.police * 4 + lineW, (this.hero.getH() * 2) - lineH / 8) :
            this.ctx.fillText("   \uf1b1", this.police * 4 + lineW, (this.hero.getH() * 2) - lineH / 8);
        this.ctx.restore();
        // CHANGER LA FONTE
        this.ctx.font = (this.police).toString() + "px Amatic";
        // INTRO OU GAGNE OU PERDU? + MEMORISATION
        if (this.NbreMontres === 0) {
            this.tps = "0";
            this.audio.getStopVite();
            this.ctx.fillText("* GAGNÉ ! *", this.w / 2, this.h / 2.5);
            this.ctx.fillText("espace pour démarrer", this.w / 2, this.h - this.hero.getH());
            this.ctx.fillText(this.getStorage(), this.w / 2, this.h / 2);
            this.gagne = true;
            this.setStorage();
        } else if (this.tps === this.car) {
            this.ctx.fillText("RÉCUPÉREZ LES CHOUX !", this.w / 2, this.h / 2);
            this.ctx.font = (this.police).toString() + "px FontAwesome";
            let lineHeight = this.ctx.measureText('\uf150').width * 1.2;
            this.ctx.fillText('\uf151', this.w / 2, this.h - this.hero.getH() - lineHeight * 3);
            this.ctx.fillText('\uf191 \uf150 \uf152', this.w / 2, this.h - this.hero.getH() - lineHeight * 2);
            this.ctx.font = (this.police).toString() + "px Amatic";
            this.ctx.fillText('appuyez pour démarrer', this.w / 2, this.h - this.hero.getH());
        } else if (this.tps <= 0) {
            this.audio.getStopVite();
            this.hero.setVisible(false);
            this.msgIntro();
            this.gagne = false;
        }
        // CPTE A REBOURD
        else if (this.tps > 0) {
            this.ctx.fillText(this.tps, this.w - this.police * 3, this.hero.getH() * 2);
        }
    }

    /**
     * INCRÉMENTER LE SCORE
     */
    ajouter() {
        this.tourne = true;
        this.audio.getScore();
        return (this.scoreAffiche += 20).toString();
    }

    /**
     * AFFICHER LE SCORE
     */
    afficher() {
        this.tourne = false;
        return this.score;
    }

    /**
     * Animer le texte du score
     */
    animerTxtScore() {
        this.ScaledPolice > this.police * 1.2 ? this.ScaledPolice = this.police : this.ScaledPolice += 2;
        this.scoreAffiche > parseInt(this.score - 100, 10) ?
            this.ctx.font = (this.ScaledPolice).toString() + "px Amatic" :
            this.ctx.font = (this.police).toString() + "px Amatic";
        return this.ctx.fillText((this.scoreAffiche < parseInt(this.score, 10) ? this.ajouter() : this.afficher()), this.police * 4, this.hero.getH() * 2);
    }

    /**
     * Afficher les règles après 3 secondes
     */
    msgIntro() {
        let o = this;
        if (this.timerMsgRegles === undefined) this.timerMsgRegles = setTimeout(
            function () {
                o.affMsgRegles = 1;
            }, 3000);
        if (this.affMsgRegles === 0) {
            let lineHeight = this.ctx.measureText('\uf150').width * 1.2;
            this.ctx.fillText("PERDU", this.w / 2, this.h / 2);
            this.ctx.fillText(this.getStorage(), this.w / 2, (this.h / 2) + lineHeight * 2);
        } else {
            this.ctx.fillText("RÉCUPÉREZ LES CHOUX !", this.w / 2, this.h / 2);
            this.ctx.font = (this.police).toString() + "px FontAwesome";
            let lineHeight = this.ctx.measureText('\uf150').width * 1.2;
            this.ctx.fillText('\uf151', this.w / 2, this.h - this.hero.getH() - lineHeight * 3);
            this.ctx.fillText('\uf191 \uf150 \uf152', this.w / 2, this.h - this.hero.getH() - lineHeight * 2);
            this.ctx.font = (this.police).toString() + "px Amatic";
            this.ctx.fillText("espace pour démarrer", this.w / 2, this.h - this.hero.getH());
        }
    }


    /**
     * LES COLLISIONS DANS LE JEU
     */
    collisions() {
        for (let i = 0; i < this.niveau.length; i++) {
            // COLLISION ELEMENT
            if (this.intersects(this.hero, this.niveau[i])) {
                // COLLISION CHOU
                if (this.niveau[i].type() === "chou") {
                    this.niveau[i].setVisible(false);
                    this.NbreMontres -= 1;
                    this.addScore(200);
                    if (this.NbreMontres === 0) {
                        this.stopExChou();
                        // AUDIO
                        this.audio.getGagne();
                        this.addScore(this.tps * 60);
                        // FAIRE UNE PAUSE SI GAGNÉ
                        this.pauseMobile = true;
                        /**
                         * CHANGER FOND + EFFET WAOUH
                         */
                        this.waouh();
                    }
                } else if (this.niveau[i].type() === "chouBacalan") {
                    this.niveau[i].setVisible(false);
                    this.NbreMontres -= 1;
                    this.addScore(300);
                    this.audio.getExChou();
                    this.extraChou();
                    this.extra();
                    if (this.NbreMontres === 0) {
                        this.stopExChou();
                        // AUDIO
                        this.audio.getGagne();
                        this.addScore(this.tps * 60);
                        // FAIRE UNE PAUSE SI GAGNÉ
                        this.pauseMobile = true;
                        /**
                         * CHANGER FOND + EFFET WAOUH
                         */
                        this.waouh();
                    }
                }
                // COLLISION MAIRE
                else if (this.normal && this.niveau[i].type() === "maire") {
                    // FAIRE UNE PAUSE SI PERDU
                    if (this.tps > 0) {
                        this.stopExChou();
                        this.perdu();
                        this.hero.setVisible(false);
                        this.pauseMobile = true;
                        this.audio.getPb();
                        this.audio.getPerdu();
                        this.tps = 0;
                        this.lgScore = 2500;
                    }
                }
            }
        }
    }

    /**
     * AFFICHER LES MESSAGES
     */
    leTexte() {

        this.ctx.font = (this.police).toString() + "px Amatic, cursive";

        // CRÉER LE GRADIENT
        let gradient = this.ctx.createLinearGradient(0, 0, this.plateau.getWidth(), 0);
        // VERT
        gradient.addColorStop("0", "#56FF6D");
        // JAUNE
        gradient.addColorStop("1.0", "#E8D542");
        // MAUVE D090FF
        this.ctx.fillStyle = gradient;
        this.ctx.textAlign = "center";
        this.ctx.shadowColor = 'black';
        this.ctx.shadowOffsetX = -1;
        this.ctx.shadowOffsetY = 1;
    }


    /**
     * AJOUTER AU SCORE + MEMORISER LE SCORE A RETIRER SI RELANCE
     * @param aAjouter Permet d'ajouter une valeur au score
     */
    addScore(aAjouter) {
        let sc = parseInt(this.score, 10);
        sc = sc + aAjouter;
        this.score = sc.toString();

        if (sc > this.lgScore) {
            this.lgScore += 2500;
            this.audio.getOk();
        }

        sc = parseInt(this.scoreTemporaire, 10);
        sc = sc + aAjouter;
        this.scoreTemporaire = sc.toString();

    }

    /**
     * RETIRER AU SCORE
     * @param aRetirer Permet de retirer une valeur au score
     */
    retScore(aRetirer) {
        this.stopExChou();
        let sc = parseInt(this.score, 10);
        sc = sc - aRetirer;
        this.score = sc.toString();
    }

    /**
     * RETIRER 1 SECONDE + FAIRE VITE + SAVOIR SI C'EST DEMMARÉ
     */
    tempo() {    
        let sc = parseInt(this.tps, 10);
        sc -= 1;
        this.tps = sc.toString();
        // FAIRE VITE !
        if (!this.vite && this.tps < 6) {
            this.vite = true;
            this.audio.getStartVite();
        } else if (this.tps == 0) {
            this.audio.getPerdu();
            this.timeup();
        }
        // DEMARRAGE ?
        if(this.enAttente)this.enAttente=false;
    }

    /**
     * VIDER LE CONTENU DU CANVA
     */
    clear() {
        this.ctx.clearRect(0, 0, this.plateau.getWidth(), this.plateau.getHeight());
    }

    /**
     * ÉCOUTEUR CLAVIER DU HERO
     * @param o L'objet écouté
     */
    clavier(o) {
        const can = o.plateau.getCanvas();
        // ÉCOUTEURS MOBILE BOUGE
        can.addEventListener('touchmove', function (e) {
            e.preventDefault();
            if ((o.tps == o.car || o.tps <= 0) && !o.pauseMobile) {
                // SI GAGNÉ => NOUVEAU NIVEAU
                if (o.gagne) {
                    o.nouveauNiveau();
                }
                o.hero.setVisible(true);
                o.NbreMontres = o.QteMonstres;
                o.tps = o.car;
                o.vite = false;
                o.raz();
                o.recharger();
            } else {
                // SAVOIR l'ORIENTATION DU MOBILE
                let orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;               // ITÉRER À TRAVERS LES POINTS DE CONTACT QUI ONT BOUGÉ.
                for (let i = 0; i < e.changedTouches.length; i++) {

                    if (orientation === "portrait-secondary" || orientation === "portrait-primary" || orientation === undefined) {
                        // RÉCUPÉRER LA POSITION
                        o.hero.setPositionX(e.changedTouches[i].pageX - o.hero.getW() / 2);
                        o.hero.setPositionY(e.changedTouches[i].pageY - o.hero.getH() / 2);
                    } else {
                        // RÉCUPÉRER LA POSITION
                        o.hero.setPositionX(e.changedTouches[i].pageX - o.hero.getW() * 3);
                        o.hero.setPositionY(e.changedTouches[i].pageY - o.hero.getH());
                    }
                }
            }
            e.stopPropagation();

        }, { passive: false });
        // ÉCOUTEURS MOBILE NE BOUGE PLUS
        can.addEventListener('touchend', function (e) {
            e.preventDefault();
            // GÉRER LES PAUSES QUAND C'EST PERDU OU GAGNÉ
            if (o.pauseMobile) o.pauseMobile = false;
            e.stopPropagation();
        }, { passive: false });

        // ÉCOUTEURS MOBILE COMMENCE À BOUGER
        can.addEventListener('touchstart', function (e) {
            e.preventDefault();
            // REGLES DU JEU & POUR CHROME CHARGEMENT DE LA MUSIQUE
            if (o.timer === undefined) {
                // CPTE A REBOURD 1S
                o.timer = setInterval(function () {
                    o.tempo();
                }, 1000);
                o.audio.getMusique();
            }
            e.stopPropagation();
        }, { passive: false });


        // ÉCOUTEURS CLAVIER
        document.addEventListener("keydown", function (evt) {
            evt.preventDefault();
            // AJOUTER DE LA VÉLOCITÉ
            if (o.touche == evt.keyCode) {
                o.hero.veloPlus();
            } else {
                o.touche = evt.keyCode;
                o.hero.veloRAZ();
            }
            // REGLES DU JEU & POUR CHROME CHARGEMENT DE LA MUSIQUE
            if (o.timer === undefined) {
                // CPTE A REBOURD 1S
                o.timer = setInterval(function () {
                    o.tempo();
                }, 1000);
                o.audio.getMusique();
            }
            if (o.tps >= 0) {
                if (evt.keyCode === 37) {
                    o.hero.gauche(true);
                }
                if (evt.keyCode === 39) {
                    o.hero.droite(true);
                }
                if (evt.keyCode === 38) {
                    o.hero.haut(true);
                }
                if (evt.keyCode === 40) {
                    o.hero.bas(true);
                }
            }
            // APPUYER SUR ESPACE POUR RELANCER PENDANT 5 SEC.
            if (evt.keyCode === 32 && (o.tps > o.car - 5 || o.tps <= 0)) {
                // RETIRE LE SCORE COURANT SI LA PARTIE EST COMMENCEE
                if (o.tps > o.car - 5) {
                    o.retScore(o.scoreTemporaire);
                }
                // SI GAGNÉ => NOUVEAU NIVEAU
                if (o.gagne) {
                    o.nouveauNiveau();
                }
                o.hero.setVisible(true);
                o.NbreMontres = o.QteMonstres;

                o.tps = o.car;
                o.vite = false;
                o.raz();
                o.recharger();
            }
        });
        document.addEventListener("keyup", function (evt) {
            // AJOUTER DE LA VÉLOCITÉ ?
            if (o.touche === evt.keyCode) {
                o.hero.veloPlus();
            } else {
                o.touche = evt.keyCode;
                o.hero.veloRAZ();
            }
            if (evt.keyCode === 37) o.hero.gauche(false);
            if (evt.keyCode === 39) o.hero.droite(false);
            if (evt.keyCode === 38) o.hero.haut(false);
            if (evt.keyCode === 40) o.hero.bas(false);
        })
    }


    /**
     * ALGORITHME DES COLLISIONS ENTRE DEUX OBJETS VISIBLES
     * @param a Objet a
     * @param b Objet b
     */
    intersects(a, b) {
        if (a.isVisible() && b.isVisible()) {
            let x1 = Math.max(a.left(), b.left());
            let x2 = Math.min(a.right(), b.right());
            let y1 = Math.max(a.top(), b.top());
            let y2 = Math.min(a.bottom(), b.bottom());
            return (x1 < x2 && y1 < y2);
        } else return false;
    }

    /**
     * RAZ DU JEU + SCORE TEMPORAIRE SI OK + STOCKAGE DU MEILLEUR SCORE
     */
    raz() {
        this.hero.init();
        for (let i = 0; i < this.niveau.length; i++) {
            this.niveau[i].setVisible(true);
        }
        if (this.gagne) {
            this.scoreTemporaire = 0;
        } else {
            this.score = "0";
            this.scoreAffiche = 0;
            this.premierNiveau();
        }
        this.audio.getStopVite();
    }

    /**
     * LANCER L'EFFET CSS INTRO
     */
    intro() {
        this.plateau.getCanvas().classList.remove("intro");
        this.plateau.getCanvas().offsetWidth;
        this.plateau.getCanvas().classList.add("intro");
    }

    /**
     * LANCER L'EFFET CSS WAOUH
     */
    waouh() {
        this.plateau.getCanvas().classList.remove("rebond");
        this.plateau.getCanvas().classList.remove("intro");
        this.plateau.getCanvas().classList.remove("wow");
        this.plateau.getCanvas().classList.remove("perdu");
        this.plateau.getCanvas().classList.remove("extra");
        this.plateau.getCanvas().offsetWidth;
        this.plateau.getCanvas().classList.add("wow");
        clearInterval(this.fps);
        let i = this.plateau.getIFond();
        let j = i;
        while (j === i) {
            j = this.getRandomInt(this.ttImages);
        }
        this.plateau.setFond(j)
        this.boucle(this);
    }

    /**
     * LANCER L'EFFET CSS PERDU
     */
    perdu() {
        this.plateau.getCanvas().classList.remove("extra");
        this.plateau.getCanvas().classList.remove("rebond");
        this.plateau.getCanvas().classList.remove("intro");
        this.plateau.getCanvas().classList.remove("perdu");
        this.plateau.getCanvas().offsetWidth;
        this.plateau.getCanvas().classList.add("perdu");
    }

    /**
     * LANCER L'EFFET CSS TEMPS ÉCOULÉ
     */
    timeup() {
        this.plateau.getCanvas().classList.remove("extra");
        this.plateau.getCanvas().classList.remove("rebond");
        this.plateau.getCanvas().classList.remove("intro");
        this.plateau.getCanvas().classList.remove("perdu");
        this.plateau.getCanvas().offsetWidth;
        this.plateau.getCanvas().classList.add("rebond");
    }

    /**
     * LANCER L'EFFET CSS EXTRA CHOU
     */
    extra() {
        this.plateau.getCanvas().classList.remove("extra");
        this.plateau.getCanvas().classList.remove("rebond");
        this.plateau.getCanvas().classList.remove("intro");
        this.plateau.getCanvas().classList.remove("perdu");
        this.plateau.getCanvas().offsetWidth;
        this.plateau.getCanvas().classList.add("extra");
    }


    /***
     * Rendre invincible 5 secondes
     */
    extraChou() {
        this.normal = false;
        let o = this;
        this.clignote = setInterval(
            function () {
                o.hero.getIndiceImage() === 0 ? o.hero.setIndiceImage(1) : o.hero.setIndiceImage(0);
            }, 100);
        this.exChou = setTimeout(
            function () {
                o.normal = true;
                clearInterval(o.clignote);
                o.hero.setIndiceImage(0);
            }, 5000);
    }

    /**
     * STOP L'EXTRA CHOU
     */
    stopExChou() {
        // STOP EXTRA CHOU
        clearTimeout(this.exChou);
        clearInterval(this.clignote);
        this.normal = true;
        this.hero.setIndiceImage(0);
    }

    /**
     * ALGORITHME QUI RETOURNE UN ENTIER ALEATOIRE ENTRE 0 ET MAX-1
     * @param max Valeur maximale non comprise
     */
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /***
     * SAUVEGARDER LE SCORE MAX EN PRENANT EN COMPTE LE RETOUR
     */
    setStorage() {
        try {
            if (typeof localStorage === 'undefined') {
                return "Soupes non enregistrées";
            } else {
                if (this.score === "0") {
                } else {
                    if (this.getStorage() === "Pas de soupes enregistrées") {
                        window.localStorage.setItem("choux", parseInt(this.score, 10));
                    } else if (parseInt(localStorage.getItem("choux"), 10) < parseInt(this.score, 10)) window.localStorage.setItem("choux", this.score);
                }
            }
        } catch (e) {
            return "Soupes non enregistrées";
        }
    }


    /***
     * RÉCUPÉRER LE SCORE MAX
     */
    getStorage() {
        try {
            if (typeof localStorage === 'undefined') {
                return "Soupes non enregistrées";
            } else {
                let retour = window.localStorage.getItem("choux");

                if (retour === null) return "Pas de soupes enregistrées";
                else if (retour === this.score || parseInt(retour, 10) === parseInt(this.score, 10) - this.scoreTemporaire) {
                    return "Votre record est de " + retour + " soupes"
                } else return "Le record est de " + retour + " soupes";
            }
        } catch (e) {
            return "Soupes non enregistrées";
        }
    }
}


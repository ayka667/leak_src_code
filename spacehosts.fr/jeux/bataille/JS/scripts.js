// Etablissement des variables qui seront ré-utilisées
let containerAccueil = document.getElementById('containerAccueil');
let containerDifficulty = document.getElementById('containerDifficulty');
let containerGameGrid = document.getElementById('containerGameGrid');
let playerDifficulty = document.getElementById('playerDifficulty');
let computerDifficulty = document.getElementById('computerDifficulty');
let computerDifficultyBox = document.getElementById('computerDifficultyBox');
let inputPseudo = document.getElementById('inputPseudo');
let inputValider = document.getElementById('inputValider');
let playerMode1 = document.getElementById('playerMode1');
let playerMode2 = document.getElementById('playerMode2');
let playerGrid = document.getElementById('playerGrid');
let computerGrid = document.getElementById('computerGrid');
let player2Grid = document.getElementById('player2Grid');
let shipPlaceBox = document.getElementById('shipPlaceBox');
let shipPlaceBoxEasy = document.getElementById('shipPlaceBoxEasy');
let shipPlaceBoxNormal = document.getElementById('shipPlaceBoxNormal');
let shipPlaceBoxHard = document.getElementById('shipPlaceBoxHard');
let shipPlacement = document.getElementById('shipPlacement');
let containerShip;
let containerCorvette;
let containerFregate;
let containerCargo;
let containerCuirasse;
let containerNavette;
let containerCroiseur;
let containerCommandement;
let inputValiderDifficulty = document.getElementById('inputValiderDifficulty');
let jupiter = document.getElementById('imgJupiters');
let mars = document.getElementById('imgMars');
let uranus = document.getElementById('imgUranus');
let mercure = document.getElementById('imgMercure');
let venus = document.getElementById('imgVenus');
let ponyJoke = document.getElementById('ponyJoke');
let themeColorGreen = document.getElementById('themeColorGreen');
let themeColorRed = document.getElementById('themeColorRed');
let themeColorPurple = document.getElementById('themeColorPurple');
let themeColorOrange = document.getElementById('themeColorOrange');
let themeColorBlue = document.getElementById('themeColorBlue');
let themeColorPink = document.getElementById('imgNeptune');
let turnInfo = document.getElementById('turnInfo');
let userInfo = document.getElementById('otherInfo');
let playInput = document.getElementById('playInput');
let scoreTab = document.getElementById('score-tab');
let chatBox = document.getElementById('chat-box');
let turnBox = document.getElementById('turn-box');
let chatContainer = document.getElementById('chat-container');
let gameOverTab = document.getElementById('game-over-tab');
let linkBack = document.getElementById('back-to-website');

// Pour être sûr que les boites de dialogues soient bien vides.
chatBox.innerHTML = "";
turnBox.innerHTML = "";




// Tableau qui contiendront l'état des grilles de chaque "joueur"
let playerSpots = [];
let computerSpots = [];
let player2Spots = [];
let playerShipsList = [];
let spotTakken = [];
let playerShipIndexes = [];
let scoreList = [];
let currentHuntSpots = [];

// Variable pour définir la largeur d'une grille de jeu, pour faciliter la manipulation
let gridWidth = 10;
const CLEAR_LOCAL_STORAGE = false;
let scoreCounter = 0;


// Par défaut, aucun des deux modes de jeu ne sera sélectionné.
playerMode1.checked = true;
// playerMode2.checked = false;

// La position initiale des vaisseaux sera horizontale.
let posHorizontal = true;
let gameOverStatus = false;
let currentTurn = "player";
let canPlay = true;
let playerScore = 0;
let onHunt = false;
let lastcomputerHit;
let newPossibleComputerHits = [];
let tabsup = [];





// Ecouteur du bouton de la page d'accueil, pour afficher les options, et récupération du pseudo
// pour plus tard, affichage d'une zone avec le pseudo/avatar du joueur 
inputValider.addEventListener('click', () => {
    containerAccueil.classList.add('hidden');
    containerDifficulty.classList.remove('hidden');
    let pseudo = inputPseudo.value;
    document.getElementById('welcome').innerHTML = "Bienvenue Capitaine " + pseudo + " !";
    //document.getElementById('pseudoCapitaine').innerHTML = "Capitaine " + pseudo;
    //document.getElementById('userCapitaine').classList.remove('hidden');
});

// Ecouteurs sur les deux options de jeu, et affichage de la difficulté de l'ordinateur si besoin
playerMode1.addEventListener('click', () => {
    //computerDifficultyBox.classList.remove('hidden');
});
// playerMode2.addEventListener('click', () => {
//     computerDifficultyBox.classList.add('hidden');
// });

// Validation du mode de jeu et des options, établissement et affichage des deux grilles de jeu
inputValiderDifficulty.addEventListener('click', () => {
    containerDifficulty.classList.add('hidden');
    containerGameGrid.classList.remove('hidden');

    // Mode un joueur, donc, avec ordinateur. Les fonctions appellant l'ordinateur et son IA
    // seront en grande partie ici.
    if (playerMode1.checked) {
        computerGrid.classList.remove('hidden');
        //player2Grid.classList.add('hidden');
        shipPlacement.classList.remove('hidden');
        generateGrid(playerGrid, playerSpots, 0);
        generateGrid(computerGrid, computerSpots, 200);
        // shipBoxGrid();
        shipPlaceBox.classList.remove('hidden');

        // Crée les vaisseaux du joueur. La difficulté peut être implantée ici.
        //spawnPlayerShips ();

        //calls the randomPlacement function for each ship in the all_ships array, taking account of its lenght and name
        var i = 0
        while(i < computerShips.length){
            if (randomPlacement(computerShips[i].size, computerShips[i].name)) {
                i++;
            }
        }
        // Appel de la fonction qui attribue les vaisseaux au joueur en fonction de la difficultée choisie
        displayPlayerShips()

        // Mode deux joueurs. A rendre "indisponible" si pas le temps, sinon, les fonctions
        // pour faire fonctionner ce mode seront ici!

    }


    //     } else if (playerMode2.checked) {
    //         computerGrid.classList.add('hidden');
    //         player2Grid.classList.remove('hidden');
    //         shipPlacement.classList.remove('hidden');
    //         generateGrid(playerGrid, playerSpots, 0);
    //         generateGrid(player2Grid, player2Spots, 200);
    //         // shipBoxGrid(); 
    //         shipPlaceBox.classList.remove('hidden');
    //     }
    //     displayPlayerShips()

});

// Fonction qui va générer les grilles de jeu et implanter 10 lignes de 10 cases, et attribuer
// un id unique à chacune des cases pour les utiliser plus tard
function generateGrid(grid, array, index) {
    for (i = index; i < index + (gridWidth * gridWidth); i++) {
        let spot = document.createElement('div');
        spot.dataset.id = i;
        spot.id = i;
        spot.classList.add('gridBox');
        if (document.body.style.color == "rgb(0, 255, 0)") {
            spot.classList.add('gridGreen');
        } else if (document.body.style.color == "rgb(255, 0, 0)") {
            spot.classList.add('gridRed');
        } else if (document.body.style.color == "rgb(186, 85, 211)") {
            spot.classList.add('gridPurple');
        } else if (document.body.style.color == "rgb(0, 0, 205)") {
            spot.classList.add('gridBlue');
        } else if (document.body.style.color == "rgb(255, 140, 0)") {
            spot.classList.add('gridOrange');
        } else if (document.body.style.color == "rgb(253, 108, 158)") {
            spot.classList.add('gridPink');
        }
        grid.appendChild(spot);
        array.push(spot);
    }
}

// Array contenant les objets vaisseaux pour les vaisseaux du joueur
let playerShips = [

    {
        name: 'Corvette',
        size: 2
    },
    {
        name: 'Fregate',
        size: 3
    },
    {
        name: 'Navette',
        size: 3
    },
    {
        name: 'Cuirasse',
        size: 3
    },
    {
        name: 'Croiseur',
        size: 4
    },
    {
        name: 'Cargo',
        size: 4
    },
    {
        name: 'Vaisseau_de_Commandement',
        size: 5
    },
];

// Fonction qui attribue les vaisseau au joueur en fonction de la difficulté, et appelle la fonction qui les dessine dans la boite
// ET ajoute les écouteurs pour le drag en drop à ce moment
function displayPlayerShips() {
    if (playerDifficulty.value == "Facile") {
        playerShipIndexes = [6, 5, 4, 3, 2, 1];
        drawPlayerShips(playerShipIndexes);
    } else if (playerDifficulty.value == "Normal") {
        playerShipIndexes = [0, 1, 2, 4, 6];
        drawPlayerShips(playerShipIndexes);
    } else if (playerDifficulty.value == "Difficile") {
        playerShipIndexes = [1, 2, 3, 6];
        drawPlayerShips(playerShipIndexes);
    }


    containerShip = document.querySelectorAll('.containerShip');
    containerCorvette = document.querySelectorAll('.containerCorvette');
    containerFregate = document.querySelectorAll('.containerFregate');
    containerCargo = document.querySelectorAll('.containerCargo');
    containerCuirasse = document.querySelectorAll('.containerCuirasse');
    containerNavette = document.querySelectorAll('.containerNavette');
    containerCroiseur = document.querySelectorAll('.containerCroiseur');
    containerCommandement = document.querySelectorAll('.containerVaisseau_de_Commandement');

    // Ecouteur sur la liste des vaisseaux du joueur à placer.
    containerShip.forEach(ship => ship.addEventListener('dragstart', dragStart));

    containerShip.forEach(ship => ship.addEventListener('mousedown', (e) => {
        // Index (emplacement) du vaisseau cliqué et drag'
        actualShipAndIndex = e.target.id;

        // Ecouteurs du Drag and drop qui nécessitent d'écouter l'array contenant les cases du joueur.
        playerSpots.forEach(spot => spot.addEventListener('dragstart', dragStart));
        playerSpots.forEach(spot => spot.addEventListener('dragover', dragOver));
        playerSpots.forEach(spot => spot.addEventListener('dragenter', dragEnter));
        playerSpots.forEach(spot => spot.addEventListener('drop', dragDrop));

    }));
}

// Fonction qui dessine les vaisseaux du joueur dans la boite de placement
function drawPlayerShips(list) {
    for (i = 0; i < list.length; i++) {
        let newShipContainer = document.createElement('div');
        newShipContainer.classList.add('container' + playerShips[list[i]].name, 'containerShip');
        newShipContainer.setAttribute('draggable', true);

        shipPlaceBox.appendChild(newShipContainer);

        for (y = 0; y < playerShips[list[i]].size; y++) {
            let newShipPart = document.createElement('div');
            newShipPart.classList.add(playerShips[list[i]].name, 'gridBox');
            newShipPart.id = playerShips[list[i]].name + '-' + y;

            if (document.body.style.color == "rgb(0, 255, 0)") {
                newShipPart.classList.add('gridGreen');
            } else if (document.body.style.color == "rgb(255, 0, 0)") {
                newShipPart.classList.add('gridRed');
            } else if (document.body.style.color == "rgb(186, 85, 211)") {
                newShipPart.classList.add('gridPurple');
            } else if (document.body.style.color == "rgb(0, 0, 205)") {
                newShipPart.classList.add('gridBlue');
            } else if (document.body.style.color == "rgb(255, 140, 0)") {
                newShipPart.classList.add('gridOrange');
            } else if (document.body.style.color == "rgb(253, 108, 158)") {
                newShipPart.classList.add('gridPink');
            }

            newShipContainer.appendChild(newShipPart);
        }
    }
}

let computerShips = [

    {
        name: 'Corvette',
        size: 2
    },
    {
        name: 'Fregate',
        size: 3
    },
    {
        name: 'Navette',
        size: 3
    },
    // {
    //     name: 'Cuirasse',
    //     size: 3
    // },
    {
        name: 'Croiseur',
        size: 4
    },
    // {
    //     name: 'Cargo',
    //     size: 4
    // },
    {
        name: 'Vaisseau_de_Commandement',
        size: 5
    },
];

//places a ship randomly on the computer grid
function randomPlacement(ship_size, ship_name) {

    var ship_direction = Math.round(Math.random()); //returns either 0 or 1, determines if the ship is horizontal (0) or vertical (1)


    //parameters for an horizontal ship
    if (ship_direction==0) {

        //randomly determines the first square that the ship will potentially occupy
        var x = Math.floor(Math.random()*(gridWidth-(ship_size-1)));
        var y = Math.floor(Math.random()*(gridWidth));
        var random_id = y*gridWidth+x+200;

        //if there's no ship in the way of the new ship, places the new one by adding the ship class to two or more (depending on the ship's lenght) consecutive horizontal squares 
        if (checkShipPresence(random_id,ship_size,1)) {
            for (var i = 0; i < ship_size; i++) {
                document.getElementById(random_id+i).classList.add('spotTaken', ship_name, 'spotHidden');
            }
            return true;

        } else {
            return false;
        }
    }

    //parameters for a vertical ship
    else {

        //randomly determines the first square that the ship will potentially occupy
        var x = Math.floor(Math.random()*gridWidth);
        var y = Math.floor(Math.random()*(gridWidth-(ship_size-1)));
        var random_id = y*gridWidth+x+200;

        //if there's no ship in the way of the new ship, places the new one by adding the ship class to two or more (depending on the ship's lenght) consecutive vertical squares
        if (checkShipPresence(random_id,ship_size,gridWidth)) {
            for (var i = 0; i < ship_size; i++) {
                document.getElementById(random_id+i*gridWidth).classList.add('spotTaken', ship_name, 'spotHidden');
            }
            return true;

        } else {
            return false;
        }
    }
}
    

//checks if there is already a ship where we want to place a new one
function checkShipPresence(random_id,ship_size,next_square_multiplicator) {
        var i=0;
        while (i < ship_size && !document.getElementById(random_id+i*next_square_multiplicator).classList.contains('spotTaken')){
            i++;
        }
        if (i == ship_size) {
            return true;
        }
        return false;
}


// // Définition des différent type de vaisseaux, noms/classes et leur longueurs (deux types de placements), pour le random de l'ordinateur
// let shipTypes = [
//     {
//         name: 'Corvette',
//         directions: [
//             [0, 1],
//             [0, gridWidth]
//         ]
//     },
//     {
//         name: 'Fregate',
//         directions: [
//             [0, 1, 2],
//             [0, gridWidth, gridWidth * 2]
//         ]
//     },
//     {
//         name: 'Navette',
//         directions: [
//             [0, 1, 2],
//             [0, gridWidth, gridWidth * 2]
//         ]
//     },
//     {
//         name: 'Croiseur',
//         directions: [
//             [0, 1, 2, 3],
//             [0, gridWidth, gridWidth * 2, gridWidth * 3]
//         ]
//     },
//     {
//         name: 'Vaisseau_de_Commandement',
//         directions: [
//             [0, 1, 2, 3, 4],
//             [0, gridWidth, gridWidth * 2, gridWidth * 3, gridWidth * 4]
//         ]
//     },
// ]

// // Randomnisation des vaisseaux de l'ordinateur (éventuellement bouton pour le joueur?)
// function randomComputerShip(ship) {

//     // Définition d'un sens de placement, vertical ou horizontal, aléatoirement 
//     let randomVerticalOrHorizontal = Math.floor(Math.random() * ship.directions.length);
//     let actualDirection = ship.directions[randomVerticalOrHorizontal];

//     if (randomVerticalOrHorizontal === 0) {
//         direction = 1;
//     } else if (randomVerticalOrHorizontal === 1) {
//         direction = 10;
//     }

//     // Détermine une case de "départ" pour le positionnement du vaisseau.
//     let placementStart = Math.abs(Math.floor(Math.random() * computerSpots.length - (ship.directions[0].length * direction)));

//     // Vérification que la case n'est pas déjà occupée par un autre vaisseau et est bien vide
//     let alreadyTakken = actualDirection.some(index => computerSpots[placementStart + index].classList.contains('spotTaken'));

//     // Vérification que l'on ne se trouve pas sur les bords de l'écran, pour ne pas que les vaisseaux
//     // "débordent" lors de leur placement.
//     let rightBorder = actualDirection.some(index => (placementStart + index) % gridWidth === gridWidth - 1);
//     let leftBorder = actualDirection.some(index => (placementStart + index) % gridWidth === 0);

//     // Si les conditions (case vide, et DANS la grille) sont respectées, alors, un vaisseau est placé
//     // SINON, la fonction se relance jusqu'à que cela soit le cas et que tous les vaiseaux le soient
//     if (!alreadyTakken && !rightBorder && !leftBorder) {
//         actualDirection.forEach(index => computerSpots[placementStart + index].classList.add('spotTaken', 'spotHidden', ship.name));
//     } else {
//         randomComputerShip(ship);
//     }
// }

// Fonction pour faire pivoter les vaisseaux à placer par le joueur.
function rotation() {
    if (posHorizontal == true) {
        containerCorvette.forEach(ship => ship.classList.toggle('containerCorvetteVertical'));
        containerFregate.forEach(ship => ship.classList.toggle('containerFregateVertical'));
        containerNavette.forEach(ship => ship.classList.toggle('containerNavetteVertical'));
        containerCargo.forEach(ship => ship.classList.toggle('containerCargoVertical'));
        containerCuirasse.forEach(ship => ship.classList.toggle('containerCuirasseVertical'));
        containerCroiseur.forEach(ship => ship.classList.toggle('containerCroiseurVertical'));
        containerCommandement.forEach(ship => ship.classList.toggle('containerVaisseau_de_CommandementVertical'));
        posHorizontal = false;
    } else {
        containerCorvette.forEach(ship => ship.classList.toggle('containerCorvetteVertical'));
        containerFregate.forEach(ship => ship.classList.toggle('containerFregateVertical'));
        containerNavette.forEach(ship => ship.classList.toggle('containerNavetteVertical'));
        containerCargo.forEach(ship => ship.classList.toggle('containerCargoVertical'));
        containerCuirasse.forEach(ship => ship.classList.toggle('containerCuirasseVertical'));
        containerCroiseur.forEach(ship => ship.classList.toggle('containerCroiseurVertical'));
        containerCommandement.forEach(ship => ship.classList.toggle('containerVaisseau_de_CommandementVertical'));
        posHorizontal = true;

    }
}

// Ecouteur sur le bouton pour pivoter les vaiseaux
shipPlacement.addEventListener('click', () => {
    rotation();
})



let actualShipAndIndex;
let dragShip;
let dragShipLength;



function dragStart() {
    // Sélection de l'élément contenant les "morceaux" du vaisseau que l'on veux bouger.
    dragShip = this;
    // On récupère la taille du vaisseau ici.
    dragShipLength = this.children.length;
}

function dragOver(e) {

    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}


function dragDrop() {
    // On cherche à récupérer le nom et l'id du DERNIER element du vaisseau ici.
    let shipNameAndId = dragShip.lastElementChild.id;
    // Coupe l'id pour récupérer le "nom" (classe) du vaisseau uniquement pour plus tard
    let shipClass = shipNameAndId.slice(0, -2);

    // Récupère le dernier index du vaisseau et converti le résultat en chiffre a utiliser
    let shipLastIndex = parseInt(shipNameAndId.substr(-1));

    // Calcule le dernier index du vaisseau pour son placement futur
    let lastShipId;
    if (posHorizontal) {
        lastShipId = shipLastIndex + parseInt(this.dataset.id);
    } else {
        lastShipId = parseInt(this.dataset.id) + (dragShipLength - 1) * gridWidth;
    }

    // Cases où le placement du bateau n'est pas possible.
    const notPossibleHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 12, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93];
    const notPossibleVertical = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139];
    // [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60];

    // Vérifie combien de case dépasserais le vaisseau sur las cases non authorisées.
    let newNotPossibleHorizontal = notPossibleHorizontal.splice(0, shipLastIndex * 10);
    let newNotPossibleVertical = notPossibleVertical.splice(0, shipLastIndex * 10);

    // Case actuellement drag'n'dropped
    let actualShipIndex = parseInt(actualShipAndIndex.substr(-1));

    // Index de la grille sur lequel le dernier morceau (index) du vaisseau tombera, en fonction de la position choisie
    if (posHorizontal) {
        lastShipId = lastShipId - actualShipIndex;
    } else {
        lastShipId = lastShipId - actualShipIndex * gridWidth;
    }

    // Vérification des cases déjà occupées dans l'emplacement choisi par la fonction
    if (posHorizontal && !newNotPossibleHorizontal.includes(lastShipId)) {
        for (i = 0; i < dragShipLength; i++) {

            if (playerSpots[parseInt(this.dataset.id) - actualShipIndex + i].classList.contains('spotTaken')) {
                return;
            }

        }
    } else if (!posHorizontal && !newNotPossibleVertical.includes(lastShipId)) {
        for (i = 0; i < dragShipLength; i++) {

            if (playerSpots[parseInt(this.dataset.id) - actualShipIndex * 10 + i * 10].classList.contains('spotTaken')) {
                return;
            }

        }
    } else return; // afficher un message d'erreur de placement dans la console.


    // affichage du vaisseau drag'n'droped
    if (posHorizontal) {

        // Boucle pour chaque morceau du vaisseau jusqu'à sa taille complète
        for (i = 0; i < dragShipLength; i++) {
            // Attribue la classe récupérée plus tôt aux divs du vaisseau, et celle de l'emplacement
            // déjà pris. Change aussi l'index de départ en fonction de là où l'on drag le vaisseau  
            playerSpots[parseInt(this.dataset.id) - actualShipIndex + i].classList.add(shipClass, 'spotTaken');
        }
    } else {
        for (i = 0; i < dragShipLength; i++) {
            // Vertical, on utilise donc la width de la grille ici.
            playerSpots[parseInt(this.dataset.id) - actualShipIndex * 10 + i * 10].classList.add(shipClass, 'spotTaken');
        }
    }

    shipPlaceBox.removeChild(dragShip);



    // cache la boite de placement une fois tous les vaisseaux placés, et fait apparaitre le bouton pour jouer.
    if (shipPlaceBox.childElementCount == 0) {
        shipPlaceBox.classList.add('hidden');
        shipPlacement.classList.add('hidden');
        playInput.classList.remove('hidden');
    }
}

// fonction qui gère les tours de jeu
function game() {

    if (gameOverStatus || !canPlay) {
        return
    }

    if (currentTurn == 'player') {
        turnBox.innerHTML = "A vous de jouer Capitaine " + inputPseudo.value + "!";




    } else if (currentTurn == 'computer') {
        turnBox.innerHTML = "Au tour de votre adversaire!";
        canPlay = false;
        window.setTimeout(computerTurn, 1000);

    }
}

// compteurs pour le score du joueur
let corvetteCounter = 0;
let fregateCounter = 0;
let navetteCounter = 0;
let croiseurCounter = 0;
let commandementCounter = 0;


// fonction qui permet de reveler la case que le joueur choisi de toucher.
function showSpot(spot) {
    // vérifie si gameover n'est pas actif, si le joueur peux jouer, et si la case cliquée ne l'a pas déjà été précédement.
    if (gameOverStatus || !canPlay || spot.classList.contains('spotMiss') || spot.classList.contains('spotHit')) {
        return;
    }
    // Si il y a touche, alors, le jeu détermine quel vaisseau a été touché, et incrémente le compteur qui lui est lié.
    if (!spot.classList.contains('spotHit')) {
        if (spot.classList.contains('Corvette')) {
            corvetteCounter++;
        } if (spot.classList.contains('Fregate')) {
            fregateCounter++;
        } if (spot.classList.contains('Navette')) {
            navetteCounter++;
        } if (spot.classList.contains('Croiseur')) {
            croiseurCounter++;
        } if (spot.classList.contains('Vaisseau_de_Commandement')) {
            commandementCounter++;
        }
    }
    if (spot.classList.contains('spotTaken')) {
        spot.classList.add('spotHit');

    } else {
        spot.classList.add('spotMiss');
    }

    playerScore++;

    currentTurn = 'computer';
    winConditions();

    game();
}


// compteurs pour le score de l'ordinateur (en fonction de la difficulté)
let corvetteComputerCounter = 0;
let fregateComputerCounter = 0;
let navetteComputerCounter = 0;
let cuirasseComputerCounter = 0;
let cargoComputerCounter = 0;
let croiseurComputerCounter = 0;
let commandementComputerCounter = 0;


// Fonction pour le tour de l'ordinateur
function computerTurn() {

    // SI l'ordinateur n'a pas de "chasse" en cours, ou premier tour de ce dernier
    if (currentHuntSpots.length == 0) {

        // détermine un spot random
        let computerRandomHit = Math.floor(Math.random() * playerSpots.length);

        // vérification que le spot n'est pas déjà touché
        if (!playerSpots[computerRandomHit].classList.contains('spotHit') && !playerSpots[computerRandomHit].classList.contains('spotMiss')) {

            if (playerSpots[computerRandomHit].classList.contains('spotTaken')) {

                // attribue la classe hit, et se rappelle du spot pour entrer en mode chasse et chercher le vaisseau autour plus tard
                playerSpots[computerRandomHit].classList.add('spotHit');
                currentHuntSpots.push(playerSpots[computerRandomHit]);

                // appelle la fonction qui gère les points.
                computerPointsCount(computerRandomHit);

            } else {
                playerSpots[computerRandomHit].classList.add('spotMiss');
            }
            winConditions();
        } else {
            computerTurn();
        }

        currentTurn = 'player';
        turnBox.innerHTML = "A vous de jouer Capitaine " + inputPseudo.value + "!";
        canPlay = true;



        // si l'ordinateur a DEJA touché et est en mode chasse
    } else {
        // réinitialise la liste des coups possible pour éviter les doublons
        newPossibleComputerHits = [];
        for (i = 0; i < currentHuntSpots.length; i++) {
            const currentId = parseInt(currentHuntSpots[i].dataset.id);
            // détermine TOUTES les cases possibles autour de TOUTES les cases déjà "chassées"
            if (currentId%10 != 0) {
            newPossibleComputerHits.push(playerSpots[currentId - 1]);
            }
            if (currentId%10 != 9) {   
            newPossibleComputerHits.push(playerSpots[currentId + 1]);
            }
            if (currentId >= 10) {
            newPossibleComputerHits.push(playerSpots[currentId - 10]);
            }
            if (currentId < 90) {
            newPossibleComputerHits.push(playerSpots[currentId + 10]);
            }
        }

        // enlève les possible retour undefined (cases a l'extérieur de la grille)
        // newPossibleComputerHits = newPossibleComputerHits.filter(function (clean) {
        //    return clean != undefined;
        // })

        // vérifie pour chaque case à toucher dans le tableau si elle n'a pas déjà été touchée
        // for (i = 0; i < newPossibleComputerHits.length; i++) {

        //     if (newPossibleComputerHits[i].classList.contains('spotMiss')) {
        //         tabsup = newPossibleComputerHits.splice(i, 1);
        //         i--;
        //     }
        //     else if (newPossibleComputerHits[i].classList.contains('spotHit')) {
        //         tabsup = newPossibleComputerHits.splice(i, 1);
        //         i--;
        //     }


        // }

        // si les cases à toucher sont vides, alors l'ordinateur n'est plus en chasse, et retourne en mode random.
        if (newPossibleComputerHits.length == 0) {
            currentHuntSpots = [];
            computerTurn();
        }

        // détermine une case au hasard DANS l'array des cases possibles à toucher déterminées plus haut
        let randomComputerIndex = Math.floor(Math.random() * (newPossibleComputerHits.length));
        let computerNewMove = newPossibleComputerHits[randomComputerIndex].dataset.id;

        // vérification habituelles, comme pour le mode random, etc...
        if (!playerSpots[computerNewMove].classList.contains('spotHit') && !playerSpots[computerNewMove].classList.contains('spotMiss')) {

            if (playerSpots[computerNewMove].classList.contains('spotTaken')) {

                playerSpots[computerNewMove].classList.add('spotHit');
                currentHuntSpots.push(playerSpots[computerNewMove]);

                computerPointsCount(computerNewMove);

            } else {
                playerSpots[computerNewMove].classList.add('spotMiss');
            }
            winConditions();
        } else {
            computerTurn();
        }

        currentTurn = 'player';
        turnBox.innerHTML = "A vous de jouer Capitaine " + inputPseudo.value + "!";
        canPlay = true;
    }
}

// Fonction qui compte les points pour établir les conditions de victoire ensuite
function computerPointsCount(index) {
    if (playerSpots[index].classList.contains('Corvette')) {
        corvetteComputerCounter++;
    } if (playerSpots[index].classList.contains('Fregate')) {
        fregateComputerCounter++;
    } if (playerSpots[index].classList.contains('Navette')) {
        navetteComputerCounter++;
    } if (playerSpots[index].classList.contains('Cuirasse')) {
        cuirasseComputerCounter++;
    } if (playerSpots[index].classList.contains('Cargo')) {
        cargoComputerCounter++;
    } if (playerSpots[index].classList.contains('Croiseur')) {
        croiseurComputerCounter++;
    } if (playerSpots[index].classList.contains('Vaisseau_de_Commandement')) {
        commandementComputerCounter++;
    }
}

var speed = 50;

// Fonction qui vérifie les conditions de victoire, et appelle si nécessaire le game over
function winConditions() {

    // Partie qui compte le score du joueur
    if (corvetteCounter == 2) {
        chatBox.innerHTML += "Vous avez détruit la Corvette de votre adversaire!</br>";
        corvetteCounter = 10;
    } if (fregateCounter == 3) {
        chatBox.innerHTML += "Vous avez détruit la Frégate de votre adversaire!</br>";
        fregateCounter = 10;
    } if (navetteCounter == 3) {
        chatBox.innerHTML += "Vous avez détruit la Navette de votre adversaire!</br>";
        navetteCounter = 10;
    } if (croiseurCounter == 4) {
        chatBox.innerHTML += "Vous avez détruit le Croiseur de votre adversaire!</br>";
        croiseurCounter = 10;
    } if (commandementCounter == 5) {
        chatBox.innerHTML += "Vous avez détruit le Vaisseau de Commandement de votre adversaire!</br>";
        commandementCounter = 10;


        // Partie qui compte le score de l'ordinateur et ce en fonction de la difficulté
    } if (corvetteComputerCounter == 2) {
        chatBox.innerHTML += "Votre Corvette a été détruite!</br>";
        currentHuntSpots = currentHuntSpots.filter(spot=> !spot.classList.contains('Corvette'));
        corvetteComputerCounter = 10;
    
    } if (fregateComputerCounter == 3) {
        chatBox.innerHTML += "Votre Frégate a été détruite!</br>";
        currentHuntSpots = currentHuntSpots.filter(spot=> !spot.classList.contains('Fregate'));
        fregateComputerCounter = 10;
    } if (navetteComputerCounter == 3) {
        chatBox.innerHTML += "Votre Navette a été détruite!</br>";
        currentHuntSpots = currentHuntSpots.filter(spot => !spot.classList.contains('Navette'));
        navetteComputerCounter = 10;
    } if (cuirasseComputerCounter == 3) {
        chatBox.innerHTML += "Votre Cuirassé a été détruite!</br>";
        currentHuntSpots = currentHuntSpots.filter(spot => !spot.classList.contains('Cuirasse'));
        cuirasseComputerCounter = 10;
    } if (croiseurComputerCounter == 4) {
        chatBox.innerHTML += "Votre Croiseur a été détruit!</br>";
        currentHuntSpots = currentHuntSpots.filter(spot => !spot.classList.contains('Croiseur'));
        croiseurComputerCounter = 10;
    } if (cargoComputerCounter == 4) {
        chatBox.innerHTML += "Votre Cargo a été détruit!</br>";
        currentHuntSpots = currentHuntSpots.filter(spot=> !spot.classList.contains('Cargo'));
        cargoComputerCounter = 10;
    } if (commandementComputerCounter == 5) {
        chatBox.innerHTML += "Votre Vaisseau de Commandement a été détruit!</br>";
        currentHuntSpots = currentHuntSpots.filter(spot => !spot.classList.contains('Vaisseau_de_Commandement'));
        commandementComputerCounter = 10;

        // vérification simple pour la victoire du joueur
    } if (corvetteCounter + fregateCounter + navetteCounter + croiseurCounter + commandementCounter == 50) {
        chatBox.innerHTML += "Vous avez gagné!</br>";
        gameOver(true);
    }

    // vérifications pour la victoire de l'ordinateur en fonction de la difficulté, et donc des vaisseaux du joueur
    if (playerDifficulty.value == "Facile") {
        if (fregateComputerCounter + navetteComputerCounter + cuirasseComputerCounter + croiseurComputerCounter + cargoComputerCounter + commandementComputerCounter == 60) {
            chatBox.innerHTML += "Votre adversaire a gagné!</br>";
            gameOver(false);
        }
    } else if (playerDifficulty.value == "Normal") {
        if (corvetteComputerCounter + fregateComputerCounter + navetteComputerCounter + croiseurComputerCounter + commandementComputerCounter == 50) {
            chatBox.innerHTML += "Votre adversaire a gagné!</br>";
            gameOver(false);
        }
    } else if (playerDifficulty.value == "Difficile") {
        if (fregateComputerCounter + navetteComputerCounter + cuirasseComputerCounter + commandementComputerCounter == 40) {
            chatBox.innerHTML += "Votre adversaire a gagné!</br>";
            gameOver(false);
        }

    }

}

// Fonction qui se lance quand la partie est gagné par le joueur ou l'ordinateur, et appelle la page de scores
function gameOver(status) {
    gameOverStatus = true;
    
    
    // Le status true ici rapporte une victoire, et affiche/compte donc les scores
    if (status == true) {
        containerGameGrid.classList.add('hidden');
        scoreTab.classList.remove('hidden');
        loadItemsFromStorage();
        

    // Le status false ici rapporte une défaite et donc n'affiche pas les scores, mais un message de défaite    
    } else if (status == false) {
        containerGameGrid.classList.add('hidden');
        gameOverTab.classList.remove('hidden');
        gameOverTab.innerHTML = "<p>Vous avez perdu! C'est dommage, essayez une prochaine fois!</p>"
    }
}

// Fonction qui sauvegarde le score du joueur dans le localstorage de Sandrine
function saveItemsInStorage() {

    // on récupère la date du jour
    let newDate = new Date();
    let newDateGood = newDate.toLocaleDateString();
    
    // nouvel item qui contiendra les informations du score
    let scoreItem = {
        id: scoreCounter,
        score: playerScore,
        text: "Gagné en " + playerScore + " coups le " + newDateGood
    };

    // on ajoute le score à notre liste, et on la garde dans le localstorage
    scoreList.push(scoreItem);
    localStorage.setItem("score-items", JSON.stringify(scoreList));
    scoreCounter++;
    localStorage.setItem('counter', scoreCounter);

    
        // on affiche notre liste de score actuelle
        for (x = 0; x < scoreList.length; x++) {
            let newItem = document.createElement('div');
            newItem.classList.add('score');
            newItem.id = scoreList[x].id;
            newItem.innerText = scoreList[x].text;
            scoreTab.appendChild(newItem);
        }
        scoreList = [];  
}

// Fonction qui charge les scores du joueur et les met à jour
function loadItemsFromStorage() {
    scoreList = [];
    
    // récuparation des scores et du counter, pour les utiliser ensuite
    const storageScores = localStorage.getItem("score-items");

    if (storageScores != null) {
    scoreList = JSON.parse(storageScores);
    scoreCounter = localStorage.getItem('counter');
    }
    
    

    
    if (CLEAR_LOCAL_STORAGE) {
        localStorage.clear();
    }
    saveItemsInStorage();
}

// Ecouteur de base qui lance le jeu quand on clique sur "jouer", et ajoute les écouteurs sur les spots de l'ordinateur a ce moment
playInput.addEventListener('click', () => {
    game();
    playInput.classList.add('hidden');

    computerSpots.forEach(spot => spot.addEventListener('click', () => {
        showSpot(spot);
    }))
})




// Ecouteurs sur les boutons de thèmes à couleur
themeColorGreen.addEventListener('click', () => {
    changecolor('Green');
    document.body.style.color = "#00ff00";
})

themeColorRed.addEventListener('click', () => {
    changecolor('Red');
    document.body.style.color = "#ff0000";
})
themeColorPurple.addEventListener('click', () => {
    changecolor('Purple');
    document.body.style.color = "#ba55d3";
})
themeColorOrange.addEventListener('click', () => {
    changecolor('Orange');
    document.body.style.color = "#ff8c00";
})
themeColorBlue.addEventListener('click', () => {
    changecolor('Blue');
    document.body.style.color = "#0000CD";
})

themeColorPink.addEventListener('click', () => {
    changecolor('Pink');
    document.body.style.color = "#fd6c9e";
})

// Fonction qui gère les couleurs des thèmes toutes en même temps.
function changecolor(color) {
    inputValider.classList.remove('colorPink', 'colorRed', 'colorPurple', 'colorOrange', 'colorBlue', 'colorGreen');
    inputValider.classList.add('color' + color);
    inputValiderDifficulty.classList.remove('colorPink', 'colorRed', 'colorPurple', 'colorOrange', 'colorBlue', 'colorGreen');
    inputValiderDifficulty.classList.add('color' + color);
    shipPlacement.classList.remove('colorPink', 'colorRed', 'colorPurple', 'colorOrange', 'colorBlue', 'colorGreen');
    shipPlacement.classList.add('color' + color);
    inputPseudo.classList.remove('borderPink', 'borderRed', 'borderPurple', 'borderOrange', 'borderBlue', 'borderGreen');
    inputPseudo.classList.add('border' + color);
    playerDifficulty.classList.remove('colorPink', 'colorRed', 'colorPurple', 'colorOrange', 'colorBlue', 'colorGreen');
    playerDifficulty.classList.add('color' + color);
    playInput.classList.remove('colorPink', 'colorRed', 'colorPurple', 'colorOrange', 'colorBlue', 'colorGreen');
    playInput.classList.add('color' + color);
    scoreTab.classList.remove('borderPink', 'borderRed', 'borderPurple', 'borderOrange', 'borderBlue', 'borderGreen');
    scoreTab.classList.add('border' + color);
    chatBox.classList.remove('borderPink', 'borderRed', 'borderPurple', 'borderOrange', 'borderBlue', 'borderGreen');
    chatBox.classList.add('border' + color);
    turnBox.classList.remove('borderPink', 'borderRed', 'borderPurple', 'borderOrange', 'borderBlue', 'borderGreen');
    turnBox.classList.add('border' + color);
    gameOverTab.classList.remove('borderPink', 'borderRed', 'borderPurple', 'borderOrange', 'borderBlue', 'borderGreen');
    gameOverTab.classList.add('border' + color);
    linkBack.classList.remove('linkGreen', 'linkRed', 'linkPurple', 'linkOrange', 'linkBlue', 'linkPink');
    linkBack.classList.add('link'+color);
    //linkBack.style.background = "url('../IMG/return'+color+'.png')";
}

// Easters Eggs.... Et... PONEYS!!!
jupiter.addEventListener('click', () => {
    ponyJoke.classList.remove('hidden');
    window.setTimeout(() => {
        ponyJoke.classList.add('hidden');
    }, 50);
})

mars.addEventListener('click', () => {
    let ponySound = new Audio('Sounds/pony.mp3');
    ponySound.play();
})

mercure.addEventListener('click', () => {
    imgMercure.classList.add('hidden');
    window.setTimeout(() => {
        imgMercure.classList.remove('hidden');
    }, 5000);
    let poofSound = new Audio('Sounds/poof.mp3');
    poofSound.play();
})

uranus.addEventListener('click', () => {
    if (uranus.classList.contains('uranusPos1')) {
        uranus.classList.remove('uranusPos1');
        uranus.classList.add('uranusPos2');
    } else if (uranus.classList.contains('uranusPos2')) {
        uranus.classList.remove('uranusPos2');
        uranus.classList.add('uranusPos3');
    } else {
        uranus.classList.remove('uranusPos3');
        uranus.classList.add('uranusPos1');
    }
})

venus.addEventListener('click', () => {
    venus.classList.add('shining');
    window.setTimeout(() => {
        imgVenus.classList.remove('shining');
    }, 5000);
})
/* =========================================================
   BLACKOUT — HLAVNÍ GAME ENGINE v2
========================================================= */


/* =========================================================
   ZÁKLADNÍ STAV HRY
========================================================= */

let currentRoom = "room1";

let gameState = {

    completedRooms: [],

    roomsUnlocked: [
        "room1"
    ],

    roomHistory: [],

    flags: {},

    started: false

};


/* =========================================================
   START HRY
========================================================= */

function startGame() {

    loadGame();


    if (
        typeof loadInventory ===
        "function"
    ) {

        loadInventory();

    }


    if (
        typeof loadRoomItems ===
        "function"
    ) {

        loadRoomItems();

    }


    if (
        typeof loadSettings ===
        "function"
    ) {

        loadSettings();

    }


    gameState.started = true;


    /*
       Po úplném resetu vždy začínáme
       v první místnosti.
    */

    if (
        !gameState.roomHistory ||
        gameState.roomHistory.length === 0
    ) {

        currentRoom = "room1";

    } else {

        currentRoom =
            gameState.roomHistory[
                gameState.roomHistory.length - 1
            ];

    }


    const intro =
        document.getElementById(
            "intro"
        );


    const gameScreen =
        document.getElementById(
            "gameScreen"
        );


    if (intro) {

        intro.classList.remove(
            "active"
        );

        intro.style.display =
            "none";

    }


    if (gameScreen) {

        gameScreen.classList.add(
            "active"
        );

        gameScreen.style.display =
            "block";

    }


    showRoom(
        currentRoom
    );


    saveGame();


    playSound(
        "click"
    );

}


/* =========================================================
   ZOBRAZENÍ MÍSTNOSTI
========================================================= */

function showRoom(roomId) {

    if (!roomId) {

        roomId =
            "room1";

    }


    if (
        !isRoomUnlocked(
            roomId
        )
    ) {

        playSound(
            "error"
        );

        return;

    }


    currentRoom =
        roomId;


    rememberRoom(
        roomId
    );


    const intro =
        document.getElementById(
            "intro"
        );


    const gameScreen =
        document.getElementById(
            "gameScreen"
        );


    if (intro) {

        intro.classList.remove(
            "active"
        );

        intro.style.display =
            "none";

    }


    if (gameScreen) {

        gameScreen.classList.add(
            "active"
        );

        gameScreen.style.display =
            "block";

    }


    if (
        typeof renderRoom ===
        "function"
    ) {

        renderRoom(
            roomId
        );

    }


    updateUI();

    updateMap();

}


/* =========================================================
   MAPA
========================================================= */

function openMap() {

    const modal =
        document.getElementById(
            "mapModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.add(
        "show"
    );

    modal.style.display =
        "flex";


    if (
        typeof renderMap ===
        "function"
    ) {

        renderMap();

    }


    playSound(
        "click"
    );

}


function closeMap() {

    const modal =
        document.getElementById(
            "mapModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );

    modal.style.display =
        "none";

}


function updateMap() {

    const modal =
        document.getElementById(
            "mapModal"
        );


    if (
        modal &&
        modal.classList.contains(
            "show"
        )
    ) {

        if (
            typeof renderMap ===
            "function"
        ) {

            renderMap();

        }

    }

}


/* =========================================================
   NASTAVENÍ
========================================================= */

function openSettings() {

    const modal =
        document.getElementById(
            "settingsModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.add(
        "show"
    );

    modal.style.display =
        "flex";


    if (
        typeof renderSettings ===
        "function"
    ) {

        renderSettings();

    }


    playSound(
        "click"
    );

}


function closeSettings() {

    const modal =
        document.getElementById(
            "settingsModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );

    modal.style.display =
        "none";

}


/* =========================================================
   INVENTÁŘ
========================================================= */

/*
   POZOR:
   Inventory.js už má vlastní openInventory().
   Tady ho proto nepřepisujeme.
*/

function refreshInventoryUI() {

    if (
        typeof loadInventory ===
        "function"
    ) {

        loadInventory();

    }


    if (
        typeof renderInventory ===
        "function"
    ) {

        renderInventory();

    }


    updateUI();

}


/* =========================================================
   ODEMKNUTÍ MÍSTNOSTÍ
========================================================= */

function isRoomUnlocked(
    roomId
) {

    return (
        Array.isArray(
            gameState.roomsUnlocked
        ) &&
        gameState.roomsUnlocked.includes(
            roomId
        )
    );

}


function unlockRoom(
    roomId
) {

    if (!roomId) {
        return;
    }


    if (
        !Array.isArray(
            gameState.roomsUnlocked
        )
    ) {

        gameState.roomsUnlocked = [
            "room1"
        ];

    }


    if (
        !gameState.roomsUnlocked.includes(
            roomId
        )
    ) {

        gameState.roomsUnlocked.push(
            roomId
        );


        saveGame();


        playSound(
            "success"
        );


        vibrate(
            70
        );

    }


    updateMap();

}


function completeRoom(
    roomId
) {

    if (!roomId) {
        return;
    }


    if (
        !Array.isArray(
            gameState.completedRooms
        )
    ) {

        gameState.completedRooms = [];

    }


    if (
        !gameState.completedRooms.includes(
            roomId
        )
    ) {

        gameState.completedRooms.push(
            roomId
        );


        saveGame();

    }


    updateMap();

}


/* =========================================================
   HISTORIE MÍSTNOSTÍ
========================================================= */

function rememberRoom(
    roomId
) {

    if (!roomId) {
        return;
    }


    if (
        !Array.isArray(
            gameState.roomHistory
        )
    ) {

        gameState.roomHistory = [];

    }


    const last =
        gameState.roomHistory[
            gameState.roomHistory.length - 1
        ];


    if (
        last !== roomId
    ) {

        gameState.roomHistory.push(
            roomId
        );

    }


    /*
       Historii nebudeme ukládat
       při každém renderu zbytečně.
    */

    saveGame();

}


/* =========================================================
   FLAGS
========================================================= */

function setFlag(
    name,
    value = true
) {

    if (!name) {
        return;
    }


    if (!gameState.flags) {

        gameState.flags = {};

    }


    gameState.flags[name] =
        value;


    saveGame();

}


function getFlag(
    name
) {

    if (
        !gameState.flags
    ) {

        return false;

    }


    return (
        gameState.flags[name] ||
        false
    );

}


/* =========================================================
   SAVE
========================================================= */

function saveGame() {

    localStorage.setItem(
        "BLACKOUT_GAME",
        JSON.stringify(
            gameState
        )
    );

}


/* =========================================================
   LOAD
========================================================= */

function loadGame() {

    const saved =
        localStorage.getItem(
            "BLACKOUT_GAME"
        );


    if (!saved) {

        gameState = {

            completedRooms: [],

            roomsUnlocked: [
                "room1"
            ],

            roomHistory: [],

            flags: {},

            started: false

        };

        return;

    }


    try {

        const data =
            JSON.parse(
                saved
            );


        if (!data) {
            return;
        }


        gameState = {

            completedRooms:
                Array.isArray(
                    data.completedRooms
                )
                    ? data.completedRooms
                    : [],


            roomsUnlocked:
                Array.isArray(
                    data.roomsUnlocked
                ) &&
                data.roomsUnlocked.length > 0

                    ? data.roomsUnlocked

                    : [
                        "room1"
                    ],


            roomHistory:
                Array.isArray(
                    data.roomHistory
                )
                    ? data.roomHistory
                    : [],


            flags:
                data.flags &&
                typeof data.flags ===
                "object"

                    ? data.flags

                    : {},


            started:
                data.started === true

        };


        /*
           Room 1 musí být vždy dostupná.
        */

        if (
            !gameState.roomsUnlocked.includes(
                "room1"
            )
        ) {

            gameState.roomsUnlocked.unshift(
                "room1"
            );

        }

    } catch (error) {

        console.error(
            "BLACKOUT save error:",
            error
        );


        gameState = {

            completedRooms: [],

            roomsUnlocked: [
                "room1"
            ],

            roomHistory: [],

            flags: {},

            started: false

        };

    }

}


/* =========================================================
   KOMPLETNÍ RESET HRY
========================================================= */

function resetGame() {

    const answer =
        confirm(
            "Opravdu chceš smazat celý postup?"
        );


    if (!answer) {
        return;
    }


    /*
       ======================================
       1. HLAVNÍ GAME SAVE
       ======================================
    */

    localStorage.removeItem(
        "BLACKOUT_GAME"
    );


    /*
       ======================================
       2. INVENTÁŘ
       ======================================
    */

    localStorage.removeItem(
        "BLACKOUT_INVENTORY"
    );


    /*
       ======================================
       3. SEBRANÉ PŘEDMĚTY V MÍSTNOSTECH
       ======================================
    */

    localStorage.removeItem(
        "BLACKOUT_ROOM_ITEMS"
    );


    /*
       ======================================
       4. VŠECHNY PUZZLE
       ======================================
    */

    Object.keys(
        localStorage
    ).forEach(
        key => {

            if (
                key.startsWith(
                    "BLACKOUT_PUZZLE_"
                )
            ) {

                localStorage.removeItem(
                    key
                );

            }


            if (
                key.startsWith(
                    "BLACKOUT_INV_FLAG_"
                )
            ) {

                localStorage.removeItem(
                    key
                );

            }


            if (
                key.startsWith(
                    "BLACKOUT_FLAG_"
                )
            ) {

                localStorage.removeItem(
                    key
                );

            }

        }
    );


    /*
       ======================================
       5. RESET PAMĚTI V JAVASCRIPTU
       ======================================
    */

    gameState = {

        completedRooms: [],

        roomsUnlocked: [
            "room1"
        ],

        roomHistory: [],

        flags: {},

        started: false

    };


    currentRoom =
        "room1";


    /*
       Inventář
    */

    if (
        typeof inventory !==
        "undefined"
    ) {

        inventory = [];

    }


    /*
       Předměty místností
    */

    if (
        typeof collectedItems !==
        "undefined"
    ) {

        collectedItems = [];

    }


    /*
       Stav hádanek
    */

    if (
        typeof cableSequence !==
        "undefined"
    ) {

        cableSequence = [];

    }


    if (
        typeof securitySequence !==
        "undefined"
    ) {

        securitySequence = [];

    }


    /*
       Zavření oken
    */

    closeMap();

    closeSettings();

    closeInventory();


    if (
        typeof closePuzzle ===
        "function"
    ) {

        closePuzzle();

    }


    if (
        typeof closeInventoryDetail ===
        "function"
    ) {

        closeInventoryDetail();

    }


    /*
       Obnovení místnosti
    */

    if (
        typeof loadRoomItems ===
        "function"
    ) {

        loadRoomItems();

    }


    if (
        typeof loadInventory ===
        "function"
    ) {

        loadInventory();

    }


    /*
       Úvodní obrazovka
    */

    const intro =
        document.getElementById(
            "intro"
        );


    const gameScreen =
        document.getElementById(
            "gameScreen"
        );


    if (gameScreen) {

        gameScreen.style.display =
            "none";

        gameScreen.classList.remove(
            "active"
        );

    }


    if (intro) {

        intro.style.display =
            "block";

        intro.classList.add(
            "active"
        );

    }


    /*
       Vykreslení prázdného inventáře
    */

    if (
        typeof renderInventory ===
        "function"
    ) {

        renderInventory();

    }


    /*
       Zvuk resetu
    */

    playSound(
        "click"
    );


    console.log(
        "BLACKOUT: postup byl kompletně vymazán."
    );

}


/* =========================================================
   ZVUK
========================================================= */

function playSound(
    type
) {

    if (
        typeof soundEnabled !==
        "undefined" &&
        soundEnabled === false
    ) {

        return;

    }


    if (
        typeof createGameSound ===
        "function"
    ) {

        createGameSound(
            type
        );

    }

}


/* =========================================================
   VIBRACE
========================================================= */

function vibrate(
    duration = 50
) {

    if (
        typeof vibrationEnabled !==
        "undefined" &&
        vibrationEnabled === false
    ) {

        return;

    }


    if (
        typeof navigator !==
        "undefined" &&
        typeof navigator.vibrate ===
        "function"
    ) {

        navigator.vibrate(
            duration
        );

    }

}


/* =========================================================
   FLASH
========================================================= */

function flashScreen() {

    if (
        typeof effectsEnabled !==
        "undefined" &&
        effectsEnabled === false
    ) {

        return;

    }


    const flash =
        document.createElement(
            "div"
        );


    flash.className =
        "screen-flash";


    document.body.appendChild(
        flash
    );


    setTimeout(
        () => {

            flash.remove();

        },
        250
    );

}


/* =========================================================
   UI
========================================================= */

function updateUI() {

    const counter =
        document.getElementById(
            "inventoryCounter"
        );


    if (
        counter &&
        typeof inventoryCount ===
        "function"
    ) {

        counter.textContent =
            inventoryCount();

    }

}


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        closeMap();

        closeSettings();

        closeInventory();


        if (
            typeof closePuzzle ===
            "function"
        ) {

            closePuzzle();

        }


        if (
            typeof closeInventoryDetail ===
            "function"
        ) {

            closeInventoryDetail();

        }

    }
);


/* =========================================================
   START PO NAČTENÍ
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadGame();


        if (
            typeof loadInventory ===
            "function"
        ) {

            loadInventory();

        }


        if (
            typeof loadRoomItems ===
            "function"
        ) {

            loadRoomItems();

        }


        if (
            typeof loadSettings ===
            "function"
        ) {

            loadSettings();

        }


        updateUI();

    }
);

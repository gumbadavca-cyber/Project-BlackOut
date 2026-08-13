/* =========================================
   BLACKOUT — HLAVNÍ ENGINE
========================================= */

let currentRoom = "room1";

let gameState = {

    completedRooms: [],

    roomsUnlocked: [
        "room1"
    ],

    roomHistory: [],

    flags: {}

};


/* =========================================
   START HRY
========================================= */

function startGame() {

    loadGame();

    loadInventory();

    loadSettings();

    currentRoom =
        gameState.roomHistory.length > 0
            ? gameState.roomHistory[
                gameState.roomHistory.length - 1
              ]
            : "room1";

    showRoom(currentRoom);

    playSound("click");

}


/* =========================================
   ZOBRAZENÍ MÍSTNOSTI
========================================= */

function showRoom(roomId) {

    if (!roomId) {
        roomId = "room1";
    }


    if (!isRoomUnlocked(roomId)) {

        playSound("error");

        return;

    }


    currentRoom = roomId;


    rememberRoom(roomId);


    const roomScreen =
        document.getElementById(
            "roomScreen"
        );


    const menuScreen =
        document.getElementById(
            "menuScreen"
        );


    if (menuScreen) {

        menuScreen.style.display =
            "none";

    }


    if (roomScreen) {

        roomScreen.style.display =
            "block";

    }


    if (
        typeof renderRoom ===
        "function"
    ) {

        renderRoom(roomId);

    }


    updateUI();

    updateMap();

}


/* =========================================
   OTEVŘENÍ MAPY
========================================= */

function openMap() {

    const modal =
        document.getElementById(
            "mapModal"
        );


    if (!modal) {

        console.warn(
            "mapModal nebyl nalezen."
        );

        return;

    }


    modal.classList.add("show");

    modal.style.display =
        "flex";


    renderMap();

    playSound("click");

}


/* =========================================
   ZAVŘENÍ MAPY
========================================= */

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


/* =========================================
   NASTAVENÍ
========================================= */

function openSettings() {

    const modal =
        document.getElementById(
            "settingsModal"
        );


    if (!modal) {

        console.warn(
            "settingsModal nebyl nalezen."
        );

        return;

    }


    modal.classList.add(
        "show"
    );

    modal.style.display =
        "flex";


    renderSettings();

    playSound("click");

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


/* =========================================
   INVENTÁŘ
========================================= */

function openInventory() {

    const modal =
        document.getElementById(
            "inventoryModal"
        );


    if (!modal) {

        console.warn(
            "inventoryModal nebyl nalezen."
        );

        return;

    }


    modal.classList.add(
        "show"
    );

    modal.style.display =
        "flex";


    renderInventory();

    playSound("click");

}


function closeInventory() {

    const modal =
        document.getElementById(
            "inventoryModal"
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


/* =========================================
   MÍSTNOST ODEMČENA?
========================================= */

function isRoomUnlocked(roomId) {

    return gameState.roomsUnlocked
        .includes(roomId);

}


/* =========================================
   ODEMKNUTÍ MÍSTNOSTI
========================================= */

function unlockRoom(roomId) {

    if (
        !gameState.roomsUnlocked
            .includes(roomId)
    ) {

        gameState.roomsUnlocked.push(
            roomId
        );

        saveGame();

        playSound("success");

        vibrate(80);

    }


    updateMap();

}


/* =========================================
   DOKONČENÍ MÍSTNOSTI
========================================= */

function completeRoom(roomId) {

    if (
        !gameState.completedRooms
            .includes(roomId)
    ) {

        gameState.completedRooms.push(
            roomId
        );

        saveGame();

    }


    updateMap();

}


/* =========================================
   FLAGS
========================================= */

function setFlag(name, value = true) {

    gameState.flags[name] =
        value;

    saveGame();

}


function getFlag(name) {

    return gameState.flags[name] ||
        false;

}


/* =========================================
   ULOŽENÍ HRY
========================================= */

function saveGame() {

    localStorage.setItem(
        "BLACKOUT_GAME",
        JSON.stringify(gameState)
    );

}


/* =========================================
   NAČTENÍ HRY
========================================= */

function loadGame() {

    const saved =
        localStorage.getItem(
            "BLACKOUT_GAME"
        );


    if (!saved) {
        return;
    }


    try {

        const loaded =
            JSON.parse(saved);


        if (
            loaded &&
            typeof loaded === "object"
        ) {

            gameState = {

                completedRooms:
                    Array.isArray(
                        loaded.completedRooms
                    )
                    ? loaded.completedRooms
                    : [],

                roomsUnlocked:
                    Array.isArray(
                        loaded.roomsUnlocked
                    )
                    ? loaded.roomsUnlocked
                    : ["room1"],

                roomHistory:
                    Array.isArray(
                        loaded.roomHistory
                    )
                    ? loaded.roomHistory
                    : [],

                flags:
                    loaded.flags || {}

            };

        }

    } catch (error) {

        console.error(
            "Chyba při načítání hry:",
            error
        );

    }

}


/* =========================================
   RESET HRY
========================================= */

function resetGame() {

    const confirmed =
        confirm(
            "Opravdu chceš smazat celý postup?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(
        "BLACKOUT_GAME"
    );

    localStorage.removeItem(
        "BLACKOUT_INVENTORY"
    );


    gameState = {

        completedRooms: [],

        roomsUnlocked: [
            "room1"
        ],

        roomHistory: [],

        flags: {}

    };


    inventory = [];

    selectedItem = null;

    currentRoom = "room1";


    closeSettings();

    closeInventory();

    closeMap();


    showRoom(
        "room1"
    );


    playSound("click");

}


/* =========================================
   ZPĚT DO HRY
========================================= */

function backToGame() {

    closeMap();

    closeSettings();

    closeInventory();

}


/* =========================================
   ZVUK
========================================= */

function playSound(type) {

    if (
        typeof soundEnabled !==
        "undefined" &&
        !soundEnabled
    ) {

        return;

    }


    if (
        typeof createGameSound ===
        "function"
    ) {

        createGameSound(type);

    }

}


/* =========================================
   VIBRACE
========================================= */

function vibrate(time = 50) {

    if (
        typeof vibrationEnabled !==
        "undefined" &&
        !vibrationEnabled
    ) {

        return;

    }


    if (
        navigator &&
        typeof navigator.vibrate ===
        "function"
    ) {

        navigator.vibrate(time);

    }

}


/* =========================================
   EFEKT OBRAZOVKY
========================================= */

function flashScreen() {

    if (
        typeof effectsEnabled !==
        "undefined" &&
        !effectsEnabled
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


/* =========================================
   AKTUALIZACE UI
========================================= */

function updateUI() {

    const roomName =
        document.getElementById(
            "currentRoomName"
        );


    if (
        roomName &&
        typeof rooms !==
        "undefined" &&
        rooms[currentRoom]
    ) {

        roomName.textContent =
            rooms[currentRoom].name;

    }


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


/* =========================================
   ESC = ZAVŘÍT OKNO
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        closeMap();

        closeSettings();

        closeInventory();

    }
);


/* =========================================
   START PO NAČTENÍ
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadGame();

        loadInventory();

        loadSettings();

        updateUI();

    }
);
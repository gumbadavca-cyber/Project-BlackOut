/* =========================================
   BLACKOUT — HLAVNÍ GAME ENGINE
========================================= */

let currentRoom = "room1";

let gameState = {
    completedRooms: [],
    roomsUnlocked: ["room1"],
    roomHistory: [],
    flags: {},
    started: false
};


/* =========================================
   START HRY
========================================= */

function startGame() {

    loadGame();

    if (typeof loadInventory === "function") {
        loadInventory();
    }

    if (typeof loadSettings === "function") {
        loadSettings();
    }


    gameState.started = true;


    if (
        gameState.roomHistory &&
        gameState.roomHistory.length > 0
    ) {

        currentRoom =
            gameState.roomHistory[
                gameState.roomHistory.length - 1
            ];

    } else {

        currentRoom = "room1";

    }


    const intro =
        document.getElementById("intro");

    const gameScreen =
        document.getElementById("gameScreen");


    if (intro) {
        intro.classList.remove("active");
        intro.style.display = "none";
    }


    if (gameScreen) {
        gameScreen.classList.add("active");
        gameScreen.style.display = "block";
    }


    showRoom(currentRoom);

    saveGame();

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


    const intro =
        document.getElementById("intro");

    const gameScreen =
        document.getElementById("gameScreen");


    if (intro) {

        intro.classList.remove("active");
        intro.style.display = "none";

    }


    if (gameScreen) {

        gameScreen.classList.add("active");
        gameScreen.style.display = "block";

    }


    if (typeof renderRoom === "function") {

        renderRoom(roomId);

    }


    updateUI();

    updateMap();

}


/* =========================================
   MAPA
========================================= */

function openMap() {

    const modal =
        document.getElementById("mapModal");


    if (!modal) {
        return;
    }


    modal.classList.add("show");
    modal.style.display = "flex";


    if (typeof renderMap === "function") {
        renderMap();
    }


    playSound("click");

}


function closeMap() {

    const modal =
        document.getElementById("mapModal");


    if (!modal) {
        return;
    }


    modal.classList.remove("show");
    modal.style.display = "none";

}


function updateMap() {

    const modal =
        document.getElementById("mapModal");


    if (
        modal &&
        modal.classList.contains("show")
    ) {

        if (typeof renderMap === "function") {
            renderMap();
        }

    }

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
        return;
    }


    modal.classList.add("show");
    modal.style.display = "flex";


    if (
        typeof renderSettings ===
        "function"
    ) {

        renderSettings();

    }


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


    modal.classList.remove("show");
    modal.style.display = "none";

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
        return;
    }


    modal.classList.add("show");
    modal.style.display = "flex";


    if (
        typeof renderInventory ===
        "function"
    ) {

        renderInventory();

    }


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


    modal.classList.remove("show");
    modal.style.display = "none";

}


/* =========================================
   ODEMKNUTÍ MÍSTNOSTÍ
========================================= */

function isRoomUnlocked(roomId) {

    return (
        gameState.roomsUnlocked
            .includes(roomId)
    );

}


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

        vibrate(70);

    }


    updateMap();

}


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
   HISTORIE MÍSTNOSTÍ
========================================= */

function rememberRoom(roomId) {

    if (!gameState.roomHistory) {

        gameState.roomHistory = [];

    }


    const last =
        gameState.roomHistory[
            gameState.roomHistory.length - 1
        ];


    if (last !== roomId) {

        gameState.roomHistory.push(
            roomId
        );

    }


    saveGame();

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

    return (
        gameState.flags[name] ||
        false
    );

}


/* =========================================
   SAVE
========================================= */

function saveGame() {

    localStorage.setItem(
        "BLACKOUT_GAME",
        JSON.stringify(gameState)
    );

}


/* =========================================
   LOAD
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

        const data =
            JSON.parse(saved);


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
                )
                    ? data.roomsUnlocked
                    : ["room1"],

            roomHistory:
                Array.isArray(
                    data.roomHistory
                )
                    ? data.roomHistory
                    : [],

            flags:
                data.flags || {},

            started:
                data.started === true

        };

    } catch (error) {

        console.error(
            "BLACKOUT save error:",
            error
        );

    }

}


/* =========================================
   RESET
========================================= */

function resetGame() {

    const answer =
        confirm(
            "Opravdu chceš smazat celý postup?"
        );


    if (!answer) {
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

        roomsUnlocked: ["room1"],

        roomHistory: [],

        flags: {},

        started: false

    };


    currentRoom = "room1";


    if (typeof inventory !== "undefined") {
        inventory = [];
    }


    if (
        typeof selectedItem !==
        "undefined"
    ) {
        selectedItem = null;
    }


    closeMap();
    closeSettings();
    closeInventory();


    const intro =
        document.getElementById("intro");

    const gameScreen =
        document.getElementById("gameScreen");


    if (gameScreen) {
        gameScreen.style.display = "none";
        gameScreen.classList.remove("active");
    }


    if (intro) {
        intro.style.display = "block";
        intro.classList.add("active");
    }


    playSound("click");

}


/* =========================================
   ZVUK
========================================= */

function playSound(type) {

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

        createGameSound(type);

    }

}


/* =========================================
   VIBRACE
========================================= */

function vibrate(duration = 50) {

    if (
        typeof vibrationEnabled !==
        "undefined" &&
        vibrationEnabled === false
    ) {

        return;

    }


    if (
        typeof navigator !== "undefined" &&
        typeof navigator.vibrate ===
        "function"
    ) {

        navigator.vibrate(duration);

    }

}


/* =========================================
   EFEKT
========================================= */

function flashScreen() {

    if (
        typeof effectsEnabled !==
        "undefined" &&
        effectsEnabled === false
    ) {

        return;

    }


    const flash =
        document.createElement("div");


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
   UI
========================================= */

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


/* =========================================
   ESC
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") {
            return;
        }

        closeMap();
        closeSettings();
        closeInventory();

    }
);


/* =========================================
   PO NAČTENÍ STRÁNKY
========================================= */

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
            typeof loadSettings ===
            "function"
        ) {
            loadSettings();
        }

        updateUI();

    }
);

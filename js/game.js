/* =========================================
   BLACKOUT — HLAVNÍ HRA
========================================= */

let currentRoom = "room1";

let gameState = {
    started: false,
    roomsUnlocked: ["room1"],
    completedRooms: [],
    flags: {}
};


/* =========================================
   START HRY
========================================= */

function startGame() {

    gameState.started = true;

    saveGame();

    showRoom("room1");

    playSound("click");
}


/* =========================================
   ZOBRAZENÍ MÍSTNOSTI
========================================= */

function showRoom(roomId) {

    currentRoom = roomId;

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.remove("active");
        });

    const intro =
        document.getElementById("intro");

    if (intro) {
        intro.classList.remove("active");
    }

    const gameScreen =
        document.getElementById("gameScreen");

    if (gameScreen) {
        gameScreen.classList.add("active");
    }

    if (
        typeof renderRoom === "function"
    ) {
        renderRoom(roomId);
    }

    if (
        typeof updateMap === "function"
    ) {
        updateMap();
    }

    window.scrollTo(0, 0);
}


/* =========================================
   ODEMKNUTÍ MÍSTNOSTI
========================================= */

function unlockRoom(roomId) {

    if (
        !gameState.roomsUnlocked.includes(
            roomId
        )
    ) {

        gameState.roomsUnlocked.push(
            roomId
        );

        saveGame();

        if (
            typeof updateMap === "function"
        ) {
            updateMap();
        }

        playSound("success");
    }
}


/* =========================================
   KONTROLA MÍSTNOSTI
========================================= */

function isRoomUnlocked(roomId) {

    return gameState.roomsUnlocked.includes(
        roomId
    );

}


/* =========================================
   FLAGY
========================================= */

function setFlag(
    name,
    value = true
) {

    gameState.flags[name] = value;

    saveGame();

}


function getFlag(name) {

    return gameState.flags[name] === true;

}


/* =========================================
   DOKONČENÍ MÍSTNOSTI
========================================= */

function completeRoom(roomId) {

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

}


/* =========================================
   MAPA
========================================= */

function openMap() {

    const modal =
        document.getElementById(
            "mapModal"
        );

    if (!modal) return;

    modal.classList.add("show");

    if (
        typeof renderMap === "function"
    ) {
        renderMap();
    }

}


function closeMap() {

    const modal =
        document.getElementById(
            "mapModal"
        );

    if (!modal) return;

    modal.classList.remove("show");

}


/* =========================================
   INVENTÁŘ
========================================= */

function openInventory() {

    const modal =
        document.getElementById(
            "inventoryModal"
        );

    if (!modal) return;

    modal.classList.add("show");

    if (
        typeof renderInventory === "function"
    ) {
        renderInventory();
    }

}


function closeInventory() {

    const modal =
        document.getElementById(
            "inventoryModal"
        );

    if (!modal) return;

    modal.classList.remove("show");

}


/* =========================================
   NASTAVENÍ
========================================= */

function openSettings() {

    const modal =
        document.getElementById(
            "settingsModal"
        );

    if (!modal) return;

    modal.classList.add("show");

    if (
        typeof renderSettings === "function"
    ) {
        renderSettings();
    }

}


function closeSettings() {

    const modal =
        document.getElementById(
            "settingsModal"
        );

    if (!modal) return;

    modal.classList.remove("show");

}


/* =========================================
   ZVUK
========================================= */

function playSound(type) {

    if (
        typeof createGameSound === "function"
    ) {

        createGameSound(type);

    }

}


/* =========================================
   VIBRACE
========================================= */

function vibrate(ms = 30) {

    if (
        typeof vibrationEnabled !==
        "undefined" &&
        vibrationEnabled &&
        navigator.vibrate
    ) {

        navigator.vibrate(ms);

    }

}


/* =========================================
   EFEKT
========================================= */

function flashScreen() {

    document.body.classList.add(
        "flash"
    );

    setTimeout(() => {

        document.body.classList.remove(
            "flash"
        );

    }, 120);

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

    if (!saved) return;

    try {

        const data =
            JSON.parse(saved);

        gameState = {
            ...gameState,
            ...data
        };

    } catch (error) {

        console.log(
            "Nepodařilo se načíst uloženou hru."
        );

    }

}


/* =========================================
   RESET HRY
========================================= */

function resetGame() {

    const answer =
        confirm(
            "Opravdu chceš smazat celý postup?"
        );

    if (!answer) return;

    localStorage.removeItem(
        "BLACKOUT_GAME"
    );

    localStorage.removeItem(
        "BLACKOUT_INVENTORY"
    );

    location.reload();

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadGame();

        if (
            typeof loadInventory ===
            "function"
        ) {

            loadInventory();

        }

    }
);

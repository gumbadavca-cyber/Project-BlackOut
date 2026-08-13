/* =========================================
   BLACKOUT — MAPA
========================================= */

const rooms = {

    room1: {
        name: "Probuzení",
        sector: "SECTOR 01",
        icon: "🛏️"
    },

    room2: {
        name: "Technická místnost",
        sector: "SECTOR 02",
        icon: "🔌"
    },

    room3: {
        name: "Bezpečnostní chodba",
        sector: "SECTOR 03",
        icon: "🚪"
    },

    room4: {
        name: "Laboratoř",
        sector: "SECTOR 04",
        icon: "🧪"
    },

    room5: {
        name: "Archiv",
        sector: "SECTOR 05",
        icon: "📁"
    },

    room6: {
        name: "Kontrolní centrum",
        sector: "SECTOR 06",
        icon: "💻"
    },

    room7: {
        name: "Podzemní tunel",
        sector: "SECTOR 07",
        icon: "🚇"
    },

    room8: {
        name: "Výstup",
        sector: "EXIT",
        icon: "🚨"
    }

};


/* =========================================
   VYKRESLENÍ MAPY
========================================= */

function renderMap() {

    const box =
        document.getElementById(
            "mapContent"
        );

    if (!box) return;


    box.innerHTML = `

        <div class="map-grid">

            ${createMapRoom("room1")}
            ${createMapRoom("room2")}
            ${createMapRoom("room3")}
            ${createMapRoom("room4")}
            ${createMapRoom("room5")}
            ${createMapRoom("room6")}
            ${createMapRoom("room7")}
            ${createMapRoom("room8")}

        </div>

    `;

}


/* =========================================
   JEDNA MÍSTNOST NA MAPĚ
========================================= */

function createMapRoom(roomId) {

    const room =
        rooms[roomId];

    if (!room) {
        return "";
    }


    const unlocked =
        isRoomUnlocked(roomId);

    const current =
        currentRoom === roomId;

    const completed =
        gameState.completedRooms
            .includes(roomId);


    let classes =
        "map-room";


    if (current) {
        classes += " current";
    }

    if (!unlocked) {
        classes += " locked";
    }

    if (completed) {
        classes += " completed";
    }


    if (!unlocked) {

        return `

            <div class="${classes}">

                <div style="font-size:28px">
                    🔒
                </div>

                <strong>
                    ${room.name}
                </strong>

                <small>
                    ${room.sector}
                </small>

            </div>

        `;

    }


    return `

        <button
            class="${classes}"
            onclick="
                travelToRoom('${roomId}')
            ">

            <div style="font-size:28px">
                ${room.icon}
            </div>

            <strong>
                ${room.name}
            </strong>

            <small>
                ${room.sector}
            </small>

        </button>

    `;

}


/* =========================================
   CESTOVÁNÍ
========================================= */

function travelToRoom(roomId) {

    if (!isRoomUnlocked(roomId)) {

        playSound("error");

        vibrate(80);

        return;

    }


    closeMap();

    playSound("click");

    showRoom(roomId);

}


/* =========================================
   AKTUALIZACE MAPY
========================================= */

function updateMap() {

    const modal =
        document.getElementById(
            "mapModal"
        );

    if (
        modal &&
        modal.classList.contains("show")
    ) {

        renderMap();

    }

}


/* =========================================
   NÁVRAT DO PŘEDCHOZÍ MÍSTNOSTI
========================================= */

function goBackRoom() {

    const history =
        gameState.roomHistory || [];


    if (history.length < 2) {

        return;

    }


    history.pop();

    const previousRoom =
        history[history.length - 1];


    gameState.roomHistory =
        history;


    saveGame();


    showRoom(
        previousRoom
    );

}


/* =========================================
   HISTORIE MÍSTNOSTÍ
========================================= */

function rememberRoom(roomId) {

    if (
        !gameState.roomHistory
    ) {

        gameState.roomHistory = [];

    }


    const history =
        gameState.roomHistory;


    if (
        history[
            history.length - 1
        ] !== roomId
    ) {

        history.push(roomId);

    }


    saveGame();

}


/* =========================================
   NÁVAZNOST MÍSTNOSTÍ
========================================= */

function unlockNextRoom(
    currentRoomId,
    nextRoomId
) {

    completeRoom(
        currentRoomId
    );

    unlockRoom(
        nextRoomId
    );

}


/* =========================================
   MAPOVÁ NÁPOVĚDA
========================================= */

function mapMessage() {

    const unlocked =
        gameState.roomsUnlocked.length;

    const total =
        Object.keys(rooms).length;


    return `
        Prozkoumáno:
        <span class="green">
            ${unlocked}/${total}
        </span>
    `;

}

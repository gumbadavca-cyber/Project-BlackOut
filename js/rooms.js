/* =========================================
   BLACKOUT — ROOMS SYSTEM
========================================= */


/* =========================================
   DATA MÍSTNOSTÍ
========================================= */

const roomData = {

    room1: {
        name: "Probuzení",
        sector: "SECTOR 01",
        description:
            "Probouzíš se v opuštěné místnosti. " +
            "Světla blikají a dveře jsou zamčené.",

        items: [
            {
                id: "oldID",
                name: "Starý průkaz",
                icon: "🪪",
                description:
                    "Starý zaměstnanecký průkaz. " +
                    "Na zadní straně jsou podivné číslice."
            }
        ],

        puzzle: "openTerminalPuzzle",

        nextRoom: "room2"
    },


    room2: {
        name: "Technická místnost",
        sector: "SECTOR 02",
        description:
            "Stará technická místnost. " +
            "Uprostřed stojí rozvaděč s odpojenými kabely.",

        items: [
            {
                id: "fuse",
                name: "Pojistka",
                icon: "🔋",
                description:
                    "Starší průmyslová pojistka."
            }
        ],

        puzzle: "openCablePuzzle",

        nextRoom: "room3"
    },


    room3: {
        name: "Bezpečnostní chodba",
        sector: "SECTOR 03",
        description:
            "Dlouhá chodba plná bezpečnostních kamer. " +
            "Na konci bliká červený panel.",

        items: [
            {
                id: "securityCard",
                name: "Bezpečnostní karta",
                icon: "💳",
                description:
                    "Karta pro bezpečnostní systémy."
            }
        ],

        puzzle: "openSecurityPuzzle",

        nextRoom: "room4"
    },


    room4: {
        name: "Laboratoř",
        sector: "SECTOR 04",
        description:
            "Laboratoř je opuštěná. " +
            "Na stole jsou čtyři označené lahvičky.",

        items: [
            {
                id: "chemical",
                name: "Aktivátor",
                icon: "🧪",
                description:
                    "Neznámá chemická látka."
            }
        ],

        puzzle: "openLabPuzzle",

        nextRoom: "room5"
    },


    room5: {
        name: "Archiv",
        sector: "SECTOR 05",
        description:
            "Regály jsou plné starých dokumentů. " +
            "Něco zde očividně někdo hledal.",

        items: [
            {
                id: "incidentReport",
                name: "INCIDENT 07",
                icon: "📄",
                description:
                    "Utajený dokument o události v zařízení."
            }
        ],

        puzzle: "openArchivePuzzle",

        nextRoom: "room6"
    },


    room6: {
        name: "Kontrolní centrum",
        sector: "SECTOR 06",
        description:
            "Obrovská obrazovka stále funguje. " +
            "Systém požaduje ROOT ACCESS.",

        items: [
            {
                id: "accessToken",
                name: "Přístupový token",
                icon: "🔑",
                description:
                    "Token pro hlavní systém."
            }
        ],

        puzzle: "openControlPuzzle",

        nextRoom: "room7"
    },


    room7: {
        name: "Podzemní tunel",
        sector: "SECTOR 07",
        description:
            "Úzký tunel vede hluboko pod komplex. " +
            "Před tebou jsou čtyři možné cesty.",

        items: [],

        puzzle: "openTunnelPuzzle",

        nextRoom: "room8"
    },


    room8: {
        name: "Hlavní výstup",
        sector: "EXIT",
        description:
            "Konečně jsi u hlavního východu. " +
            "Dveře ale stále vyžadují poslední potvrzení.",

        items: [],

        puzzle: "openEscapePuzzle",

        nextRoom: null
    }

};


/* =========================================
   CO BYLO V MÍSTNOSTI SEBRÁNO
========================================= */

let collectedItems = [];


/* =========================================
   NAČTENÍ
========================================= */

function loadRoomItems() {

    const saved =
        localStorage.getItem(
            "BLACKOUT_ROOM_ITEMS"
        );


    if (!saved) {

        collectedItems = [];

        return;

    }


    try {

        const data =
            JSON.parse(saved);


        if (Array.isArray(data)) {

            collectedItems = data;

        } else {

            collectedItems = [];

        }

    } catch {

        collectedItems = [];

    }

}


/* =========================================
   ULOŽENÍ
========================================= */

function saveRoomItems() {

    localStorage.setItem(
        "BLACKOUT_ROOM_ITEMS",
        JSON.stringify(
            collectedItems
        )
    );

}


/* =========================================
   BYL ITEM SEBRÁN?
========================================= */

function isItemCollected(itemId) {

    return collectedItems.includes(
        itemId
    );

}


/* =========================================
   VZÍT PŘEDMĚT
========================================= */

function takeItem(
    itemId,
    roomId = currentRoom
) {

    const room =
        roomData[roomId];


    if (!room) {
        return;
    }


    const item =
        room.items.find(
            i => i.id === itemId
        );


    if (!item) {
        return;
    }


    if (
        isItemCollected(itemId)
    ) {

        playSound("error");

        return;

    }


    collectedItems.push(
        itemId
    );


    saveRoomItems();


    /*
       Přidání do inventáře.
    */

    if (
        typeof addItem ===
        "function"
    ) {

        addItem(
            item.id,
            item.name,
            item.description,
            item.icon
        );

    }


    playSound("success");

    vibrate(70);

    flashScreen();


    renderRoom(roomId);

}


/* =========================================
   VYKRESLENÍ MÍSTNOSTI
========================================= */

function renderRoom(roomId) {

    const room =
        roomData[roomId];


    const container =
        document.getElementById(
            "roomContent"
        );


    if (!room || !container) {
        return;
    }


    loadRoomItems();


    const unlocked =
        isRoomUnlocked(roomId);


    if (!unlocked) {

        container.innerHTML = `

            <div class="room">

                <h1>🔒 MÍSTNOST UZAMČENA</h1>

                <p>
                    Do této oblasti zatím nemáš přístup.
                </p>

            </div>

        `;

        return;

    }


    let itemsHTML = "";


    room.items.forEach(
        item => {

            const collected =
                isItemCollected(
                    item.id
                );


            if (collected) {

                itemsHTML += `

                    <div class="room-item taken">

                        <span>
                            ${item.icon}
                        </span>

                        <div>

                            <strong>
                                ${item.name}
                            </strong>

                            <small>
                                SEBRÁNO
                            </small>

                        </div>

                    </div>

                `;

            } else {

                itemsHTML += `

                    <div class="room-item">

                        <span>
                            ${item.icon}
                        </span>

                        <div>

                            <strong>
                                ${item.name}
                            </strong>

                            <small>
                                ${item.description}
                            </small>

                        </div>

                        <button
                            class="take-button"
                            onclick="
                                takeItem(
                                    '${item.id}',
                                    '${roomId}'
                                )
                            ">

                            VZÍT

                        </button>

                    </div>

                `;

            }

        }
    );


    const solved =
        room.puzzle &&
        typeof puzzleDone ===
        "function" &&
        puzzleDone(
            getPuzzleId(room.puzzle)
        );


    container.innerHTML = `

        <div class="room">

            <div class="room-header">

                <div>

                    <div class="sector">
                        ${room.sector}
                    </div>

                    <h1>
                        ${room.name}
                    </h1>

                </div>

                <div class="room-number">
                    ${getRoomNumber(roomId)}
                </div>

            </div>


            <div class="room-description">

                <p>
                    ${room.description}
                </p>

            </div>


            ${
                room.items.length > 0

                ? `

                    <div class="room-section">

                        <h2>
                            🔎 PŘEDMĚTY
                        </h2>

                        <div class="room-items">

                            ${itemsHTML}

                        </div>

                    </div>

                  `

                : ""

            }


            <div class="room-section">

                <h2>
                    🧩 AKCE
                </h2>


                ${
                    room.puzzle

                    ? `

                        <button
                            class="main-button"
                            onclick="${room.puzzle}()">

                            ${
                                solved
                                    ? "✓ ZKONTROLOVAT"
                                    : "🔍 PROZKOUMAT"
                            }

                        </button>

                      `

                    : ""

                }

            </div>


            <div class="room-navigation">

                ${createNavigation(
                    roomId
                )}

            </div>

        </div>

    `;

}


/* =========================================
   NAVIGACE MEZI MÍSTNOSTMI
========================================= */

function createNavigation(roomId) {

    let html = "";


    const number =
        getRoomNumber(roomId);


    if (number > 1) {

        const previous =
            "room" +
            (number - 1);


        if (
            isRoomUnlocked(
                previous
            )
        ) {

            html += `

                <button
                    class="secondary-button"
                    onclick="
                        showRoom(
                            '${previous}'
                        )
                    ">

                    ← ZPĚT

                </button>

            `;

        }

    }


    const room =
        roomData[roomId];


    if (
        room.nextRoom &&
        isRoomUnlocked(
            room.nextRoom
        )
    ) {

        html += `

            <button
                class="secondary-button"
                onclick="
                    showRoom(
                        '${room.nextRoom}'
                    )
                ">

                DÁL →

            </button>

        `;

    }


    return html;

}


/* =========================================
   ČÍSLO MÍSTNOSTI
========================================= */

function getRoomNumber(roomId) {

    const match =
        roomId.match(
            /room(\d+)/
        );


    return match
        ? match[1].padStart(
            2,
            "0"
        )
        : "00";

}


/* =========================================
   ID PUZZLU PODLE FUNKCE
========================================= */

function getPuzzleId(
    puzzleFunction
) {

    const map = {

        openTerminalPuzzle:
            "terminal",

        openCablePuzzle:
            "cables",

        openSecurityPuzzle:
            "security",

        openLabPuzzle:
            "lab",

        openArchivePuzzle:
            "archive",

        openControlPuzzle:
            "control",

        openTunnelPuzzle:
            "tunnel",

        openEscapePuzzle:
            "escape"

    };


    return map[
        puzzleFunction
    ] || "";

}


/* =========================================
   ODEMKNUTÍ DALŠÍ MÍSTNOSTI
========================================= */

function unlockNextRoom() {

    const room =
        roomData[currentRoom];


    if (!room || !room.nextRoom) {
        return;
    }


    unlockRoom(
        room.nextRoom
    );

}


/* =========================================
   AUTOMATICKÉ ODEMKNUTÍ
========================================= */

function checkRoomProgress() {

    const room =
        roomData[currentRoom];


    if (!room || !room.puzzle) {
        return;
    }


    const puzzleId =
        getPuzzleId(
            room.puzzle
        );


    if (
        puzzleId &&
        puzzleDone(puzzleId)
    ) {

        if (room.nextRoom) {

            unlockRoom(
                room.nextRoom
            );

        }

    }

}


/* =========================================
   START ROOM SYSTEM
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadRoomItems();

    }
);

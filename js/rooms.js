/* =========================================
   BLACKOUT — ROOMS SYSTEM
   ATMOSFÉRICKÁ VERZE
========================================= */


/* =========================================
   DATA MÍSTNOSTÍ
========================================= */

const roomData = {

    room1: {
        name: "Probuzení",
        sector: "SECTOR 01",

        description:
            "Pomalu otevíráš oči. Ležíš na studené podlaze. " +
            "Nad tebou poblikává jediná zářivka. Dveře jsou zamčené.",

        atmosphere:
            "Ve vzduchu je cítit prach, kov a něco spáleného. " +
            "Nikde není slyšet žádný lidský hlas.",

        items: [
            {
                id: "oldID",
                name: "Starý průkaz",
                icon: "🪪",
                description:
                    "Starý zaměstnanecký průkaz. Je poškrábaný a dlouho ležel na zemi."
            }
        ],

        actions: [
            {
                id: "door",
                icon: "🚪",
                name: "Zkusit dveře",
                description:
                    "Elektronický zámek nereaguje.",
                message:
                    "Dveře jsou zamčené. Bez napájení je elektronický zámek mrtvý."
            },

            {
                id: "terminal",
                icon: "🖥️",
                name: "Prozkoumat terminál",
                description:
                    "Starý monitor v rohu místnosti právě problikl.",
                puzzle: "openTerminalPuzzle"
            },

            {
                id: "light",
                icon: "💡",
                name: "Prohlédnout světlo",
                description:
                    "Zářivka každých několik sekund zabliká.",
                message:
                    "Na stropě jsou černé šmouhy. Vypadá to jako staré stopy po kouři."
            }
        ],

        nextRoom: "room2"
    },


    room2: {
        name: "Technická místnost",
        sector: "SECTOR 02",

        description:
            "Malá technická místnost je plná kabelů, potrubí a starých rozvaděčů.",

        atmosphere:
            "Z jednoho rozvaděče se ozývá slabé elektrické praskání. " +
            "Někde pod podlahou běží generátor.",

        items: [
            {
                id: "fuse",
                name: "Průmyslová pojistka",
                icon: "🔋",
                description:
                    "Těžká pojistka vytažená z náhradního panelu."
            }
        ],

        actions: [
            {
                id: "breaker",
                icon: "⚡",
                name: "Prozkoumat rozvaděč",
                description:
                    "Několik kabelů visí volně ze svorek.",
                puzzle: "openCablePuzzle"
            },

            {
                id: "generator",
                icon: "🔧",
                name: "Poslechnout generátor",
                description:
                    "Zvuk přichází zpod podlahy.",
                message:
                    "Generátor běží, ale elektřina se nedostává do celého komplexu."
            }
        ],

        nextRoom: "room3"
    },


    room3: {
        name: "Bezpečnostní chodba",
        sector: "SECTOR 03",

        description:
            "Dlouhá chodba mizí ve tmě. Na stropě jsou rozmístěné bezpečnostní kamery.",

        atmosphere:
            "Jedna z kamer se pomalu otočí tvým směrem. Červená kontrolka stále svítí.",

        items: [
            {
                id: "securityCard",
                name: "Bezpečnostní karta",
                icon: "💳",
                description:
                    "Karta nalezená pod rozbitým monitorem."
            }
        ],

        actions: [
            {
                id: "camera",
                icon: "📹",
                name: "Prohlédnout kameru",
                description:
                    "Kamera stále sleduje chodbu.",
                message:
                    "Kamera tě sleduje. Přenos někam stále odchází."
            },

            {
                id: "panel",
                icon: "🚨",
                name: "Prozkoumat bezpečnostní panel",
                description:
                    "Na konci chodby bliká červené světlo.",
                puzzle: "openSecurityPuzzle"
            }
        ],

        nextRoom: "room4"
    },


    room4: {
        name: "Laboratoř",
        sector: "SECTOR 04",

        description:
            "Dveře laboratoře se otevřou jen napůl. Uvnitř je nepořádek a rozbité sklo.",

        atmosphere:
            "Některé přístroje jsou stále zapnuté, přestože zařízení mělo být uzavřené už v roce 2009.",

        items: [
            {
                id: "chemical",
                name: "Aktivátor",
                icon: "🧪",
                description:
                    "Neznámá chemická látka v malé označené lahvičce."
            }
        ],

        actions: [
            {
                id: "vials",
                icon: "🧪",
                name: "Prozkoumat lahvičky",
                description:
                    "Na stole jsou čtyři téměř identické lahvičky.",
                puzzle: "openLabPuzzle"
            },

            {
                id: "computer",
                icon: "💻",
                name: "Prohlédnout laboratorní počítač",
                description:
                    "Na monitoru běží poškozený záznam.",
                message:
                    "Záznam končí jedinou větou: „NEOTVÍRAT SEKTOR 07.“"
            }
        ],

        nextRoom: "room5"
    },


    room5: {
        name: "Archiv",
        sector: "SECTOR 05",

        description:
            "Regály plné dokumentů mizí ve tmě. Na složkách leží silná vrstva prachu.",

        atmosphere:
            "Některé zásuvky jsou otevřené. Někdo tady nedávno hledal konkrétní dokument.",

        items: [
            {
                id: "incidentReport",
                name: "INCIDENT 07",
                icon: "📄",
                description:
                    "Utajený dokument označený červeným pruhem."
            }
        ],

        actions: [
            {
                id: "files",
                icon: "📁",
                name: "Prohledat archiv",
                description:
                    "Několik dokumentů bylo vytaženo ze svých míst.",
                puzzle: "openArchivePuzzle"
            },

            {
                id: "desk",
                icon: "🗄️",
                name: "Prohlédnout pracovní stůl",
                description:
                    "Na stole zůstal starý přístupový protokol.",
                message:
                    "Téměř všechny záznamy byly vymazány. Jeden byl ručně začerněný."
            }
        ],

        nextRoom: "room6"
    },


    room6: {
        name: "Kontrolní centrum",
        sector: "SECTOR 06",

        description:
            "Obrovská místnost plná monitorů. Většina obrazovek je mrtvá.",

        atmosphere:
            "Jedna obrazovka se náhle rozsvítí. Potom druhá. A třetí.",

        items: [
            {
                id: "accessToken",
                name: "Přístupový token",
                icon: "🔑",
                description:
                    "Hardwarový token pro hlavní systém."
            }
        ],

        actions: [
            {
                id: "root",
                icon: "💻",
                name: "Přistoupit k hlavnímu systému",
                description:
                    "Na obrazovce svítí ROOT ACCESS.",
                puzzle: "openControlPuzzle"
            },

            {
                id: "screens",
                icon: "📺",
                name: "Prohlédnout monitory",
                description:
                    "Na jednom z nich běží starý bezpečnostní záznam.",
                message:
                    "Záznam ukazuje chodbu, kterou jsi právě prošel. Čas záznamu je dnešní."
            }
        ],

        nextRoom: "room7"
    },


    room7: {
        name: "Podzemní tunel",
        sector: "SECTOR 07",

        description:
            "Schody vedou hluboko pod komplex. Vzduch je tady chladnější.",

        atmosphere:
            "Nouzová světla blikají v nepravidelném rytmu. Z jedné chodby se ozve kovová rána.",

        items: [],

        actions: [
            {
                id: "tunnel",
                icon: "🚇",
                name: "Pokračovat tunelem",
                description:
                    "Před tebou jsou čtyři chodby.",
                puzzle: "openTunnelPuzzle"
            },

            {
                id: "sound",
                icon: "👂",
                name: "Poslouchat",
                description:
                    "Zvuk se ozve znovu.",
                message:
                    "Kovová rána. Potom ticho. A pak slabý zvuk ventilace."
            }
        ],

        nextRoom: "room8"
    },


    room8: {
        name: "Hlavní výstup",
        sector: "EXIT",

        description:
            "Stojíš před masivními bezpečnostními dveřmi.",

        atmosphere:
            "Za tebou je ticho. Před tebou poslední překážka.",

        items: [],

        actions: [
            {
                id: "exit",
                icon: "🚪",
                name: "Otevřít hlavní výstup",
                description:
                    "Terminál čeká na poslední potvrzení.",
                puzzle: "openEscapePuzzle"
            }
        ],

        nextRoom: null
    }

};


/* =========================================
   INVENTÁŘ PŘEDMĚTŮ V MÍSTNOSTECH
========================================= */

let collectedItems = [];


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

        collectedItems =
            Array.isArray(data)
                ? data
                : [];

    } catch {

        collectedItems = [];

    }

}


function saveRoomItems() {

    localStorage.setItem(
        "BLACKOUT_ROOM_ITEMS",
        JSON.stringify(
            collectedItems
        )
    );

}


function isItemCollected(itemId) {

    return collectedItems.includes(
        itemId
    );

}


/* =========================================
   SEBRAT PŘEDMĚT
========================================= */

function takeItem(
    itemId,
    roomId = currentRoom
) {

    const room =
        roomData[roomId];

    if (!room) return;

    const item =
        room.items.find(
            i => i.id === itemId
        );

    if (!item) return;

    if (isItemCollected(itemId)) {

        return;

    }


    collectedItems.push(
        itemId
    );

    saveRoomItems();


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
   SPUŠTĚNÍ AKCE
========================================= */

function executeRoomAction(
    roomId,
    actionId
) {

    const room =
        roomData[roomId];

    if (!room) return;


    const action =
        room.actions.find(
            a => a.id === actionId
        );

    if (!action) return;


    /* -------------------------------------
       PUZZLE
    ------------------------------------- */

    if (action.puzzle) {

        const puzzleId =
            getPuzzleId(
                action.puzzle
            );


        /*
           PUZZLE JE HOTOVÉ
           → nic znovu nespouštěj
        */

        if (
            puzzleId &&
            typeof puzzleDone === "function" &&
            puzzleDone(puzzleId)
        ) {

            return;

        }


        if (
            typeof window[action.puzzle] ===
            "function"
        ) {

            window[action.puzzle]();

        }

        return;

    }


    /* -------------------------------------
       BĚŽNÁ AKCE
    ------------------------------------- */

    if (action.message) {

        showRoomMessage(
            action.message
        );

        playSound("click");

    }

}


/* =========================================
   ZPRÁVA V MÍSTNOSTI
========================================= */

function showRoomMessage(
    message
) {

    const box =
        document.getElementById(
            "roomMessage"
        );

    if (!box) return;


    box.textContent =
        message;

    box.classList.add(
        "show"
    );

}


/* =========================================
   VYKRESLENÍ MÍSTNOSTI
========================================= */

function renderRoom(
    roomId
) {

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


    /* -------------------------------------
       ODEMČENÍ
    ------------------------------------- */

    if (
        typeof isRoomUnlocked === "function" &&
        !isRoomUnlocked(roomId)
    ) {

        container.innerHTML = `

            <div class="room locked">

                <div class="room-icon">
                    🔒
                </div>

                <h1>
                    MÍSTNOST UZAMČENA
                </h1>

                <p>
                    Přístup do této části komplexu
                    zatím není možný.
                </p>

            </div>

        `;

        return;

    }


    /* -------------------------------------
       PŘEDMĚTY
    ------------------------------------- */

    let itemsHTML = "";


    room.items.forEach(
        item => {

            if (
                isItemCollected(
                    item.id
                )
            ) {

                return;

            }


            itemsHTML += `

                <div class="room-item">

                    <div class="item-icon">
                        ${item.icon}
                    </div>

                    <div class="item-info">

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
                        "
                    >
                        VZÍT
                    </button>

                </div>

            `;

        }
    );


    /* -------------------------------------
       AKCE
    ------------------------------------- */

    let actionsHTML = "";


    room.actions.forEach(
        action => {

            let solved = false;


            if (action.puzzle) {

                const puzzleId =
                    getPuzzleId(
                        action.puzzle
                    );


                solved =
                    puzzleId &&
                    typeof puzzleDone === "function" &&
                    puzzleDone(puzzleId);

            }


            /* =============================
               VYŘEŠENÉ PUZZLE
            ============================= */

            if (solved) {

                actionsHTML += `

                    <div
                        class="room-action completed"
                    >

                        <span class="action-icon">
                            ✅
                        </span>

                        <span>

                            <strong>
                                ${action.name}
                            </strong>

                            <small>
                                VYŘEŠENO — SYSTÉM ODEMČEN
                            </small>

                        </span>

                    </div>

                `;

                return;

            }


            /* =============================
               NORMÁLNÍ AKCE
            ============================= */

            actionsHTML += `

                <button
                    class="room-action"
                    onclick="
                        executeRoomAction(
                            '${roomId}',
                            '${action.id}'
                        )
                    "
                >

                    <span class="action-icon">
                        ${action.icon}
                    </span>

                    <span>

                        <strong>
                            ${action.name}
                        </strong>

                        <small>
                            ${action.description}
                        </small>

                    </span>

                </button>

            `;

        }
    );


    /* -------------------------------------
       ČÍSLO
    ------------------------------------- */

    const roomNumber =
        getRoomNumber(roomId);


    /* -------------------------------------
       HTML
    ------------------------------------- */

    container.innerHTML = `

        <div class="room atmospheric">

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
                    ${roomNumber}
                </div>

            </div>


            <div class="room-scene">

                <p class="room-description">
                    ${room.description}
                </p>

                <p class="room-atmosphere">
                    ${room.atmosphere}
                </p>

            </div>


            ${
                itemsHTML
                    ? `

                        <div class="room-section">

                            <h2>
                                🔎 CO VIDÍŠ
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
                    INTERAKCE
                </h2>

                <div class="room-actions">

                    ${actionsHTML}

                </div>

            </div>


            <div
                id="roomMessage"
                class="room-message"
            ></div>


            <div class="room-navigation">

                ${createNavigation(roomId)}

            </div>

        </div>

    `;

}


/* =========================================
   NAVIGACE
========================================= */

function createNavigation(
    roomId
) {

    const room =
        roomData[roomId];

    if (!room) {
        return "";
    }


    const number =
        parseInt(
            getRoomNumber(roomId),
            10
        );


    let html = "";


    /* -------------------------------------
       ZPĚT
    ------------------------------------- */

    if (number > 1) {

        const previous =
            "room" +
            (number - 1);


        if (
            typeof isRoomUnlocked === "function" &&
            isRoomUnlocked(previous)
        ) {

            html += `

                <button
                    class="secondary-button"
                    onclick="
                        showRoom(
                            '${previous}'
                        )
                    "
                >
                    ← ZPĚT
                </button>

            `;

        }

    }


    /* -------------------------------------
       DALŠÍ MÍSTNOST
    ------------------------------------- */

    if (
        room.nextRoom &&
        typeof isRoomUnlocked === "function" &&
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
                "
            >
                DÁL →
            </button>

        `;

    }


    return html;

}


/* =========================================
   ODEMKNUTÍ DALŠÍ MÍSTNOSTI
========================================= */

function unlockNextRoomFrom(
    roomId
) {

    const room =
        roomData[roomId];

    if (!room) return;

    if (!room.nextRoom) return;


    if (
        typeof unlockRoom ===
        "function"
    ) {

        unlockRoom(
            room.nextRoom
        );

    }

}


/* =========================================
   KONTROLA POSTUPU
========================================= */

function checkRoomProgress() {

    const room =
        roomData[currentRoom];

    if (!room) return;


    /*
       Najdi puzzle místnosti.
    */

    const puzzleAction =
        room.actions.find(
            action =>
                action.puzzle
        );


    if (!puzzleAction) {
        return;
    }


    const puzzleId =
        getPuzzleId(
            puzzleAction.puzzle
        );


    if (
        puzzleId &&
        typeof puzzleDone === "function" &&
        puzzleDone(puzzleId)
    ) {

        unlockNextRoomFrom(
            currentRoom
        );

    }

}


/* =========================================
   ČÍSLO MÍSTNOSTI
========================================= */

function getRoomNumber(
    roomId
) {

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
   ID PUZZLU
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


    return (
        map[puzzleFunction] ||
        ""
    );

}


/* =========================================
   OPRAVA PO DOKONČENÍ PUZZLU
========================================= */

function refreshRoomAfterPuzzle() {

    /*
       Zjisti, jestli je aktuální puzzle hotové.
       Pokud ano, odemkni další místnost.
    */

    checkRoomProgress();


    /*
       Znovu vykresli místnost.
       Tím se:
       - puzzle označí jako hotové
       - objeví se navigace DÁL
       - staré tlačítko puzzle zmizí
    */

    if (
        typeof renderRoom ===
        "function"
    ) {

        renderRoom(
            currentRoom
        );

    }


    if (
        typeof updateMap ===
        "function"
    ) {

        updateMap();

    }


    if (
        typeof updateUI ===
        "function"
    ) {

        updateUI();

    }

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadRoomItems();

    }
);
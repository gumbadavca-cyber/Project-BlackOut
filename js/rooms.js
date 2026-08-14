/* =========================================
   BLACKOUT — ATMOSPHERIC ROOMS SYSTEM
========================================= */

/*
   Místnosti jsou navržené jako průzkumné scény.
   Důležité:
   - průkaz NENÍ propojený s terminálem
   - terminál nikdy nezobrazuje kód z průkazu
   - sebrané předměty zmizí z místnosti
   - postup se ukládá přes gameState
*/

const roomData = {

    room1: {

        name: "Probuzení",
        sector: "SECTOR 01",

        description:
            "Pomalu otevíráš oči. Ležíš na studené podlaze. " +
            "Nad tebou poblikává jediná zářivka. Každých několik sekund zhasne " +
            "a místnost na okamžik pohltí úplná tma.",

        atmosphere:
            "Ve vzduchu je cítit prach, kov a něco spáleného. " +
            "Nikde není slyšet žádný lidský hlas.",

        items: [

            {
                id: "oldID",
                name: "Starý průkaz",
                icon: "🪪",
                description:
                    "Starý zaměstnanecký průkaz. Je poškrábaný a očividně dlouho ležel na zemi."
            }

        ],

        actions: [

            {
                id: "door",
                icon: "🚪",
                name: "Zkusit dveře",
                description:
                    "Zámek cvakne, ale dveře se ani nepohnou.",
                message:
                    "Dveře jsou zamčené. Elektronický zámek nemá napájení."
            },

            {
                id: "terminal",
                icon: "🖥️",
                name: "Přistoupit k terminálu",
                description:
                    "Starý monitor v rohu místnosti právě problikl.",
                puzzle: "openTerminalPuzzle"
            },

            {
                id: "light",
                icon: "💡",
                name: "Prohlédnout světlo",
                description:
                    "Zářivka se chystá znovu zhasnout.",
                message:
                    "Na okamžik zahlédneš na stropě černé šmouhy. Vypadá to jako kouř."
            }

        ],

        nextRoom: "room2"
    },


    room2: {

        name: "Technická místnost",
        sector: "SECTOR 02",

        description:
            "Dveře se za tebou zavřou. Ocitáš se v malé technické místnosti. " +
            "Podél stěn vedou desítky kabelů.",

        atmosphere:
            "Z rozvaděče se ozve slabé elektrické praskání. " +
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
                name: "Prohlédnout rozvaděč",
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
                    "Generátor běží, ale napětí nedostává celý komplex. Něco je odpojené."
            }

        ],

        nextRoom: "room3"
    },


    room3: {

        name: "Bezpečnostní chodba",
        sector: "SECTOR 03",

        description:
            "Úzká chodba pokračuje hluboko do komplexu. " +
            "Na stropě jsou rozmístěné bezpečnostní kamery.",

        atmosphere:
            "Když uděláš několik kroků, jedna z kamer se pomalu otočí tvým směrem.",

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
                    "Červená kontrolka kamery stále svítí.",
                message:
                    "Kamera tě sleduje. Přenos někam odchází."
            },

            {
                id: "panel",
                icon: "🚨",
                name: "Přistoupit k panelu",
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
            "Dveře laboratoře se otevřou jen napůl. " +
            "Uvnitř je nepořádek.",

        atmosphere:
            "Na podlaze leží rozbité sklo. Některé přístroje jsou stále zapnuté, " +
            "přestože komplex měl být uzavřený už před lety.",

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
                name: "Prohlédnout lahvičky",
                description:
                    "Na stole jsou čtyři téměř identické lahvičky.",
                puzzle: "openLabPuzzle"
            },

            {
                id: "computer",
                icon: "💻",
                name: "Prohlédnout laboratorní počítač",
                description:
                    "Monitor zobrazuje pouze poškozený záznam.",
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
            "Regály s dokumenty mizí ve tmě. " +
            "Na mnoha složkách je tlustá vrstva prachu.",

        atmosphere:
            "Některé zásuvky jsou otevřené. Někdo tu hledal konkrétní dokument.",

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
                    "Některé dokumenty byly vytažené ze svých míst.",
                puzzle: "openArchivePuzzle"
            },

            {
                id: "desk",
                icon: "🗄️",
                name: "Prohlédnout pracovní stůl",
                description:
                    "Na stole zůstal starý přístupový protokol.",
                message:
                    "V protokolu jsou téměř všechny záznamy vymazané. Jeden záznam byl ručně začerněný."
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
            "Schody vedou hluboko pod komplex. " +
            "Vzduch je tady chladnější.",

        atmosphere:
            "Nouzová světla blikají v nepravidelném rytmu. " +
            "Z jedné chodby se ozve kovová rána.",

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
   SEBRANÉ PŘEDMĚTY
========================================= */

let collectedItems = [];


function loadRoomItems() {

    try {

        const saved =
            localStorage.getItem(
                "BLACKOUT_ROOM_ITEMS"
            );

        collectedItems =
            saved
                ? JSON.parse(saved)
                : [];

        if (!Array.isArray(collectedItems)) {
            collectedItems = [];
        }

    } catch {

        collectedItems = [];

    }

}


function saveRoomItems() {

    localStorage.setItem(
        "BLACKOUT_ROOM_ITEMS",
        JSON.stringify(collectedItems)
    );

}


function isItemCollected(itemId) {

    return collectedItems.includes(itemId);

}


/* =========================================
   SEBRÁNÍ PŘEDMĚTU
========================================= */

function takeItem(itemId, roomId = currentRoom) {

    const room = roomData[roomId];

    if (!room) return;

    const item =
        room.items.find(
            i => i.id === itemId
        );

    if (!item) return;

    if (isItemCollected(itemId)) {

        return;

    }

    collectedItems.push(itemId);

    saveRoomItems();

    if (typeof addItem === "function") {

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
   AKCE MÍSTNOSTI
========================================= */

function executeRoomAction(action) {

    if (!action) return;

    if (action.puzzle) {

        if (
            typeof window[action.puzzle] ===
            "function"
        ) {

            window[action.puzzle]();

        }

        return;

    }

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

function showRoomMessage(message) {

    let box =
        document.getElementById(
            "roomMessage"
        );

    if (!box) return;

    box.className =
        "room-message show";

    box.textContent =
        message;

}


/* =========================================
   VYKRESLENÍ
========================================= */

function renderRoom(roomId) {

    const room =
        roomData[roomId];

    const container =
        document.getElementById(
            "roomContent"
        );

    if (!room || !container) return;

    loadRoomItems();

    if (
        typeof isRoomUnlocked ===
        "function" &&
        !isRoomUnlocked(roomId)
    ) {

        container.innerHTML = `

            <div class="room locked">

                <div class="room-icon">🔒</div>

                <h1>MÍSTNOST UZAMČENA</h1>

                <p>
                    Přístup do této části komplexu
                    zatím není možný.
                </p>

            </div>

        `;

        return;

    }


    let itemsHTML = "";

    room.items.forEach(item => {

        if (isItemCollected(item.id)) {
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

    });


    let actionsHTML = "";

    room.actions.forEach(action => {

        actionsHTML += `

            <button
                class="room-action"
                onclick="
                    executeRoomAction(
                        roomData['${roomId}']
                            .actions
                            .find(
                                a => a.id === '${action.id}'
                            )
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

    });


    const number =
        getRoomNumber(roomId);


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
                    ${number}
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

function createNavigation(roomId) {

    const room =
        roomData[roomId];

    const number =
        getRoomNumber(roomId);

    let html = "";


    if (number > 1) {

        const previous =
            "room" +
            (Number(number) - 1);

        if (
            typeof isRoomUnlocked ===
            "function" &&
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


    if (
        room.nextRoom &&
        typeof isRoomUnlocked ===
        "function" &&
        isRoomUnlocked(room.nextRoom)
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
   ČÍSLO MÍSTNOSTI
========================================= */

function getRoomNumber(roomId) {

    const match =
        roomId.match(
            /room(\d+)/
        );

    return match
        ? match[1].padStart(2, "0")
        : "00";

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
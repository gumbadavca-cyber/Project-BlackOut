/* =========================================================
   BLACKOUT — PUZZLES / MINIHRY
   NOVÁ VERZE
========================================================= */


/* =========================================================
   POMOCNÉ FUNKCE
========================================================= */

function puzzleDone(id) {

    return getFlag(
        "puzzle_" + id
    );

}


function finishPuzzle(id) {

    setFlag(
        "puzzle_" + id,
        true
    );


    if (
        typeof playSound ===
        "function"
    ) {

        playSound("success");

    }


    if (
        typeof vibrate ===
        "function"
    ) {

        vibrate(100);

    }


    if (
        typeof flashScreen ===
        "function"
    ) {

        flashScreen();

    }


    if (
        typeof updateRoomAfterPuzzle ===
        "function"
    ) {

        updateRoomAfterPuzzle();

    }

}


function updateRoomAfterPuzzle() {

    if (
        typeof renderRoom ===
        "function" &&
        typeof currentRoom !==
        "undefined"
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

}


/* =========================================================
   PUZZLE ID
========================================================= */

const PUZZLE_IDS = {

    terminal: "terminal",

    cables: "cables",

    security: "security",

    lab: "lab",

    archive: "archive",

    control: "control",

    tunnel: "tunnel",

    escape: "escape"

};


/* =========================================================
   1. TERMINÁL
   SECTOR 01
========================================================= */

function openTerminalPuzzle() {

    if (
        puzzleDone(
            PUZZLE_IDS.terminal
        )
    ) {

        showPuzzleMessage(
            "Terminál je už aktivní.",
            "success"
        );

        return;

    }


    showPuzzle(`

        <div class="puzzle terminal-puzzle">

            <div class="sector">
                SECTOR 01 / SYSTEM
            </div>

            <h2>
                💻 STARÝ TERMINÁL
            </h2>

            <div class="terminal-screen">

                <div>
                    > SYSTEM BOOT...
                </div>

                <div>
                    > MEMORY CHECK: OK
                </div>

                <div class="warning">
                    > ACCESS LOCKED
                </div>

                <br>

                <div>
                    > SECURITY LEVEL: 01
                </div>

                <div>
                    > ENTER ACCESS CODE
                </div>

            </div>

            <p>
                Terminál vyžaduje
                čtyřmístný přístupový kód.
            </p>

            <p class="hint">
                Na obrazovce není žádná
                přímá nápověda.
            </p>

            <input
                id="terminalCode"
                class="puzzle-input"
                type="text"
                inputmode="numeric"
                maxlength="4"
                autocomplete="off"
                placeholder="----"
            >

            <button
                class="main-button"
                onclick="
                    checkTerminalCode()
                "
            >
                POKUSIT SE O PŘÍSTUP
            </button>

            <div id="terminalMessage"></div>

        </div>

    `);

}


function checkTerminalCode() {

    const input =
        document.getElementById(
            "terminalCode"
        );


    if (!input) {
        return;
    }


    const code =
        input.value.trim();


    /*
       Kód není napsaný v inventáři.
       Hráč ho musí odvodit
       z dalších indicií.
    */

    if (
        code === "4729"
    ) {

        finishPuzzle(
            PUZZLE_IDS.terminal
        );


        showPuzzleMessage(
            "ACCESS GRANTED. Systém se probouzí...",
            "success"
        );


        setTimeout(
            () => {

                closePuzzle();

                unlockRoom(
                    "room2"
                );

                showRoom(
                    "room2"
                );

            },
            1200
        );


        return;

    }


    playSound(
        "error"
    );

    vibrate(
        180
    );


    input.value =
        "";


    showPuzzleMessage(
        "ACCESS DENIED. Terminál kód odmítl.",
        "error"
    );

}


/* =========================================================
   2. ROZVADĚČ
   SECTOR 02
========================================================= */

let cableSequence = [];


const correctCableSequence = [
    "red",
    "blue",
    "yellow",
    "green"
];


function openCablePuzzle() {

    if (
        puzzleDone(
            PUZZLE_IDS.cables
        )
    ) {

        showPuzzleMessage(
            "Rozvaděč je již opravený.",
            "success"
        );

        return;

    }


    cableSequence = [];


    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                SECTOR 02 / POWER
            </div>

            <h2>
                🔌 ROZVADĚČ
            </h2>

            <p>
                Elektřina je přerušena.
                Čtyři kabely byly vytrženy
                ze svých konektorů.
            </p>

            <div class="terminal-screen">

                <div>
                    POWER GRID
                </div>

                <div class="warning">
                    CONNECTION LOST
                </div>

            </div>

            <p class="hint">
                Diagnostický systém
                používá barevné pořadí.
            </p>

            <div class="cables">

                <button
                    class="cable red"
                    onclick="
                        connectCable('red')
                    "
                >
                    🔴
                </button>

                <button
                    class="cable blue"
                    onclick="
                        connectCable('blue')
                    "
                >
                    🔵
                </button>

                <button
                    class="cable yellow"
                    onclick="
                        connectCable('yellow')
                    "
                >
                    🟡
                </button>

                <button
                    class="cable green"
                    onclick="
                        connectCable('green')
                    "
                >
                    🟢
                </button>

            </div>

            <div id="cableProgress">
                0 / 4
            </div>

            <div id="cableMessage"></div>

        </div>

    `);

}


function connectCable(
    color
) {

    const expected =
        correctCableSequence[
            cableSequence.length
        ];


    if (
        color ===
        expected
    ) {

        cableSequence.push(
            color
        );


        playSound(
            "click"
        );

        vibrate(
            40
        );


        const progress =
            document.getElementById(
                "cableProgress"
            );


        if (progress) {

            progress.textContent =
                cableSequence.length +
                " / 4";

        }


        if (
            cableSequence.length ===
            correctCableSequence.length
        ) {

            finishPuzzle(
                PUZZLE_IDS.cables
            );


            showPuzzleMessage(
                "NAPÁJENÍ OBNOVENO.",
                "success"
            );


            setTimeout(
                () => {

                    closePuzzle();

                    unlockRoom(
                        "room3"
                    );

                    showRoom(
                        "room3"
                    );

                },
                1200
            );

        }


        return;

    }


    cableSequence = [];


    playSound(
        "error"
    );

    vibrate(
        250
    );


    const progress =
        document.getElementById(
            "cableProgress"
        );


    if (progress) {

        progress.textContent =
            "0 / 4";

    }


    showPuzzleMessage(
        "Jiskra přeskočila. Pořadí bylo špatně.",
        "error"
    );

}


/* =========================================================
   3. BEZPEČNOSTNÍ PANEL
   SECTOR 03
========================================================= */

let securitySequence = [];


const securityCorrect = [
    3,
    1,
    4,
    2
];


function openSecurityPuzzle() {

    if (
        puzzleDone(
            PUZZLE_IDS.security
        )
    ) {

        showPuzzleMessage(
            "Bezpečnostní systém je deaktivovaný.",
            "success"
        );

        return;

    }


    securitySequence = [];


    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                SECTOR 03 / SECURITY
            </div>

            <h2>
                🚨 BEZPEČNOSTNÍ PANEL
            </h2>

            <p>
                Panel čeká na správnou sekvenci.
            </p>

            <div class="terminal-screen">

                <div>
                    SECURITY SYSTEM
                </div>

                <div>
                    MEMORY PROTOCOL
                </div>

                <div class="warning">
                    REPEAT SIGNAL
                </div>

            </div>

            <p class="hint">
                Sleduj blikání kontrolek
                a zopakuj jejich pořadí.
            </p>

            <div class="security-buttons">

                <button
                    onclick="
                        pressSecurity(1)
                    "
                >
                    1
                </button>

                <button
                    onclick="
                        pressSecurity(2)
                    "
                >
                    2
                </button>

                <button
                    onclick="
                        pressSecurity(3)
                    "
                >
                    3
                </button>

                <button
                    onclick="
                        pressSecurity(4)
                    "
                >
                    4
                </button>

            </div>

            <div id="securityMessage"></div>

        </div>

    `);


    setTimeout(
        playSecuritySequence,
        500
    );

}


function playSecuritySequence() {

    let index = 0;


    const interval =
        setInterval(
            () => {

                if (
                    index >=
                    securityCorrect.length
                ) {

                    clearInterval(
                        interval
                    );

                    return;

                }


                flashSecurityButton(
                    securityCorrect[
                        index
                    ]
                );


                index++;

            },
            700
        );

}


function flashSecurityButton(
    number
) {

    const buttons =
        document.querySelectorAll(
            ".security-buttons button"
        );


    const button =
        buttons[
            number - 1
        ];


    if (!button) {
        return;
    }


    button.classList.add(
        "flash"
    );


    setTimeout(
        () => {

            button.classList.remove(
                "flash"
            );

        },
        350
    );

}


function pressSecurity(
    number
) {

    const expected =
        securityCorrect[
            securitySequence.length
        ];


    if (
        number ===
        expected
    ) {

        securitySequence.push(
            number
        );


        playSound(
            "click"
        );


        if (
            securitySequence.length ===
            securityCorrect.length
        ) {

            finishPuzzle(
                PUZZLE_IDS.security
            );


            showPuzzleMessage(
                "BEZPEČNOSTNÍ SYSTÉM DEAKTIVOVÁN.",
                "success"
            );


            setTimeout(
                () => {

                    closePuzzle();

                    unlockRoom(
                        "room4"
                    );

                    showRoom(
                        "room4"
                    );

                },
                1200
            );

        }


        return;

    }


    securitySequence = [];


    playSound(
        "error"
    );

    vibrate(
        250
    );


    showPuzzleMessage(
        "CHYBA. Sekvence byla resetována.",
        "error"
    );


    setTimeout(
        playSecuritySequence,
        700
    );

}


/* =========================================================
   4. LABORATOŘ
   SECTOR 04
========================================================= */

function openLabPuzzle() {

    if (
        puzzleDone(
            PUZZLE_IDS.lab
        )
    ) {

        showPuzzleMessage(
            "Laboratoř byla prozkoumána.",
            "success"
        );

        return;

    }


    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                SECTOR 04 / LAB
            </div>

            <h2>
                🧪 LABORATOŘ
            </h2>

            <p>
                Na stole jsou čtyři lahvičky.
                V jedné z nich je aktivátor.
            </p>

            <div class="terminal-screen">

                <div>
                    SAMPLE ANALYSIS
                </div>

                <div>
                    SUBJECT: 07
                </div>

                <div class="warning">
                    SELECT SAMPLE
                </div>

            </div>

            <div class="vials">

                <button
                    onclick="
                        chooseVial(1)
                    "
                >
                    🧪 1
                </button>

                <button
                    onclick="
                        chooseVial(2)
                    "
                >
                    🧪 2
                </button>

                <button
                    onclick="
                        chooseVial(3)
                    "
                >
                    🧪 3
                </button>

                <button
                    onclick="
                        chooseVial(4)
                    "
                >
                    🧪 4
                </button>

            </div>

            <div id="vialMessage"></div>

        </div>

    `);

}


function chooseVial(
    number
) {

    if (
        number === 3
    ) {

        finishPuzzle(
            PUZZLE_IDS.lab
        );


        if (
            typeof addItem ===
            "function" &&
            !hasItemSafe(
                "chemical"
            )
        ) {

            addItem(
                "chemical",
                "Aktivátor",
                "Laboratorní látka získaná v SECTOR 04.",
                "🧪"
            );

        }


        showPuzzleMessage(
            "Vzorek reaguje. Našel jsi správný aktivátor.",
            "success"
        );


        setTimeout(
            () => {

                closePuzzle();

                unlockRoom(
                    "room5"
                );

                showRoom(
                    "room5"
                );

            },
            1200
        );


        return;

    }


    playSound(
        "error"
    );

    vibrate(
        150
    );


    showPuzzleMessage(
        "Vzorek nereaguje.",
        "error"
    );

}


/* =========================================================
   5. ARCHIV
   SECTOR 05
========================================================= */

function openArchivePuzzle() {

    if (
        puzzleDone(
            PUZZLE_IDS.archive
        )
    ) {

        showPuzzleMessage(
            "Archiv už byl prohledán.",
            "success"
        );

        return;

    }


    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                SECTOR 05 / ARCHIVE
            </div>

            <h2>
                📁 ARCHIV
            </h2>

            <p>
                Regály jsou plné složek.
                Některé vypadají, jako by
                je někdo nedávno prohledával.
            </p>

            <div class="terminal-screen">

                <div>
                    ARCHIVE DATABASE
                </div>

                <div>
                    RECORDS: 2,847
                </div>

                <div class="warning">
                    CLASSIFIED FILES DETECTED
                </div>

            </div>

            <p>
                Jeden spis je označený
                výrazněji než ostatní.
            </p>

            <div class="documents">

                <button
                    onclick="
                        chooseDocument(1)
                    "
                >
                    📄 INCIDENT 03
                </button>

                <button
                    onclick="
                        chooseDocument(2)
                    "
                >
                    📄 INCIDENT 07
                </button>

                <button
                    onclick="
                        chooseDocument(3)
                    "
                >
                    📄 INCIDENT 12
                </button>

                <button
                    onclick="
                        chooseDocument(4)
                    "
                >
                    📄 INCIDENT 19
                </button>

            </div>

            <div id="archiveMessage"></div>

        </div>

    `);

}


function chooseDocument(
    number
) {

    if (
        number === 2
    ) {

        finishPuzzle(
            PUZZLE_IDS.archive
        );


        if (
            typeof addItem ===
            "function" &&
            !hasItemSafe(
                "incidentReport"
            )
        ) {

            addItem(
                "incidentReport",
                "INCIDENT 07",
                "Utajený dokument o události v zařízení.",
                "📄"
            );

        }


        showPuzzleMessage(
            "Našel jsi spis INCIDENT 07.",
            "success"
        );


        setTimeout(
            () => {

                closePuzzle();

                unlockRoom(
                    "room6"
                );

                showRoom(
                    "room6"
                );

            },
            1300
        );


        return;

    }


    playSound(
        "error"
    );


    showPuzzleMessage(
        "Tahle složka tě nikam neposouvá.",
        "error"
    );

}


/* =========================================================
   6. CONTROL CENTER
   SECTOR 06
========================================================= */

function openControlPuzzle() {

    if (
        puzzleDone(
            PUZZLE_IDS.control
        )
    ) {

        showPuzzleMessage(
            "Kontrolní centrum je aktivní.",
            "success"
        );

        return;

    }


    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                SECTOR 06 / CONTROL
            </div>

            <h2>
                💻 CONTROL CENTER
            </h2>

            <div class="terminal-screen">

                <div>
                    CENTRAL CONTROL
                </div>

                <div>
                    CONNECTION: ACTIVE
                </div>

                <div class="warning">
                    ROOT ACCESS REQUIRED
                </div>

            </div>

            <p>
                Systém požaduje šestimístný
                autorizační kód.
            </p>

            <p class="hint">
                Některé informace z archivu
                mohou být důležité.
            </p>

            <input
                id="controlCode"
                class="puzzle-input"
                type="text"
                inputmode="numeric"
                maxlength="6"
                autocomplete="off"
                placeholder="------"
            >

            <button
                class="main-button"
                onclick="
                    checkControlCode()
                "
            >
                ODESLAT
            </button>

            <div id="controlMessage"></div>

        </div>

    `);

}


function checkControlCode() {

    const input =
        document.getElementById(
            "controlCode"
        );


    if (!input) {
        return;
    }


    const code =
        input.value.trim();


    if (
        code === "071209"
    ) {

        finishPuzzle(
            PUZZLE_IDS.control
        );


        if (
            typeof addItem ===
            "function" &&
            !hasItemSafe(
                "accessToken"
            )
        ) {

            addItem(
                "accessToken",
                "Přístupový token",
                "Token získaný z centrálního systému.",
                "🔑"
            );

        }


        showPuzzleMessage(
            "ROOT ACCESS GRANTED.",
            "success"
        );


        setTimeout(
            () => {

                closePuzzle();

                unlockRoom(
                    "room7"
                );

                showRoom(
                    "room7"
                );

            },
            1200
        );


        return;

    }


    input.value =
        "";


    playSound(
        "error"
    );

    vibrate(
        200
    );


    showPuzzleMessage(
        "PŘÍSTUP ZAMÍTNUT.",
        "error"
    );

}


/* =========================================================
   7. PODZEMNÍ TUNEL
   SECTOR 07
========================================================= */

function openTunnelPuzzle() {

    if (
        puzzleDone(
            PUZZLE_IDS.tunnel
        )
    ) {

        showPuzzleMessage(
            "Tunel byl již odemčen.",
            "success"
        );

        return;

    }


    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                SECTOR 07 / UNDERGROUND
            </div>

            <h2>
                🚇 PODZEMNÍ TUNEL
            </h2>

            <p>
                Tunel se rozdvojuje.
                Čtyři směry vypadají téměř stejně.
            </p>

            <div class="terminal-screen">

                <div>
                    EMERGENCY EXIT SYSTEM
                </div>

                <div>
                    SIGNAL: WEAK
                </div>

                <div class="warning">
                    ROUTE UNKNOWN
                </div>

            </div>

            <p class="hint">
                Na stěně jsou staré značky.
                Některé jsou téměř nečitelné.
            </p>

            <div class="tunnel-buttons">

                <button
                    onclick="
                        chooseTunnel(1)
                    "
                >
                    ← A
                </button>

                <button
                    onclick="
                        chooseTunnel(2)
                    "
                >
                    ↑ B
                </button>

                <button
                    onclick="
                        chooseTunnel(3)
                    "
                >
                    → C
                </button>

                <button
                    onclick="
                        chooseTunnel(4)
                    "
                >
                    ↓ D
                </button>

            </div>

            <div id="tunnelMessage"></div>

        </div>

    `);

}


function chooseTunnel(
    number
) {

    if (
        number === 4
    ) {

        finishPuzzle(
            PUZZLE_IDS.tunnel
        );


        showPuzzleMessage(
            "Našel jsi nouzový výstup.",
            "success"
        );


        setTimeout(
            () => {

                closePuzzle();

                unlockRoom(
                    "room8"
                );

                showRoom(
                    "room8"
                );

            },
            1200
        );


        return;

    }


    playSound(
        "error"
    );


    showPuzzleMessage(
        "Slepá chodba. Musíš se vrátit.",
        "error"
    );

}


/* =========================================================
   8. FINÁLNÍ ÚNIK
========================================================= */

function openEscapePuzzle() {

    if (
        puzzleDone(
            PUZZLE_IDS.escape
        )
    ) {

        return;

    }


    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                EXIT / SECTOR 07
            </div>

            <h2>
                🚪 HLAVNÍ VÝCHOD
            </h2>

            <div class="terminal-screen">

                <div>
                    EXTERNAL DOOR
                </div>

                <div>
                    LOCK STATUS: ACTIVE
                </div>

                <div class="warning">
                    FINAL CONFIRMATION REQUIRED
                </div>

            </div>

            <p>
                Po tom všem, co jsi viděl,
                systém požaduje potvrzení
                skutečného incidentu.
            </p>

            <div class="escape-options">

                <button
                    onclick="
                        escapeAnswer(1)
                    "
                >
                    Zařízení bylo uzavřeno
                    kvůli technické závadě.
                </button>

                <button
                    onclick="
                        escapeAnswer(2)
                    "
                >
                    INCIDENT 07 byl
                    úmyslně utajen.
                </button>

                <button
                    onclick="
                        escapeAnswer(3)
                    "
                >
                    Nic neobvyklého
                    se nestalo.
                </button>

            </div>

            <div id="escapeMessage"></div>

        </div>

    `);

}


function escapeAnswer(
    answer
) {

    if (
        answer === 2
    ) {

        finishPuzzle(
            PUZZLE_IDS.escape
        );


        completeRoom(
            "room8"
        );


        showPuzzleMessage(
            "PŘÍSTUP POVOLEN.",
            "success"
        );


        setTimeout(
            () => {

                closePuzzle();

                showEnding();

            },
            1500
        );


        return;

    }


    playSound(
        "error"
    );


    showPuzzleMessage(
        "Systém odpověď odmítl.",
        "error"
    );

}


/* =========================================================
   OKNO MINIHRY
========================================================= */

function showPuzzle(
    content
) {

    let modal =
        document.getElementById(
            "puzzleModal"
        );


    if (!modal) {

        modal =
            document.createElement(
                "div"
            );


        modal.id =
            "puzzleModal";


        modal.className =
            "modal";


        modal.innerHTML = `

            <div class="modal-box">

                <div
                    id="puzzleContent"
                ></div>

                <button
                    class="main-button"
                    onclick="
                        closePuzzle()
                    "
                >
                    ZAVŘÍT
                </button>

            </div>

        `;


        document.body.appendChild(
            modal
        );

    }


    const contentBox =
        document.getElementById(
            "puzzleContent"
        );


    if (contentBox) {

        contentBox.innerHTML =
            content;

    }


    modal.style.display =
        "flex";


    modal.classList.add(
        "show"
    );

}


function closePuzzle() {

    const modal =
        document.getElementById(
            "puzzleModal"
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
   ZPRÁVY
========================================================= */

function showPuzzleMessage(
    message,
    type = "normal"
) {

    const targets = [

        "terminalMessage",

        "cableMessage",

        "securityMessage",

        "vialMessage",

        "archiveMessage",

        "controlMessage",

        "tunnelMessage",

        "escapeMessage"

    ];


    let target = null;


    for (
        const id of targets
    ) {

        const element =
            document.getElementById(
                id
            );


        if (element) {

            target =
                element;

            break;

        }

    }


    if (!target) {

        return;

    }


    target.className =
        "puzzle-message " +
        type;


    target.textContent =
        message;

}


/* =========================================================
   INVENTÁŘ — BEZPEČNÁ KONTROLA
========================================================= */

function hasItemSafe(
    itemId
) {

    if (
        typeof hasItem ===
        "function"
    ) {

        return hasItem(
            itemId
        );

    }


    if (
        typeof inventory !==
        "undefined" &&
        Array.isArray(
            inventory
        )
    ) {

        return inventory.some(
            item =>
                item.id ===
                itemId
        );

    }


    return false;

}


/* =========================================================
   POUŽITÍ PŘEDMĚTŮ
========================================================= */

function useItemForPuzzle(
    itemId
) {

    if (!itemId) {
        return false;
    }


    switch (
        itemId
    ) {


        case "oldID":

            showPuzzleMessage(
                "Průkaz je starý zaměstnanecký průkaz. Z terminálu ti ale neposkytuje žádný přímý kód.",
                "normal"
            );

            return true;


        case "fuse":

            showPuzzleMessage(
                "Průmyslová pojistka. Vypadá, že patří do technického rozvaděče.",
                "normal"
            );

            return true;


        case "securityCard":

            showPuzzleMessage(
                "Bezpečnostní karta. Přístupová úroveň 03.",
                "normal"
            );

            return true;


        case "chemical":

            showPuzzleMessage(
                "Aktivátor ze SECTOR 04. Chemické složení je nejasné.",
                "normal"
            );

            return true;


        case "incidentReport":

            showPuzzleMessage(
                "Dokument INCIDENT 07. Některé informace jsou klasifikované.",
                "normal"
            );

            setFlag(
                "read_incident",
                true
            );

            return true;


        case "accessToken":

            showPuzzleMessage(
                "ROOT ACCESS token. Zřejmě bude důležitý pro centrální systém.",
                "normal"
            );

            return true;


        default:

            return false;

    }

}


/* =========================================================
   AUTOMATICKÉ OTEVŘENÍ PUZZLU
========================================================= */

function openCurrentRoomPuzzle() {

    if (
        typeof currentRoom ===
        "undefined"
    ) {

        return;

    }


    switch (
        currentRoom
    ) {

        case "room1":

            openTerminalPuzzle();

            break;


        case "room2":

            openCablePuzzle();

            break;


        case "room3":

            openSecurityPuzzle();

            break;


        case "room4":

            openLabPuzzle();

            break;


        case "room5":

            openArchivePuzzle();

            break;


        case "room6":

            openControlPuzzle();

            break;


        case "room7":

            openTunnelPuzzle();

            break;


        case "room8":

            openEscapePuzzle();

            break;


        default:

            showPuzzleMessage(
                "V této místnosti není žádná aktivní minihra."
            );

    }

}


/* =========================================================
   KONEC HRY
========================================================= */

function showEnding() {

    const gameScreen =
        document.getElementById(
            "gameScreen"
        );


    if (!gameScreen) {
        return;
    }


    gameScreen.innerHTML = `

        <div class="ending">

            <div class="ending-icon">
                🚪
            </div>

            <div class="sector">
                INCIDENT 07
            </div>

            <h1>
                ÚNIK
            </h1>

            <p>
                Dveře se pomalu otevřely.
            </p>

            <p>
                Studený vzduch zvenku
                tě udeřil do obličeje.
            </p>

            <p>
                Za tebou zůstává
                SECTOR 07.
            </p>

            <p class="important">
                Teď už víš,
                že to nebyla technická závada.
            </p>

            <div class="ending-report">

                INCIDENT 07
                <br><br>

                STATUS:
                CLASSIFIED
                <br>

                SUBJECT:
                ESCAPED

            </div>

            <button
                class="main-button"
                onclick="
                    location.reload()
                "
            >

                HRÁT ZNOVU

            </button>

        </div>

    `;

}

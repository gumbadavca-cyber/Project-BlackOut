/* =========================================
   BLACKOUT — PUZZLES / MINIHRY
   Verze kompatibilní s rooms.js
========================================= */


/* =========================================
   POMOCNÉ FUNKCE
========================================= */

function puzzleDone(id) {
    if (typeof getFlag !== "function") return false;
    return getFlag("puzzle_" + id) === true;
}


function finishPuzzle(id) {

    if (typeof setFlag === "function") {
        setFlag("puzzle_" + id, true);
    }

    if (typeof playSound === "function") {
        playSound("success");
    }

    if (typeof vibrate === "function") {
        vibrate(100);
    }

    if (typeof flashScreen === "function") {
        flashScreen();
    }

    if (typeof unlockNextRoom === "function") {
        unlockNextRoom();
    }

    if (typeof renderRoom === "function" &&
        typeof currentRoom !== "undefined") {

        setTimeout(() => {
            renderRoom(currentRoom);
        }, 50);
    }

    if (typeof updateMap === "function") {
        updateMap();
    }
}


/* =========================================
   1 — TERMINÁL
========================================= */

function openTerminalPuzzle() {

    if (puzzleDone("terminal")) {

        showPuzzleMessage(
            "TERMINÁL JE JIŽ ODEMČENÝ.",
            "success"
        );

        return;
    }

    showPuzzle(`

        <div class="puzzle terminal-puzzle">

            <div class="puzzle-label">
                SECTOR 01 // SYSTEM TERMINAL
            </div>

            <h2>💻 STARÝ TERMINÁL</h2>

            <div class="terminal-screen">

                <div class="terminal-line">
                    > SYSTEM BOOT...
                </div>

                <div class="terminal-line">
                    > POWER: LIMITED
                </div>

                <div class="terminal-line warning">
                    > ACCESS REQUIRED
                </div>

                <div class="terminal-line">
                    > ENTER 4-DIGIT CODE
                </div>

            </div>

            <input
                id="terminalCode"
                class="puzzle-input"
                type="text"
                inputmode="numeric"
                maxlength="4"
                placeholder="____"
                autocomplete="off"
            >

            <button
                class="puzzle-action"
                onclick="checkTerminalCode()">

                ODEMKNOUT

            </button>

            <div id="terminalMessage"></div>

        </div>

    `);
}


function checkTerminalCode() {

    const input =
        document.getElementById("terminalCode");

    if (!input) return;

    const code =
        input.value.trim();

    if (code === "4729") {

        finishPuzzle("terminal");

        showPuzzleMessage(
            "ACCESS GRANTED // NAPÁJENÍ OBNOVENO",
            "success"
        );

        setTimeout(() => {
            closePuzzle();

            if (typeof renderRoom === "function") {
                renderRoom(currentRoom);
            }

        }, 1000);

    } else {

        if (typeof playSound === "function") {
            playSound("error");
        }

        if (typeof vibrate === "function") {
            vibrate(180);
        }

        input.value = "";

        showPuzzleMessage(
            "ACCESS DENIED // NESPRÁVNÝ KÓD",
            "error"
        );
    }
}


/* =========================================
   2 — KABELY
========================================= */

let cableSequence = [];

const correctCableSequence = [
    "red",
    "blue",
    "yellow",
    "green"
];


function openCablePuzzle() {

    if (puzzleDone("cables")) {

        showPuzzleMessage(
            "ROZVADĚČ JE JIŽ OPRAVENÝ.",
            "success"
        );

        return;
    }

    cableSequence = [];

    showPuzzle(`

        <div class="puzzle cable-puzzle">

            <div class="puzzle-label">
                SECTOR 02 // POWER DISTRIBUTION
            </div>

            <h2>🔌 ROZVADĚČ</h2>

            <p>
                Napájení je přerušeno.
                Čtyři kabely musíš zapojit ve správném pořadí.
            </p>

            <div class="cable-warning">
                ⚠ ŠPATNÉ POŘADÍ RESETUJE SYSTÉM
            </div>

            <div class="cables">

                <button
                    class="cable cable-red"
                    onclick="connectCable('red')">

                    <span>🔴</span>
                    ČERVENÝ

                </button>

                <button
                    class="cable cable-blue"
                    onclick="connectCable('blue')">

                    <span>🔵</span>
                    MODRÝ

                </button>

                <button
                    class="cable cable-yellow"
                    onclick="connectCable('yellow')">

                    <span>🟡</span>
                    ŽLUTÝ

                </button>

                <button
                    class="cable cable-green"
                    onclick="connectCable('green')">

                    <span>🟢</span>
                    ZELENÝ

                </button>

            </div>

            <div class="cable-progress">
                <span id="cableProgress">0 / 4</span>
            </div>

            <div id="cableMessage"></div>

        </div>

    `);
}


function connectCable(color) {

    const expected =
        correctCableSequence[
            cableSequence.length
        ];

    if (color === expected) {

        cableSequence.push(color);

        if (typeof playSound === "function") {
            playSound("click");
        }

        if (typeof vibrate === "function") {
            vibrate(40);
        }

        const progress =
            document.getElementById("cableProgress");

        if (progress) {
            progress.textContent =
                cableSequence.length + " / 4";
        }

        if (
            cableSequence.length ===
            correctCableSequence.length
        ) {

            finishPuzzle("cables");

            showPuzzleMessage(
                "✓ VŠECHNY KABELY ZAPOJENY // NAPÁJENÍ OBNOVENO",
                "success"
            );

            setTimeout(() => {

                closePuzzle();

                if (typeof renderRoom === "function") {
                    renderRoom(currentRoom);
                }

            }, 1100);
        }

    } else {

        cableSequence = [];

        if (typeof playSound === "function") {
            playSound("error");
        }

        if (typeof vibrate === "function") {
            vibrate(250);
        }

        const progress =
            document.getElementById("cableProgress");

        if (progress) {
            progress.textContent = "0 / 4";
        }

        showPuzzleMessage(
            "⚠ ŠPATNÉ ZAPOJENÍ // SYSTÉM RESETOVÁN",
            "error"
        );
    }
}


/* =========================================
   3 — BEZPEČNOSTNÍ PANEL
========================================= */

let securitySequence = [];

const securityCorrect = [
    3,
    1,
    4,
    2
];


function openSecurityPuzzle() {

    if (puzzleDone("security")) {

        showPuzzleMessage(
            "BEZPEČNOSTNÍ SYSTÉM JE DEAKTIVOVÁN.",
            "success"
        );

        return;
    }

    securitySequence = [];

    showPuzzle(`

        <div class="puzzle security-puzzle">

            <div class="puzzle-label">
                SECTOR 03 // SECURITY SYSTEM
            </div>

            <h2>🚨 BEZPEČNOSTNÍ PANEL</h2>

            <p>
                Sleduj blikající kontrolky.
                Potom zopakuj jejich pořadí.
            </p>

            <div class="security-display">

                <span id="securityStatus">
                    SLEDUJ SEKVENCI...
                </span>

            </div>

            <div class="security-buttons">

                <button onclick="pressSecurity(1)">
                    1
                </button>

                <button onclick="pressSecurity(2)">
                    2
                </button>

                <button onclick="pressSecurity(3)">
                    3
                </button>

                <button onclick="pressSecurity(4)">
                    4
                </button>

            </div>

            <div id="securityMessage"></div>

        </div>

    `);

    setTimeout(() => {
        playSecuritySequence();
    }, 500);
}


function playSecuritySequence() {

    const status =
        document.getElementById("securityStatus");

    if (status) {
        status.textContent =
            "SLEDUJ SEKVENCI...";
    }

    let index = 0;

    const interval =
        setInterval(() => {

            if (
                index >=
                securityCorrect.length
            ) {

                clearInterval(interval);

                if (status) {
                    status.textContent =
                        "ZOPAKUJ SEKVENCI";
                }

                return;
            }

            flashSecurityButton(
                securityCorrect[index]
            );

            index++;

        }, 700);
}


function flashSecurityButton(number) {

    const buttons =
        document.querySelectorAll(
            ".security-buttons button"
        );

    const button =
        buttons[number - 1];

    if (!button) return;

    button.classList.add("flash");

    if (typeof playSound === "function") {
        playSound("click");
    }

    setTimeout(() => {

        button.classList.remove("flash");

    }, 350);
}


function pressSecurity(number) {

    const expected =
        securityCorrect[
            securitySequence.length
        ];

    if (number === expected) {

        securitySequence.push(number);

        if (typeof playSound === "function") {
            playSound("click");
        }

        if (typeof vibrate === "function") {
            vibrate(40);
        }

        if (
            securitySequence.length ===
            securityCorrect.length
        ) {

            finishPuzzle("security");

            showPuzzleMessage(
                "✓ SECURITY SYSTEM DEACTIVATED",
                "success"
            );

            setTimeout(() => {

                closePuzzle();

                if (typeof renderRoom === "function") {
                    renderRoom(currentRoom);
                }

            }, 1100);
        }

    } else {

        securitySequence = [];

        if (typeof playSound === "function") {
            playSound("error");
        }

        if (typeof vibrate === "function") {
            vibrate(250);
        }

        showPuzzleMessage(
            "✕ CHYBA // SEKQUENCE RESETOVÁNA",
            "error"
        );

        setTimeout(() => {
            playSecuritySequence();
        }, 700);
    }
}


/* =========================================
   4 — LABORATOŘ
========================================= */

function openLabPuzzle() {

    if (puzzleDone("lab")) {

        showPuzzleMessage(
            "LABORATOŘ JE JIŽ ODEMČENÁ.",
            "success"
        );

        return;
    }

    showPuzzle(`

        <div class="puzzle lab-puzzle">

            <div class="puzzle-label">
                SECTOR 04 // RESEARCH LAB
            </div>

            <h2>🧪 LABORATOŘ</h2>

            <p>
                Čtyři lahvičky jsou označené pouze čísly.
                Jedna obsahuje aktivátor.
            </p>

            <div class="vial-warning">
                ⚠ VYBER OPATRNĚ
            </div>

            <div class="vials">

                <button onclick="chooseVial(1)">
                    <span>🧪</span>
                    <b>01</b>
                </button>

                <button onclick="chooseVial(2)">
                    <span>🧪</span>
                    <b>02</b>
                </button>

                <button onclick="chooseVial(3)">
                    <span>🧪</span>
                    <b>03</b>
                </button>

                <button onclick="chooseVial(4)">
                    <span>🧪</span>
                    <b>04</b>
                </button>

            </div>

            <div id="vialMessage"></div>

        </div>

    `);
}


function chooseVial(number) {

    if (number === 3) {

        finishPuzzle("lab");

        showPuzzleMessage(
            "✓ AKTIVÁTOR NALEZEN.",
            "success"
        );

        /*
         * Aktivátor je zároveň item v rooms.js.
         * Přidáme ho do inventáře pouze pokud
         * ho tam ještě hráč nemá.
         */

        if (
            typeof addItem === "function" &&
            typeof hasItem === "function"
        ) {

            if (!hasItem("chemical")) {

                addItem(
                    "chemical",
                    "Aktivátor",
                    "Neznámá chemická látka.",
                    "🧪"
                );

            }

        }

        setTimeout(() => {

            closePuzzle();

            if (typeof renderRoom === "function") {
                renderRoom(currentRoom);
            }

        }, 1000);

    } else {

        if (typeof playSound === "function") {
            playSound("error");
        }

        if (typeof vibrate === "function") {
            vibrate(150);
        }

        showPuzzleMessage(
            "✕ ŠPATNÁ LAHVIČKA.",
            "error"
        );
    }
}


/* =========================================
   5 — ARCHIV
========================================= */

function openArchivePuzzle() {

    if (puzzleDone("archive")) {

        showPuzzleMessage(
            "ARCHIV BYL PROHLEDÁN.",
            "success"
        );

        return;
    }

    showPuzzle(`

        <div class="puzzle archive-puzzle">

            <div class="puzzle-label">
                SECTOR 05 // CLASSIFIED ARCHIVE
            </div>

            <h2>📁 ARCHIV</h2>

            <p>
                Některé dokumenty jsou poškozené.
                Najdi záznam, který souvisí se SECTOR 07.
            </p>

            <div class="documents">

                <button
                    onclick="chooseDocument(1)">

                    <span>📄</span>
                    INCIDENT 03

                </button>

                <button
                    onclick="chooseDocument(2)">

                    <span>📄</span>
                    INCIDENT 07

                </button>

                <button
                    onclick="chooseDocument(3)">

                    <span>📄</span>
                    INCIDENT 12

                </button>

                <button
                    onclick="chooseDocument(4)">

                    <span>📄</span>
                    INCIDENT 19

                </button>

            </div>

            <div id="archiveMessage"></div>

        </div>

    `);
}


function chooseDocument(number) {

    if (number === 2) {

        finishPuzzle("archive");

        showPuzzleMessage(
            "✓ INCIDENT 07 NALEZEN // SOUBOR ODEMČEN",
            "success"
        );

        if (
            typeof addItem === "function" &&
            typeof hasItem === "function"
        ) {

            if (!hasItem("incidentReport")) {

                addItem(
                    "incidentReport",
                    "INCIDENT 07",
                    "Utajený dokument o události v zařízení.",
                    "📄"
                );

            }
        }

        setTimeout(() => {

            closePuzzle();

            if (typeof renderRoom === "function") {
                renderRoom(currentRoom);
            }

        }, 1100);

    } else {

        if (typeof playSound === "function") {
            playSound("error");
        }

        showPuzzleMessage(
            "Tento dokument se SECTOR 07 nesouvisí.",
            "error"
        );
    }
}


/* =========================================
   6 — CONTROL CENTER
========================================= */

function openControlPuzzle() {

    if (puzzleDone("control")) {

        showPuzzleMessage(
            "CONTROL CENTER JE AKTIVNÍ.",
            "success"
        );

        return;
    }

    showPuzzle(`

        <div class="puzzle control-puzzle">

            <div class="puzzle-label">
                SECTOR 06 // ROOT TERMINAL
            </div>

            <h2>💻 CONTROL CENTER</h2>

            <div class="terminal-screen">

                <div class="terminal-line">
                    > ROOT ACCESS
                </div>

                <div class="terminal-line">
                    > SECURITY LEVEL: MAXIMUM
                </div>

                <div class="terminal-line warning">
                    > AUTHENTICATION REQUIRED
                </div>

            </div>

            <p>
                Systém požaduje šestimístný přístupový kód.
            </p>

            <input
                id="controlCode"
                class="puzzle-input"
                type="text"
                inputmode="numeric"
                maxlength="6"
                placeholder="______"
                autocomplete="off"
            >

            <button
                class="puzzle-action"
                onclick="checkControlCode()">

                ROOT ACCESS

            </button>

            <div id="controlMessage"></div>

        </div>

    `);
}


function checkControlCode() {

    const input =
        document.getElementById("controlCode");

    if (!input) return;

    if (input.value.trim() === "071209") {

        finishPuzzle("control");

        showPuzzleMessage(
            "✓ ROOT ACCESS GRANTED",
            "success"
        );

        setTimeout(() => {

            closePuzzle();

            if (typeof renderRoom === "function") {
                renderRoom(currentRoom);
            }

        }, 1100);

    } else {

        if (typeof playSound === "function") {
            playSound("error");
        }

        if (typeof vibrate === "function") {
            vibrate(200);
        }

        input.value = "";

        showPuzzleMessage(
            "✕ PŘÍSTUP ZAMÍTNUT",
            "error"
        );
    }
}


/* =========================================
   7 — PODZEMNÍ TUNEL
========================================= */

function openTunnelPuzzle() {

    if (puzzleDone("tunnel")) {

        showPuzzleMessage(
            "TUNEL JE JIŽ ODEMČENÝ.",
            "success"
        );

        return;
    }

    showPuzzle(`

        <div class="puzzle tunnel-puzzle">

            <div class="puzzle-label">
                SECTOR 07 // UNDERGROUND ACCESS
            </div>

            <h2>🚇 PODZEMNÍ TUNEL</h2>

            <p>
                Před tebou jsou čtyři chodby.
                Jen jedna vede k výstupu.
            </p>

            <div class="tunnel-warning">
                ⚠ SIGNÁL ZTRACEN
            </div>

            <div class="tunnel-buttons">

                <button onclick="chooseTunnel(1)">
                    <span>←</span>
                    A
                </button>

                <button onclick="chooseTunnel(2)">
                    <span>↑</span>
                    B
                </button>

                <button onclick="chooseTunnel(3)">
                    <span>→</span>
                    C
                </button>

                <button onclick="chooseTunnel(4)">
                    <span>↓</span>
                    D
                </button>

            </div>

            <div id="tunnelMessage"></div>

        </div>

    `);
}


function chooseTunnel(number) {

    if (number === 4) {

        finishPuzzle("tunnel");

        showPuzzleMessage(
            "✓ SPRÁVNÁ CESTA // VÝCHOD NALEZEN",
            "success"
        );

        setTimeout(() => {

            closePuzzle();

            if (typeof renderRoom === "function") {
                renderRoom(currentRoom);
            }

        }, 1100);

    } else {

        if (typeof playSound === "function") {
            playSound("error");
        }

        showPuzzleMessage(
            "SLEPÁ CHODBA. ZKUS JINOU.",
            "error"
        );
    }
}


/* =========================================
   8 — FINÁLNÍ ÚNIK
========================================= */

function openEscapePuzzle() {

    if (puzzleDone("escape")) {
        return;
    }

    showPuzzle(`

        <div class="puzzle escape-puzzle">

            <div class="puzzle-label">
                EXIT // FINAL AUTHENTICATION
            </div>

            <h2>🚪 HLAVNÍ VÝCHOD</h2>

            <div class="escape-warning">
                ⚠ POSLEDNÍ KONTROLA
            </div>

            <p>
                Po všem, co jsi zjistil,
                musíš určit pravdu o INCIDENTU 07.
            </p>

            <div class="escape-options">

                <button onclick="escapeAnswer(1)">
                    Zařízení bylo uzavřeno
                    kvůli technické závadě.
                </button>

                <button onclick="escapeAnswer(2)">
                    INCIDENT 07 byl úmyslně utajen.
                </button>

                <button onclick="escapeAnswer(3)">
                    V zařízení se nic nestalo.
                </button>

            </div>

            <div id="escapeMessage"></div>

        </div>

    `);
}


function escapeAnswer(answer) {

    if (answer === 2) {

        finishPuzzle("escape");

        showPuzzleMessage(
            "✓ ACCESS GRANTED // DOORS UNLOCKING",
            "success"
        );

        setTimeout(() => {

            closePuzzle();

            showEnding();

        }, 1300);

    } else {

        if (typeof playSound === "function") {
            playSound("error");
        }

        showPuzzleMessage(
            "✕ ODPOVĚĎ ODMÍTNUTA",
            "error"
        );
    }
}


/* =========================================
   PUZZLE MODAL
========================================= */

function showPuzzle(content) {

    let modal =
        document.getElementById("puzzleModal");

    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "puzzleModal";

        modal.className =
            "modal";

        modal.innerHTML = `

            <div class="modal-box puzzle-modal-box">

                <div id="puzzleContent"></div>

                <button
                    class="secondary-button puzzle-close"
                    onclick="closePuzzle()">

                    ZAVŘÍT

                </button>

            </div>

        `;

        document.body.appendChild(modal);
    }

    const contentBox =
        document.getElementById("puzzleContent");

    if (contentBox) {
        contentBox.innerHTML = content;
    }

    modal.style.display = "flex";

    requestAnimationFrame(() => {
        modal.classList.add("show");
    });
}


function closePuzzle() {

    const modal =
        document.getElementById("puzzleModal");

    if (!modal) return;

    modal.classList.remove("show");

    setTimeout(() => {

        modal.style.display = "none";

    }, 150);
}


/* =========================================
   ZPRÁVY
========================================= */

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

    for (const id of targets) {

        const element =
            document.getElementById(id);

        if (element) {
            target = element;
            break;
        }
    }

    if (!target) return;

    target.className =
        "puzzle-message " + type;

    target.textContent =
        message;
}


/* =========================================
   KONEC HRY
========================================= */

function showEnding() {

    const gameScreen =
        document.getElementById("gameScreen");

    if (!gameScreen) return;

    gameScreen.innerHTML = `

        <div class="ending">

            <div class="ending-icon">
                🚪
            </div>

            <div class="puzzle-label">
                INCIDENT 07 // FINAL REPORT
            </div>

            <h1>
                ÚNIK
            </h1>

            <p>
                Dveře se pomalu otevřely.
            </p>

            <p>
                Studený vzduch zvenku tě praštil do obličeje.
            </p>

            <p>
                Zařízení SECTOR 07 zůstává za tebou.
            </p>

            <p class="important">
                Teď už víš, že oficiální verze byla lež.
            </p>

            <div class="ending-report">

                INCIDENT 07<br>
                FACILITY: SECTOR 07<br>
                STATUS: CLASSIFIED<br>
                SUBJECT: ESCAPED

            </div>

            <button
                class="main-button"
                onclick="location.reload()">

                HRÁT ZNOVU

            </button>

        </div>

    `;
}


/* =========================================
   POUŽITÍ ITEMŮ
========================================= */

function useItemForPuzzle(itemId) {

    if (!itemId) return false;

    switch (itemId) {

        case "oldID":

            if (typeof setFlag === "function") {

                setFlag(
                    "examined_oldID",
                    true
                );

            }

            showPuzzleMessage(
                "🪪 Na zadní straně průkazu jsou číslice: 4729.",
                "normal"
            );

            return true;


        case "fuse":

            showPuzzleMessage(
                "🔋 Průmyslová pojistka. Vypadá, že patří do rozvaděče.",
                "normal"
            );

            return true;


        case "securityCard":

            showPuzzleMessage(
                "💳 Bezpečnostní karta. Umožňuje přístup k bezpečnostním systémům.",
                "normal"
            );

            return true;


        case "chemical":

            showPuzzleMessage(
                "🧪 Aktivátor. Může být potřeba v některém ze systémů laboratoře.",
                "normal"
            );

            return true;


        case "incidentReport":

            if (typeof setFlag === "function") {

                setFlag(
                    "read_incident",
                    true
                );

            }

            showPuzzleMessage(
                "📄 INCIDENT 07: Událost byla úmyslně utajena.",
                "normal"
            );

            return true;


        case "accessToken":

            showPuzzleMessage(
                "🔑 Přístupový token pro hlavní systém.",
                "normal"
            );

            return true;


        default:

            return false;
    }
}


/* =========================================
   OTEVŘENÍ PUZZLU PODLE MÍSTNOSTI
========================================= */

function openCurrentRoomPuzzle() {

    if (typeof currentRoom === "undefined") {
        return;
    }

    switch (currentRoom) {

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
                "V této místnosti není žádná minihra."
            );
    }
}


/* =========================================
   KOMPATIBILITA S ROOMS.JS
========================================= */

function updateRoomAfterPuzzle() {

    if (
        typeof renderRoom === "function" &&
        typeof currentRoom !== "undefined"
    ) {

        renderRoom(currentRoom);
    }

    if (typeof updateMap === "function") {
        updateMap();
    }
}

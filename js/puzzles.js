/* =========================================================
   BLACKOUT — PUZZLES SYSTEM
   Verze: příběhová / propojená s místnostmi
========================================================= */


/* =========================================================
   ZÁKLAD
========================================================= */

const BLACKOUT_PUZZLES = {
    terminal: "terminal",
    cables: "cables",
    security: "security",
    lab: "lab",
    archive: "archive",
    control: "control",
    tunnel: "tunnel",
    escape: "escape"
};


function puzzleDone(id) {
    return typeof getFlag === "function"
        ? getFlag("puzzle_" + id)
        : false;
}


function finishPuzzle(id) {

    if (typeof setFlag === "function") {
        setFlag("puzzle_" + id, true);
    }

    playSound("success");
    vibrate(100);
    flashScreen();

    if (typeof checkRoomProgress === "function") {
        checkRoomProgress();
    }

    if (typeof updateRoomAfterPuzzle === "function") {
        updateRoomAfterPuzzle();
    }
}


function updateRoomAfterPuzzle() {

    if (typeof renderRoom === "function" &&
        typeof currentRoom !== "undefined") {

        renderRoom(currentRoom);
    }

    if (typeof updateMap === "function") {
        updateMap();
    }
}


/* =========================================================
   PUZZLE OKNO
========================================================= */

function showPuzzle(content) {

    let modal = document.getElementById("puzzleModal");

    if (!modal) {

        modal = document.createElement("div");

        modal.id = "puzzleModal";
        modal.className = "modal";

        modal.innerHTML = `
            <div class="modal-box puzzle-window">

                <div id="puzzleContent"></div>

                <button
                    class="main-button"
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
    modal.classList.add("show");
}


function closePuzzle() {

    const modal =
        document.getElementById("puzzleModal");

    if (!modal) return;

    modal.classList.remove("show");
    modal.style.display = "none";
}


/* =========================================================
   ZPRÁVY
========================================================= */

function showPuzzleMessage(message, type = "normal") {

    const targetIds = [
        "terminalMessage",
        "cableMessage",
        "securityMessage",
        "vialMessage",
        "archiveMessage",
        "controlMessage",
        "tunnelMessage",
        "escapeMessage"
    ];

    for (const id of targetIds) {

        const element =
            document.getElementById(id);

        if (element) {

            element.className =
                "puzzle-message " + type;

            element.textContent = message;

            return;
        }
    }

    alert(message);
}


/* =========================================================
   1 — TERMINÁL
   ROOM 1
========================================================= */

function openTerminalPuzzle() {

    if (puzzleDone("terminal")) {

        showPuzzleMessage(
            "Terminál je stále aktivní. Přístup už byl povolen.",
            "success"
        );

        return;
    }

    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                TERMINAL // LOCAL ACCESS
            </div>

            <h2>💻 STARÝ TERMINÁL</h2>

            <div class="terminal-text">
                ACCESS REQUIRED
            </div>

            <p>
                Obrazovka problikne.
            </p>

            <p>
                Systém požaduje čtyřmístný
                přístupový kód.
            </p>

            <p class="hint">
                Kód není uložený v terminálu.
            </p>

            <input
                id="terminalCode"
                class="puzzle-input"
                type="text"
                inputmode="numeric"
                maxlength="4"
                autocomplete="off"
                placeholder="____"
            >

            <button
                class="main-button"
                onclick="checkTerminalCode()">
                POTVRDIT
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

    /*
       Kód není hráči zobrazený.
       Později ho lze získat pomocí indicií.
    */

    if (code === "4729") {

        finishPuzzle("terminal");

        showPuzzleMessage(
            "ACCESS GRANTED. Napájecí systém se probouzí.",
            "success"
        );

        setTimeout(() => {

            closePuzzle();

            unlockRoom("room2");

        }, 1200);

    } else {

        playSound("error");
        vibrate(180);

        showPuzzleMessage(
            "ACCESS DENIED. Kód není správný.",
            "error"
        );

        input.value = "";
        input.focus();
    }
}


/* =========================================================
   2 — ROZVADĚČ
   ROOM 2
========================================================= */

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
            "Rozvaděč už je opravený.",
            "success"
        );

        return;
    }

    cableSequence = [];

    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                TECHNICAL // POWER
            </div>

            <h2>🔌 ROZVADĚČ</h2>

            <p>
                Napájení celého sektoru je přerušené.
            </p>

            <p>
                Čtyři kabely vedou do hlavního
                napájecího modulu.
            </p>

            <p class="hint">
                Na krytu je vybledlé označení:
                DIAGNOSTIC SEQUENCE.
            </p>

            <div class="cables">

                <button class="cable red"
                    onclick="connectCable('red')">
                    🔴 ČERVENÝ
                </button>

                <button class="cable blue"
                    onclick="connectCable('blue')">
                    🔵 MODRÝ
                </button>

                <button class="cable yellow"
                    onclick="connectCable('yellow')">
                    🟡 ŽLUTÝ
                </button>

                <button class="cable green"
                    onclick="connectCable('green')">
                    🟢 ZELENÝ
                </button>

            </div>

            <div id="cableProgress">
                0 / 4
            </div>

            <div id="cableMessage"></div>

        </div>

    `);
}


function connectCable(color) {

    const expected =
        correctCableSequence[cableSequence.length];

    if (color === expected) {

        cableSequence.push(color);

        playSound("click");
        vibrate(40);

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
                "Napájení obnoveno. Sektor 03 je přístupný.",
                "success"
            );

            setTimeout(() => {

                closePuzzle();
                unlockRoom("room3");

            }, 1200);
        }

    } else {

        cableSequence = [];

        playSound("error");
        vibrate(220);

        const progress =
            document.getElementById("cableProgress");

        if (progress) {
            progress.textContent = "0 / 4";
        }

        showPuzzleMessage(
            "Jiskra přeskočí. Špatné pořadí. Začni znovu.",
            "error"
        );
    }
}


/* =========================================================
   3 — BEZPEČNOSTNÍ PANEL
   ROOM 3
========================================================= */

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
            "Bezpečnostní systém je deaktivovaný.",
            "success"
        );

        return;
    }

    securitySequence = [];

    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                SECURITY // LOCKDOWN
            </div>

            <h2>🚨 BEZPEČNOSTNÍ PANEL</h2>

            <p>
                Kamery se otočí směrem k tobě.
            </p>

            <p>
                Panel vyžaduje manuální potvrzení
                bezpečnostní sekvence.
            </p>

            <div class="security-buttons">

                <button onclick="pressSecurity(1)">1</button>
                <button onclick="pressSecurity(2)">2</button>
                <button onclick="pressSecurity(3)">3</button>
                <button onclick="pressSecurity(4)">4</button>

            </div>

            <p class="hint">
                Sleduj blikající kontrolky.
            </p>

            <div id="securityMessage"></div>

        </div>

    `);

    playSecuritySequence();
}


function playSecuritySequence() {

    let index = 0;

    const interval =
        setInterval(() => {

            if (
                index >=
                securityCorrect.length
            ) {

                clearInterval(interval);
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

        playSound("click");
        vibrate(40);

        if (
            securitySequence.length ===
            securityCorrect.length
        ) {

            finishPuzzle("security");

            showPuzzleMessage(
                "LOCKDOWN DEAKTIVOVÁN.",
                "success"
            );

            setTimeout(() => {

                closePuzzle();
                unlockRoom("room4");

            }, 1200);
        }

    } else {

        securitySequence = [];

        playSound("error");
        vibrate(250);

        showPuzzleMessage(
            "CHYBA. Bezpečnostní sekvence resetována.",
            "error"
        );

        setTimeout(
            playSecuritySequence,
            700
        );
    }
}


/* =========================================================
   4 — LABORATOŘ
   ROOM 4
========================================================= */

function openLabPuzzle() {

    if (puzzleDone("lab")) {

        showPuzzleMessage(
            "Laboratoř už byla aktivována.",
            "success"
        );

        return;
    }

    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                LABORATORY // BIOCHEM
            </div>

            <h2>🧪 LABORATOŘ</h2>

            <p>
                Na stole stojí čtyři lahvičky.
            </p>

            <p>
                Jedna z nich má aktivovat
                nouzový systém.
            </p>

            <div class="vials">

                <button onclick="chooseVial(1)">
                    🧪 1
                </button>

                <button onclick="chooseVial(2)">
                    🧪 2
                </button>

                <button onclick="chooseVial(3)">
                    🧪 3
                </button>

                <button onclick="chooseVial(4)">
                    🧪 4
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
            "Aktivátor reaguje. Nouzový systém se spouští.",
            "success"
        );

        if (typeof addItem === "function") {

            addItem(
                "chemical",
                "Aktivátor",
                "Chemická látka z laboratoře.",
                "🧪"
            );
        }

        setTimeout(() => {

            closePuzzle();
            unlockRoom("room5");

        }, 1200);

    } else {

        playSound("error");
        vibrate(150);

        showPuzzleMessage(
            "Nic. Tohle není správná látka.",
            "error"
        );
    }
}


/* =========================================================
   5 — ARCHIV
   ROOM 5
========================================================= */

function openArchivePuzzle() {

    if (puzzleDone("archive")) {

        showPuzzleMessage(
            "Archiv už byl prohledán.",
            "success"
        );

        return;
    }

    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                ARCHIVE // CLASSIFIED
            </div>

            <h2>📁 ARCHIV</h2>

            <p>
                Většina dokumentů je obyčejná.
            </p>

            <p>
                Jeden spis ale nese stejné označení,
                které jsi viděl už dříve.
            </p>

            <div class="documents">

                <button onclick="chooseDocument(1)">
                    📄 INCIDENT 03
                </button>

                <button onclick="chooseDocument(2)">
                    📄 INCIDENT 07
                </button>

                <button onclick="chooseDocument(3)">
                    📄 INCIDENT 12
                </button>

                <button onclick="chooseDocument(4)">
                    📄 INCIDENT 19
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
            "INCIDENT 07. Dokument byl úmyslně utajen.",
            "success"
        );

        if (typeof addItem === "function") {

            addItem(
                "incidentReport",
                "INCIDENT 07",
                "Utajený dokument o události v zařízení.",
                "📄"
            );
        }

        setTimeout(() => {

            closePuzzle();
            unlockRoom("room6");

        }, 1300);

    } else {

        playSound("error");

        showPuzzleMessage(
            "Špatný spis.",
            "error"
        );
    }
}


/* =========================================================
   6 — CONTROL CENTER
   ROOM 6
========================================================= */

function openControlPuzzle() {

    if (puzzleDone("control")) {

        showPuzzleMessage(
            "ROOT ACCESS je aktivní.",
            "success"
        );

        return;
    }

    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                CONTROL // ROOT
            </div>

            <h2>💻 CONTROL CENTER</h2>

            <p>
                Obrazovka se rozsvítí.
            </p>

            <div class="terminal-text">
                ROOT ACCESS REQUIRED
            </div>

            <p>
                Systém čeká na šestimístný
                autorizační kód.
            </p>

            <p class="hint">
                Kód musíš získat z informací
                nalezených během vyšetřování.
            </p>

            <input
                id="controlCode"
                class="puzzle-input"
                type="text"
                inputmode="numeric"
                maxlength="6"
                autocomplete="off"
                placeholder="______"
            >

            <button
                class="main-button"
                onclick="checkControlCode()">
                ODESLAT
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
            "ROOT ACCESS GRANTED.",
            "success"
        );

        setTimeout(() => {

            closePuzzle();
            unlockRoom("room7");

        }, 1200);

    } else {

        playSound("error");
        vibrate(200);

        showPuzzleMessage(
            "PŘÍSTUP ZAMÍTNUT.",
            "error"
        );

        input.value = "";
        input.focus();
    }
}


/* =========================================================
   7 — TUNEL
   ROOM 7
========================================================= */

function openTunnelPuzzle() {

    if (puzzleDone("tunnel")) {

        showPuzzleMessage(
            "Cesta tunelem už byla nalezena.",
            "success"
        );

        return;
    }

    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                SECTOR 07 // SUBLEVEL
            </div>

            <h2>🚇 PODZEMNÍ TUNEL</h2>

            <p>
                Vzduch je čím dál chladnější.
            </p>

            <p>
                Tunel se rozděluje do čtyř směrů.
                Jen jeden vede k výstupu.
            </p>

            <div class="tunnel-buttons">

                <button onclick="chooseTunnel(1)">
                    ← A
                </button>

                <button onclick="chooseTunnel(2)">
                    ↑ B
                </button>

                <button onclick="chooseTunnel(3)">
                    → C
                </button>

                <button onclick="chooseTunnel(4)">
                    ↓ D
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
            "Správná cesta. Vidíš světlo.",
            "success"
        );

        setTimeout(() => {

            closePuzzle();
            unlockRoom("room8");

        }, 1200);

    } else {

        playSound("error");

        showPuzzleMessage(
            "Slepá chodba. Musíš se vrátit.",
            "error"
        );
    }
}


/* =========================================================
   8 — FINÁLNÍ ÚNIK
   ROOM 8
========================================================= */

function openEscapePuzzle() {

    if (puzzleDone("escape")) {
        return;
    }

    showPuzzle(`

        <div class="puzzle">

            <div class="sector">
                EXIT // FINAL SECURITY
            </div>

            <h2>🚪 HLAVNÍ VÝCHOD</h2>

            <p>
                Dostaneš se až ke dveřím.
            </p>

            <p>
                Zařízení po tobě chce poslední
                potvrzení toho, co se skutečně stalo.
            </p>

            <div class="escape-options">

                <button onclick="escapeAnswer(1)">
                    Zařízení bylo uzavřeno
                    kvůli technické závadě.
                </button>

                <button onclick="escapeAnswer(2)">
                    INCIDENT 07 byl utajen.
                </button>

                <button onclick="escapeAnswer(3)">
                    Nic se nestalo.
                </button>

            </div>

            <div id="escapeMessage"></div>

        </div>

    `);
}


function escapeAnswer(answer) {

    if (answer === 2) {

        finishPuzzle("escape");

        if (typeof completeRoom === "function") {
            completeRoom("room8");
        }

        showPuzzleMessage(
            "PŘÍSTUP POVOLEN.",
            "success"
        );

        setTimeout(() => {

            closePuzzle();
            showEnding();

        }, 1500);

    } else {

        playSound("error");

        showPuzzleMessage(
            "Systém odpověď odmítl.",
            "error"
        );
    }
}


/* =========================================================
   INVENTÁŘ — POUŽITÍ PŘEDMĚTŮ
========================================================= */

function useItemForPuzzle(itemId) {

    if (!itemId) return false;

    switch (itemId) {

        case "oldID":

            /*
               SCHVÁLNĚ ŽÁDNÝ KÓD.
               Průkaz nesmí hráči přímo říct,
               že obsahuje správný kód.
            */

            showPuzzleMessage(
                "Starý zaměstnanecký průkaz. Je poškozený a většina údajů je nečitelná.",
                "normal"
            );

            setFlag(
                "examined_oldID",
                true
            );

            return true;


        case "chemical":

            showPuzzleMessage(
                "Aktivátor z laboratoře. Našel jsi ho v označené lahvičce.",
                "normal"
            );

            return true;


        case "incidentReport":

            showPuzzleMessage(
                "INCIDENT 07 byl označen jako CLASSIFIED. Některé části dokumentu chybí.",
                "normal"
            );

            setFlag(
                "read_incident",
                true
            );

            return true;


        case "fuse":

            showPuzzleMessage(
                "Průmyslová pojistka. Vypadá jako součást starého napájecího systému.",
                "normal"
            );

            return true;


        case "securityCard":

            showPuzzleMessage(
                "Bezpečnostní karta. Její přístupová vrstva je stále aktivní.",
                "normal"
            );

            return true;


        case "accessToken":

            showPuzzleMessage(
                "Přístupový token. Je určený pro hlavní systém.",
                "normal"
            );

            return true;


        default:

            return false;
    }
}


/* =========================================================
   OTEVŘÍT PUZZLE AKTUÁLNÍ MÍSTNOSTI
========================================================= */

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
                "V této místnosti zatím není žádná aktivní akce."
            );
    }
}


/* =========================================================
   KONEC HRY
========================================================= */

function showEnding() {

    const gameScreen =
        document.getElementById("gameScreen");

    if (!gameScreen) return;

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
                Dveře se konečně otevřely.
            </p>

            <p>
                Zařízení SECTOR 07 zůstává za tebou.
            </p>

            <p class="important">
                Ale teď už víš, že oficiální verze
                nebyla pravda.
            </p>

            <div class="ending-report">

                INCIDENT 07<br>
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

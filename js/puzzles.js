/* =========================================================
   BLACKOUT — PUZZLES v2
   Příběhové minihry / SECTOR 07
========================================================= */


/* =========================================================
   ZÁKLADNÍ POMOCNÉ FUNKCE
========================================================= */

function blackoutFlag(id) {
    try {
        return localStorage.getItem("BLACKOUT_" + id) === "true";
    } catch {
        return false;
    }
}


function setBlackoutFlag(id, value = true) {
    try {
        localStorage.setItem(
            "BLACKOUT_" + id,
            value ? "true" : "false"
        );
    } catch {}
}


function puzzleDone(id) {
    return blackoutFlag("PUZZLE_" + id);
}


function finishPuzzle(id) {

    setBlackoutFlag("PUZZLE_" + id, true);

    safeSound("success");
    safeVibrate(100);
    safeFlash();

    if (typeof updateRoomAfterPuzzle === "function") {
        updateRoomAfterPuzzle();
    }

    if (typeof checkRoomProgress === "function") {
        checkRoomProgress();
    }
}


function safeSound(type) {
    if (typeof playSound === "function") {
        try {
            playSound(type);
        } catch {}
    }
}


function safeVibrate(ms) {
    if (typeof vibrate === "function") {
        try {
            vibrate(ms);
        } catch {}
    }
}


function safeFlash() {
    if (typeof flashScreen === "function") {
        try {
            flashScreen();
        } catch {}
    }
}


/* =========================================================
   PUZZLE OKNO
========================================================= */

function showPuzzle(content) {

    let modal =
        document.getElementById("puzzleModal");


    if (!modal) {

        modal =
            document.createElement("div");

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


    const box =
        document.getElementById("puzzleContent");


    if (box) {
        box.innerHTML = content;
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

function puzzleMessage(message, type = "normal") {

    const box =
        document.getElementById("puzzleMessage");

    if (!box) return;

    box.className =
        "puzzle-message " + type;

    box.textContent = message;
}


/* =========================================================
   1 — STARÝ TERMINÁL
========================================================= */

function openTerminalPuzzle() {

    if (puzzleDone("terminal")) {

        showPuzzle(`
            <div class="puzzle story-puzzle">

                <div class="sector">
                    TERMINÁL / SECTOR 01
                </div>

                <h2>💻 Terminál</h2>

                <p>
                    Obrazovka stále slabě svítí.
                </p>

                <p class="important">
                    ACCESS GRANTED
                </p>

                <p>
                    Terminál už jsi odemkl.
                    V systému ale zůstala jedna věc,
                    která tě zneklidňuje.
                </p>

            </div>
        `);

        return;
    }


    showPuzzle(`

        <div class="puzzle story-puzzle">

            <div class="sector">
                SECTOR 01 / TERMINÁL
            </div>

            <h2>💻 STARÝ TERMINÁL</h2>

            <p>
                Přistoupíš ke starému počítači.
            </p>

            <p>
                Ventilátor uvnitř skříně se ještě
                pomalu otáčí.
            </p>

            <div class="terminal-text">
                SYSTEM OFFLINE<br>
                BACKUP POWER: 03%
            </div>

            <p>
                Na obrazovce se objeví jediná věta:
            </p>

            <p class="important">
                „PŘÍSTUPOVÝ KÓD JE UKRYT TAM,
                KDE ZAČAL INCIDENT.“
            </p>

            <p>
                Vedle monitoru leží starý průkaz.
                Možná by se hodil.
            </p>

            <button
                class="secondary-button"
                onclick="inspectOldID()">

                🪪 PROZKOUMAT PRŮKAZ

            </button>

            <div id="terminalClue"></div>

            <input
                id="terminalCode"
                class="puzzle-input"
                type="text"
                inputmode="numeric"
                maxlength="4"
                placeholder="KÓD"
            >

            <button
                class="main-button"
                onclick="checkTerminalCode()">

                SPUSTIT TERMINÁL

            </button>

            <div id="puzzleMessage"></div>

        </div>

    `);
}


function inspectOldID() {

    const clue =
        document.getElementById("terminalClue");

    if (!clue) return;


    clue.innerHTML = `
        <div class="clue-box">

            <strong>🪪 PRŮKAZ</strong>

            <p>
                Na přední straně je datum:
                <strong>04 / 07 / 2009</strong>
            </p>

            <p>
                Na zadní straně jsou čtyři číslice.
                Dvě jsou téměř setřené.
            </p>

            <p class="important">
                4 — 7 — ? — ?
            </p>

        </div>
    `;

    safeSound("click");
}


function checkTerminalCode() {

    const input =
        document.getElementById("terminalCode");

    if (!input) return;


    const code =
        input.value.trim();


    if (code === "4729") {

        finishPuzzle("terminal");

        const message =
            document.getElementById("puzzleMessage");

        if (message) {
            message.className =
                "puzzle-message success";

            message.textContent =
                "TERMINÁL ODEMČEN. Něco se právě zapnulo...";
        }


        setTimeout(() => {

            closePuzzle();

            if (typeof unlockRoom === "function") {
                unlockRoom("room2");
            }

        }, 1400);


    } else {

        safeSound("error");
        safeVibrate(180);

        puzzleMessage(
            "Terminál odmítl kód. Zkus znovu.",
            "error"
        );
    }
}


/* =========================================================
   2 — ROZVADĚČ
========================================================= */

let cableSequence = [];

const cableCorrect =
    ["red", "blue", "yellow", "green"];


function openCablePuzzle() {

    if (puzzleDone("cables")) {

        showPuzzle(`
            <div class="puzzle story-puzzle">

                <div class="sector">
                    SECTOR 02 / TECHNICKÁ MÍSTNOST
                </div>

                <h2>🔌 ROZVADĚČ</h2>

                <p class="important">
                    Elektřina už proudí.
                </p>

                <p>
                    Kabely jsou zapojené.
                    Tentokrát už se jich raději nedotýkáš.
                </p>

            </div>
        `);

        return;
    }


    cableSequence = [];


    showPuzzle(`

        <div class="puzzle story-puzzle">

            <div class="sector">
                SECTOR 02 / TECHNICKÁ MÍSTNOST
            </div>

            <h2>🔌 ROZVADĚČ</h2>

            <p>
                Zastavíš se před rozvaděčem.
            </p>

            <p>
                Čtyři kabely visí ze zdi.
                Každý má jinou barvu.
            </p>

            <p class="important">
                Něco je špatně.
            </p>

            <p>
                Na vnitřní straně krytu najdeš
                vybledlý servisní štítek:
            </p>

            <div class="clue-box">
                <strong>
                    START → SIGNAL → POWER → GROUND
                </strong>
            </div>

            <div class="cables">

                <button
                    class="cable red"
                    onclick="connectCable('red')">

                    🔴 ČERVENÝ

                </button>

                <button
                    class="cable blue"
                    onclick="connectCable('blue')">

                    🔵 MODRÝ

                </button>

                <button
                    class="cable yellow"
                    onclick="connectCable('yellow')">

                    🟡 ŽLUTÝ

                </button>

                <button
                    class="cable green"
                    onclick="connectCable('green')">

                    🟢 ZELENÝ

                </button>

            </div>

            <div id="cableProgress">
                0 / 4
            </div>

            <div id="puzzleMessage"></div>

        </div>

    `);
}


function connectCable(color) {

    const expected =
        cableCorrect[cableSequence.length];


    if (color === expected) {

        cableSequence.push(color);

        safeSound("click");
        safeVibrate(40);


        const progress =
            document.getElementById("cableProgress");

        if (progress) {
            progress.textContent =
                cableSequence.length + " / 4";
        }


        if (cableSequence.length === 4) {

            finishPuzzle("cables");

            puzzleMessage(
                "⚡ CVAK. Světla v celém sektoru se rozsvítila.",
                "success"
            );


            setTimeout(() => {

                closePuzzle();

                if (typeof unlockRoom === "function") {
                    unlockRoom("room3");
                }

            }, 1500);
        }

    } else {

        cableSequence = [];

        safeSound("error");
        safeVibrate(250);

        puzzleMessage(
            "Jiskra vyšlehne ze skříně. ŠPATNÉ POŘADÍ.",
            "error"
        );


        const progress =
            document.getElementById("cableProgress");

        if (progress) {
            progress.textContent = "0 / 4";
        }
    }
}


/* =========================================================
   3 — BEZPEČNOSTNÍ PANEL
========================================================= */

let securitySequence = [];

const securityCorrect =
    [3, 1, 4, 2];


function openSecurityPuzzle() {

    if (puzzleDone("security")) {

        showPuzzle(`
            <div class="puzzle story-puzzle">

                <div class="sector">
                    SECTOR 03 / SECURITY
                </div>

                <h2>🚨 BEZPEČNOSTNÍ PANEL</h2>

                <p class="important">
                    Systém je deaktivovaný.
                </p>

                <p>
                    Jedna kamera však pořád sleduje chodbu.
                </p>

            </div>
        `);

        return;
    }


    securitySequence = [];


    showPuzzle(`

        <div class="puzzle story-puzzle">

            <div class="sector">
                SECTOR 03 / SECURITY
            </div>

            <h2>🚨 BEZPEČNOSTNÍ PANEL</h2>

            <p>
                Červené světlo nad tebou zabliká.
            </p>

            <p>
                Z reproduktoru se ozve zkreslený hlas:
            </p>

            <div class="terminal-text">
                SECURITY PROTOCOL 07
            </div>

            <p>
                Panel ukáže krátkou sekvenci.
                Musíš si ji zapamatovat.
            </p>

            <div class="security-buttons">

                <button onclick="pressSecurity(1)">1</button>
                <button onclick="pressSecurity(2)">2</button>
                <button onclick="pressSecurity(3)">3</button>
                <button onclick="pressSecurity(4)">4</button>

            </div>

            <div id="puzzleMessage"></div>

        </div>

    `);


    playSecuritySequence();
}


function playSecuritySequence() {

    let index = 0;


    const interval =
        setInterval(() => {

            if (index >= securityCorrect.length) {

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

    safeSound("click");


    setTimeout(() => {
        button.classList.remove("flash");
    }, 350);
}


function pressSecurity(number) {

    const expected =
        securityCorrect[securitySequence.length];


    if (number === expected) {

        securitySequence.push(number);

        safeSound("click");


        if (securitySequence.length === 4) {

            finishPuzzle("security");

            puzzleMessage(
                "BEZPEČNOSTNÍ SYSTÉM DEAKTIVOVÁN.",
                "success"
            );


            setTimeout(() => {

                closePuzzle();

                if (typeof unlockRoom === "function") {
                    unlockRoom("room4");
                }

            }, 1400);
        }

    } else {

        securitySequence = [];

        safeSound("error");
        safeVibrate(250);

        puzzleMessage(
            "CHYBA. Kamera se otočila tvým směrem.",
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
========================================================= */

function openLabPuzzle() {

    if (puzzleDone("lab")) {

        showPuzzle(`
            <div class="puzzle story-puzzle">

                <div class="sector">
                    SECTOR 04 / LABORATOŘ
                </div>

                <h2>🧪 LABORATOŘ</h2>

                <p>
                    Aktivátor už byl nalezen.
                </p>

            </div>
        `);

        return;
    }


    showPuzzle(`

        <div class="puzzle story-puzzle">

            <div class="sector">
                SECTOR 04 / LABORATOŘ
            </div>

            <h2>🧪 LABORATOŘ</h2>

            <p>
                Ve vzduchu je cítit něco chemického.
            </p>

            <p>
                Na stole stojí čtyři lahvičky.
            </p>

            <p class="important">
                Jedna z nich stále reaguje.
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

            <div id="puzzleMessage"></div>

        </div>

    `);
}


function chooseVial(number) {

    if (number === 3) {

        finishPuzzle("lab");

        puzzleMessage(
            "Lahvička se rozsvítila. Našel jsi aktivátor.",
            "success"
        );


        if (typeof addItem === "function") {

            try {

                addItem(
                    "chemical",
                    "Aktivátor",
                    "Chemická látka z laboratoře.",
                    "🧪"
                );

            } catch {}
        }


        setTimeout(() => {

            closePuzzle();

            if (typeof unlockRoom === "function") {
                unlockRoom("room5");
            }

        }, 1400);

    } else {

        safeSound("error");

        puzzleMessage(
            "Nic. Tohle není ono.",
            "error"
        );
    }
}


/* =========================================================
   5 — ARCHIV
========================================================= */

function openArchivePuzzle() {

    if (puzzleDone("archive")) {

        showPuzzle(`
            <div class="puzzle story-puzzle">

                <div class="sector">
                    SECTOR 05 / ARCHIV
                </div>

                <h2>📁 ARCHIV</h2>

                <p>
                    Dokument INCIDENT 07 už máš.
                </p>

            </div>
        `);

        return;
    }


    showPuzzle(`

        <div class="puzzle story-puzzle">

            <div class="sector">
                SECTOR 05 / ARCHIV
            </div>

            <h2>📁 ARCHIV</h2>

            <p>
                Regály jsou plné složek.
            </p>

            <p>
                Většina dokumentů je bezvýznamná.
                Jedna složka je ale podezřele nová.
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

            <div id="puzzleMessage"></div>

        </div>

    `);
}


function chooseDocument(number) {

    if (number === 2) {

        finishPuzzle("archive");

        puzzleMessage(
            "Našel jsi INCIDENT 07. Tohle neměl nikdo vidět.",
            "success"
        );


        if (typeof addItem === "function") {

            try {

                addItem(
                    "incidentReport",
                    "INCIDENT 07",
                    "Utajený dokument o události v zařízení.",
                    "📄"
                );

            } catch {}
        }


        setTimeout(() => {

            closePuzzle();

            if (typeof unlockRoom === "function") {
                unlockRoom("room6");
            }

        }, 1500);

    } else {

        safeSound("error");

        puzzleMessage(
            "Tahle složka neobsahuje nic použitelného.",
            "error"
        );
    }
}


/* =========================================================
   6 — CONTROL CENTER
========================================================= */

function openControlPuzzle() {

    if (puzzleDone("control")) {

        showPuzzle(`
            <div class="puzzle story-puzzle">

                <h2>💻 CONTROL CENTER</h2>

                <p class="important">
                    ROOT ACCESS: AKTIVNÍ
                </p>

            </div>
        `);

        return;
    }


    showPuzzle(`

        <div class="puzzle story-puzzle">

            <div class="sector">
                SECTOR 06 / CONTROL CENTER
            </div>

            <h2>💻 CONTROL CENTER</h2>

            <p>
                Obrovská obrazovka se sama rozsvítí.
            </p>

            <div class="terminal-text">
                ROOT ACCESS REQUIRED
            </div>

            <p>
                Našel jsi dokument INCIDENT 07.
                Datum na něm může být důležité.
            </p>

            <input
                id="controlCode"
                class="puzzle-input"
                type="text"
                inputmode="numeric"
                maxlength="6"
                placeholder="KÓD"
            >

            <button
                class="main-button"
                onclick="checkControlCode()">

                PŘIHLÁSIT

            </button>

            <div id="puzzleMessage"></div>

        </div>

    `);
}


function checkControlCode() {

    const input =
        document.getElementById("controlCode");

    if (!input) return;


    if (input.value.trim() === "071209") {

        finishPuzzle("control");

        puzzleMessage(
            "ROOT ACCESS GRANTED.",
            "success"
        );


        setTimeout(() => {

            closePuzzle();

            if (typeof unlockRoom === "function") {
                unlockRoom("room7");
            }

        }, 1400);

    } else {

        safeSound("error");
        safeVibrate(200);

        puzzleMessage(
            "PŘÍSTUP ZAMÍTNUT.",
            "error"
        );
    }
}


/* =========================================================
   7 — PODZEMNÍ TUNEL
========================================================= */

function openTunnelPuzzle() {

    if (puzzleDone("tunnel")) {

        showPuzzle(`
            <div class="puzzle story-puzzle">

                <div class="sector">
                    SECTOR 07 / TUNEL
                </div>

                <h2>🚇 PODZEMNÍ TUNEL</h2>

                <p>
                    Cesta k výstupu je volná.
                </p>

            </div>
        `);

        return;
    }


    showPuzzle(`

        <div class="puzzle story-puzzle">

            <div class="sector">
                SECTOR 07 / PODZEMÍ
            </div>

            <h2>🚇 PODZEMNÍ TUNEL</h2>

            <p>
                Dveře za tebou se zavřou.
            </p>

            <p>
                Před tebou jsou čtyři chodby.
            </p>

            <p class="important">
                Z dálky slyšíš kapající vodu.
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

            <div id="puzzleMessage"></div>

        </div>

    `);
}


function chooseTunnel(number) {

    if (number === 4) {

        finishPuzzle("tunnel");

        puzzleMessage(
            "Správně. Na konci tunelu vidíš světlo.",
            "success"
        );


        setTimeout(() => {

            closePuzzle();

            if (typeof unlockRoom === "function") {
                unlockRoom("room8");
            }

        }, 1400);

    } else {

        safeSound("error");

        puzzleMessage(
            "Slepá chodba. Musíš se vrátit.",
            "error"
        );
    }
}


/* =========================================================
   8 — FINÁLNÍ ÚNIK
========================================================= */

function openEscapePuzzle() {

    if (puzzleDone("escape")) {
        return;
    }


    showPuzzle(`

        <div class="puzzle story-puzzle">

            <div class="sector">
                EXIT / SECTOR 07
            </div>

            <h2>🚪 HLAVNÍ VÝSTUP</h2>

            <p>
                Položíš ruku na dveře.
            </p>

            <p>
                Z reproduktoru se ozve:
            </p>

            <div class="terminal-text">
                INCIDENT 07<br>
                FINAL VERIFICATION REQUIRED
            </div>

            <p>
                Co jsi během vyšetřování zjistil?
            </p>

            <div class="escape-options">

                <button onclick="escapeAnswer(1)">
                    Zařízení bylo zavřeno
                    kvůli technické závadě.
                </button>

                <button onclick="escapeAnswer(2)">
                    INCIDENT 07 byl úmyslně utajen.
                </button>

                <button onclick="escapeAnswer(3)">
                    Nic se nestalo.
                </button>

            </div>

            <div id="puzzleMessage"></div>

        </div>

    `);
}


function escapeAnswer(answer) {

    if (answer === 2) {

        finishPuzzle("escape");

        if (typeof completeRoom === "function") {
            completeRoom("room8");
        }


        puzzleMessage(
            "PŘÍSTUP POVOLEN. DVEŘE SE OTEVÍRAJÍ...",
            "success"
        );


        setTimeout(() => {

            closePuzzle();

            showEnding();

        }, 1800);

    } else {

        safeSound("error");

        puzzleMessage(
            "Systém tvoji odpověď odmítl.",
            "error"
        );
    }
}


/* =========================================================
   POUŽITÍ PŘEDMĚTŮ
========================================================= */

function useItemForPuzzle(itemId) {

    if (!itemId) return false;


    switch (itemId) {

        case "oldID":

            showPuzzle(`
                <div class="puzzle story-puzzle">

                    <h2>🪪 STARÝ PRŮKAZ</h2>

                    <p>
                        Průkaz je starý více než deset let.
                    </p>

                    <p>
                        Na zadní straně je ručně napsáno:
                    </p>

                    <div class="clue-box">
                        04 / 07 / 2009
                    </div>

                    <p class="important">
                        Něco ti říká, že datum není náhoda.
                    </p>

                </div>
            `);

            setBlackoutFlag(
                "CLUE_OLD_ID",
                true
            );

            return true;


        case "chemical":

            showPuzzle(`
                <div class="puzzle story-puzzle">

                    <h2>🧪 AKTIVÁTOR</h2>

                    <p>
                        Lahvička slabě svítí.
                    </p>

                    <p>
                        Na štítku je napsáno:
                    </p>

                    <div class="clue-box">
                        SUBJECT 07
                    </div>

                    <p>
                        Tohle rozhodně nebyla běžná
                        laboratorní látka.
                    </p>

                </div>
            `);

            return true;


        case "incidentReport":

            showPuzzle(`
                <div class="puzzle story-puzzle">

                    <h2>📄 INCIDENT 07</h2>

                    <p>
                        Dokument popisuje událost,
                        která byla oficiálně vymazána
                        ze všech záznamů.
                    </p>

                    <div class="terminal-text">
                        STATUS: CLASSIFIED
                    </div>

                    <p class="important">
                        Někdo chtěl, aby se o tomhle
                        incidentu nikdo nikdy nedozvěděl.
                    </p>

                </div>
            `);

            setBlackoutFlag(
                "CLUE_INCIDENT",
                true
            );

            return true;


        default:
            return false;
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
                INCIDENT 07 / COMPLETE
            </div>

            <h1>
                ÚNIK
            </h1>

            <p>
                Dveře se pomalu otevřely.
            </p>

            <p>
                Studený vzduch tě udeřil do tváře.
            </p>

            <p>
                Za tebou zůstává SECTOR 07.
            </p>

            <p class="important">
                Teď už víš, že „technická závada“
                byla jen lež.
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


/* =========================================================
   AUTOMATICKÉ NAPOJENÍ NA MÍSTNOST
========================================================= */

function openCurrentRoomPuzzle() {

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

            showPuzzle(`
                <div class="puzzle">
                    <h2>NIC</h2>
                    <p>
                        V této místnosti zatím není
                        žádná aktivní událost.
                    </p>
                </div>
            `);
    }
}

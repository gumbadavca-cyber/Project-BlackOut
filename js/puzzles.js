/* =========================================
   BLACKOUT — PUZZLES / MINIHRY
========================================= */


/* =========================================
   POMOCNÉ FUNKCE
========================================= */

function puzzleDone(id) {

    return getFlag("puzzle_" + id);

}


function finishPuzzle(id) {

    setFlag("puzzle_" + id, true);

    playSound("success");

    vibrate(100);

    flashScreen();

    updateRoomAfterPuzzle();

}


function updateRoomAfterPuzzle() {

    if (typeof renderRoom === "function") {
        renderRoom(currentRoom);
    }

    if (typeof updateMap === "function") {
        updateMap();
    }

}


/* =========================================
   1. STARÝ TERMINÁL
   ROOM 1
========================================= */

function openTerminalPuzzle() {

    if (puzzleDone("terminal")) {

        showPuzzleMessage(
            "Terminál už je odemčený.",
            "success"
        );

        return;
    }


    showPuzzle(`
    
        <div class="puzzle">

            <h2>💻 STARÝ TERMINÁL</h2>

            <p>
                Na obrazovce bliká:
            </p>

            <div class="terminal-text">
                ACCESS REQUIRED
            </div>

            <p>
                Zadej čtyřmístný přístupový kód.
            </p>

            <input
                id="terminalCode"
                class="puzzle-input"
                type="text"
                inputmode="numeric"
                maxlength="4"
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
        document.getElementById(
            "terminalCode"
        );


    if (!input) return;


    const code =
        input.value.trim();


    /*
       Kód získáme později pomocí indicií.
       Pro testovací verzi:
       4729
    */

    if (code === "4729") {

        finishPuzzle("terminal");

        showPuzzleMessage(
            "PŘÍSTUP POVOLEN. Systém obnovuje napájení...",
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
            "NESPRÁVNÝ KÓD.",
            "error"
        );

    }

}


/* =========================================
   2. KABELY
   ROOM 2
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
            "Rozvaděč je už opravený.",
            "success"
        );

        return;
    }


    cableSequence = [];


    showPuzzle(`

        <div class="puzzle">

            <h2>🔌 ROZVADĚČ</h2>

            <p>
                Kabely byly odpojeny.
                Musíš je zapojit ve správném pořadí.
            </p>

            <p class="hint">
                Nápověda:
                systém používá pořadí podle
                barevného diagnostického protokolu.
            </p>

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

        playSound("click");

        vibrate(40);


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

            finishPuzzle("cables");


            showPuzzleMessage(
                "NAPÁJENÍ OBNOVENO.",
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

        vibrate(250);

        showPuzzleMessage(
            "ŠPATNÉ ZAPOJENÍ! Začínáš znovu.",
            "error"
        );


        const progress =
            document.getElementById(
                "cableProgress"
            );


        if (progress) {

            progress.textContent =
                "0 / 4";

        }

    }

}


/* =========================================
   3. BEZPEČNOSTNÍ PANEL
   ROOM 3
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
            "Bezpečnostní panel je deaktivovaný.",
            "success"
        );

        return;
    }


    securitySequence = [];


    showPuzzle(`

        <div class="puzzle">

            <h2>🚨 BEZPEČNOSTNÍ PANEL</h2>

            <p>
                Čtyři kontrolky blikají.
                Musíš zopakovat jejich pořadí.
            </p>

            <div class="security-buttons">

                <button
                    onclick="pressSecurity(1)">
                    1
                </button>

                <button
                    onclick="pressSecurity(2)">
                    2
                </button>

                <button
                    onclick="pressSecurity(3)">
                    3
                </button>

                <button
                    onclick="pressSecurity(4)">
                    4
                </button>

            </div>

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


            const number =
                securityCorrect[index];


            flashSecurityButton(number);

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


    button.classList.add(
        "flash"
    );


    setTimeout(() => {

        button.classList.remove(
            "flash"
        );

    }, 350);

}


function pressSecurity(number) {

    const expected =
        securityCorrect[
            securitySequence.length
        ];


    if (number === expected) {

        securitySequence.push(
            number
        );

        playSound("click");

        if (
            securitySequence.length ===
            securityCorrect.length
        ) {

            finishPuzzle("security");


            showPuzzleMessage(
                "BEZPEČNOSTNÍ SYSTÉM DEAKTIVOVÁN.",
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
            "CHYBA. Pořadí bylo špatně.",
            "error"
        );


        setTimeout(
            playSecuritySequence,
            700
        );

    }

}


/* =========================================
   4. LABORATORNÍ ZÁMEK
   ROOM 4
========================================= */

function openLabPuzzle() {

    if (puzzleDone("lab")) {

        showPuzzleMessage(
            "Laboratoř je už odemčená.",
            "success"
        );

        return;
    }


    showPuzzle(`

        <div class="puzzle">

            <h2>🧪 LABORATOŘ</h2>

            <p>
                Na stole je několik lahviček.
                Jedna z nich obsahuje aktivátor.
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

    /*
       Správná lahvička.
       Později můžeme napojit na
       předchozí indicie.
    */

    if (number === 3) {

        finishPuzzle("lab");


        showPuzzleMessage(
            "Správně. Aktivátor reaguje.",
            "success"
        );


        if (
            typeof addItem ===
            "function"
        ) {

            addItem(
                "chemical",
                "🧪 Aktivátor",
                "Chemická látka z laboratoře."
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
            "Špatná lahvička.",
            "error"
        );

    }

}


/* =========================================
   5. ARCHIV
   HLEDÁNÍ INFORMACE
========================================= */

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

            <h2>📁 ARCHIV</h2>

            <p>
                Najdi správný dokument.
            </p>

            <div class="documents">

                <button
                    onclick="chooseDocument(1)">
                    📄 INCIDENT 03
                </button>

                <button
                    onclick="chooseDocument(2)">
                    📄 INCIDENT 07
                </button>

                <button
                    onclick="chooseDocument(3)">
                    📄 INCIDENT 12
                </button>

                <button
                    onclick="chooseDocument(4)">
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
            "Našel jsi INCIDENT 07.",
            "success"
        );


        if (
            typeof addItem ===
            "function"
        ) {

            addItem(
                "incidentReport",
                "📄 INCIDENT 07",
                "Tajný dokument o událostech v zařízení."
            );

        }


        setTimeout(() => {

            closePuzzle();

            unlockRoom("room6");

        }, 1300);


    } else {

        playSound("error");

        showPuzzleMessage(
            "Tento dokument není důležitý.",
            "error"
        );

    }

}


/* =========================================
   6. KONTROLNÍ CENTRUM
   TERMINÁL
========================================= */

function openControlPuzzle() {

    if (puzzleDone("control")) {

        showPuzzleMessage(
            "Kontrolní centrum je aktivní.",
            "success"
        );

        return;
    }


    showPuzzle(`

        <div class="puzzle">

            <h2>💻 CONTROL CENTER</h2>

            <p>
                Systém požaduje přístupový kód.
            </p>

            <input
                id="controlCode"
                class="puzzle-input"
                type="text"
                inputmode="numeric"
                maxlength="6"
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
        document.getElementById(
            "controlCode"
        );


    if (!input) return;


    /*
       Kód z dokumentu INCIDENT 07.
    */

    if (
        input.value.trim() ===
        "071209"
    ) {

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

    }

}


/* =========================================
   7. PODZEMNÍ TUNEL
   SMĚR
========================================= */

function openTunnelPuzzle() {

    if (puzzleDone("tunnel")) {

        showPuzzleMessage(
            "Tunel je již odemčený.",
            "success"
        );

        return;
    }


    showPuzzle(`

        <div class="puzzle">

            <h2>🚇 PODZEMNÍ TUNEL</h2>

            <p>
                Před tebou jsou čtyři chodby.
                Jedna vede k výstupu.
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
            "Správná cesta. Výstup je před tebou.",
            "success"
        );


        setTimeout(() => {

            closePuzzle();

            unlockRoom("room8");

        }, 1200);


    } else {

        playSound("error");

        showPuzzleMessage(
            "Slepá chodba. Zkus jinou.",
            "error"
        );

    }

}


/* =========================================
   8. FINÁLNÍ ÚNIK
========================================= */

function openEscapePuzzle() {

    if (puzzleDone("escape")) {

        return;
    }


    showPuzzle(`

        <div class="puzzle">

            <h2>🚪 HLAVNÍ VÝCHOD</h2>

            <p>
                Bezpečnostní systém požaduje
                poslední potvrzení.
            </p>

            <p>
                Co jsi během vyšetřování zjistil?
            </p>

            <div class="escape-options">

                <button
                    onclick="escapeAnswer(1)">
                    Zařízení bylo zavřeno
                    kvůli technické závadě.
                </button>

                <button
                    onclick="escapeAnswer(2)">
                    Incident 07 byl utajen.
                </button>

                <button
                    onclick="escapeAnswer(3)">
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


        completeRoom("room8");


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


/* =========================================
   OKNO MINIHRY
========================================= */

function showPuzzle(content) {

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

                <div id="puzzleContent"></div>

                <button
                    class="main-button"
                    onclick="closePuzzle()">

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


/* =========================================
   ZPRÁVA PUZZLU
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
            document.getElementById(
                id
            );


        if (element) {

            target = element;

            break;

        }

    }


    if (!target) {

        alert(message);

        return;

    }


    target.className =
        "puzzle-message " +
        type;


    target.textContent =
        message;

}


/* =========================================
   KONEC HRY
========================================= */

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

            <h1>
                ÚNIK
            </h1>

            <p>
                Dveře se otevřely.
            </p>

            <p>
                Zařízení SECTOR 07
                zůstává za tebou.
            </p>

            <p class="important">
                Ale teď víš, co se skutečně stalo.
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


/* =========================================
   INVENTÁŘ — POUŽITÍ PŘEDMĚTŮ
========================================= */

function useItemForPuzzle(itemId) {

    if (!itemId) {
        return false;
    }


    /*
       Tady můžeme později přesně určit,
       který předmět patří ke kterému puzzlu.
    */

    switch (itemId) {

        case "oldID":

            showPuzzleMessage(
                "Starý průkaz. Na zadní straně je něco napsáno.",
                "normal"
            );

            setFlag(
                "examined_oldID",
                true
            );

            return true;


        case "chemical":

            showPuzzleMessage(
                "Aktivátor. Může se hodit v laboratoři.",
                "normal"
            );

            return true;


        case "incidentReport":

            showPuzzleMessage(
                "INCIDENT 07: událost byla úmyslně utajena.",
                "normal"
            );

            setFlag(
                "read_incident",
                true
            );

            return true;


        default:

            return false;

    }

}


/* =========================================
   AUTOMATICKÉ NAPOJENÍ NA MÍSTNOST
========================================= */

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

            showPuzzleMessage(
                "V této místnosti zatím není žádná minihra."
            );

    }

}

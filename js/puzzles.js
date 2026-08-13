/* =====================================================
   BLACKOUT — PUZZLES
   STORY VERSION
   Kompatibilní s rooms.js
===================================================== */


/* =====================================================
   POMOCNÉ FUNKCE
===================================================== */

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

    if (typeof updateMap === "function") {
        updateMap();
    }
}


function refreshRoom() {

    if (
        typeof renderRoom === "function" &&
        typeof currentRoom !== "undefined"
    ) {
        renderRoom(currentRoom);
    }
}


/* =====================================================
   PŘÍBĚHOVÉ ZPRÁVY
===================================================== */

function storyMessage(title, text) {

    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                SECTOR 07
            </div>

            <h2>${title}</h2>

            <div class="story-text">
                ${text}
            </div>

            <button
                class="main-button"
                onclick="closePuzzle()">

                POKRAČOVAT

            </button>

        </div>

    `);
}


/* =====================================================
   ROOM 1 — PROBUZENÍ
===================================================== */

function openTerminalPuzzle() {

    /*
       Pokud je první místnost dokončená,
       terminál už znovu neotvíráme.
    */

    if (puzzleDone("terminal")) {

        storyMessage(
            "DVEŘE JSOU ODEMČENÉ",
            "Terminál už mlčí. Na displeji zůstává pouze jedno slovo:<br><br><strong>ESCAPE.</strong>"
        );

        return;
    }


    /*
       Pokud hráč ještě nenašel průkaz,
       nejdřív dostane příběhový tutorial.
    */

    if (
        typeof isItemCollected === "function" &&
        !isItemCollected("oldID")
    ) {

        showPuzzle(`

            <div class="story-scene">

                <div class="puzzle-label">
                    02:17 AM // UNKNOWN LOCATION
                </div>

                <h2>😨 KDE TO JSEM?</h2>

                <div class="story-text">

                    <p>
                        Otevřeš oči.
                    </p>

                    <p>
                        Nad tebou pomalu bliká zářivka.
                        Jednou.
                        Podruhé.
                        Potom zhasne.
                    </p>

                    <p>
                        Chvíli je úplná tma.
                    </p>

                    <p>
                        Když se světlo znovu rozsvítí,
                        ležíš na studené podlaze neznámé místnosti.
                    </p>

                    <p>
                        Nevíš, jak ses sem dostal.
                    </p>

                    <p class="important">
                        A dveře před tebou jsou zamčené.
                    </p>

                </div>

                <button
                    class="main-button"
                    onclick="startRoomInvestigation()">

                    PROZKOUMAT MÍSTNOST

                </button>

            </div>

        `);

        return;
    }


    /*
       Pokud průkaz má, pokračujeme k terminálu.
    */

    openTerminalCode();
}


/* =====================================================
   PRVNÍ PROZKOUMÁNÍ
===================================================== */

function startRoomInvestigation() {

    if (typeof playSound === "function") {
        playSound("click");
    }

    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                SECTOR 01 // UNKNOWN ROOM
            </div>

            <h2>🔎 PROZKOUMÁVÁŠ MÍSTNOST</h2>

            <div class="story-text">

                <p>
                    Místnost je malá.
                </p>

                <p>
                    Na pravé straně je starý stůl.
                    Na něm leží několik prázdných papírů.
                </p>

                <p>
                    V rohu bliká starý terminál.
                </p>

                <p>
                    A vedle dveří je něco,
                    co vypadá jako starý zaměstnanecký průkaz.
                </p>

                <p class="important">
                    Možná by se mohl hodit.
                </p>

            </div>

            <button
                class="main-button"
                onclick="closePuzzle(); focusOldID()">

                PROZKOUMAT PRŮKAZ

            </button>

        </div>

    `);
}


/* =====================================================
   PROHLÉDNUTÍ PRŮKAZU
===================================================== */

function focusOldID() {

    /*
       Pokud item ještě nebyl sebrán,
       necháme hráče použít normální tlačítko VZÍT
       z rooms.js.
    */

    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                FOUND ITEM
            </div>

            <h2>🪪 STARÝ PRŮKAZ</h2>

            <div class="item-inspection">

                <div class="big-item-icon">
                    🪪
                </div>

                <p>
                    Na průkazu je napsáno:
                </p>

                <div class="evidence">

                    <strong>
                        SECTOR 07
                    </strong>

                    <br>

                    EMPLOYEE:
                    <span>J. MILLER</span>

                    <br>

                    ID:
                    <span>4729</span>

                </div>

                <p>
                    Průkaz je starý nejméně několik let.
                </p>

                <p class="important">
                    Na zadní straně je ještě něco napsáno.
                </p>

            </div>

            <button
                class="main-button"
                onclick="inspectOldIDBack()">

                OTOČIT PRŮKAZ

            </button>

        </div>

    `);
}


/* =====================================================
   ZADNÍ STRANA PRŮKAZU
===================================================== */

function inspectOldIDBack() {

    if (typeof setFlag === "function") {
        setFlag("examined_oldID", true);
    }

    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                EVIDENCE // OLD ID
            </div>

            <h2>🪪 ZADNÍ STRANA</h2>

            <div class="evidence-note">

                <p>
                    Na zadní straně někdo rukou napsal:
                </p>

                <div class="handwriting">
                    „NEVĚŘ TOMU, CO TI ŘEKNOU.“
                </div>

                <div class="handwriting">
                    „KÓD: 4729“
                </div>

            </div>

            <p>
                Takže čísla z průkazu nejsou náhoda.
            </p>

            <button
                class="main-button"
                onclick="openTerminalCode()">

                ZKUSIT KÓD NA TERMINÁLU

            </button>

        </div>

    `);
}


/* =====================================================
   TERMINÁL — PŘÍBĚH
===================================================== */

function openTerminalCode() {

    showPuzzle(`

        <div class="story-scene terminal-scene">

            <div class="puzzle-label">
                OLD TERMINAL // OFFLINE MODE
            </div>

            <h2>💻 TERMINÁL</h2>

            <div class="terminal-screen">

                <div>
                    SYSTEM STARTING...
                </div>

                <div>
                    MEMORY ERROR
                </div>

                <div>
                    FACILITY: SECTOR 07
                </div>

                <div class="warning">
                    LOCKDOWN ACTIVE
                </div>

            </div>

            <p>
                Terminál požaduje čtyřmístný kód.
            </p>

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
                class="main-button"
                onclick="checkTerminalCode()">

                POTVRDIT

            </button>

            <div id="terminalMessage"></div>

        </div>

    `);
}


/* =====================================================
   KONTROLA TERMINÁLU
===================================================== */

function checkTerminalCode() {

    const input =
        document.getElementById("terminalCode");

    if (!input) return;

    const code =
        input.value.trim();


    if (code === "4729") {

        if (typeof setFlag === "function") {
            setFlag("examined_oldID", true);
        }

        finishPuzzle("terminal");

        showPuzzleMessage(
            "KÓD PŘIJAT. TERMINÁL SE PROBOUZÍ...",
            "success"
        );


        setTimeout(() => {

            showTerminalStory();

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
            "KÓD JE NESPRÁVNÝ.",
            "error"
        );
    }
}


/* =====================================================
   TERMINÁL — CO SE STALO
===================================================== */

function showTerminalStory() {

    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                RECOVERED LOG // 2009
            </div>

            <h2>⚠ ZÁZNAM NALEZEN</h2>

            <div class="terminal-screen story-terminal">

                <p>
                    [23:41] INCIDENT DETECTED
                </p>

                <p>
                    [23:46] LOCKDOWN INITIATED
                </p>

                <p>
                    [23:52] ALL PERSONNEL EVACUATED
                </p>

                <p>
                    [00:13] SIGNAL LOST
                </p>

                <p class="warning">
                    [00:14] SUBJECTS REMAIN INSIDE
                </p>

            </div>

            <div class="story-text">

                <p>
                    Ztuhneš.
                </p>

                <p>
                    Oficiálně bylo zařízení uzavřeno
                    kvůli technické závadě.
                </p>

                <p class="important">
                    Jenže tento záznam říká něco úplně jiného.
                </p>

            </div>

            <button
                class="main-button"
                onclick="unlockFirstRoom()">

                OTEVŘÍT DVEŘE

            </button>

        </div>

    `);
}


/* =====================================================
   ODEMKNUTÍ PRVNÍ DALŠÍ MÍSTNOSTI
===================================================== */

function unlockFirstRoom() {

    if (typeof setFlag === "function") {
        setFlag("room1_story_complete", true);
    }

    if (
        typeof unlockRoom === "function"
    ) {
        unlockRoom("room2");
    }

    if (typeof playSound === "function") {
        playSound("success");
    }

    closePuzzle();

    setTimeout(() => {

        showPuzzle(`

            <div class="story-scene">

                <div class="puzzle-label">
                    SECTOR 01 // EXIT
                </div>

                <h2>🚪 DVEŘE SE OTEVŘELY</h2>

                <div class="story-text">

                    <p>
                        Ozve se hlasité cvaknutí.
                    </p>

                    <p>
                        Zámek dveří se uvolní.
                    </p>

                    <p>
                        Za nimi je temná chodba.
                    </p>

                    <p>
                        Na konci chodby bliká červené světlo.
                    </p>

                    <p class="important">
                        Nemáš ponětí, co tě čeká dál.
                    </p>

                </div>

                <button
                    class="main-button"
                    onclick="closePuzzle(); refreshRoom()">

                    VYJÍT NA CHODBU →

                </button>

            </div>

        `);

    }, 400);
}


/* =====================================================
   ROOM 2 — KABELY
===================================================== */

let cableSequence = [];

const correctCableSequence = [
    "red",
    "blue",
    "yellow",
    "green"
];


function openCablePuzzle() {

    if (puzzleDone("cables")) {

        storyMessage(
            "ROZVADĚČ",
            "Napájení už jsi opravil. Kontrolky stále svítí."
        );

        return;
    }


    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                SECTOR 02 // TECHNICAL ROOM
            </div>

            <h2>🔌 ROZVADĚČ</h2>

            <div class="story-text">

                <p>
                    Vstoupíš do technické místnosti.
                </p>

                <p>
                    Dveře za tebou se zavřou.
                </p>

                <p>
                    Uprostřed místnosti stojí starý rozvaděč.
                </p>

                <p>
                    Čtyři kabely jsou vytržené.
                </p>

                <p class="important">
                    Bez proudu se dál nedostaneš.
                </p>

            </div>

            <button
                class="main-button"
                onclick="openCablePanel()">

                PROZKOUMAT ROZVADĚČ

            </button>

        </div>

    `);
}


function openCablePanel() {

    cableSequence = [];

    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                POWER DISTRIBUTION
            </div>

            <h2>🔌 KABELY</h2>

            <p>
                Na krytu rozvaděče je malá poznámka:
            </p>

            <div class="evidence-note">

                „ČERVENÁ → MODRÁ → ŽLUTÁ → ZELENÁ“

            </div>

            <p>
                Pořadí musíš dodržet přesně.
            </p>

            <div class="cables">

                <button
                    class="cable cable-red"
                    onclick="connectCable('red')">
                    🔴 ČERVENÝ
                </button>

                <button
                    class="cable cable-blue"
                    onclick="connectCable('blue')">
                    🔵 MODRÝ
                </button>

                <button
                    class="cable cable-yellow"
                    onclick="connectCable('yellow')">
                    🟡 ŽLUTÝ
                </button>

                <button
                    class="cable cable-green"
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
                "NAPÁJENÍ OBNOVENO.",
                "success"
            );


            setTimeout(() => {

                closePuzzle();

                refreshRoom();

            }, 1000);

        }

    } else {

        cableSequence = [];

        if (typeof playSound === "function") {
            playSound("error");
        }

        if (typeof vibrate === "function") {
            vibrate(200);
        }

        const progress =
            document.getElementById("cableProgress");

        if (progress) {
            progress.textContent = "0 / 4";
        }

        showPuzzleMessage(
            "ŠPATNÉ ZAPOJENÍ. ZAČÍNÁŠ ZNOVU.",
            "error"
        );
    }
}


/* =====================================================
   ROOM 3 — SECURITY
===================================================== */

let securitySequence = [];

const securityCorrect = [
    3,
    1,
    4,
    2
];


function openSecurityPuzzle() {

    if (puzzleDone("security")) {

        storyMessage(
            "BEZPEČNOSTNÍ PANEL",
            "Panel je deaktivovaný. Červené světlo už nesvítí."
        );

        return;
    }


    securitySequence = [];


    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                SECTOR 03 // SECURITY
            </div>

            <h2>🚨 BEZPEČNOSTNÍ PANEL</h2>

            <p>
                Kamera nad tebou se otočí přímo na tebe.
            </p>

            <p class="important">
                „UNAUTHORIZED PERSON DETECTED.“
            </p>

            <p>
                Panel začne blikat.
            </p>

            <div class="security-buttons">

                <button onclick="pressSecurity(1)">1</button>
                <button onclick="pressSecurity(2)">2</button>
                <button onclick="pressSecurity(3)">3</button>
                <button onclick="pressSecurity(4)">4</button>

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


        if (
            typeof playSound === "function"
        ) {
            playSound("click");
        }


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

                refreshRoom();

            }, 1000);
        }

    } else {

        securitySequence = [];

        if (typeof playSound === "function") {
            playSound("error");
        }

        showPuzzleMessage(
            "CHYBA. SEKQUENCE RESETOVÁNA.",
            "error"
        );

        setTimeout(
            playSecuritySequence,
            700
        );
    }
}


/* =====================================================
   ROOM 4 — LABORATOŘ
===================================================== */

function openLabPuzzle() {

    if (puzzleDone("lab")) {

        storyMessage(
            "LABORATOŘ",
            "Laboratoř už jsi prohledal."
        );

        return;
    }


    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                SECTOR 04 // LAB
            </div>

            <h2>🧪 LABORATOŘ</h2>

            <p>
                Místnost je úplně tichá.
            </p>

            <p>
                Na stole stojí čtyři lahvičky.
            </p>

            <p class="important">
                Jedna z nich obsahuje aktivátor.
            </p>

            <div class="vials">

                <button onclick="chooseVial(1)">
                    🧪 01
                </button>

                <button onclick="chooseVial(2)">
                    🧪 02
                </button>

                <button onclick="chooseVial(3)">
                    🧪 03
                </button>

                <button onclick="chooseVial(4)">
                    🧪 04
                </button>

            </div>

            <div id="vialMessage"></div>

        </div>

    `);
}


function chooseVial(number) {

    if (number === 3) {

        finishPuzzle("lab");

        if (
            typeof addItem === "function"
        ) {

            addItem(
                "chemical",
                "Aktivátor",
                "Neznámá chemická látka.",
                "🧪"
            );

        }

        showPuzzleMessage(
            "NAŠEL JSI AKTIVÁTOR.",
            "success"
        );

        setTimeout(() => {

            closePuzzle();

            refreshRoom();

        }, 1000);

    } else {

        if (typeof playSound === "function") {
            playSound("error");
        }

        showPuzzleMessage(
            "TATO LAHVIČKA JE PRÁZDNÁ.",
            "error"
        );
    }
}


/* =====================================================
   ROOM 5 — ARCHIV
===================================================== */

function openArchivePuzzle() {

    if (puzzleDone("archive")) {

        storyMessage(
            "ARCHIV",
            "Dokument INCIDENT 07 už máš."
        );

        return;
    }


    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                SECTOR 05 // ARCHIVE
            </div>

            <h2>📁 ARCHIV</h2>

            <p>
                Regály jsou plné dokumentů.
            </p>

            <p>
                Jeden název tě okamžitě zaujme.
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

        if (
            typeof addItem === "function"
        ) {

            addItem(
                "incidentReport",
                "INCIDENT 07",
                "Utajený dokument o události.",
                "📄"
            );

        }

        showPuzzleMessage(
            "NAŠEL JSI INCIDENT 07.",
            "success"
        );

        setTimeout(() => {

            closePuzzle();

            refreshRoom();

        }, 1000);

    } else {

        if (typeof playSound === "function") {
            playSound("error");
        }

        showPuzzleMessage(
            "TENTO DOKUMENT NENÍ TEN, KTERÝ HLEDÁŠ.",
            "error"
        );
    }
}


/* =====================================================
   ROOM 6 — CONTROL CENTER
===================================================== */

function openControlPuzzle() {

    if (puzzleDone("control")) {

        storyMessage(
            "CONTROL CENTER",
            "Hlavní systém je aktivní."
        );

        return;
    }


    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                SECTOR 06 // CONTROL
            </div>

            <h2>💻 CONTROL CENTER</h2>

            <div class="terminal-screen">

                ROOT ACCESS REQUIRED<br><br>
                INCIDENT DATABASE LOCKED

            </div>

            <p>
                Dokument INCIDENT 07 obsahoval datum:
            </p>

            <div class="evidence-note">
                07 / 12 / 09
            </div>

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

                ODEMKNOUT

            </button>

            <div id="controlMessage"></div>

        </div>

    `);
}


function checkControlCode() {

    const input =
        document.getElementById("controlCode");

    if (!input) return;


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

            refreshRoom();

        }, 1000);

    } else {

        if (typeof playSound === "function") {
            playSound("error");
        }

        input.value = "";

        showPuzzleMessage(
            "NESPRÁVNÝ KÓD.",
            "error"
        );
    }
}


/* =====================================================
   ROOM 7 — TUNEL
===================================================== */

function openTunnelPuzzle() {

    if (puzzleDone("tunnel")) {

        storyMessage(
            "PODZEMNÍ TUNEL",
            "Už víš, kudy vede cesta ven."
        );

        return;
    }


    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                SECTOR 07 // UNDERGROUND
            </div>

            <h2>🚇 TUNEL</h2>

            <p>
                Tunel se rozdvojuje.
            </p>

            <p>
                Pak znovu.
            </p>

            <p class="important">
                Čtyři cesty. Jeden východ.
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
            "SPRÁVNÁ CESTA. VIDÍŠ SVĚTLO.",
            "success"
        );

        setTimeout(() => {

            closePuzzle();

            refreshRoom();

        }, 1000);

    } else {

        if (typeof playSound === "function") {
            playSound("error");
        }

        showPuzzleMessage(
            "SLEPÁ CHODBA.",
            "error"
        );
    }
}


/* =====================================================
   ROOM 8 — FINÁLE
===================================================== */

function openEscapePuzzle() {

    if (puzzleDone("escape")) {
        return;
    }


    showPuzzle(`

        <div class="story-scene">

            <div class="puzzle-label">
                EXIT
            </div>

            <h2>🚪 HLAVNÍ VÝCHOD</h2>

            <div class="story-text">

                <p>
                    Konečně jsi u hlavního východu.
                </p>

                <p>
                    Položíš ruku na kliku.
                </p>

                <p>
                    Nic.
                </p>

                <p>
                    Na panelu svítí:
                </p>

            </div>

            <div class="terminal-screen">
                INCIDENT 07 — CONFIRM TRUTH
            </div>

            <div class="escape-options">

                <button onclick="escapeAnswer(1)">
                    TECHNICKÁ ZÁVADA
                </button>

                <button onclick="escapeAnswer(2)">
                    INCIDENT BYL UTAJEN
                </button>

                <button onclick="escapeAnswer(3)">
                    NIC SE NESTALO
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
            "ACCESS GRANTED.",
            "success"
        );

        setTimeout(() => {

            closePuzzle();

            showEnding();

        }, 1200);

    } else {

        if (typeof playSound === "function") {
            playSound("error");
        }

        showPuzzleMessage(
            "SYSTÉM ODPOVĚĎ ODMÍTL.",
            "error"
        );
    }
}


/* =====================================================
   PUZZLE OKNO
===================================================== */

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
                    class="secondary-button"
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


/* =====================================================
   ZPRÁVY
===================================================== */

function showPuzzleMessage(
    message,
    type = "normal"
) {

    const ids = [
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


    for (const id of ids) {

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


/* =====================================================
   POUŽITÍ ITEMŮ
===================================================== */

function useItemForPuzzle(itemId) {

    if (!itemId) return false;


    switch (itemId) {

        case "oldID":

            if (typeof setFlag === "function") {
                setFlag("examined_oldID", true);
            }

            inspectOldIDBack();

            return true;


        case "fuse":

            storyMessage(
                "POJISTKA",
                "Je to průmyslová pojistka. Vypadá, že patří do rozvaděče."
            );

            return true;


        case "securityCard":

            storyMessage(
                "BEZPEČNOSTNÍ KARTA",
                "Karta umožňuje přístup k bezpečnostním systémům."
            );

            return true;


        case "chemical":

            storyMessage(
                "AKTIVÁTOR",
                "Neznámá chemická látka. Na lahvičce je stejné logo jako na dokumentech ze SECTOR 07."
            );

            return true;


        case "incidentReport":

            if (typeof setFlag === "function") {
                setFlag("read_incident", true);
            }

            storyMessage(
                "INCIDENT 07",
                "Dokument potvrzuje, že oficiální vysvětlení události nebylo pravdivé."
            );

            return true;


        case "accessToken":

            storyMessage(
                "PŘÍSTUPOVÝ TOKEN",
                "Token je určený pro hlavní systém zařízení."
            );

            return true;


        default:

            return false;
    }
}


/* =====================================================
   OTEVŘENÍ PUZZLU PODLE MÍSTNOSTI
===================================================== */

function openCurrentRoomPuzzle() {

    if (
        typeof currentRoom === "undefined"
    ) {
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

            storyMessage(
                "NIC SE NEDĚJE",
                "V této místnosti zatím není žádná aktivní událost."
            );
    }
}


/* =====================================================
   KONEC HRY
===================================================== */

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
                Dveře se otevřely.
            </p>

            <p>
                Poprvé po dlouhé době vidíš venkovní světlo.
            </p>

            <p>
                Otočíš se.
            </p>

            <p>
                Budova za tebou je stále úplně tichá.
            </p>

            <p class="important">
                Teď už víš, že „technická závada“ byla lež.
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


/* =====================================================
   KOMPATIBILITA
===================================================== */

function updateRoomAfterPuzzle() {

    refreshRoom();

    if (typeof updateMap === "function") {
        updateMap();
    }
}
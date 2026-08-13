/* =========================================
   BLACKOUT — PUZZLES
   Verze kompatibilní s:
   index.html
   game.js
   rooms.js
   inventory.js
   map.js
   settings.js
========================================= */


/* =========================================
   PUZZLE STATE
========================================= */

function puzzleDone(id) {

    if (
        typeof getFlag !== "function"
    ) {
        return false;
    }

    return getFlag(
        "puzzle_" + id
    );

}


function finishPuzzle(id) {

    if (
        typeof setFlag === "function"
    ) {
        setFlag(
            "puzzle_" + id,
            true
        );
    }


    if (
        typeof playSound === "function"
    ) {
        playSound("success");
    }


    if (
        typeof vibrate === "function"
    ) {
        vibrate(100);
    }


    if (
        typeof flashScreen === "function"
    ) {
        flashScreen();
    }


    if (
        typeof renderRoom === "function" &&
        typeof currentRoom !== "undefined"
    ) {

        renderRoom(
            currentRoom
        );

    }


    if (
        typeof updateMap === "function"
    ) {

        updateMap();

    }

}


/* =========================================
   PUZZLE WINDOW
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

                    ZPĚT

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
   PUZZLE MESSAGE
========================================= */

function showPuzzleMessage(
    message,
    type = "normal"
) {

    const possibleMessages = [

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
        let i = 0;
        i < possibleMessages.length;
        i++
    ) {

        const element =
            document.getElementById(
                possibleMessages[i]
            );


        if (element) {

            target = element;

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


/* =========================================
   1. TERMINÁL
   ROOM 1
========================================= */

function openTerminalPuzzle() {

    if (
        puzzleDone("terminal")
    ) {

        showPuzzle(`

            <div class="puzzle">

                <h2>💻 TERMINÁL</h2>

                <p>
                    Terminál je již odemčený.
                </p>

                <div class="puzzle-message success">
                    ✓ PŘÍSTUP POVOLEN
                </div>

            </div>

        `);

        return;

    }


    showPuzzle(`

        <div class="puzzle">

            <h2>💻 STARÝ TERMINÁL</h2>

            <p>
                Obrazovka bliká.
            </p>

            <div class="terminal-text">
                ACCESS REQUIRED
            </div>

            <p>
                Potřebuješ čtyřmístný kód.
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

            <div
                id="terminalMessage">
            </div>

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
       Kód z průkazu:
       4729
    */

    if (code === "4729") {

        finishPuzzle(
            "terminal"
        );


        showPuzzleMessage(
            "PŘÍSTUP POVOLEN. Napájení obnoveno.",
            "success"
        );


        setTimeout(
            function() {

                closePuzzle();

                if (
                    typeof unlockRoom ===
                    "function"
                ) {

                    unlockRoom(
                        "room2"
                    );

                }

            },
            1000
        );


    } else {

        if (
            typeof playSound ===
            "function"
        ) {
            playSound("error");
        }


        if (
            typeof vibrate ===
            "function"
        ) {
            vibrate(180);
        }


        showPuzzleMessage(
            "NESPRÁVNÝ KÓD.",
            "error"
        );


        input.value = "";

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

    if (
        puzzleDone("cables")
    ) {

        showPuzzle(`

            <div class="puzzle">

                <h2>🔌 ROZVADĚČ</h2>

                <div class="puzzle-message success">
                    ✓ NAPÁJENÍ FUNGUJE
                </div>

            </div>

        `);

        return;

    }


    cableSequence = [];


    showPuzzle(`

        <div class="puzzle">

            <h2>🔌 ROZVADĚČ</h2>

            <p>
                Kabely musíš zapojit ve správném pořadí.
            </p>

            <p class="hint">
                Něco ti říká, že pořadí barev
                není náhodné.
            </p>

            <div class="cables">

                <button
                    class="cable red"
                    onclick="
                        connectCable('red')
                    ">

                    🔴 ČERVENÝ

                </button>

                <button
                    class="cable blue"
                    onclick="
                        connectCable('blue')
                    ">

                    🔵 MODRÝ

                </button>

                <button
                    class="cable yellow"
                    onclick="
                        connectCable('yellow')
                    ">

                    🟡 ŽLUTÝ

                </button>

                <button
                    class="cable green"
                    onclick="
                        connectCable('green')
                    ">

                    🟢 ZELENÝ

                </button>

            </div>

            <div
                id="cableProgress">

                0 / 4

            </div>

            <div
                id="cableMessage">
            </div>

        </div>

    `);

}


function connectCable(color) {

    const expected =
        correctCableSequence[
            cableSequence.length
        ];


    if (
        color === expected
    ) {

        cableSequence.push(
            color
        );


        if (
            typeof playSound ===
            "function"
        ) {
            playSound("click");
        }


        if (
            typeof vibrate ===
            "function"
        ) {
            vibrate(40);
        }


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
                "cables"
            );


            showPuzzleMessage(
                "NAPÁJENÍ OBNOVENO.",
                "success"
            );


            setTimeout(
                function() {

                    closePuzzle();

                    if (
                        typeof unlockRoom ===
                        "function"
                    ) {

                        unlockRoom(
                            "room3"
                        );

                    }

                },
                1000
            );

        }

    } else {

        cableSequence = [];


        if (
            typeof playSound ===
            "function"
        ) {
            playSound("error");
        }


        if (
            typeof vibrate ===
            "function"
        ) {
            vibrate(250);
        }


        showPuzzleMessage(
            "ŠPATNĚ! Celé zapojení začíná znovu.",
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

    if (
        puzzleDone("security")
    ) {

        showPuzzle(`

            <div class="puzzle">

                <h2>🚨 BEZPEČNOSTNÍ PANEL</h2>

                <div class="puzzle-message success">
                    ✓ SYSTÉM DEAKTIVOVÁN
                </div>

            </div>

        `);

        return;

    }


    securitySequence = [];


    showPuzzle(`

        <div class="puzzle">

            <h2>🚨 BEZPEČNOSTNÍ PANEL</h2>

            <p>
                Sleduj blikající tlačítka
                a zopakuj jejich pořadí.
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

            <div
                id="securityMessage">
            </div>

        </div>

    `);


    playSecuritySequence();

}


function playSecuritySequence() {

    let index = 0;


    const interval =
        setInterval(
            function() {

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
                    securityCorrect[index]
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
        function() {

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
        number === expected
    ) {

        securitySequence.push(
            number
        );


        if (
            typeof playSound ===
            "function"
        ) {
            playSound("click");
        }


        if (
            securitySequence.length ===
            securityCorrect.length
        ) {

            finishPuzzle(
                "security"
            );


            showPuzzleMessage(
                "BEZPEČNOSTNÍ SYSTÉM DEAKTIVOVÁN.",
                "success"
            );


            setTimeout(
                function() {

                    closePuzzle();

                    if (
                        typeof unlockRoom ===
                        "function"
                    ) {

                        unlockRoom(
                            "room4"
                        );

                    }

                },
                1000
            );

        }

    } else {

        securitySequence = [];


        if (
            typeof playSound ===
            "function"
        ) {
            playSound("error");
        }


        if (
            typeof vibrate ===
            "function"
        ) {
            vibrate(250);
        }


        showPuzzleMessage(
            "CHYBA. Sleduj sekvenci znovu.",
            "error"
        );


        setTimeout(
            function() {

                playSecuritySequence();

            },
            700
        );

    }

}


/* =========================================
   4. LABORATOŘ
   ROOM 4
========================================= */

function openLabPuzzle() {

    if (
        puzzleDone("lab")
    ) {

        showPuzzle(`

            <div class="puzzle">

                <h2>🧪 LABORATOŘ</h2>

                <div class="puzzle-message success">
                    ✓ AKTIVÁTOR NALEZEN
                </div>

            </div>

        `);

        return;

    }


    showPuzzle(`

        <div class="puzzle">

            <h2>🧪 LABORATOŘ</h2>

            <p>
                Jedna z lahviček obsahuje
                aktivátor.
            </p>

            <div class="vials">

                <button
                    onclick="chooseVial(1)">
                    🧪 1
                </button>

                <button
                    onclick="chooseVial(2)">
                    🧪 2
                </button>

                <button
                    onclick="chooseVial(3)">
                    🧪 3
                </button>

                <button
                    onclick="chooseVial(4)">
                    🧪 4
                </button>

            </div>

            <div
                id="vialMessage">
            </div>

        </div>

    `);

}


function chooseVial(number) {

    if (
        number === 3
    ) {

        finishPuzzle(
            "lab"
        );


        if (
            typeof addItem ===
            "function"
        ) {

            addItem(

                "chemical",

                "Aktivátor",

                "Chemická látka z laboratoře.",

                "🧪"

            );

        }


        showPuzzleMessage(
            "SPRÁVNĚ. Aktivátor nalezen.",
            "success"
        );


        setTimeout(
            function() {

                closePuzzle();

                if (
                    typeof unlockRoom ===
                    "function"
                ) {

                    unlockRoom(
                        "room5"
                    );

                }

            },
            1000
        );


    } else {

        if (
            typeof playSound ===
            "function"
        ) {
            playSound("error");
        }


        showPuzzleMessage(
            "ŠPATNÁ LAHVIČKA.",
            "error"
        );

    }

}


/* =========================================
   5. ARCHIV
   ROOM 5
========================================= */

function openArchivePuzzle() {

    if (
        puzzleDone("archive")
    ) {

        showPuzzle(`

            <div class="puzzle">

                <h2>📁 ARCHIV</h2>

                <div class="puzzle-message success">
                    ✓ INCIDENT 07 NALEZEN
                </div>

            </div>

        `);

        return;

    }


    showPuzzle(`

        <div class="puzzle">

            <h2>📁 ARCHIV</h2>

            <p>
                Najdi dokument,
                který souvisí s incidentem.
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

            <div
                id="archiveMessage">
            </div>

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
            "archive"
        );


        if (
            typeof addItem ===
            "function"
        ) {

            addItem(

                "incidentReport",

                "INCIDENT 07",

                "Tajný dokument o událostech v zařízení.",

                "📄"

            );

        }


        showPuzzleMessage(
            "INCIDENT 07 NALEZEN.",
            "success"
        );


        setTimeout(
            function() {

                closePuzzle();

                if (
                    typeof unlockRoom ===
                    "function"
                ) {

                    unlockRoom(
                        "room6"
                    );

                }

            },
            1000
        );


    } else {

        if (
            typeof playSound ===
            "function"
        ) {
            playSound("error");
        }


        showPuzzleMessage(
            "Tento dokument není ten správný.",
            "error"
        );

    }

}


/* =========================================
   6. CONTROL CENTER
   ROOM 6
========================================= */

function openControlPuzzle() {

    if (
        puzzleDone("control")
    ) {

        showPuzzle(`

            <div class="puzzle">

                <h2>💻 CONTROL CENTER</h2>

                <div class="puzzle-message success">
                    ✓ ROOT ACCESS
                </div>

            </div>

        `);

        return;

    }


    showPuzzle(`

        <div class="puzzle">

            <h2>💻 CONTROL CENTER</h2>

            <p>
                Systém požaduje šestimístný kód.
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

            <div
                id="controlMessage">
            </div>

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


    if (
        input.value.trim() ===
        "071209"
    ) {

        finishPuzzle(
            "control"
        );


        showPuzzleMessage(
            "ROOT ACCESS GRANTED.",
            "success"
        );


        setTimeout(
            function() {

                closePuzzle();

                if (
                    typeof unlockRoom ===
                    "function"
                ) {

                    unlockRoom(
                        "room7"
                    );

                }

            },
            1000
        );


    } else {

        if (
            typeof playSound ===
            "function"
        ) {
            playSound("error");
        }


        if (
            typeof vibrate ===
            "function"
        ) {
            vibrate(200);
        }


        showPuzzleMessage(
            "PŘÍSTUP ZAMÍTNUT.",
            "error"
        );


        input.value = "";

    }

}


/* =========================================
   7. TUNEL
   ROOM 7
========================================= */

function openTunnelPuzzle() {

    if (
        puzzleDone("tunnel")
    ) {

        showPuzzle(`

            <div class="puzzle">

                <h2>🚇 PODZEMNÍ TUNEL</h2>

                <div class="puzzle-message success">
                    ✓ CESTA K VÝCHODU NALEZENA
                </div>

            </div>

        `);

        return;

    }


    showPuzzle(`

        <div class="puzzle">

            <h2>🚇 PODZEMNÍ TUNEL</h2>

            <p>
                Před tebou jsou čtyři chodby.
                Jen jedna vede k výstupu.
            </p>

            <div class="tunnel-buttons">

                <button
                    onclick="chooseTunnel(1)">
                    ← A
                </button>

                <button
                    onclick="chooseTunnel(2)">
                    ↑ B
                </button>

                <button
                    onclick="chooseTunnel(3)">
                    → C
                </button>

                <button
                    onclick="chooseTunnel(4)">
                    ↓ D
                </button>

            </div>

            <div
                id="tunnelMessage">
            </div>

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
            "tunnel"
        );


        showPuzzleMessage(
            "SPRÁVNÁ CESTA. Výstup je před tebou.",
            "success"
        );


        setTimeout(
            function() {

                closePuzzle();

                if (
                    typeof unlockRoom ===
                    "function"
                ) {

                    unlockRoom(
                        "room8"
                    );

                }

            },
            1000
        );


    } else {

        if (
            typeof playSound ===
            "function"
        ) {
            playSound("error");
        }


        showPuzzleMessage(
            "SLEPÁ CHODBA.",
            "error"
        );

    }

}


/* =========================================
   8. FINÁLNÍ VÝCHOD
   ROOM 8
========================================= */

function openEscapePuzzle() {

    if (
        puzzleDone("escape")
    ) {

        showPuzzle(`

            <div class="puzzle">

                <h2>🚪 VÝCHOD</h2>

                <div class="puzzle-message success">
                    ✓ DVEŘE ODEMČENY
                </div>

            </div>

        `);

        return;

    }


    showPuzzle(`

        <div class="puzzle">

            <h2>🚪 HLAVNÍ VÝCHOD</h2>

            <p>
                Systém požaduje poslední potvrzení.
            </p>

            <p>
                Co se skutečně stalo?
            </p>

            <div class="escape-options">

                <button
                    onclick="escapeAnswer(1)">

                    Technická závada.

                </button>

                <button
                    onclick="escapeAnswer(2)">

                    INCIDENT 07 byl utajen.

                </button>

                <button
                    onclick="escapeAnswer(3)">

                    Nic se nestalo.

                </button>

            </div>

            <div
                id="escapeMessage">
            </div>

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
            "escape"
        );


        if (
            typeof completeRoom ===
            "function"
        ) {

            completeRoom(
                "room8"
            );

        }


        showPuzzleMessage(
            "PŘÍSTUP POVOLEN.",
            "success"
        );


        setTimeout(
            function() {

                closePuzzle();

                if (
                    typeof showEnding ===
                    "function"
                ) {

                    showEnding();

                }

            },
            1200
        );


    } else {

        if (
            typeof playSound ===
            "function"
        ) {
            playSound("error");
        }


        showPuzzleMessage(
            "SYSTÉM ODPOVĚĎ ODMÍTL.",
            "error"
        );

    }

}


/* =========================================
   INVENTÁŘ → PUZZLE
========================================= */

function useItemForPuzzle(
    itemId
) {

    if (!itemId) {
        return false;
    }


    if (
        itemId === "oldID"
    ) {

        if (
            typeof setFlag ===
            "function"
        ) {

            setFlag(
                "examined_oldID",
                true
            );

        }


        showPuzzle(`

            <div class="puzzle">

                <h2>🪪 STARÝ PRŮKAZ</h2>

                <p>
                    Na zadní straně je vyraženo:
                </p>

                <div class="terminal-text">
                    4729
                </div>

                <p>
                    To by mohl být kód k terminálu.
                </p>

            </div>

        `);


        return true;

    }


    if (
        itemId === "incidentReport"
    ) {

        if (
            typeof setFlag ===
            "function"
        ) {

            setFlag(
                "read_incident",
                true
            );

        }


        showPuzzle(`

            <div class="puzzle">

                <h2>📄 INCIDENT 07</h2>

                <p>
                    Dokument potvrzuje,
                    že incident nebyl obyčejnou
                    technickou závadou.
                </p>

                <div class="puzzle-message error">
                    INCIDENT CLASSIFIED
                </div>

            </div>

        `);


        return true;

    }


    if (
        itemId === "chemical"
    ) {

        showPuzzle(`

            <div class="puzzle">

                <h2>🧪 AKTIVÁTOR</h2>

                <p>
                    Aktivátor je připravený
                    pro použití v laboratoři.
                </p>

            </div>

        `);


        return true;

    }


    return false;

}


/* =========================================
   OTEVŘENÍ PUZZLU PODLE MÍSTNOSTI
========================================= */

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

    }

}

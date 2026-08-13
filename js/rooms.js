/* =========================================
   BLACKOUT — MÍSTNOSTI
========================================= */


/* =========================================
   VYKRESLENÍ MÍSTNOSTI
========================================= */

function renderRoom(roomId) {

    const box =
        document.getElementById(
            "roomContent"
        );

    if (!box) return;


    switch (roomId) {

        case "room1":
            renderRoom1(box);
            break;

        case "room2":
            renderRoom2(box);
            break;

        case "room3":
            renderRoom3(box);
            break;

        case "room4":
            renderRoom4(box);
            break;

        case "room5":
            renderRoom5(box);
            break;

        case "room6":
            renderRoom6(box);
            break;

        case "room7":
            renderRoom7(box);
            break;

        case "room8":
            renderRoom8(box);
            break;

        default:

            box.innerHTML = `
                <h2>CHYBA</h2>
                <p>
                    Tato místnost neexistuje.
                </p>
            `;

    }


    rememberRoom(roomId);

}


/* =========================================
   ROOM 1 — PROBUZENÍ
========================================= */

function renderRoom1(box) {

    box.innerHTML = `

        <div class="room-title">
            PROBUZENÍ
        </div>

        <div class="room-sector">
            SECTOR 01
        </div>


        <div class="room-scene">

            🛏️

            <br>

            MALÁ OBSERVAČNÍ MÍSTNOST

        </div>


        <div class="room-description">

            Probudil ses na kovové posteli.

            <br><br>

            Světla blikají a ze stropu
            je slyšet slabé bzučení.

            <br><br>

            Na stole leží několik
            předmětů.

            <br><br>

            Dveře jsou elektronicky
            zamčené.

        </div>


        <div class="actions">

            <button
                class="action-button"
                onclick="
                    inspectBed()
                ">

                🛏️ Prohlédnout postel

            </button>


            <button
                class="action-button"
                onclick="
                    inspectDesk()
                ">

                🗄️ Prohlédnout stůl

            </button>


            <button
                class="action-button"
                onclick="
                    inspectDoor()
                ">

                🚪 Prohlédnout dveře

            </button>


            <button
                class="action-button"
                onclick="
                    searchRoom1()
                ">

                🔎 Prohledat místnost

            </button>

        </div>


        <div
            id="room1Output"
            class="output">
        </div>

    `;

}


/* =========================================
   POSTEL
========================================= */

function inspectBed() {

    const output =
        document.getElementById(
            "room1Output"
        );


    output.classList.add(
        "show"
    );


    output.innerHTML = `

        Pod matrací je něco schované.

        <br><br>

        Našel jsi:

        <br><br>

        <span class="green">
            🪪 STARÝ PRŮKAZ
        </span>

        <br><br>

        <button
            class="main-button"
            onclick="
                addItem('STARÝ PRŮKAZ')
            ">

            VZÍT

        </button>

    `;

}


/* =========================================
   STŮL
========================================= */

function inspectDesk() {

    const output =
        document.getElementById(
            "room1Output"
        );


    output.classList.add(
        "show"
    );


    output.innerHTML = `

        Na stole leží starý zápisník.

        <br><br>

        Poslední zápis:

        <br><br>

        <span class="yellow">

        „Když zhasnou světla,
        hledej červenou značku.“

        </span>

        <br><br>

        Vedle zápisníku je malý
        kovový předmět.

        <br><br>

        <span class="green">
            🔑 MALÝ KLÍČ
        </span>

        <br><br>

        <button
            class="main-button"
            onclick="
                addItem('MALÝ KLÍČ')
            ">

            VZÍT KLÍČ

        </button>

    `;

}


/* =========================================
   DVEŘE
========================================= */

function inspectDoor() {

    const output =
        document.getElementById(
            "room1Output"
        );


    output.classList.add(
        "show"
    );


    if (
        hasItem("STARÝ PRŮKAZ")
    ) {

        output.innerHTML = `

            Elektronická čtečka
            bliká červeně.

            <br><br>

            Potřebuje přístupový
            čip.

            <br><br>

            Starý průkaz se do ní
            nevejde.

            <br><br>

            <span class="gray">
                Potřebuješ něco jiného.
            </span>

        `;

    } else {

        output.innerHTML = `

            Dveře jsou zamčené.

            <br><br>

            Vedle nich je
            elektronická čtečka.

            <br><br>

            <span class="red">
                PŘÍSTUP ODEPŘEN
            </span>

        `;

    }

}


/* =========================================
   PROHLEDÁNÍ MÍSTNOSTI
========================================= */

function searchRoom1() {

    const output =
        document.getElementById(
            "room1Output"
        );


    output.classList.add(
        "show"
    );


    output.innerHTML = `

        Prohledáváš místnost...

        <br><br>

        Nic dalšího jsi nenašel.

        <br><br>

        Ale všiml sis,
        že na stěně je malá
        <span class="red">
            červená značka.
        </span>

        <br><br>

        Možná bude později
        důležitá.

    `;

}


/* =========================================
   ROOM 2 — TECHNICKÁ MÍSTNOST
========================================= */

function renderRoom2(box) {

    box.innerHTML = `

        <div class="room-title">
            TECHNICKÁ MÍSTNOST
        </div>

        <div class="room-sector">
            SECTOR 02
        </div>


        <div class="room-scene">

            🔌

            <br>

            ELEKTRICKÝ PANEL

        </div>


        <div class="room-description">

            Tady je srdce elektrického
            systému zařízení.

            <br><br>

            Většina systémů je mrtvá.

            <br><br>

            Na zdi je velký panel
            s odpojenými kabely.

        </div>


        <div class="actions">

            <button
                class="action-button"
                onclick="
                    openCablePuzzle()
                ">

                🔌 Zapojit kabely

            </button>


            <button
                class="action-button"
                onclick="
                    searchTechnicalRoom()
                ">

                🔎 Prohledat místnost

            </button>


            <button
                class="action-button"
                onclick="
                    openInventory()
                ">

                🎒 Použít předmět

            </button>

        </div>


        <div
            id="room2Output"
            class="output">
        </div>

    `;

}


/* =========================================
   TECHNICKÁ MÍSTNOST
========================================= */

function searchTechnicalRoom() {

    const output =
        document.getElementById(
            "room2Output"
        );


    output.classList.add(
        "show"
    );


    if (
        !hasItem("ŠROUBOVÁK")
    ) {

        output.innerHTML = `

            Za panelem něco je.

            <br><br>

            Potřeboval bys nástroj,
            kterým bys mohl panel
            otevřít.

            <br><br>

            <span class="yellow">
                Možná šroubovák...
            </span>

        `;

    } else {

        output.innerHTML = `

            Pomocí šroubováku
            otevřeš kryt panelu.

            <br><br>

            Uvnitř je starý dokument.

            <br><br>

            <span class="green">
                📄 TECHNICKÝ PLÁN
            </span>

            <br><br>

            V dokumentu je
            zakresleno několik
            kabelových spojení.

        `;

    }

}


/* =========================================
   ROOM 3 — CHODBA
========================================= */

function renderRoom3(box) {

    box.innerHTML = `

        <div class="room-title">
            BEZPEČNOSTNÍ CHODBA
        </div>

        <div class="room-sector">
            SECTOR 03
        </div>


        <div class="room-scene">

            🚪
            🚨
            🚪

        </div>


        <div class="room-description">

            Dlouhá chodba.

            <br><br>

            Některé bezpečnostní
            kamery stále fungují.

            <br><br>

            Na konci chodby jsou
            dveře označené:

            <br><br>

            <span class="red">
                AUTHORIZED PERSONNEL ONLY
            </span>

        </div>


        <div class="actions">

            <button
                class="action-button"
                onclick="
                    inspectSecurityDoor()
                ">

                🚪 Prohlédnout dveře

            </button>


            <button
                class="action-button"
                onclick="
                    inspectCamera()
                ">

                📹 Prohlédnout kameru

            </button>

        </div>


        <div
            id="room3Output"
            class="output">
        </div>

    `;

}


/* =========================================
   BEZPEČNOSTNÍ DVEŘE
========================================= */

function inspectSecurityDoor() {

    const output =
        document.getElementById(
            "room3Output"
        );


    output.classList.add(
        "show"
    );


    if (
        hasItem("PŘÍSTUPOVÝ ČIP")
    ) {

        output.innerHTML = `

            Čtečka rozpoznala čip.

            <br><br>

            <span class="green">
                PŘÍSTUP POVOLEN
            </span>

            <br><br>

            Dveře vedou
            do laboratoře.

            <br><br>

            <button
                class="main-button"
                onclick="
                    unlockRoom('room4');
                    showRoom('room4')
                ">

                OTEVŘÍT DVEŘE

            </button>

        `;

    } else {

        output.innerHTML = `

            <span class="red">
                PŘÍSTUP ODEPŘEN
            </span>

            <br><br>

            Potřebuješ
            přístupový čip.

        `;

    }

}


/* =========================================
   KAMERA
========================================= */

function inspectCamera() {

    const output =
        document.getElementById(
            "room3Output"
        );


    output.classList.add(
        "show"
    );


    output.innerHTML = `

        Kamera tě sleduje.

        <br><br>

        Na jejím krytu je
        vyrytý symbol:

        <br><br>

        <span class="yellow">
            △ 07 △
        </span>

        <br><br>

        Možná budeš tento symbol
        potřebovat později.

    `;

}


/* =========================================
   ROOM 4 — LABORATOŘ
========================================= */

function renderRoom4(box) {

    box.innerHTML = `

        <div class="room-title">
            LABORATOŘ
        </div>

        <div class="room-sector">
            SECTOR 04
        </div>


        <div class="room-scene">

            🧪
            💻
            🧬

        </div>


        <div class="room-description">

            Regály jsou plné
            zaprášených vzorků.

            <br><br>

            Uprostřed místnosti
            stojí počítač.

            <br><br>

            Na stole je také
            malá UV svítilna.

        </div>


        <div class="actions">

            <button
                class="action-button"
                onclick="
                    takeUV()
                ">

                🔦 Vzít UV svítilnu

            </button>


            <button
                class="action-button"
                onclick="
                    inspectComputer()
                ">

                💻 Prohlédnout počítač

            </button>


            <button
                class="action-button"
                onclick="
                    searchLab()
                ">

                🔎 Prohledat laboratoř

            </button>

        </div>


        <div
            id="room4Output"
            class="output">
        </div>

    `;

}


/* =========================================
   UV SVÍTILNA
========================================= */

function takeUV() {

    if (
        hasItem("UV SVÍTILNA")
    ) {

        return;

    }


    addItem(
        "UV SVÍTILNA"
    );


    const output =
        document.getElementById(
            "room4Output"
        );


    output.classList.add(
        "show"
    );


    output.innerHTML = `

        🔦 Vzal jsi UV svítilnu.

        <br><br>

        Možná odhalí něco,
        co normální světlo
        neukáže.

    `;

}


/* =========================================
   POČÍTAČ
========================================= */

function inspectComputer() {

    const output =
        document.getElementById(
            "room4Output"
        );


    output.classList.add(
        "show"
    );


    output.innerHTML = `

        Počítač vyžaduje
        přístupový kód.

        <br><br>

        Na obrazovce je pouze:

        <br><br>

        <span class="green">
            ENTER ACCESS CODE
        </span>

        <br><br>

        <button
            class="main-button"
            onclick="
                openCodePuzzle(
                    'LABORATORNÍ TERMINÁL',
                    4,
                    '0427'
                )
            ">

            ZADAT KÓD

        </button>

    `;

}


/* =========================================
   PROHLEDÁNÍ LABORATOŘE
========================================= */

function searchLab() {

    const output =
        document.getElementById(
            "room4Output"
        );


    output.classList.add(
        "show"
    );


    if (
        hasItem("UV SVÍTILNA")
    ) {

        output.innerHTML = `

            Posvítíš UV světlem
            na stěnu.

            <br><br>

            Objeví se skrytý nápis:

            <br><br>

            <span class="yellow">
                04 — 27
            </span>

            <br><br>

            To může být kód
            k počítači.

        `;

    } else {

        output.innerHTML = `

            Nic zvláštního nevidíš.

            <br><br>

            Na stěně jsou jen
            staré skvrny.

        `;

    }

}


/* =========================================
   ROOM 5 — ARCHIV
========================================= */

function renderRoom5(box) {

    box.innerHTML = `

        <div class="room-title">
            ARCHIV
        </div>

        <div class="room-sector">
            SECTOR 05
        </div>


        <div class="room-scene">

            📁
            🗄️
            📄

        </div>


        <div class="room-description">

            Police jsou plné
            dokumentů.

            <br><br>

            Některé spisy jsou
            označené červenou barvou.

        </div>


        <div class="actions">

            <button
                class="action-button"
                onclick="
                    searchArchive()
                ">

                📁 Hledat dokumenty

            </button>

        </div>


        <div
            id="room5Output"
            class="output">
        </div>

    `;

}


function searchArchive() {

    const output =
        document.getElementById(
            "room5Output"
        );


    output.classList.add(
        "show"
    );


    output.innerHTML = `

        Našel jsi starý spis.

        <br><br>

        <span class="red">
            INCIDENT 07
        </span>

        <br><br>

        Dokument uvádí,
        že v roce 2009
        nedošlo k technické
        závadě.

        <br><br>

        Celé zařízení bylo
        uzavřeno kvůli
        experimentu.

        <br><br>

        <span class="yellow">
            Experiment nebyl nikdy
            oficiálně ukončen.
        </span>

    `;

}


/* =========================================
   ROOM 6 — KONTROLNÍ CENTRUM
========================================= */

function renderRoom6(box) {

    box.innerHTML = `

        <div class="room-title">
            KONTROLNÍ CENTRUM
        </div>

        <div class="room-sector">
            SECTOR 06
        </div>


        <div class="room-scene">

            💻
            📡
            🚨

        </div>


        <div class="room-description">

            Obrovská obrazovka
            pokrývá celou stěnu.

            <br><br>

            Některé systémy jsou
            stále aktivní.

        </div>


        <div class="actions">

            <button
                class="action-button"
                onclick="
                    inspectControl()
                ">

                💻 Aktivovat terminál

            </button>

        </div>


        <div
            id="room6Output"
            class="output">
        </div>

    `;

}


function inspectControl() {

    const output =
        document.getElementById(
            "room6Output"
        );


    output.classList.add(
        "show"
    );


    output.innerHTML = `

        Terminál se zapnul.

        <br><br>

        Na obrazovce se objeví:

        <br><br>

        <span class="red">

            SUBJECT STATUS:
            UNKNOWN

        </span>

        <br><br>

        Potom systém zobrazí:

        <br><br>

        <span class="yellow">

            „NĚKDO JE STÁLE UVNITŘ.“

        </span>

    `;

}


/* =========================================
   ROOM 7 — TUNEL
========================================= */

function renderRoom7(box) {

    box.innerHTML = `

        <div class="room-title">
            PODZEMNÍ TUNEL
        </div>

        <div class="room-sector">
            SECTOR 07
        </div>


        <div class="room-scene">

            🚇
            💡
            🌑

        </div>


        <div class="room-description">

            Úzký tunel vede hluboko
            pod zařízením.

            <br><br>

            Na konci vidíš slabé
            světlo.

        </div>


        <div class="actions">

            <button
                class="action-button"
                onclick="
                    exploreTunnel()
                ">

                🚶 Jít dál

            </button>

        </div>


        <div
            id="room7Output"
            class="output">
        </div>

    `;

}


function exploreTunnel() {

    const output =
        document.getElementById(
            "room7Output"
        );


    output.classList.add(
        "show"
    );


    output.innerHTML = `

        Jdeš tunelem.

        <br><br>

        Po několika metrech
        najdeš kovové dveře.

        <br><br>

        Nad nimi je nápis:

        <br><br>

        <span class="green">
            EMERGENCY EXIT
        </span>

        <br><br>

        Možná jsi konečně
        našel cestu ven.

    `;

}


/* =========================================
   ROOM 8 — VÝSTUP
========================================= */

function renderRoom8(box) {

    box.innerHTML = `

        <div class="room-title">
            VÝSTUP
        </div>

        <div class="room-sector">
            EMERGENCY EXIT
        </div>


        <div class="room-scene">

            🚨
            🚪
            🌌

        </div>


        <div class="room-description">

            Stojíš před posledními
            dveřmi.

            <br><br>

            Za nimi je venkovní
            prostor.

            <br><br>

            Ale dveře stále
            potřebují poslední
            autorizaci.

        </div>


        <div class="actions">

            <button
                class="action-button"
                onclick="
                    finalDoor()
                ">

                🚪 Otevřít dveře

            </button>

        </div>


        <div
            id="room8Output"
            class="output">
        </div>

    `;

}


/* =========================================
   FINÁLNÍ DVEŘE
========================================= */

function finalDoor() {

    const output =
        document.getElementById(
            "room8Output"
        );


    output.classList.add(
        "show"
    );


    output.innerHTML = `

        <span class="green">

            AUTORIZACE POTVRZENA

        </span>

        <br><br>

        Dveře se pomalu otevřou.

        <br><br>

        Do místnosti pronikne
        studený noční vzduch.

        <br><br>

        <span class="yellow">

            DOKÁZAL JSI UTÉCT.

        </span>

    `;


    completeRoom(
        "room8"
    );

    playSound(
        "success"
    );

    flashScreen();

}


/* =========================================
   ZÁKLADNÍ INTERAKCE
========================================= */

function showMessage(
    elementId,
    message
) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element) return;

    element.classList.add(
        "show"
    );

    element.innerHTML =
        message;

}

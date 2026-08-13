/* =========================================
   BLACKOUT — MINIHry A PUZZLE
========================================= */


/* =========================================
   KABELY
========================================= */

let cablePuzzle = {

    solved: false,

    /*
       Správné řešení zatím zůstává
       schované v tomto souboru.

       Červený  → C
       Modrý    → A
       Žlutý    → D
       Zelený   → B
    */

    solution: {
        red: "C",
        blue: "A",
        yellow: "D",
        green: "B"
    }

};


/* =========================================
   OTEVŘENÍ KABELOVÉ HRY
========================================= */

function openCablePuzzle() {

    const modal =
        document.getElementById(
            "cableModal"
        );

    if (!modal) {

        createCableModal();

    }

    document
        .getElementById("cableModal")
        .classList.add("show");

}


/* =========================================
   ZAVŘENÍ KABELOVÉ HRY
========================================= */

function closeCablePuzzle() {

    const modal =
        document.getElementById(
            "cableModal"
        );

    if (modal) {

        modal.classList.remove("show");

    }

}


/* =========================================
   VYTVOŘENÍ KABELOVÉHO PUZZLE
========================================= */

function createCableModal() {

    const modal =
        document.createElement("div");

    modal.id =
        "cableModal";

    modal.className =
        "modal";


    modal.innerHTML = `

        <div class="modal-box">

            <h2>
                🔌 OBNOVENÍ NAPÁJENÍ
            </h2>

            <p>
                Čtyři kabely musí být
                připojeny ke správným
                terminálům.
            </p>

            <p class="yellow">
                Najdi stopy v místnosti
                a zjisti správnou kombinaci.
            </p>


            <div class="cable-row">

                <span class="red">
                    🔴 ČERVENÝ
                </span>

                <select id="cableRed">

                    <option value="">
                        ---
                    </option>

                    <option value="A">
                        A
                    </option>

                    <option value="B">
                        B
                    </option>

                    <option value="C">
                        C
                    </option>

                    <option value="D">
                        D
                    </option>

                </select>

            </div>


            <div class="cable-row">

                <span class="blue">
                    🔵 MODRÝ
                </span>

                <select id="cableBlue">

                    <option value="">
                        ---
                    </option>

                    <option value="A">
                        A
                    </option>

                    <option value="B">
                        B
                    </option>

                    <option value="C">
                        C
                    </option>

                    <option value="D">
                        D
                    </option>

                </select>

            </div>


            <div class="cable-row">

                <span class="yellow">
                    🟡 ŽLUTÝ
                </span>

                <select id="cableYellow">

                    <option value="">
                        ---
                    </option>

                    <option value="A">
                        A
                    </option>

                    <option value="B">
                        B
                    </option>

                    <option value="C">
                        C
                    </option>

                    <option value="D">
                        D
                    </option>

                </select>

            </div>


            <div class="cable-row">

                <span class="green">
                    🟢 ZELENÝ
                </span>

                <select id="cableGreen">

                    <option value="">
                        ---
                    </option>

                    <option value="A">
                        A
                    </option>

                    <option value="B">
                        B
                    </option>

                    <option value="C">
                        C
                    </option>

                    <option value="D">
                        D
                    </option>

                </select>

            </div>


            <button
                class="main-button"
                onclick="checkCablePuzzle()">

                ⚡ ZAPOJIT

            </button>


            <div
                id="cableResult"
                class="output">
            </div>


            <button
                class="main-button"
                onclick="closeCablePuzzle()">

                ZPĚT

            </button>

        </div>

    `;


    document.body.appendChild(modal);

}


/* =========================================
   KONTROLA KABELŮ
========================================= */

function checkCablePuzzle() {

    const red =
        document.getElementById(
            "cableRed"
        ).value;

    const blue =
        document.getElementById(
            "cableBlue"
        ).value;

    const yellow =
        document.getElementById(
            "cableYellow"
        ).value;

    const green =
        document.getElementById(
            "cableGreen"
        ).value;


    const result =
        document.getElementById(
            "cableResult"
        );


    if (
        red === cablePuzzle.solution.red &&
        blue === cablePuzzle.solution.blue &&
        yellow === cablePuzzle.solution.yellow &&
        green === cablePuzzle.solution.green
    ) {

        cablePuzzle.solved = true;

        setFlag(
            "powerRestored",
            true
        );


        addItem(
            "PŘÍSTUPOVÝ ČIP"
        );


        result.classList.add(
            "show"
        );


        result.innerHTML = `

            <div class="green">

                ⚡ NAPÁJENÍ OBNOVENO

            </div>

            <br>

            Celá technická místnost
            se rozsvítila.

            <br><br>

            Z panelu vyskočil
            malý přístupový čip.

        `;


        playSound(
            "success"
        );

        vibrate(100);

        flashScreen();


        completeRoom(
            "room2"
        );


        unlockRoom(
            "room3"
        );


        setTimeout(() => {

            closeCablePuzzle();

            showRoom(
                "room2"
            );

        }, 1200);


        return;

    }


    /* =====================================
       ŠPATNÉ ŘEŠENÍ
    ===================================== */

    result.classList.add(
        "show"
    );


    result.innerHTML = `

        <div class="red">

            ❌ ŠPATNÉ ZAPOJENÍ

        </div>

        <br>

        Ozvala se elektrická rána.

        <br><br>

        <span class="yellow">

            Ochrana systému odpojila
            napájení.

        </span>

        <br><br>

        Zkontroluj znovu všechny
        stopy v místnosti.

    `;


    playSound(
        "error"
    );

    vibrate(180);

    flashScreen();

}


/* =========================================
   NÁPOVĚDY
========================================= */

let cableHintLevel = 0;


function getCableHint() {

    cableHintLevel++;

    if (
        cableHintLevel > 3
    ) {

        cableHintLevel = 3;

    }


    let hint = "";


    if (
        cableHintLevel === 1
    ) {

        hint = `
            🔎 <b>Nápověda 1</b>
            <br><br>
            Nehledej řešení pouze
            u samotného panelu.
            Prohlédni celou místnost.
        `;

    }


    if (
        cableHintLevel === 2
    ) {

        hint = `
            🔎 <b>Nápověda 2</b>
            <br><br>
            UV světlo může odhalit
            něco, co normálně nevidíš.
        `;

    }


    if (
        cableHintLevel === 3
    ) {

        hint = `
            🔎 <b>Nápověda 3</b>
            <br><br>
            Skrytá sekvence je:
            <br><br>

            <span class="yellow">
                C → A → D → B
            </span>

            <br><br>

            Teď ji musíš správně
            přiřadit ke kabelům.
        `;

    }


    const result =
        document.getElementById(
            "cableResult"
        );


    if (result) {

        result.classList.add(
            "show"
        );

        result.innerHTML =
            hint;

    }

}


/* =========================================
   DALŠÍ MINIHRY
========================================= */


/*
   Tady později přidáme:

   🔢 KÓDOVÝ ZÁMEK
   🧠 PAMĚŤOVOU HÁDANKU
   💻 TERMINÁL
   🔐 ELEKTRONICKÝ ZÁMEK
   📻 RÁDIO
   🔦 UV PUZZLE
   🧩 LOGICKÉ PUZZLE
   🕐 ČASOVOU HÁDANKU
*/


/* =========================================
   KÓDOVÝ ZÁMEK — ZÁKLAD
========================================= */

function openCodePuzzle(
    title = "KÓDOVÝ ZÁMEK",
    length = 4,
    correctCode = "0427"
) {

    const modal =
        document.createElement(
            "div"
        );

    modal.className =
        "modal";

    modal.id =
        "codePuzzleModal";


    let inputs = "";

    for (
        let i = 0;
        i < length;
        i++
    ) {

        inputs += `

            <input
                id="code${i}"
                type="number"
                min="0"
                max="9"
                inputmode="numeric"
                class="code-input"
                placeholder="•"
            >

        `;

    }


    modal.innerHTML = `

        <div class="modal-box">

            <h2>
                🔐 ${title}
            </h2>

            <p>
                Zadej nalezený kód.
            </p>

            <div class="code-inputs">

                ${inputs}

            </div>


            <button
                class="main-button"
                onclick="checkCodePuzzle(
                    '${correctCode}',
                    ${length}
                )">

                ODEMKNOUT

            </button>


            <div
                id="codeResult"
                class="output">
            </div>


            <button
                class="main-button"
                onclick="
                    document
                    .getElementById(
                        'codePuzzleModal'
                    )
                    .remove()
                ">

                ZPĚT

            </button>

        </div>

    `;


    document.body.appendChild(
        modal
    );

    modal.classList.add(
        "show"
    );

}


/* =========================================
   KONTROLA KÓDU
========================================= */

function checkCodePuzzle(
    correctCode,
    length
) {

    let entered = "";


    for (
        let i = 0;
        i < length;
        i++
    ) {

        const input =
            document.getElementById(
                "code" + i
            );

        entered +=
            input.value;

    }


    const result =
        document.getElementById(
            "codeResult"
        );


    if (
        entered === correctCode
    ) {

        result.classList.add(
            "show"
        );

        result.innerHTML = `

            <span class="green">

                ✓ SPRÁVNÝ KÓD

            </span>

            <br><br>

            Zámek se odemkl.

        `;


        playSound(
            "success"
        );

        vibrate(70);

        flashScreen();

    } else {

        result.classList.add(
            "show"
        );

        result.innerHTML = `

            <span class="red">

                ✕ NESPRÁVNÝ KÓD

            </span>

            <br><br>

            Zkus najít další stopu.

        `;


        playSound(
            "error"
        );

        vibrate(120);

    }

}

/* =========================================================
   BLACKOUT — INVENTORY SYSTEM v3
========================================================= */


/* =========================================================
   KONSTANTY
========================================================= */

const INVENTORY_STORAGE = "BLACKOUT_INVENTORY";
const INVENTORY_FLAGS = "BLACKOUT_INV_FLAGS";


/* =========================================================
   INVENTÁŘ
========================================================= */

let inventory = [];


/* =========================================================
   NAČTENÍ
========================================================= */

function loadInventory() {

    const saved =
        localStorage.getItem(
            INVENTORY_STORAGE
        );

    if (!saved) {

        inventory = [];

        return;

    }

    try {

        const data =
            JSON.parse(saved);

        if (Array.isArray(data)) {

            inventory = data;

        } else {

            inventory = [];

        }

    } catch (error) {

        console.error(
            "BLACKOUT inventory load error:",
            error
        );

        inventory = [];

    }

}


/* =========================================================
   ULOŽENÍ
========================================================= */

function saveInventory() {

    localStorage.setItem(
        INVENTORY_STORAGE,
        JSON.stringify(inventory)
    );

}


/* =========================================================
   POČET PŘEDMĚTŮ
========================================================= */

function inventoryCount() {

    return inventory.length;

}


/* =========================================================
   EXISTUJE PŘEDMĚT?
========================================================= */

function hasItem(itemId) {

    return inventory.some(
        item =>
            item.id === itemId
    );

}


/* =========================================================
   ZÍSKÁNÍ PŘEDMĚTU
========================================================= */

function getItem(itemId) {

    return inventory.find(
        item =>
            item.id === itemId
    );

}


/* =========================================================
   PŘIDÁNÍ PŘEDMĚTU
========================================================= */

function addItem(
    id,
    name,
    description = "",
    icon = "📦"
) {

    if (!id) {
        return false;
    }


    /*
       Zabráníme duplicitám.
    */

    if (hasItem(id)) {

        return false;

    }


    inventory.push({

        id: id,

        name: name,

        description: description,

        icon: icon,

        examined: false

    });


    saveInventory();


    if (
        typeof renderInventory ===
        "function"
    ) {

        renderInventory();

    }


    if (
        typeof updateUI ===
        "function"
    ) {

        updateUI();

    }


    return true;

}


/* =========================================================
   ODSTRANĚNÍ PŘEDMĚTU
========================================================= */

function removeItem(itemId) {

    const before =
        inventory.length;


    inventory =
        inventory.filter(
            item =>
                item.id !== itemId
        );


    if (
        inventory.length !==
        before
    ) {

        saveInventory();

        renderInventory();

        updateUI();

        return true;

    }


    return false;

}


/* =========================================================
   OTEVŘENÍ INVENTÁŘE
========================================================= */

function openInventory() {

    loadInventory();

    renderInventory();


    const modal =
        document.getElementById(
            "inventoryModal"
        );


    if (!modal) {
        return;
    }


    modal.style.display =
        "flex";

    modal.classList.add(
        "show"
    );


    if (
        typeof playSound ===
        "function"
    ) {

        playSound(
            "click"
        );

    }

}


/* =========================================================
   ZAVŘENÍ INVENTÁŘE
========================================================= */

function closeInventory() {

    const modal =
        document.getElementById(
            "inventoryModal"
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
   VYKRESLENÍ INVENTÁŘE
========================================================= */

function renderInventory() {

    const container =
        document.getElementById(
            "inventoryContent"
        );


    if (!container) {
        return;
    }


    if (
        !Array.isArray(
            inventory
        )
    ) {

        inventory = [];

    }


    if (
        inventory.length ===
        0
    ) {

        container.innerHTML = `

            <div class="empty-inventory">

                <div class="empty-icon">
                    🎒
                </div>

                <h3>
                    INVENTÁŘ JE PRÁZDNÝ
                </h3>

                <p>
                    Zatím u sebe nic nemáš.
                </p>

            </div>

        `;

        return;

    }


    let html = "";


    inventory.forEach(
        item => {

            html += `

                <div
                    class="inventory-item"
                    data-item-id="${item.id}"
                >

                    <div class="inventory-icon">
                        ${item.icon}
                    </div>

                    <div class="inventory-info">

                        <strong>
                            ${item.name}
                        </strong>

                        <small>
                            ${
                                item.examined
                                ? "PROZKOUMÁNO"
                                : "NEPROZKOUMÁNO"
                            }
                        </small>

                    </div>

                    <button
                        class="take-button"
                        onclick="
                            examineItem(
                                '${item.id}'
                            )
                        "
                    >
                        🔎
                    </button>

                </div>

            `;

        }
    );


    container.innerHTML =
        html;

}


/* =========================================================
   PROZKOUMÁNÍ
========================================================= */

function examineItem(itemId) {

    const item =
        getItem(itemId);


    if (!item) {

        showInventoryMessage(
            "Tento předmět už v inventáři není.",
            "error"
        );

        return;

    }


    item.examined =
        true;


    saveInventory();


    showItemDetail(
        itemId
    );

}


/* =========================================================
   DETAIL PŘEDMĚTU
========================================================= */

function showItemDetail(itemId) {

    const item =
        getItem(itemId);


    if (!item) {
        return;
    }


    let html = "";


    switch (
        itemId
    ) {


        /* =================================================
           STARÝ PRŮKAZ
        ================================================= */

        case "oldID":

            html = `

                <div class="item-detail">

                    <div class="item-big-icon">
                        🪪
                    </div>

                    <div class="sector">
                        SECTOR 01 / PERSONNEL
                    </div>

                    <h2>
                        STARÝ ZAMĚSTNANECKÝ PRŮKAZ
                    </h2>

                    <p>
                        Plast je popraskaný.
                        Fotografie je téměř
                        úplně vybledlá.
                    </p>

                    <div class="clue-box">

                        <strong>
                            PŘEDNÍ STRANA
                        </strong>

                        <p>
                            EMPLOYEE
                            <br>
                            ███████████
                        </p>

                        <p>
                            DEPARTMENT
                            <br>
                            TECHNICAL
                        </p>

                        <p>
                            VALID
                            <br>
                            2009
                        </p>

                        <p>
                            EMPLOYEE ID
                            <br>
                            4█29
                        </p>

                    </div>

                    <p class="hint">
                        Jeden znak na průkazu
                        je poškozený.
                    </p>

                    <button
                        class="secondary-button"
                        onclick="
                            turnOldID()
                        "
                    >

                        🔄 OTOČIT PRŮKAZ

                    </button>

                </div>

            `;

            break;


        /* =================================================
           POJISTKA
        ================================================= */

        case "fuse":

            html = `

                <div class="item-detail">

                    <div class="item-big-icon">
                        🔋
                    </div>

                    <div class="sector">
                        TECHNICAL
                    </div>

                    <h2>
                        PRŮMYSLOVÁ POJISTKA
                    </h2>

                    <p>
                        Těžká keramická pojistka.
                        Na kovové části je staré
                        označení.
                    </p>

                    <div class="clue-box">

                        PWR
                        <strong>
                            -02
                        </strong>

                    </div>

                    <p class="hint">
                        Mohla by patřit
                        do některého rozvaděče.
                    </p>

                </div>

            `;

            break;


        /* =================================================
           BEZPEČNOSTNÍ KARTA
        ================================================= */

        case "securityCard":

            html = `

                <div class="item-detail">

                    <div class="item-big-icon">
                        💳
                    </div>

                    <div class="sector">
                        SECURITY
                    </div>

                    <h2>
                        BEZPEČNOSTNÍ KARTA
                    </h2>

                    <p>
                        Karta zaměstnance
                        bezpečnostního oddělení.
                    </p>

                    <div class="clue-box">

                        ACCESS LEVEL
                        <br>

                        <strong>
                            03
                        </strong>

                    </div>

                    <p class="hint">
                        Magnetický proužek
                        nevypadá poškozeně.
                    </p>

                </div>

            `;

            break;


        /* =================================================
           AKTIVÁTOR
        ================================================= */

        case "chemical":

            html = `

                <div class="item-detail">

                    <div class="item-big-icon">
                        🧪
                    </div>

                    <div class="sector">
                        LABORATORY
                    </div>

                    <h2>
                        AKTIVÁTOR
                    </h2>

                    <p>
                        Malá laboratorní lahvička.
                        Kapalina uvnitř je čirá.
                    </p>

                    <div class="clue-box">

                        LABEL:
                        <strong>
                            SUBJECT 07
                        </strong>

                        <br><br>

                        HANDLE WITH CARE

                    </div>

                </div>

            `;

            break;


        /* =================================================
           INCIDENT 07
        ================================================= */

        case "incidentReport":

            html = `

                <div class="item-detail">

                    <div class="item-big-icon">
                        📄
                    </div>

                    <div class="sector">
                        CLASSIFIED
                    </div>

                    <h2>
                        INCIDENT 07
                    </h2>

                    <p>
                        Dokument je starý,
                        ale někdo ho otevřel
                        krátce před tebou.
                    </p>

                    <div class="terminal-text">

                        INCIDENT 07
                        <br>
                        DATE: 12 / 09
                        <br>
                        STATUS: CLASSIFIED

                    </div>

                    <p class="important">
                        SUBJECT WAS NOT SUPPOSED
                        TO SURVIVE.
                    </p>

                </div>

            `;

            break;


        /* =================================================
           PŘÍSTUPOVÝ TOKEN
        ================================================= */

        case "accessToken":

            html = `

                <div class="item-detail">

                    <div class="item-big-icon">
                        🔑
                    </div>

                    <div class="sector">
                        CONTROL CENTER
                    </div>

                    <h2>
                        PŘÍSTUPOVÝ TOKEN
                    </h2>

                    <p>
                        Malé elektronické zařízení
                        používané zaměstnanci
                        s vysokým oprávněním.
                    </p>

                    <div class="clue-box">

                        ACCESS
                        <br>

                        <strong>
                            ROOT
                        </strong>

                    </div>

                </div>

            `;

            break;


        /* =================================================
           OSTATNÍ
        ================================================= */

        default:

            html = `

                <div class="item-detail">

                    <div class="item-big-icon">
                        ${item.icon}
                    </div>

                    <h2>
                        ${item.name}
                    </h2>

                    <p>
                        ${item.description}
                    </p>

                </div>

            `;

            break;

    }


    openInventoryDetail(
        html
    );

}


/* =========================================================
   STARÝ PRŮKAZ — ZADNÍ STRANA
========================================================= */

function turnOldID() {

    setInventoryFlag(
        "oldID_rear_seen",
        true
    );


    openInventoryDetail(`

        <div class="item-detail">

            <div class="item-big-icon">
                🪪
            </div>

            <div class="sector">
                SECTOR 01 / REVERSE
            </div>

            <h2>
                ZADNÍ STRANA
            </h2>

            <p>
                Zadní strana je špinavá
                a místy odřená.
            </p>

            <div class="clue-box">

                <div class="damaged-text">
                    INCID█NT: █7
                </div>

                <div class="damaged-text">
                    DATE:
                    1█ / 0█
                </div>

                <div class="damaged-text">
                    AUTH:
                    █7
                </div>

                <div class="damaged-text">
                    SERIAL:
                    4█29
                </div>

            </div>

            <p>
                Některé číslice jsou
                poškozené nebo zakryté.
            </p>

            <p class="hint">
                Několik údajů se opakuje.
                Možná z nich dokážeš
                něco odvodit.
            </p>

            <button
                class="main-button"
                onclick="
                    closeInventoryDetail()
                "
            >

                ZPĚT

            </button>

        </div>

    `);

}


/* =========================================================
   DETAIL MODAL
========================================================= */

function openInventoryDetail(
    content
) {

    let modal =
        document.getElementById(
            "inventoryDetailModal"
        );


    if (!modal) {

        modal =
            document.createElement(
                "div"
            );

        modal.id =
            "inventoryDetailModal";

        modal.className =
            "modal";


        modal.innerHTML = `

            <div class="modal-box">

                <div
                    id="inventoryDetailContent"
                ></div>

                <button
                    class="main-button"
                    onclick="
                        closeInventoryDetail()
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
            "inventoryDetailContent"
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


/* =========================================================
   ZAVŘÍT DETAIL
========================================================= */

function closeInventoryDetail() {

    const modal =
        document.getElementById(
            "inventoryDetailModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );

    modal.style.display =
        "none";


    renderInventory();

}


/* =========================================================
   FLAGY INVENTÁŘE
========================================================= */

function loadInventoryFlags() {

    const saved =
        localStorage.getItem(
            INVENTORY_FLAGS
        );


    if (!saved) {

        return {};

    }


    try {

        return JSON.parse(
            saved
        );

    } catch {

        return {};

    }

}


function saveInventoryFlags(
    flags
) {

    localStorage.setItem(
        INVENTORY_FLAGS,
        JSON.stringify(
            flags
        )
    );

}


function setInventoryFlag(
    id,
    value = true
) {

    const flags =
        loadInventoryFlags();


    flags[id] =
        value;


    saveInventoryFlags(
        flags
    );

}


function getInventoryFlag(
    id
) {

    const flags =
        loadInventoryFlags();


    return flags[id] === true;

}


/* =========================================================
   ZPRÁVA
========================================================= */

function showInventoryMessage(
    message,
    type = "normal"
) {

    const box =
        document.getElementById(
            "inventoryMessage"
        );


    if (!box) {

        return;

    }


    box.className =
        "inventory-message " +
        type;


    box.textContent =
        message;

}


/* =========================================================
   POUŽITÍ PŘEDMĚTU
========================================================= */

function useInventoryItem(
    itemId
) {

    const item =
        getItem(
            itemId
        );


    if (!item) {

        showInventoryMessage(
            "Tento předmět nemáš.",
            "error"
        );

        return false;

    }


    if (
        typeof useItemForPuzzle ===
        "function"
    ) {

        const result =
            useItemForPuzzle(
                itemId
            );


        if (result === true) {

            return true;

        }

    }


    showInventoryMessage(
        "Tento předmět se tady nedá použít.",
        "normal"
    );


    return false;

}


/* =========================================================
   RESET INVENTÁŘE
========================================================= */

function resetInventory() {

    inventory = [];


    localStorage.removeItem(
        INVENTORY_STORAGE
    );


    localStorage.removeItem(
        INVENTORY_FLAGS
    );


    /*
       Synchronizace s místnostmi.
    */

    localStorage.removeItem(
        "BLACKOUT_ROOM_ITEMS"
    );


    if (
        typeof collectedItems !==
        "undefined"
    ) {

        collectedItems = [];

    }


    renderInventory();

    updateUI();


    if (
        typeof loadRoomItems ===
        "function"
    ) {

        loadRoomItems();

    }


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

}


/* =========================================================
   KOMPLETNÍ RESET
========================================================= */

function resetBlackoutInventory() {

    resetInventory();


    /*
       Puzzle postup
    */

    Object.keys(
        localStorage
    ).forEach(
        key => {

            if (
                key.startsWith(
                    "BLACKOUT_PUZZLE_"
                )
            ) {

                localStorage.removeItem(
                    key
                );

            }

        }
    );


    /*
       Staré flagy.
    */

    Object.keys(
        localStorage
    ).forEach(
        key => {

            if (
                key.startsWith(
                    "BLACKOUT_INV_FLAG_"
                )
            ) {

                localStorage.removeItem(
                    key
                );

            }

        }
    );


    console.log(
        "BLACKOUT inventory reset complete."
    );

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadInventory();

        renderInventory();

        updateUI();

    }
);

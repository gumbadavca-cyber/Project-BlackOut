/* =========================================================
   BLACKOUT — INVENTORY SYSTEM v2
   Inventář + prohlížení předmětů + reset postupu
========================================================= */


/* =========================================================
   DATA INVENTÁŘE
========================================================= */

let inventory = [];


/* =========================================================
   ÚLOŽIŠTĚ
========================================================= */

const INVENTORY_STORAGE =
    "BLACKOUT_INVENTORY";


/* =========================================================
   NAČTENÍ INVENTÁŘE
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

    } catch {

        inventory = [];

    }
}


/* =========================================================
   ULOŽENÍ INVENTÁŘE
========================================================= */

function saveInventory() {

    localStorage.setItem(
        INVENTORY_STORAGE,
        JSON.stringify(inventory)
    );

}


/* =========================================================
   MÁ HRÁČ PŘEDMĚT?
========================================================= */

function hasItem(itemId) {

    return inventory.some(
        item => item.id === itemId
    );

}


/* =========================================================
   ZÍSKÁNÍ PŘEDMĚTU
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


    if (hasItem(id)) {

        return false;

    }


    inventory.push({

        id: id,

        name: name,

        description: description,

        icon: icon,

        examined: false,

        state: {}

    });


    saveInventory();

    renderInventory();

    return true;
}


/* =========================================================
   ODSTRANĚNÍ PŘEDMĚTU
========================================================= */

function removeItem(itemId) {

    const oldLength =
        inventory.length;


    inventory =
        inventory.filter(
            item => item.id !== itemId
        );


    if (
        inventory.length !==
        oldLength
    ) {

        saveInventory();

        renderInventory();

        return true;

    }


    return false;
}


/* =========================================================
   ZÍSKAT DATA PŘEDMĚTU
========================================================= */

function getItem(itemId) {

    return inventory.find(
        item => item.id === itemId
    );

}


/* =========================================================
   PROZKOUMÁNÍ PŘEDMĚTU
========================================================= */

function examineItem(itemId) {

    const item =
        getItem(itemId);


    if (!item) {

        showInventoryMessage(
            "Tento předmět nemáš.",
            "error"
        );

        return;

    }


    item.examined = true;

    saveInventory();


    showItemDetail(itemId);

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


    let detail = "";


    switch (itemId) {


        /* -------------------------------------------------
           STARÝ PRŮKAZ
        ------------------------------------------------- */

        case "oldID":

            detail = `

                <div class="item-detail">

                    <div class="item-big-icon">
                        🪪
                    </div>

                    <div class="sector">
                        PŘEDMĚT / PERSONÁL
                    </div>

                    <h2>
                        STARÝ PRŮKAZ
                    </h2>

                    <p>
                        Průkaz zaměstnance zařízení.
                        Plast je poškrábaný a fotografie
                        je téměř nečitelná.
                    </p>

                    <div class="clue-box">

                        <strong>
                            PŘEDNÍ STRANA
                        </strong>

                        <p>
                            SECTOR 07
                        </p>

                        <p>
                            EMPLOYEE ID:
                            4729
                        </p>

                    </div>

                    <button
                        class="secondary-button"
                        onclick="turnOldID()">

                        🔄 OTOČIT PRŮKAZ

                    </button>

                    <div id="itemDetailMessage"></div>

                </div>

            `;

            break;


        /* -------------------------------------------------
           POJISTKA
        ------------------------------------------------- */

        case "fuse":

            detail = `

                <div class="item-detail">

                    <div class="item-big-icon">
                        🔋
                    </div>

                    <div class="sector">
                        TECHNICKÝ PŘEDMĚT
                    </div>

                    <h2>
                        POJISTKA
                    </h2>

                    <p>
                        Průmyslová pojistka.
                        Ještě není úplně vypálená.
                    </p>

                    <div class="clue-box">

                        Na kovové části je vyraženo:

                        <strong>
                            PWR-02
                        </strong>

                    </div>

                </div>

            `;

            break;


        /* -------------------------------------------------
           BEZPEČNOSTNÍ KARTA
        ------------------------------------------------- */

        case "securityCard":

            detail = `

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
                        Karta má stále funkční
                        magnetický proužek.
                    </p>

                    <div class="clue-box">

                        ACCESS LEVEL:
                        <strong>
                            03
                        </strong>

                    </div>

                </div>

            `;

            break;


        /* -------------------------------------------------
           AKTIVÁTOR
        ------------------------------------------------- */

        case "chemical":

            detail = `

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
                        Neznámá chemická látka.
                    </p>

                    <div class="clue-box">

                        <strong>
                            SUBJECT 07
                        </strong>

                        <br>

                        HANDLE WITH CARE

                    </div>

                </div>

            `;

            break;


        /* -------------------------------------------------
           INCIDENT 07
        ------------------------------------------------- */

        case "incidentReport":

            detail = `

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
                        Dokument popisuje událost,
                        která byla oficiálně vymazána
                        ze systému.
                    </p>

                    <div class="terminal-text">

                        INCIDENT 07<br>
                        STATUS: CLASSIFIED

                    </div>

                    <p class="important">
                        „SUBJECT WAS NOT SUPPOSED
                        TO SURVIVE.“
                    </p>

                </div>

            `;

            break;


        /* -------------------------------------------------
           PŘÍSTUPOVÝ TOKEN
        ------------------------------------------------- */

        case "accessToken":

            detail = `

                <div class="item-detail">

                    <div class="item-big-icon">
                        🔑
                    </div>

                    <div class="sector">
                        ROOT ACCESS
                    </div>

                    <h2>
                        PŘÍSTUPOVÝ TOKEN
                    </h2>

                    <p>
                        Malé zařízení používané
                        pracovníky s nejvyšším
                        oprávněním.
                    </p>

                    <div class="clue-box">

                        ACCESS:
                        <strong>
                            ROOT
                        </strong>

                    </div>

                </div>

            `;

            break;


        /* -------------------------------------------------
           DEFAULT
        ------------------------------------------------- */

        default:

            detail = `

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
        detail
    );
}


/* =========================================================
   OTOČENÍ STARÉHO PRŮKAZU
========================================================= */

function turnOldID() {

    openInventoryDetail(`

        <div class="item-detail">

            <div class="item-big-icon">
                🪪
            </div>

            <div class="sector">
                STARÝ PRŮKAZ / ZADNÍ STRANA
            </div>

            <h2>
                ZADNÍ STRANA
            </h2>

            <p>
                Na zadní straně jsou staré
                ručně psané poznámky.
            </p>

            <div class="clue-box">

                <p>
                    INCIDENT:
                    <strong>07</strong>
                </p>

                <p>
                    DATE:
                    <strong>12 / 09</strong>
                </p>

                <p class="important">
                    4729
                </p>

            </div>

            <p>
                Čtyři číslice jsou podtržené.
                Stejné číslice jsi viděl
                na terminálu.
            </p>

            <button
                class="main-button"
                onclick="closeInventoryDetail()">

                ZPĚT DO INVENTÁŘE

            </button>

        </div>

    `);


    setInventoryFlag(
        "oldID_rear_seen",
        true
    );
}


/* =========================================================
   INVENTÁŘ — VYKRESLENÍ
========================================================= */

function renderInventory() {

    const container =
        document.getElementById(
            "inventoryContent"
        );


    if (!container) {
        return;
    }


    if (inventory.length === 0) {

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
                        ">

                        🔎

                    </button>

                </div>

            `;

        }
    );


    container.innerHTML = html;
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


    modal.style.display = "flex";

    modal.classList.add("show");
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


    modal.classList.remove("show");

    modal.style.display = "none";
}


/* =========================================================
   DETAIL INVENTÁŘE
========================================================= */

function openInventoryDetail(content) {

    let modal =
        document.getElementById(
            "inventoryDetailModal"
        );


    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "inventoryDetailModal";

        modal.className =
            "modal";

        modal.innerHTML = `

            <div class="modal-box">

                <div id="inventoryDetailContent"></div>

                <button
                    class="main-button"
                    onclick="
                        closeInventoryDetail()
                    ">

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
   ZAVŘENÍ DETAILU
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
   ZPRÁVA INVENTÁŘE
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

        alert(message);

        return;

    }


    box.className =
        "inventory-message " + type;

    box.textContent =
        message;
}


/* =========================================================
   INVENTÁŘNÍ FLAGY
========================================================= */

function setInventoryFlag(
    id,
    value = true
) {

    localStorage.setItem(
        "BLACKOUT_INV_FLAG_" + id,
        value ? "true" : "false"
    );

}


function getInventoryFlag(id) {

    return localStorage.getItem(
        "BLACKOUT_INV_FLAG_" + id
    ) === "true";

}


/* =========================================================
   POUŽITÍ PŘEDMĚTU
========================================================= */

function useInventoryItem(itemId) {

    const item =
        getItem(itemId);


    if (!item) {

        showInventoryMessage(
            "Tento předmět nemáš.",
            "error"
        );

        return;

    }


    if (
        typeof useItemForPuzzle ===
        "function"
    ) {

        const used =
            useItemForPuzzle(
                itemId
            );


        if (used) {
            return;
        }

    }


    showInventoryMessage(
        "Nevypadá to, že by se tento předmět dal právě teď použít.",
        "normal"
    );
}


/* =========================================================
   RESET INVENTÁŘE
========================================================= */

function resetInventory() {

    inventory = [];


    localStorage.removeItem(
        INVENTORY_STORAGE
    );


    /*
       Synchronizace s rooms.js.
       Tohle je důležité kvůli problému,
       kdy inventář byl prázdný, ale místnost
       stále tvrdila, že je předmět sebraný.
    */

    localStorage.removeItem(
        "BLACKOUT_ROOM_ITEMS"
    );


    renderInventory();


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
   KOMPLETNÍ RESET HRY
========================================================= */

function resetBlackoutGame() {

    /*
       Smazání inventáře
    */

    localStorage.removeItem(
        INVENTORY_STORAGE
    );


    /*
       Smazání sebraných předmětů
    */

    localStorage.removeItem(
        "BLACKOUT_ROOM_ITEMS"
    );


    /*
       Smazání puzzle postupu
    */

    Object.keys(
        localStorage
    ).forEach(key => {

        if (
            key.startsWith(
                "BLACKOUT_PUZZLE_"
            )
        ) {

            localStorage.removeItem(
                key
            );

        }

        if (
            key.startsWith(
                "BLACKOUT_INV_FLAG_"
            )
        ) {

            localStorage.removeItem(
                key
            );

        }

    });


    /*
       Smazání starších flagů používaných
       případnými staršími verzemi hry.
    */

    Object.keys(
        localStorage
    ).forEach(key => {

        if (
            key.startsWith(
                "BLACKOUT_FLAG_"
            )
        ) {

            localStorage.removeItem(
                key
            );

        }

    });


    inventory = [];


    if (
        typeof collectedItems !==
        "undefined"
    ) {

        collectedItems = [];

    }


    renderInventory();


    if (
        typeof loadRoomItems ===
        "function"
    ) {

        loadRoomItems();

    }


    if (
        typeof currentRoom !==
        "undefined"
    ) {

        currentRoom = "room1";

    }


    if (
        typeof renderRoom ===
        "function"
    ) {

        renderRoom("room1");

    }


    closeInventory();

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadInventory();

        renderInventory();

    }
);

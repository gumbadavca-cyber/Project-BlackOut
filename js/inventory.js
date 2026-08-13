/* =========================================
   BLACKOUT — INVENTORY SYSTEM
========================================= */

let inventory = [];
let selectedItem = null;


/* =========================================
   NAČTENÍ INVENTÁŘE
========================================= */

function loadInventory() {

    const saved =
        localStorage.getItem(
            "BLACKOUT_INVENTORY"
        );

    if (!saved) {
        inventory = [];
        return;
    }

    try {

        const data =
            JSON.parse(saved);

        inventory =
            Array.isArray(data)
                ? data
                : [];

    } catch {

        inventory = [];

    }

}


/* =========================================
   ULOŽENÍ INVENTÁŘE
========================================= */

function saveInventory() {

    localStorage.setItem(
        "BLACKOUT_INVENTORY",
        JSON.stringify(inventory)
    );

}


/* =========================================
   PŘIDÁNÍ ITEMU
========================================= */

function addItem(
    id,
    name,
    description = "",
    icon = "📦"
) {

    if (
        inventory.some(
            item => item.id === id
        )
    ) {

        return false;

    }


    inventory.push({

        id: id,

        name: name,

        description:
            description,

        icon: icon,

        used: false

    });


    saveInventory();

    updateInventoryUI();

    return true;

}


/* =========================================
   ODSTRANĚNÍ ITEMU
========================================= */

function removeItem(id) {

    inventory =
        inventory.filter(
            item => item.id !== id
        );


    saveInventory();

    selectedItem = null;

    updateInventoryUI();

}


/* =========================================
   NALEZENÍ ITEMU
========================================= */

function getItem(id) {

    return inventory.find(
        item => item.id === id
    );

}


/* =========================================
   MÁ HRÁČ ITEM?
========================================= */

function hasItem(id) {

    return inventory.some(
        item => item.id === id
    );

}


/* =========================================
   POČET ITEMŮ
========================================= */

function inventoryCount() {

    return inventory.length;

}


/* =========================================
   OTEVŘENÍ INVENTÁŘE
========================================= */

function openInventory() {

    const modal =
        document.getElementById(
            "inventoryModal"
        );

    if (!modal) {
        return;
    }


    renderInventory();

    modal.style.display = "flex";

    modal.classList.add("show");


    playSound("click");

}


/* =========================================
   ZAVŘENÍ
========================================= */

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

    selectedItem = null;

}


/* =========================================
   VYKRESLENÍ
========================================= */

function renderInventory() {

    const box =
        document.getElementById(
            "inventoryContent"
        );

    if (!box) {
        return;
    }


    if (inventory.length === 0) {

        box.innerHTML = `

            <div class="empty-inventory">

                🎒

                <h3>
                    Inventář je prázdný
                </h3>

                <p>
                    Prozkoumávej místnosti
                    a hledej užitečné předměty.
                </p>

            </div>

        `;

        return;

    }


    let html = `

        <div class="inventory-grid">

    `;


    inventory.forEach(
        item => {

            const used =
                item.used === true;


            html += `

                <button
                    class="
                        inventory-item
                        ${used ? "used" : ""}
                    "
                    onclick="
                        selectInventoryItem(
                            '${item.id}'
                        )
                    ">

                    <span class="item-icon">

                        ${item.icon}

                    </span>

                    <strong>

                        ${item.name}

                    </strong>

                    ${
                        used

                        ? `
                            <small>
                                POUŽITO
                            </small>
                          `

                        : ""

                    }

                </button>

            `;

        }
    );


    html += `

        </div>

        <div id="selectedItem">

            <p>
                Vyber předmět.
            </p>

        </div>

    `;


    box.innerHTML = html;

}


/* =========================================
   VÝBĚR ITEMU
========================================= */

function selectInventoryItem(id) {

    const item =
        getItem(id);


    if (!item) {
        return;
    }


    selectedItem = id;


    const box =
        document.getElementById(
            "selectedItem"
        );


    if (!box) {
        return;
    }


    box.innerHTML = `

        <div class="selected-item">

            <div class="selected-icon">

                ${item.icon}

            </div>

            <h3>
                ${item.name}
            </h3>

            <p>
                ${item.description}
            </p>


            <div class="item-actions">

                <button
                    class="main-button"
                    onclick="
                        examineItem(
                            '${item.id}'
                        )
                    ">

                    🔎 PROZKOUMAT

                </button>


                <button
                    class="secondary-button"
                    onclick="
                        useSelectedItem()
                    ">

                    🖐️ POUŽÍT

                </button>

            </div>

        </div>

    `;


    playSound("click");

}


/* =========================================
   PROZKOUMAT ITEM
========================================= */

function examineItem(id) {

    const item =
        getItem(id);


    if (!item) {
        return;
    }


    let message =
        item.description;


    /*
       Speciální informace
       některých předmětů.
    */

    if (id === "oldID") {

        message =
            "Na zadní straně průkazu je vyraženo: " +
            "4729. Pod číslem je malé logo SECTOR 07.";

        setFlag(
            "examined_oldID",
            true
        );

    }


    if (id === "incidentReport") {

        message =
            "Dokument potvrzuje, že INCIDENT 07 " +
            "nebyla technická závada. " +
            "Událost byla záměrně utajena.";

        setFlag(
            "read_incident",
            true
        );

    }


    showInventoryMessage(
        message,
        "info"
    );


    playSound("click");

}


/* =========================================
   POUŽITÍ ITEMU
========================================= */

function useSelectedItem() {

    if (!selectedItem) {

        showInventoryMessage(
            "Nejdřív vyber předmět.",
            "error"
        );

        return;

    }


    const item =
        getItem(selectedItem);


    if (!item) {
        return;
    }


    const used =
        useItem(
            item.id
        );


    if (!used) {

        showInventoryMessage(

            "Tento předmět se tady " +
            "nedá použít.",

            "error"

        );

        playSound("error");

    }

}


/* =========================================
   LOGIKA POUŽITÍ
========================================= */

function useItem(id) {

    /*
       STARÝ PRŮKAZ
    */

    if (id === "oldID") {

        if (
            currentRoom ===
            "room1"
        ) {

            showInventoryMessage(

                "Průkaz se hodí k terminálu. " +
                "Zkus ho nejdřív prozkoumat.",

                "info"

            );

            return true;

        }


        if (
            currentRoom ===
            "room3"
        ) {

            showInventoryMessage(

                "Bezpečnostní systém " +
                "průkaz rozpoznal.",

                "success"

            );


            setFlag(
                "securityCardAccepted",
                true
            );


            return true;

        }


        return false;

    }


    /*
       POJISTKA
    */

    if (id === "fuse") {

        if (
            currentRoom ===
            "room2"
        ) {

            showInventoryMessage(

                "Pojistka patří do rozvaděče.",

                "info"

            );


            setFlag(
                "fuseReady",
                true
            );


            return true;

        }


        return false;

    }


    /*
       AKTIVÁTOR
    */

    if (id === "chemical") {

        if (
            currentRoom ===
            "room4"
        ) {

            showInventoryMessage(

                "Aktivátor reaguje s laboratorním zařízením.",

                "success"

            );


            setFlag(
                "chemicalUsed",
                true
            );


            return true;

        }


        return false;

    }


    /*
       INCIDENT 07
    */

    if (
        id ===
        "incidentReport"
    ) {

        examineItem(
            id
        );

        return true;

    }


    /*
       PŘÍSTUPOVÝ TOKEN
    */

    if (
        id ===
        "accessToken"
    ) {

        if (
            currentRoom ===
            "room6"
        ) {

            showInventoryMessage(

                "Token je kompatibilní s ROOT systémem.",

                "success"

            );


            setFlag(
                "tokenReady",
                true
            );


            return true;

        }


        return false;

    }


    /*
       NEZNÁMÝ ITEM
    */

    return false;

}


/* =========================================
   ZPRÁVA
========================================= */

function showInventoryMessage(
    message,
    type = "info"
) {

    const box =
        document.getElementById(
            "selectedItem"
        );


    if (!box) {

        alert(message);

        return;

    }


    box.innerHTML += `

        <div
            class="
                inventory-message
                ${type}
            ">

            ${message}

        </div>

    `;

}


/* =========================================
   OZNAČENÍ ITEMU JAKO POUŽITÉHO
========================================= */

function markItemUsed(id) {

    const item =
        getItem(id);


    if (!item) {
        return;
    }


    item.used = true;


    saveInventory();

    renderInventory();

}


/* =========================================
   UI
========================================= */

function updateInventoryUI() {

    const counter =
        document.getElementById(
            "inventoryCounter"
        );


    if (counter) {

        counter.textContent =
            inventory.length;

    }

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadInventory();

        updateInventoryUI();

    }
);

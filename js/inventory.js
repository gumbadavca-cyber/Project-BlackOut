/* =========================================
   BLACKOUT — INVENTÁŘ
========================================= */

let inventory = [];


/* =========================================
   PŘIDÁNÍ PŘEDMĚTU
========================================= */

function addItem(item) {

    if (inventory.includes(item)) {
        return;
    }

    inventory.push(item);

    saveInventory();

    renderInventory();

    playSound("pickup");

    vibrate(35);
}


/* =========================================
   ODEBRÁNÍ PŘEDMĚTU
========================================= */

function removeItem(item) {

    const index = inventory.indexOf(item);

    if (index === -1) {
        return;
    }

    inventory.splice(index, 1);

    saveInventory();

    renderInventory();
}


/* =========================================
   KONTROLA PŘEDMĚTU
========================================= */

function hasItem(item) {

    return inventory.includes(item);

}


/* =========================================
   POČET PŘEDMĚTŮ
========================================= */

function inventoryCount() {

    return inventory.length;

}


/* =========================================
   VYMAZÁNÍ INVENTÁŘE
========================================= */

function clearInventory() {

    inventory = [];

    saveInventory();

    renderInventory();

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
   NAČTENÍ INVENTÁŘE
========================================= */

function loadInventory() {

    const saved =
        localStorage.getItem(
            "BLACKOUT_INVENTORY"
        );

    if (!saved) {
        return;
    }

    try {

        inventory =
            JSON.parse(saved);

    } catch (error) {

        inventory = [];

    }

}


/* =========================================
   VYKRESLENÍ INVENTÁŘE
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
            <div class="gray">
                Inventář je prázdný.
            </div>
        `;

        return;
    }


    box.innerHTML = "";


    inventory.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "inventory-item";

        element.textContent =
            "🎒 " + item;

        element.onclick = () => {

            selectItem(item);

        };

        box.appendChild(element);

    });

}


/* =========================================
   VYBRÁNÍ PŘEDMĚTU
========================================= */

let selectedItem = null;


function selectItem(item) {

    selectedItem = item;

    playSound("click");

    const box =
        document.getElementById(
            "inventoryContent"
        );

    if (!box) {
        return;
    }


    box.innerHTML = `

        <div class="selected-item">

            <h3 class="green">
                🎒 ${item}
            </h3>

            <p>
                Předmět je vybraný.
            </p>

            <p class="gray">
                Později ho budeš moct
                použít na objekty v místnostech.
            </p>

            <button
                class="main-button"
                onclick="closeInventory()">

                ZPĚT DO HRY

            </button>

        </div>

        <hr>

        <h3 class="green">
            TVÉ PŘEDMĚTY
        </h3>

    `;


    inventory.forEach(otherItem => {

        const element =
            document.createElement("div");

        element.className =
            "inventory-item";

        element.textContent =
            "🎒 " + otherItem;

        element.onclick = () => {

            selectItem(otherItem);

        };

        box.appendChild(element);

    });

}


/* =========================================
   POUŽITÍ PŘEDMĚTU
========================================= */

function useItem(item, target) {

    if (!hasItem(item)) {

        return false;

    }


    /*
       Tady budeme později přidávat
       jednotlivé kombinace:

       STARÝ PRŮKAZ + SKŘÍŇKA
       ŠROUBOVÁK + PANEL
       UV SVÍTILNA + STĚNA
       ČIP + TERMINÁL
       atd.
    */


    if (
        typeof handleItemUse === "function"
    ) {

        return handleItemUse(
            item,
            target
        );

    }


    return false;

}


/* =========================================
   POUŽITÍ VYBRANÉHO PŘEDMĚTU
========================================= */

function useSelectedItem(target) {

    if (!selectedItem) {

        return false;

    }


    const result =
        useItem(
            selectedItem,
            target
        );


    if (result) {

        selectedItem = null;

        closeInventory();

    }


    return result;

}


/* =========================================
   RESET VYBRANÉHO PŘEDMĚTU
========================================= */

function clearSelectedItem() {

    selectedItem = null;

}


/* =========================================
   START INVENTÁŘE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadInventory();

        renderInventory();

    }
);

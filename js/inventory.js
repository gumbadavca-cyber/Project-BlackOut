/* =========================================
   BLACKOUT — INVENTÁŘ
========================================= */

let inventory = [];
let selectedItem = null;


/* =========================================
   PŘIDÁNÍ PŘEDMĚTU
========================================= */

function addItem(item) {

    if (hasItem(item)) {
        return false;
    }

    inventory.push(item);

    saveInventory();

    playSound("pickup");
    vibrate(35);

    renderInventory();

    return true;
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
   MÁM PŘEDMĚT?
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

    selectedItem = null;

    saveInventory();

    renderInventory();

}


/* =========================================
   ULOŽENÍ
========================================= */

function saveInventory() {

    localStorage.setItem(
        "BLACKOUT_INVENTORY",
        JSON.stringify(inventory)
    );

}


/* =========================================
   NAČTENÍ
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

        const data =
            JSON.parse(saved);

        if (Array.isArray(data)) {
            inventory = data;
        }

    } catch (error) {

        inventory = [];

    }

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
            <div class="gray">
                Inventář je prázdný.
            </div>
        `;

        return;
    }


    box.innerHTML = `
        <div class="inventory-items"></div>
    `;


    const itemsBox =
        box.querySelector(
            ".inventory-items"
        );


    inventory.forEach(item => {

        const element =
            document.createElement("button");

        element.className =
            "inventory-item";

        element.textContent =
            "🎒 " + item;

        element.onclick = () => {

            selectItem(item);

        };

        itemsBox.appendChild(element);

    });

}


/* =========================================
   VYBRÁNÍ PŘEDMĚTU
========================================= */

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

        <div class="output show">

            <h3 class="green">
                🎒 ${item}
            </h3>

            <p>
                Předmět je vybraný.
            </p>

            <button
                class="main-button"
                onclick="clearSelectedItem(); renderInventory()">

                ZRUŠIT VÝBĚR

            </button>

        </div>

        <br>

        <div class="inventory-items"></div>
    `;


    const itemsBox =
        box.querySelector(
            ".inventory-items"
        );


    inventory.forEach(otherItem => {

        const element =
            document.createElement("button");

        element.className =
            "inventory-item";

        element.textContent =
            "🎒 " + otherItem;

        element.onclick = () => {

            selectItem(otherItem);

        };

        itemsBox.appendChild(element);

    });

}


/* =========================================
   POUŽITÍ PŘEDMĚTU
========================================= */

function useItem(item, target) {

    if (!hasItem(item)) {
        return false;
    }


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
   ZRUŠENÍ VÝBĚRU
========================================= */

function clearSelectedItem() {

    selectedItem = null;

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadInventory();

        renderInventory();

    }
);

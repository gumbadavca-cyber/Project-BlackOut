/* =========================================
   BLACKOUT — MAP SYSTEM
========================================= */

const rooms = {

    room1: {
        name: "Probuzení",
        sector: "SECTOR 01",
        icon: "🛏️"
    },

    room2: {
        name: "Technická místnost",
        sector: "SECTOR 02",
        icon: "🔌"
    },

    room3: {
        name: "Bezpečnostní chodba",
        sector: "SECTOR 03",
        icon: "🚨"
    },

    room4: {
        name: "Laboratoř",
        sector: "SECTOR 04",
        icon: "🧪"
    },

    room5: {
        name: "Archiv",
        sector: "SECTOR 05",
        icon: "📁"
    },

    room6: {
        name: "Kontrolní centrum",
        sector: "SECTOR 06",
        icon: "💻"
    },

    room7: {
        name: "Podzemní tunel",
        sector: "SECTOR 07",
        icon: "🚇"
    },

    room8: {
        name: "Výstup",
        sector: "EXIT",
        icon: "🚪"
    }

};


/* =========================================
   VYKRESLENÍ MAPY
========================================= */

function renderMap() {

    const box =
        document.getElementById(
            "mapContent"
        );


    if (!box) {
        return;
    }


    box.innerHTML = "";


    Object.keys(rooms).forEach(
        roomId => {

            const room =
                rooms[roomId];


            const unlocked =
                typeof isRoomUnlocked ===
                "function"
                    ? isRoomUnlocked(roomId)
                    : roomId === "room1";


            const current =
                typeof currentRoom !==
                "undefined" &&
                currentRoom === roomId;


            const completed =
                typeof gameState !==
                "undefined" &&
                gameState.completedRooms &&
                gameState.completedRooms
                    .includes(roomId);


            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "map-room";


            if (current) {
                button.classList.add(
                    "current"
                );
            }


            if (completed) {
                button.classList.add(
                    "completed"
                );
            }


            if (!unlocked) {

                button.classList.add(
                    "locked"
                );


                button.innerHTML = `

                    <span class="map-icon">
                        🔒
                    </span>

                    <strong>
                        ${room.name}
                    </strong>

                    <small>
                        ${room.sector}
                    </small>

                `;


                button.disabled = true;


            } else {

                button.innerHTML = `

                    <span class="map-icon">
                        ${room.icon}
                    </span>

                    <strong>
                        ${room.name}
                    </strong>

                    <small>
                        ${room.sector}
                    </small>

                    ${
                        current
                            ? `<span class="map-current">
                                JSI ZDE
                               </span>`
                            : ""
                    }

                    ${
                        completed
                            ? `<span class="map-complete">
                                ✓
                               </span>`
                            : ""
                    }

                `;


                button.onclick =
                    function() {

                        if (
                            typeof showRoom ===
                            "function"
                        ) {

                            showRoom(
                                roomId
                            );

                        }


                        closeMap();

                    };

            }


            box.appendChild(
                button
            );

        }
    );

}


/* =========================================
   OTEVŘENÍ MAPY
========================================= */

function openMap() {

    const modal =
        document.getElementById(
            "mapModal"
        );


    if (!modal) {

        console.error(
            "mapModal nebyl nalezen."
        );

        return;

    }


    renderMap();


    modal.classList.add(
        "show"
    );


    modal.style.display =
        "flex";


    if (
        typeof playSound ===
        "function"
    ) {

        playSound("click");

    }

}


/* =========================================
   ZAVŘENÍ MAPY
========================================= */

function closeMap() {

    const modal =
        document.getElementById(
            "mapModal"
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
   AKTUALIZACE
========================================= */

function updateMap() {

    const modal =
        document.getElementById(
            "mapModal"
        );


    if (
        modal &&
        modal.classList.contains(
            "show"
        )
    ) {

        renderMap();

    }

}

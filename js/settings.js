/* =========================================
   BLACKOUT — SETTINGS
========================================= */

let soundEnabled = true;
let vibrationEnabled = true;
let effectsEnabled = true;


/* =========================================
   NAČTENÍ
========================================= */

function loadSettings() {

    const saved =
        localStorage.getItem(
            "BLACKOUT_SETTINGS"
        );


    if (!saved) {
        return;
    }


    try {

        const data =
            JSON.parse(saved);


        soundEnabled =
            data.sound !== false;

        vibrationEnabled =
            data.vibration !== false;

        effectsEnabled =
            data.effects !== false;

    } catch (error) {

        soundEnabled = true;
        vibrationEnabled = true;
        effectsEnabled = true;

    }

}


/* =========================================
   ULOŽENÍ
========================================= */

function saveSettings() {

    localStorage.setItem(

        "BLACKOUT_SETTINGS",

        JSON.stringify({

            sound:
                soundEnabled,

            vibration:
                vibrationEnabled,

            effects:
                effectsEnabled

        })

    );

}


/* =========================================
   VYKRESLENÍ
========================================= */

function renderSettings() {

    const box =
        document.getElementById(
            "settingsContent"
        );


    if (!box) {
        return;
    }


    box.innerHTML = `

        <div class="settings-list">


            <div class="setting">

                <div>

                    <strong>
                        🔊 Zvuky
                    </strong>

                    <br>

                    <small>
                        Zvuky hry
                    </small>

                </div>

                <button
                    class="setting-toggle
                    ${soundEnabled ? "on" : "off"}"
                    onclick="toggleSound()">

                    ${
                        soundEnabled
                            ? "ON"
                            : "OFF"
                    }

                </button>

            </div>


            <div class="setting">

                <div>

                    <strong>
                        📳 Vibrace
                    </strong>

                    <br>

                    <small>
                        Vibrace telefonu
                    </small>

                </div>

                <button
                    class="setting-toggle
                    ${vibrationEnabled ? "on" : "off"}"
                    onclick="toggleVibration()">

                    ${
                        vibrationEnabled
                            ? "ON"
                            : "OFF"
                    }

                </button>

            </div>


            <div class="setting">

                <div>

                    <strong>
                        ✨ Efekty
                    </strong>

                    <br>

                    <small>
                        Obrazové efekty
                    </small>

                </div>

                <button
                    class="setting-toggle
                    ${effectsEnabled ? "on" : "off"}"
                    onclick="toggleEffects()">

                    ${
                        effectsEnabled
                            ? "ON"
                            : "OFF"
                    }

                </button>

            </div>


            <hr>


            <button
                class="main-button"
                onclick="resetGame()">

                🗑️ SMAZAT POSTUP

            </button>

        </div>

    `;

}


/* =========================================
   ZVUK
========================================= */

function toggleSound() {

    soundEnabled =
        !soundEnabled;


    saveSettings();

    renderSettings();


    if (soundEnabled) {

        if (
            typeof createGameSound ===
            "function"
        ) {

            createGameSound(
                "click"
            );

        }

    }

}


/* =========================================
   VIBRACE
========================================= */

function toggleVibration() {

    vibrationEnabled =
        !vibrationEnabled;


    saveSettings();

    renderSettings();


    if (vibrationEnabled) {

        if (
            typeof vibrate ===
            "function"
        ) {

            vibrate(60);

        }

    }

}


/* =========================================
   EFEKTY
========================================= */

function toggleEffects() {

    effectsEnabled =
        !effectsEnabled;


    saveSettings();

    renderSettings();


    if (effectsEnabled) {

        if (
            typeof flashScreen ===
            "function"
        ) {

            flashScreen();

        }

    }

}

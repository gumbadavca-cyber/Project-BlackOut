/* =========================================
   BLACKOUT — NASTAVENÍ
========================================= */

let soundEnabled = true;
let vibrationEnabled = true;
let effectsEnabled = true;


/* =========================================
   ULOŽENÍ NASTAVENÍ
========================================= */

function saveSettings() {

    const settings = {

        sound: soundEnabled,
        vibration: vibrationEnabled,
        effects: effectsEnabled

    };


    localStorage.setItem(
        "BLACKOUT_SETTINGS",
        JSON.stringify(settings)
    );

}


/* =========================================
   NAČTENÍ NASTAVENÍ
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

        const settings =
            JSON.parse(saved);


        soundEnabled =
            settings.sound !== false;

        vibrationEnabled =
            settings.vibration !== false;

        effectsEnabled =
            settings.effects !== false;


    } catch (error) {

        console.log(
            "Nastavení se nepodařilo načíst."
        );

    }

}


/* =========================================
   VYKRESLENÍ NASTAVENÍ
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


            <!-- ZVUK -->

            <div class="setting">

                <div>

                    <strong>
                        🔊 Zvuky
                    </strong>

                    <br>

                    <small class="gray">
                        Zvuky tlačítek,
                        puzzle a událostí.
                    </small>

                </div>


                <button
                    class="setting-toggle
                    ${soundEnabled ? "on" : "off"}"
                    onclick="
                        toggleSound()
                    ">

                    ${soundEnabled
                        ? "ON"
                        : "OFF"}

                </button>

            </div>


            <!-- VIBRACE -->

            <div class="setting">

                <div>

                    <strong>
                        📳 Vibrace
                    </strong>

                    <br>

                    <small class="gray">
                        Krátké vibrace
                        při interakcích.
                    </small>

                </div>


                <button
                    class="setting-toggle
                    ${vibrationEnabled ? "on" : "off"}"
                    onclick="
                        toggleVibration()
                    ">

                    ${vibrationEnabled
                        ? "ON"
                        : "OFF"}

                </button>

            </div>


            <!-- EFEKTY -->

            <div class="setting">

                <div>

                    <strong>
                        ✨ Efekty
                    </strong>

                    <br>

                    <small class="gray">
                        Glitch, blikání
                        a animace.
                    </small>

                </div>


                <button
                    class="setting-toggle
                    ${effectsEnabled ? "on" : "off"}"
                    onclick="
                        toggleEffects()
                    ">

                    ${effectsEnabled
                        ? "ON"
                        : "OFF"}

                </button>

            </div>


            <hr>


            <!-- RESET -->

            <button
                class="main-button"
                onclick="
                    resetGame()
                ">

                🗑️ SMAZAT POSTUP

            </button>


            <button
                class="main-button"
                onclick="
                    closeSettings()
                ">

                ZPĚT

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


    /*
       Malý zvuk při zapnutí.
    */

    if (soundEnabled) {

        createGameSound(
            "click"
        );

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

        vibrate(50);

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

        flashScreen();

    }

}


/* =========================================
   ZVUKOVÝ ENGINE
========================================= */

function createGameSound(type) {

    if (!soundEnabled) {
        return;
    }


    /*
       Web Audio API.

       Nemusíme zatím používat
       žádné externí MP3 soubory.
    */


    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContext) {
        return;
    }


    const audio =
        new AudioContext();


    const oscillator =
        audio.createOscillator();


    const gain =
        audio.createGain();


    oscillator.connect(
        gain
    );

    gain.connect(
        audio.destination
    );


    let frequency = 440;

    let duration = 0.08;


    switch (type) {

        case "click":

            frequency = 600;
            duration = 0.05;

            break;


        case "pickup":

            frequency = 760;
            duration = 0.12;

            break;


        case "success":

            frequency = 900;
            duration = 0.18;

            break;


        case "error":

            frequency = 120;
            duration = 0.25;

            break;


        case "alarm":

            frequency = 90;
            duration = 0.5;

            break;


        default:

            frequency = 440;

    }


    oscillator.frequency.value =
        frequency;


    oscillator.type =
        "square";


    gain.gain.setValueAtTime(
        0.0001,
        audio.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.12,
        audio.currentTime + 0.01
    );


    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + duration
    );


    oscillator.start();


    oscillator.stop(
        audio.currentTime +
        duration
    );

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSettings();

    }
);

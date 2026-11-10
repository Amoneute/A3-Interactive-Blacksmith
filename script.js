// Assignment 3: Blacksmith — The Tiny Forge


// 1. Select the forge and control elements.

const forge = document.getElementById("forge");
const heatValue = document.getElementById("heat-value");
const swordCount = document.getElementById("sword-count");
const forgeStatus = document.getElementById("forge-status");
const forgeImage = document.getElementById("forge-image");
const actionMessage = document.getElementById("action-message");

const heatInput = document.getElementById("heat-input");
const addHeatButton = document.getElementById("add-heat");
const makeSwordButton = document.getElementById("make-sword");
const resetForgeButton = document.getElementById("reset-forge");


// 2. Create the game variables.

let heat = 20;
let swordsMade = 0;


// 3. Get the correct forge status.

function getForgeStatus(heatValue) {

    if (heatValue < 30) {
        return "Too cold";
    } else if (heatValue < 70) {
        return "Ready to forge";
    } else {
        return "Roaring fire";
    }
}


// 4. Update the forge display.

function updateForge() {

    heatValue.textContent = heat;
    swordCount.textContent = swordsMade;

    const status = getForgeStatus(heat);

    forgeStatus.textContent = status;

    // Remove the previous status classes.

    forge.classList.remove("is-cold");
    forge.classList.remove("is-ready");
    forge.classList.remove("is-roaring");


    // Apply the correct class and image.

    if (status === "Too cold") {

        forge.classList.add("is-cold");

        forgeImage.src = "assets/forge-cold.svg";
        forgeImage.alt = "A stone forge with dark coals and no flames";

    } else if (status === "Ready to forge") {

        forge.classList.add("is-ready");

        forgeImage.src = "assets/forge-ready.svg";
        forgeImage.alt = "A stone forge with a small orange fire";

    } else {

        forge.classList.add("is-roaring");

        forgeImage.src = "assets/forge-roaring.svg";
        forgeImage.alt = "A stone forge with tall bright flames and sparks";
    }
}


// 5. Reset the forge.

function resetForge() {

    heat = 20;
    swordsMade = 0;

    heatInput.value = "";
    actionMessage.textContent = "";

    updateForge();
}


// 6. Add heat to the forge.

function heatForge(amount) {

    heat += amount;

    if (heat > 100) {
        heat = 100;
    }

    actionMessage.textContent = "You heated the forge.";

    updateForge();
}


// 7. Make one sword.

function makeSword() {

    if (heat >= 30) {

        heat -= 30;
        swordsMade++;

        actionMessage.textContent = "You made a sword!";

    } else {

        actionMessage.textContent = "The forge is too cold. You need more heat.";
    }

    updateForge();
}


// 8. Connect the buttons using event listeners.

// PLAN:
// When Add heat is clicked:
// Read the input and convert it to a number.
// Check that the number is positive and whole.
// If invalid, display an error message.
// If valid, call heatForge().

// When Make sword is clicked:
// Call makeSword().

// When Reset forge is clicked:
// Call resetForge().


// ADD HEAT BUTTON

addHeatButton.addEventListener("click", function() {

    const amount = Number(heatInput.value);

    if (
        !Number.isFinite(amount) ||
        !Number.isInteger(amount) ||
        amount <= 0
    ) {

        actionMessage.textContent = "Please enter a positive whole number.";

        return;
    }

    heatForge(amount);

    heatInput.value = "";
});


// MAKE SWORD BUTTON

makeSwordButton.addEventListener("click", function() {

    makeSword();

});


// RESET FORGE BUTTON

resetForgeButton.addEventListener("click", function() {

    resetForge();

});


// 9. Start the game when the page loads.

resetForge();
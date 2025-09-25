// flag.js ('Escape menu' navigvation modal)
import { getEl } from "./ui.js";

document.addEventListener("DOMContentLoaded", function () {
    const flagModal = getEl("flag-modal");
    const flagBtn = getEl("flag-btn");
    const menuModal = getEl("menu-modal");
    const menuBtn = getEl("menu-btn");
    const closeBtn = getEl("close-btn");
    const cancelBtn = getEl("cancel-btn");

    // Open modal
    flagBtn.addEventListener("click", function () {
        flagModal.style.display = "flex";
        menuBtn.style.display = "none";
        closeBtn.style.display = "block";
        if (menuModal) {
            menuModal.style.display = "none";
        }
    });

    // Close modal
    closeBtn.addEventListener("click", function () {
        flagModal.style.display = "none";
        closeBtn.style.display = "none";
        menuBtn.style.display = "block";
    });

        // Close modal
    cancelBtn.addEventListener("click", function () {
        flagModal.style.display = "none";
        closeBtn.style.display = "none";
        menuBtn.style.display = "block";
    });

    // Close modal if user clicks outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === flagModal) {
            flagModal.style.display = "none";
            closeBtn.style.display = "none";
            menuBtn.style.display = "block";
        }
    });

});
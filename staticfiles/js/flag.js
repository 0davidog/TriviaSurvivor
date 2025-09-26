// flag.js module - make sure script type="module" when linked.

import { getEl } from "./ui.js";

document.addEventListener("DOMContentLoaded", function () {
    const flagModal = getEl("flag-modal");
    const flagBtn = getEl("flag-btn");
    const menuModal = getEl("menu-modal");
    const menuBtn = getEl("menu-btn");
    const closeBtn = getEl("close-btn");
    const cancelBtn = getEl("cancel-btn");
    const comBtn = getEl("comment-btn");

    // Open modal
    if (flagBtn) {
        flagBtn.addEventListener("click", function () {
        flagModal.style.display = "flex";
        menuBtn.style.display = "none";
        closeBtn.style.display = "block";
        if (menuModal) {
            menuModal.style.display = "none";
        }
    });
    }
    

    // Close modal
    closeBtn?.addEventListener("click", function () {
        flagModal.style.display = "none";
        closeBtn.style.display = "none";
        menuBtn.style.display = "block";
    });

        // Close modal
    cancelBtn?.addEventListener("click", function () {
        flagModal.style.display = "none";
        closeBtn.style.display = "none";
        menuBtn.style.display = "block";
    });

            // Close modal
    comBtn?.addEventListener("click", function () {
        console.log("comment button clicked?")
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
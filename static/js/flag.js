// flag.js module - make sure script type="module" when linked.

import { getEl } from "./ui.js";

document.addEventListener("DOMContentLoaded", function () {
    const flagModal = getEl("flag-modal");
    const flagBtn = getEl("flag-btn");
    const menuModal = getEl("menu-modal");
    const cancelBtn = getEl("cancel-btn");
    const comBtn = getEl("comment-btn");

    // Open modal
    if (flagBtn) {
        flagBtn.addEventListener("click", function () {
        flagModal.style.display = "flex";

        if (menuModal) {
            menuModal.style.display = "none";
        }
    });
    }
    
    // Close modal
    cancelBtn?.addEventListener("click", function () {
        flagModal.style.display = "none";
    });

            // Close modal
    comBtn?.addEventListener("click", function () {
        console.log("comment button clicked?")
        flagModal.style.display = "none";

    });

    // Close modal if user clicks outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === flagModal) {
            flagModal.style.display = "none";

        }
    });

});
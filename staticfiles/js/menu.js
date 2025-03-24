document.addEventListener("DOMContentLoaded", function () {
    const menuModal = document.getElementById("menu-modal");
    const profileModal = document.getElementById("profile-modal");
    const infoModal = document.getElementById("info-modal");
    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");

    // Open modal
    menuBtn.addEventListener("click", function () {
        menuModal.style.display = "flex";
        menuBtn.style.display = "none";
        closeBtn.style.display = "block";
        if (profileModal) {
            profileModal.style.display = "none";
        }
    });

    // Close modal
    closeBtn.addEventListener("click", function () {
        menuModal.style.display = "none";
        closeBtn.style.display = "none";
        menuBtn.style.display = "block";
    });

    // Close modal if user presses esc key
    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            if (menuModal.style.display === "flex") {
                menuModal.style.display = "none";
                closeBtn.style.display = "none";
                menuBtn.style.display = "block";
            } else if (profileModal.style.display === "flex") {
                profileModal.style.display = "none";
                closeBtn.style.display = "none";
                menuBtn.style.display = "block";
            } else if (infoModal.style.display === "flex") {
                infoModal.style.display = "none";
                closeBtn.style.display = "none";
                menuBtn.style.display = "block";
            } else {
                menuModal.style.display = "flex";
                menuBtn.style.display = "none";
                closeBtn.style.display = "block";
            }   
        }
    });

    // Close modal if user clicks outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === menuModal) {
            menuModal.style.display = "none";
            closeBtn.style.display = "none";
            menuBtn.style.display = "block";
        }
    });
 
});
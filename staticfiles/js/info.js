document.addEventListener("DOMContentLoaded", function () {
    const infoModal = document.getElementById("info-modal");
    const menuModal = document.getElementById("menu-modal");
    const infoBtn = document.getElementById("info-btn");
    const closeBtn = document.getElementById("close-btn");
    const menuBtn = document.getElementById("menu-btn");

    // Open modal
    infoBtn.addEventListener("click", function () {
        menuModal.style.display = "none";
        infoModal.style.display = "flex";
    });

    // Close modal
    closeBtn.addEventListener("click", function () {
        infoModal.style.display = "none";
        closeBtn.style.display = "none";
        menuBtn.style.display = "block";
    });

});
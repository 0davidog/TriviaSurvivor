document.addEventListener("DOMContentLoaded", function () {
    const profileModal = document.getElementById("profile-modal");
    const menuModal = document.getElementById("menu-modal");
    const profileBtn = document.getElementById("profile-btn");
    const closeBtn = document.getElementById("close-btn");
    const menuBtn = document.getElementById("menu-btn");

    // Open modal
    profileBtn.addEventListener("click", function () {
        menuModal.style.display = "none";
        profileModal.style.display = "flex";
    });

    // Close modal
    closeBtn.addEventListener("click", function () {
        profileModal.style.display = "none";
        closeBtn.style.display = "none";
        menuBtn.style.display = "block";
    });

});
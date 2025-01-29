document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("custom-modal");
    const openBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");

    // Open modal
    openBtn.addEventListener("click", function () {
        modal.style.display = "flex";
        openBtn.style.display = "none";
        closeBtn.style.display = "block";
    });

    // Close modal
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
        closeBtn.style.display = "none";
        openBtn.style.display = "block";
    });

    // Close modal if user clicks outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            closeBtn.style.display = "none";
            openBtn.style.display = "block";
        }
    });
});
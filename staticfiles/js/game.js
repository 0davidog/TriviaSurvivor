document.addEventListener("DOMContentLoaded", function () {

    const titleMenu = document.getElementById("title-menu");
    const homeBtn = document.getElementById("home-btn");
    const topBtn = document.getElementById("top-btn");
    const playBtn = document.getElementById("play-btn");
    const playCard = document.getElementById("play-card");
    const guestBtn = document.getElementById("guest-btn");
    const guestPlayCard = document.getElementById("guest-play-card");

    if(topBtn) {
        topBtn.focus();
    }

    if(homeBtn) {
        window.addEventListener("keydown", function (e) {
            if (e.key === "Home") {
                window.location.href = "/"; // Redirect to the home page
            }
        });}

    if (playBtn) {
        playBtn.addEventListener("click", function () {
            titleMenu.classList.add("hidden");
            playCard.classList.remove("hidden");
    });}

    if (guestBtn) {
        guestBtn.addEventListener("click", function () {
        guestPlayCard.classList.remove("hidden");
        titleMenu.classList.add("hidden");
    });}

});
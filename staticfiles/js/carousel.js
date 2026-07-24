import { getEl } from "./ui.js";

const slides = document.querySelectorAll(".slide");
const nextBtn = getEl("next");
const prevBtn = getEl("prev");

let current = 0;

function showSlide(index) {
    slides[current].classList.remove("active");

    current = index;

    slides[current].classList.add("active");
}

if (nextBtn) {
    document.querySelector("#next").addEventListener("click", () => {
        console.log("next")
    let next = current + 1;

    if (next >= slides.length) {
        next = 0;
    }

    showSlide(next);

});
}

if (prevBtn) {
    document.querySelector("#prev").addEventListener("click", () => {
        console.log("prev")

    let prev = current - 1;

    if (prev < 0) {
        prev = slides.length - 1;
    }

    showSlide(prev);

});
}

// ui.js module - make sure script type="module" when linked.

document.querySelectorAll('.genre-btn').forEach(el => {
    const url = el.dataset.bg;
    if (url) {
        el.style.setProperty('--genre-bg', `url("${url}")`);
    }
});

export const getEl = (id) => document.getElementById(id);

export const toggleVisibility = (id) => {
    const el = getEl(id);
    if (el) el.classList.toggle('hidden');
};

export const updateDialogue = (header, text) => {
    const h = getEl('dialogue-header');
    const t = getEl('dialogue-text');
    if (h) h.textContent = header;
    if (t) t.textContent = text;
};

export const updateLives = (num) => {
    const lifeCounter = getEl('life-counter');
    if (lifeCounter) lifeCounter.innerHTML = `<i class="fa-solid fa-heart-pulse"></i> ${num}`;
    if (num <= 1) {
        lifeCounter.classList.add('error');
        lifeCounter.classList.remove('warning');
        lifeCounter.classList.remove('success');
    } else if (num <= 3) {
        lifeCounter.classList.add('warning');
        lifeCounter.classList.remove('error');
        lifeCounter.classList.remove('success');
    } else {
        lifeCounter.classList.add('success');
        lifeCounter.classList.remove('warning');
        lifeCounter.classList.remove('error');
    }
}

export const updateScore = (num) => {
    const scoreCounter = getEl('score-counter');
    if (scoreCounter) scoreCounter.innerHTML = `<i class="fa-solid fa-star"></i> ${num}`;
}

export const updateInfoBox = (state, result) => {
    const box = getEl("info-box");
    const header = getEl("info-header");
    const text = `
        User: ${state.userName}<br>
        Genre: ${state.genre}<br>
        Difficulty: ${state.difficulty}<br>
        Score: ${state.score}
    `;
    if (header && box) {
        if (result === 'survived') {
            header.textContent = `You Survived`;
            header.classList.add("success");
            box.innerHTML = text;
        } else if (result === 'died') {
            header.textContent = `You Died`;
            header.classList.add('error');
            box.innerHTML = text;
        } else {
            header.textContent = `Game Over`;
            box.innerHTML = text;
        }
    };
};
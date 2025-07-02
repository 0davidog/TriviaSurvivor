// ui.js
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

export const updateInfoBox = (state, result) => {
    const box = getEl("info-box");
    const header = getEl("info-header");
    const text = `
        User: ${state.userName}
        Genre: ${state.genre}
        Difficulty: ${state.difficulty}
    `;
    if (header && box) {
        header.textContent = result === 'survived' ? "You Survived"
                          : result === 'died' ? "You Died"
                          : "Game Over";
        box.textContent = text;
    }
};
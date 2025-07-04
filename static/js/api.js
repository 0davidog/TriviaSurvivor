// api.js
export async function fetchAuthStatus() {
    const res = await fetch('/api/auth-status/');
    return await res.json();
}

export async function fetchQuestions(genre) {
    const res = await fetch(`/api/questions/?genre=${encodeURIComponent(genre)}`);
    const data = await res.json();
    return data.questions.sort(() => Math.random() - 0.5);
}

export async function fetchCreature(genre) {
    const res = await fetch(`/api/creature-name/?genre=${encodeURIComponent(genre)}`);
    return await res.json();
}
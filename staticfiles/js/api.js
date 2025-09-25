// api.js
function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

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

export async function flagQuestion(question, comment, author) {
    console.log("flag question");
    const response = await fetch("/api/flag_question/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({
            question: question,
            comment: comment,
            author: author
        }),
    });

    if (!response.ok) {
        console.error("Error submitting feedback");
    } else {
        console.log("Feedback submitted!");
    }
}
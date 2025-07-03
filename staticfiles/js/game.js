// game.js
import { getEl } from "./ui.js";
import { fetchCreature, fetchQuestions } from "./api.js";

export const gameState = {
    userName: "",
    lives: 5,
    score: 0,
    questionNumber: 0,
    questions: [],
    genre: null,
    difficulty: null
};

export const resetGame = async (genre, diff) => {
    gameState.lives = 5;
    gameState.score = 0;
    gameState.questionNumber = 0;
    gameState.questions = await fetchQuestions(genre);
    console.log(gameState.questions);
    gameState.genre = genre;
    gameState.difficulty = diff;
};


export const formatAnswer = (movie) => `${movie.title} (${movie.year})`;

export const updateImage = async (genre) => {
    try {
        const data = await fetchCreature(genre); // wait for the async call
        const creature = data.creature_name.toLowerCase();     // extract creature name from response
        const imageTag = getEl('creature-view');
        const imageURL = `${STATIC_URL}images/creatures/${creature}_${gameState.lives}.webp`;
        imageTag.src = imageURL;
    } catch (err) {
        console.error('Error updating image:', err);
    }
};
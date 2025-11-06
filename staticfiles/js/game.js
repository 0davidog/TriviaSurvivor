// game.js module - make sure script type="module" when linked.

import { getEl } from "./ui.js";
import { fetchGenre, fetchQuestions } from "./api.js";

export const gameState = {
    stage: 0,
    userName: "",
    userId: null,
    lives: 5,
    score: 0,
    questionNumber: 0,
    questionLimit: 10,
    questions: [],
    genre: null,
    creatureName: "",
    genreId: null,
    difficulty: null,
    survived: false,
    intro: 1,
    chapter: null,
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

export const updateImage = async (genre, imageNum, effect) => {
    console.log('updating image')
    try {
        const data = await fetchGenre(genre); // wait for the async call
        const chapter = data.chapter;
        const creature = data.creature_name.toLowerCase();     // extract creature name from response
        const imageTag = getEl('creature-view');
        imageTag.setAttribute("alt", `${creature} Approaching`);
        const imageURL = `${STATIC_URL}images/game/chapter${chapter}_image${imageNum}_${effect}.webp`;
        console.log(imageURL);
        imageTag.src = imageURL;
    } catch (err) {
        console.error('Error updating image:', err);
    }
};
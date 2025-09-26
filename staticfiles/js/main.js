// main.js module - make sure script type="module" when linked.

import { fetchAuthStatus, fetchCreature, fetchQuestions, flagQuestion, createDjangoMessage } from './api.js';
import { toggleVisibility, updateDialogue, updateInfoBox, updateLives, updateScore, getEl } from './ui.js';
import { gameState, resetGame, formatAnswer, updateImage } from './game.js';

document.addEventListener("DOMContentLoaded", async () => {

    // DOM elements
    const playBtn = getEl("play-btn");
    const guestBtn = getEl("guest-btn");
    const restartBtn = getEl("restart-btn");
    const optionA = getEl("option_a");
    const optionB = getEl("option_b");
    const optionC = getEl("option_c");
    const comBtn = getEl("comment-btn");
    const comBox = getEl("comment-box");

    // Fetch login state and username
    const auth = await fetchAuthStatus();
    if (auth.is_authenticated) {
        gameState.userName = auth.username;
        console.log(`Logged in as: ${gameState.userName} [${auth.id}]`);
    }

    // Game flow
    const handlePlayClick = () => {
        toggleVisibility("title-menu");
        toggleVisibility("play-card");
        setupGenreButtons();
    };

    const setupGenreButtons = () => {

        document.querySelectorAll(".genre-btn").forEach(btn => {
            let creature = btn.dataset.creature.toLowerCase();
            btn.classList.add(`genre-btn-${creature}`);
        })
        
        document.querySelectorAll(".genre-select-btn").forEach(btn => {
            
            btn.addEventListener('click', async () => {
                gameState.genre = btn.dataset.genre;
                toggleVisibility('select-game');
                toggleVisibility('loading-icon');
                gameState.questions = await fetchQuestions(gameState.genre);
                updateImage(gameState.genre);
                toggleVisibility('loading-icon');
                setupDifficultyButtons();
            }, { once: true });
        });
    };

    const setupDifficultyButtons = () => {
        toggleVisibility('select-difficulty');
        document.querySelectorAll('.diff-select-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                gameState.difficulty = btn.dataset.diff;
                toggleVisibility('select-difficulty');
                showDialogue("Welcome", "You are now entering the world of survival trivia...");
                toggleVisibility("image-box");
                updateLives(gameState.lives);
                updateScore(gameState.score);
            }, { once: true });
        });
    };

    const showDialogue = (header, text) => {
        toggleVisibility("dialogue-box");
        updateDialogue(header, text);
        const continueBtn = getEl("continue-btn");
        continueBtn?.addEventListener('click', () => {
            toggleVisibility("dialogue-box");
            nextStep();
        }, { once: true });
    };

    const nextStep = () => {
        if (gameState.lives === 0) return endGame('died');
        if (gameState.questionNumber >= gameState.questions.length) return endGame('survived');
        displayQuestion();
    };

    let currentQuestion = null;  // stores the question currently displayed

    // Attach listener once
    if (comBtn) {
        comBtn.addEventListener('click', () => {
            if (!currentQuestion) return;

            const comText = comBox.value;
            const author = auth.id || null;  // fallback if not logged in

            flagQuestion(currentQuestion.id, comText, author);
            comBox.value = ''; // clear the comment box
        });
    }

    const displayQuestion = () => {
        const q = gameState.questions[gameState.questionNumber];
        currentQuestion = q;  // update current question
        const questionHeader = getEl("question-header");
        const questionText = getEl("question-text");

        toggleVisibility("quiz-box");
        questionHeader.textContent = `Question ${gameState.questionNumber + 1} / ${gameState.questions.length}`;
        questionText.textContent = q.question;

        console.log(q.id);

        const options = [q.option_a, q.option_b, q.option_c]
            .map(formatAnswer)
            .sort(() => Math.random() - 0.5);

        [optionA, optionB, optionC].forEach((btn, i) => btn.textContent = options[i]);
    };

    const checkAnswer = (userAnswer) => {
        const q = gameState.questions[gameState.questionNumber];
        const correct = formatAnswer(q.answer);
        gameState.questionNumber++;

        if (userAnswer === correct) {
            gameState.score++;
            updateScore(gameState.score);
            showDialogue("Correct", "The creature is stunned by your knowledge.");
        } else {
            gameState.lives--;
            updateLives(gameState.lives);
            updateImage(gameState.genre);
            showDialogue("Incorrect", "The creature takes a step forward...");
        }

        toggleVisibility('quiz-box');
    };

    const endGame = (result) => {  
        toggleVisibility("results-box");
        updateInfoBox(gameState, result);
    };

    // Button listeners
    playBtn?.addEventListener('click', handlePlayClick);
    guestBtn?.addEventListener('click', handlePlayClick);

    [optionA, optionB, optionC].forEach(btn => {
        btn?.addEventListener('click', () => checkAnswer(btn.textContent));
    });

    restartBtn?.addEventListener('click', () => {
        toggleVisibility("results-box");
        toggleVisibility('loading-icon');
        resetGame(gameState.genre, gameState.difficulty);
        updateLives(gameState.lives);
        updateScore(gameState.score);
        updateImage(gameState.genre);
        toggleVisibility('loading-icon');
        displayQuestion();
    });
});

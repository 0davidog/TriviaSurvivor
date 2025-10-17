// main.js module - make sure script type="module" when linked.

import { fetchAuthStatus, fetchQuestions, flagQuestion, renderMessage, fetchGenre, recordGame } from './api.js';
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

    let guest = true;

    // Fetch login state and username
    const auth = await fetchAuthStatus();
    if (auth.is_authenticated) {
        guest = false;
        gameState.userName = auth.username;
        gameState.userId = auth.id;
        console.log(`Logged in as: ${gameState.userName} [${auth.id}]`);
    }

    // STAGE 00 TITLE
    const handlePlayClick = () => {
        toggleVisibility("title-menu");
        toggleVisibility("play-card");
        toggleVisibility("image-box");
        playIntro();
    };
    // STAGE 01 GAME INTRO
    const playIntro = () => {
        gameState.stage = 1;
        console.log(`STAGE: ${gameState.stage}. Intro ${gameState.intro}`);
        showDialogue(`Stage ${gameState.stage}. Intro ${gameState.intro}`, "You are now entering the world of survival trivia...");
        gameState.intro++;       
    }
    // DIALOGUE BOX
    const showDialogue = (header, text) => {
        toggleVisibility("dialogue-box");
        updateDialogue(header, text);
        const continueBtn = getEl("continue-btn");
        continueBtn?.addEventListener('click', () => {
            toggleVisibility("dialogue-box");
            nextStep();
        }, { once: true });
    };
    // CHECKPOINT
    const nextStep = () => {
        if (gameState.intro <=3) return playIntro();
        if (gameState.stage === 1) return setupGenreButtons();
        if (gameState.lives === 0) return endGame('died');
        if (gameState.questionNumber >= gameState.questions.length) return (
            gameState.survived = true,
            endGame('survived'));
        displayQuestion();
    };
    // STAGE 02 SELECT GENRE
    const setupGenreButtons = () => {
        gameState.stage = 2;
        console.log(`STAGE: ${gameState.stage}. Genre Select`);
        toggleVisibility("image-box");
        toggleVisibility('select-game');

        document.querySelectorAll(".genre-btn").forEach(btn => {
            let creature = btn.dataset.creature.toLowerCase();
            btn.classList.add(`genre-btn-${creature}`);
        })
        
        document.querySelectorAll(".genre-select-btn").forEach(btn => {
            
            btn.addEventListener('click', async () => {
                let genreData = await fetchGenre(btn.dataset.genre);
                toggleVisibility('select-game');
                toggleVisibility('loading-icon');
                gameState.genre = genreData.genre_name;
                gameState.genreId = genreData.id;
                gameState.creatureName = genreData.creature_name;
                console.log(gameState);
                gameState.questions = await fetchQuestions(gameState.genre);
                updateImage(gameState.genre);
                toggleVisibility('loading-icon');
                setupDifficultyButtons();
            }, { once: true });
        });
    };
    // STAGE 03 SELECT DIFFICULTY
    const setupDifficultyButtons = () => {
        gameState.stage = 3;
        console.log(`STAGE: ${gameState.stage}. Difficulty Select`)
        toggleVisibility('select-difficulty');
        document.querySelectorAll('.diff-select-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                gameState.difficulty = btn.dataset.diff;
                toggleVisibility('select-difficulty');
                toggleVisibility("image-box");
                
                // STAGE 04 GENRE INTRO
                showDialogue(`Chapter 01: The ${gameState.creatureName}`, `Creature: ${gameState.creatureName}. Spooky text.`);
                gameState.stage = 4;
                console.log(`STAGE: ${gameState.stage}. Genre Intro`)
                updateLives(gameState.lives);
                updateScore(gameState.score);
            }, { once: true });
        });
    };

    // FLAG QUESTION
    let currentQuestion = null;  // stores the question currently displayed
    if (comBtn) {
        comBtn.addEventListener('click', () => {
            if (!currentQuestion) return;

            const comText = comBox.value;
            const author = auth.id || null;  // fallback if not logged in

            flagQuestion(currentQuestion.id, comText, author);
            comBox.value = ''; // clear the comment box
        });
    }

    // STAGE 05 QUESTIONS
    const displayQuestion = () => {
        gameState.stage++;
        console.log(`STAGE: ${gameState.stage} QUESTION: ${gameState.questionNumber+1}`);
        const q = gameState.questions[gameState.questionNumber];
        currentQuestion = q;  // update current question
        const questionHeader = getEl("question-header");
        const questionText = getEl("question-text");

        toggleVisibility("quiz-box");
        questionHeader.textContent = `Question ${gameState.questionNumber + 1} / ${gameState.questions.length}`;
        questionText.textContent = q.question;

        console.log(`QUESTION ID: ${q.id}`);

        const options = [q.option_a, q.option_b, q.option_c]
            .map(formatAnswer)
            .sort(() => Math.random() - 0.5);

        [optionA, optionB, optionC].forEach((btn, i) => btn.textContent = options[i]);
    };

    const checkAnswer = (userAnswer) => {
        const q = gameState.questions[gameState.questionNumber];
        const correct = formatAnswer(q.answer);
        gameState.questionNumber++;
        gameState.stage++;

        if (userAnswer === correct) {
            gameState.score++;
            updateScore(gameState.score);
            console.log(`STAGE: ${gameState.stage}. Dialogue`)
            showDialogue("Correct", `The ${gameState.creatureName} is stunned by your knowledge.`);
        } else {
            gameState.lives--;
            updateLives(gameState.lives);
            updateImage(gameState.genre);
            console.log(`STAGE: ${gameState.stage}. Dialogue`)
            showDialogue("Incorrect", `The ${gameState.creatureName} takes a step forward...`);
        }

        toggleVisibility('quiz-box');
    };

    const endGame = (result) => { 
        console.log("STAGE: END")
        toggleVisibility("results-box");
        console.log(gameState);
        updateInfoBox(gameState, result);
        if (!guest) {
            recordGame(gameState);
        }
        
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

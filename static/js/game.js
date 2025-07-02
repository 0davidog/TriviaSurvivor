// game.js
export const gameState = {
    userName: "",
    lives: 5,
    questionNumber: 0,
    questions: [],
    genre: null,
    difficulty: null
};

export const resetGame = () => {
    gameState.lives = 5;
    gameState.questionNumber = 0;
    gameState.questions = [];
    gameState.genre = null;
    gameState.difficulty = null;
};

export const formatAnswer = (movie) => `${movie.title} (${movie.year})`;

export const updateInfo = () => {
    console.log(`
        User: ${gameState.userName}
        Genre: ${gameState.genre}
        Difficulty: ${gameState.difficulty}
        Lives: ${gameState.lives}
    `);
};
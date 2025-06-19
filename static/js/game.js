document.addEventListener("DOMContentLoaded", function () {
    
    // Defining Constants...
    const playBtn = document.getElementById("play-btn");
    const guestBtn = document.getElementById("guest-btn");
    const selectGameWindow = document.getElementById("select-game");
    const questionHeader = document.getElementById("question-header");
    const questionText = document.getElementById("question-text");
    const optionA = document.getElementById("option_a");
    const optionB = document.getElementById("option_b");
    const optionC = document.getElementById("option_c");
    

    // function to hide or display div containers
    // takes window (javascript name) and id (element id) as parameters
    const windowVis = (window, id) => {
        window = document.getElementById(id);
        if (window.classList.contains("hidden")) {
            window.classList.remove("hidden");
        } else {
            window.classList.add("hidden");
        }
    }

    // Establishing User Information...
    let userName = "";
    fetch('/api/auth-status/')
    .then(response => response.json())
    .then(data => {
        if (data.is_authenticated) {
            userName = data.username;
            console.log("User is logged in as:", userName);
            
        } else {
            console.log("User is not authenticated.");
        }
    })
    .catch(error => console.error('Error fetching auth status:', error));

    //Setting adjustable game variables
    let lives = 5;
    let questionNumber = 0;
    let userScore = 0;

    // Empty variable to set randomised questions in
    let questionSet;

    // Empty variable to set game modes
    let gameGenre;
    let gameDiff;

    if (playBtn) {
        playBtn.addEventListener("click", function () {
            windowVis('titleMenu', 'title-menu');
            windowVis('playCard', 'play-card');
            selectGenre();
    });}

    if (guestBtn) {
        guestBtn.addEventListener("click", function () {
            windowVis('playCard', 'play-card');
            windowVis('titleMenu', 'title-menu');
            selectGenre();
    });} 

    function updateInfo() {
        console.log(`
            User: ${userName} 
            Genre: ${gameGenre} 
            Difficulty: ${gameDiff}
            Score: ${userScore}
            Lives: ${lives}
            `);
    }

    function selectGenre() {
        const genreButtons = document.querySelectorAll('.genre-select-btn');
            if (genreButtons) {

        // Loop through each button and add an event listener

        genreButtons.forEach(button => {

            const genre = button.dataset.genre;

            button.addEventListener('click', function () {

                gameGenre = genre;
                selectGameWindow.classList.add("hidden");
                windowVis('loadingIcon', 'loading-icon');

                // Retrieve questions from database filtered by genre
                fetch(`/api/questions/?genre=${encodeURIComponent(gameGenre)}`).then(response => response.json()).then(data => {
                questionSet = data.questions.sort(
                    () => Math.random() - 0.5
                );
                
                windowVis('loadingIcon', 'loading-icon');

                console.log("Fetched Questions:", questionSet);
                updateInfo();
                selectDifficulty();

            }).catch(error => console.error('Error fetching questions:', error));
            });

        });
    }
    }

    function selectDifficulty() {
        windowVis('selectDiffWindow', 'select-difficulty');
        const diffButtons = document.querySelectorAll('.diff-select-btn');
        if (diffButtons) {
        // Loop through each button and add an event listener
        diffButtons.forEach(button => {
            const diff = button.dataset.diff;
            button.addEventListener('click', function () {
                gameDiff = diff
                windowVis('selectDiffWindow', 'select-difficulty');
                updateInfo();
                changeDialogue('Welcome', 'You are now entering the world of survival trivia...');
            }, { once: true });
        });
    }
    }

    const changeDialogue = (header, dialogue) => {
        windowVis('dialogueBox', 'dialogue-box');
        const dialogueHeader = document.getElementById("dialogue-header");
        const dialogueText = document.getElementById("dialogue-text");
        const continueBtn = document.getElementById("continue-btn");
        dialogueHeader.textContent = header;
        dialogueText.textContent = dialogue;
        if (continueBtn) {
            continueBtn.addEventListener('click', function () {
                windowVis('dialogueBox', 'dialogue-box');
                checkPoint();
            }, { once: true })
        };
    }

    const checkPoint = () => {
        if (lives === 0) {
            endGame('died');
        } else if (questionNumber + 1 <= questionSet.length) {
            console.log(`Current Question: ${questionNumber + 1} / ${questionSet.length}`);
            displayQuestion();
        } else {
            endGame('survived');
        }

    }

    const displayQuestion = () => {
        windowVis('quizBox', 'quiz-box');
        let qN = questionNumber;
        questionHeader.textContent = `Question ${qN + 1} / ${questionSet.length}`;
        questionText.textContent = `${questionSet[qN].question}`;
        const options = [
            {text: `${questionSet[qN].option_a.title} (${questionSet[qN].option_a.year})`},
            {text: `${questionSet[qN].option_b.title} (${questionSet[qN].option_b.year})`},
            {text: `${questionSet[qN].option_c.title} (${questionSet[qN].option_c.year})`},
        ]

        // Shuffle the options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        optionA.textContent = options[0].text;
        optionB.textContent = options[1].text;
        optionC.textContent = options[2].text;
    }

    const optionButtons = [optionA, optionB, optionC];

    optionButtons.forEach(button => {
        let userAnswer;
        
        button.addEventListener('click', function () {
            console.log("You clicked:", this.textContent);
            userAnswer = this.textContent;
            windowVis('quizBox', 'quiz-box');
            checkAnswer(userAnswer);
        });
    });

    const checkAnswer = (userAnswer) => {
        let qN = questionNumber;
        let correctAnswer = `${questionSet[qN].answer.title} (${questionSet[qN].answer.year})`
        if (userAnswer === correctAnswer) {
                userScore++;
                questionNumber++;
                updateInfo();
                changeDialogue('Correct', 'The creature is stunned by your knowledge.');
            } else {
                lives--;
                questionNumber++;
                updateInfo();
                changeDialogue('Incorrect', 'The creature takes a step forward...');
            }
        
    }

    const endGame = (result) => {
        const infoBox = document.getElementById("info-box");
        const infoHeader = document.getElementById("info-header");
        windowVis('resultsBox', 'results-box');
        if (result === 'survived') {
            infoHeader.textContent = 'You Survived';
            infoBox.textContent = `
            User: ${userName}
            Genre: ${gameGenre}
            Difficulty: ${gameDiff}
            Score: ${userScore}
            `
        } else if (result === 'died') {
            infoHeader.textContent = 'You Died';
            infoBox.textContent = `
            User: ${userName} 
            Genre: ${gameGenre} 
            Difficulty: ${gameDiff}
            Score: ${userScore}
            `
        } else {
            infoHeader.textContent = 'Game Over';
            infoBox.textContent = `
            User: ${userName} 
            Genre: ${gameGenre} 
            Difficulty: ${gameDiff}
            Score: ${userScore}
            `
        }
    }

});



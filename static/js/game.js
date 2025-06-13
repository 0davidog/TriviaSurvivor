document.addEventListener("DOMContentLoaded", function () {
    
    // Defining Constants...
    const titleMenu = document.getElementById("title-menu");
    const homeBtn = document.getElementById("home-btn");
    const playBtn = document.getElementById("play-btn");
    const playCard = document.getElementById("play-card");
    const guestBtn = document.getElementById("guest-btn");
    const genreButtons = document.querySelectorAll('.genre-select-btn');
    const diffButtons = document.querySelectorAll('.diff-select-btn');
    const selectGameWindow = document.getElementById("select-game");
    const selectDiffWindow = document.getElementById("select-difficulty");
    const quizBox = document.getElementById("quiz-box");
    const questionHeader = document.getElementById("question-header");
    const questionText = document.getElementById("question-text");
    const optionA = document.getElementById("option_a");
    const optionB = document.getElementById("option_b");
    const optionC = document.getElementById("option_c");
    const infoBox = document.getElementById("info-box");
    const resultsbox = document.getElementById("results-box");
    const loadingIcon = document.getElementById("loading-icon");

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
    let quizLength = 10;
    let questionNumber = 0;
    let userScore = 0;

    // Empty variable to set randomised questions in
    let questionSet;

    // Empty variable to set game modes
    let gameGenre;
    let gameDiff;


    if(homeBtn) {
        window.addEventListener("keydown", function (e) {
            if (e.key === "Home") {
                window.location.href = "/"; // Redirect to the home page
            }
        });}

    if (playBtn) {
        playBtn.addEventListener("click", function () {
            titleMenu.classList.add("hidden");
            playCard.classList.remove("hidden");
            selectGenre();
    });}

    if (guestBtn) {
        guestBtn.addEventListener("click", function () {
            playCard.classList.remove("hidden");
            titleMenu.classList.add("hidden");
            selectGenre();
    });} 

    function updateInfo() {
        console.log(`
            User: ${userName} 
            Genre: ${gameGenre} 
            Difficulty: ${gameDiff}
            Score: ${userScore}
            `);
    }

    function selectGenre() {
            if (genreButtons) {

        // Loop through each button and add an event listener

        genreButtons.forEach(button => {

            const genre = button.dataset.genre;

            button.addEventListener('click', function () {

                gameGenre = genre;
                selectGameWindow.classList.add("hidden");
                loadingIcon.classList.remove("hidden");

                // Retrieve questions from database filtered by genre
                fetch(`/api/questions/?genre=${encodeURIComponent(gameGenre)}`).then(response => response.json()).then(data => {
                questionSet = data.questions.sort(
                    () => Math.random() - 0.5
                );
                
                loadingIcon.classList.add("hidden");
                selectDiffWindow.classList.remove("hidden");

                console.log("Fetched Questions:", questionSet);
                updateInfo();
                selectDifficulty();

            }).catch(error => console.error('Error fetching questions:', error));
            });

        });
    }
    }


    function selectDifficulty() {
        if (diffButtons) {
        // Loop through each button and add an event listener
        diffButtons.forEach(button => {
            const diff = button.dataset.diff;
            button.addEventListener('click', function () {
                gameDiff = diff
                selectDiffWindow.classList.add("hidden");
                quizBox.classList.remove("hidden");
                updateInfo();
                displayQuestion();
            });
        });
    }
    }
    

    function displayQuestion() {
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
            checkAnswer(userAnswer);
        });
    });

    function checkAnswer(userAnswer) {
        let qN = questionNumber;
        let correctAnswer = `${questionSet[qN].answer.title} (${questionSet[qN].answer.year})`
        if (userAnswer === correctAnswer) {
                console.log("Riiiiiight!");
                userScore++;
                updateInfo();
            } else {
                console.log("wrong!");
            }
        if (questionNumber + 1 < questionSet.length) {
            questionNumber++;
            console.log(`Current Question: ${questionNumber + 1} / ${questionSet.length}`)
            displayQuestion();
        } else {
            console.log("STOP!");
            quizBox.classList.add("hidden");
            resultsbox.classList.remove("hidden");
            infoBox.textContent = `
            User: ${userName} 
            Genre: ${gameGenre} 
            Difficulty: ${gameDiff}
            Score: ${userScore}
            `
        }
    }

});
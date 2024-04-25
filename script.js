const quizData = [
    {
      question: 'What can be defined as a systematic process or sequence of steps that are followed to gather, process, analyze, and interpret data or information to derive meaningful insights, make informed decisions, or solve problems?',
      options: ['Scrum methodology', 'Waterfall model', 'Analysis workflow', 'Pair programming'],
      answer: 'Analysis workflow',
    },
    {
      question: 'What is the core task of the software team that involves a cycle of coding, testing, and refining?',
      options: ['Core group', 'Core workflow', 'Design workflow', 'Evolution-tree life-cycle model'],
      answer: 'Core workflow',
    },
    {
      question: "What is the process in software development that involves planning and outlining the software's structure and features?",
      options: ['Core group', 'Core workflow', 'Design workflow', 'Evolution-tree life-cycle model'],
      answer: 'Design workflow',
    },
    {
      question: 'Which workflow at the beginning of the software development life cycle has a decreasing relative importance as the project progresses?',
      options: ['Implementation workflow', 'Requirements workflow', 'Risk management workflow', 'Design workflow'],
      answer: 'Requirements workflow',
    },
    {
        question: "Which workflow in software development involves the iterative process of modifying code based on test outcomes and constitutes the primary activity of the software team?",
        options: [
          "Implementation workflow",
          "Requirements workflow",
          "Risk management workflow",
          "Design workflow"
        ],
        answer: "Implementation workflow"
    },
    {
        question: "What are the various features that the client would like the software product to support called?",
        options: ["Stabilization", "Stand-up meetings", "Stories", "Synchronize"],
        answer: "Stories"
      },
      {
        question: "In stepwise refinement, how are different aspects of a software system handled?",
        options: ["Randomly", "All at once", "In no particular order", "In order of current importance"],
        answer: "In order of current importance"
      },
      {
        question: "What is performed at the end of each software build where any remaining faults detected so far are fixed?",
        options: ["Stabilization", "Stand-up meetings", "Stepwise refinement", "Synchronize"],
        answer: "Stabilization"
      },
      {
        question: "Which life-cycle model is known for its linear sequential flow, where progress is seen as flowing steadily downwards through phases like a waterfall?",
        options: ["Incremental model", "Waterfall life-cycle model", "Iterative model", "Iterative-and-incremental life-cycle model"],
        answer: "Waterfall life-cycle model"
      },
      {
        question: "Which software development approach divides the development process into small iterations or cycles?",
        options: ["Waterfall life-cycle model", "Incremental model", "Iterative model", "Iterative-and-incremental life-cycle model"],
        answer: "Iterative model"
      },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();
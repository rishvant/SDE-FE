let questions = [
  { text: 'How satisfied are you with our products?', type: 'rating' },
  { text: 'How fair are the prices compared to similar retailers?', type: 'rating' },
  { text: 'How satisfied are you with the value for money of your purchase?', type: 'rating' },
  { text: 'On a scale of 1-10, how would you recommend us to your friends and family?', type: 'rating' },
  { text: 'What could we do to improve our service?', type: 'text' },
];

function startSurvey() {
  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('survey-form').style.display = 'block';
  renderQuestion(0);
}

function renderQuestion(index) {
  const currentQuestion = questions[index];
  document.getElementById('question-number').innerText = `Question ${index + 1}/${questions.length}`;
  document.getElementById('current-question').value = index;
  document.getElementById('question-label').innerText = currentQuestion.text;

  if (index < questions.length - 1) {
    document.getElementById('rating-options').style.display = 'block';
    document.getElementById('answer-textarea').style.display = 'none';

    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach((radio) => {
      radio.checked = false;
    });
  }
  else {
    document.getElementById('rating-options').style.display = 'none';
    document.getElementById('answer-textarea').style.display = 'block';
  }
}

function prevQuestion() {
  const currentQuestionIndex = parseInt(document.getElementById('current-question').value);
  if (currentQuestionIndex > 0) {
    renderQuestion(currentQuestionIndex - 1);
  }
}

function nextQuestion() {
  const currentQuestionIndex = parseInt(document.getElementById('current-question').value);
  if (currentQuestionIndex < questions.length - 1) {
    renderQuestion(currentQuestionIndex + 1);
  }
}

function skipQuestion() {
  const currentQuestionIndex = parseInt(document.getElementById('current-question').value);
  if (currentQuestionIndex < questions.length - 1) {
    renderQuestion(currentQuestionIndex + 1);
  } else {
    document.getElementById('survey-form').style.display = 'none';
    document.getElementById('thank-you-message').style.display = 'block';
    setTimeout(() => {
      document.getElementById('thank-you-message').style.display = 'none';
      document.getElementById('welcome-screen').style.display = 'block';
    }, 5000);
  }
}

function submitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const submittedAnswers = {};
  formData.forEach((value, key) => {
    submittedAnswers[key] = value;
  });

  $.ajax({
    type: 'POST',
    url: '/submit',
    data: submittedAnswers,
    success: function () {
      console.log('Survey submitted successfully');
    },
    error: function (error) {
      console.error('Error submitting survey:', error);
    }
  });

  document.getElementById('survey-form').reset();
}

function submitConfirmation() {
  const confirmation = confirm('Are you sure you want to submit the survey?');
  if (confirmation) {
    console.log('Survey submitted and marked as COMPLETED');
    document.getElementById('survey-form').style.display = 'none';
    document.getElementById('thank-you-message').style.display = 'block';
    setTimeout(() => {
      document.getElementById('thank-you-message').style.display = 'none';
      document.getElementById('welcome-screen').style.display = 'block';
    }, 5000);
  }
}

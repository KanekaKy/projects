const questions = [
	{
		question:
			'1 - Which of the following is a valid type of function javascript supports?',
		answers: [
			'A - Named function',
			'B - Anonymous function',
			'C - Character function',
			'D - A and B',
			'E - None of above',
		],
		correctAnswerIndex: 3,
		feedback: 'The answer is D',
	},
	{
		question:
			'2 - Which built-in method returns the character at the specified index?',
		answers: [
			'A - characterAt()',
			'B - getCharAt()',
			'C - charAt()',
			'D - setCharAt()',
			'E - None of the above',
		],
		correctAnswerIndex: 2,
		feedback: 'The answer is C.',
	},
	{
		question:
			'3 - Which built-in method returns the calling string value converted to upper case?',
		answers: [
			'A - toUpperCase()',
			'B - toUpper()',
			'C - changeCase(case)',
			'D - upperCase()',
			'E - None of the above.',
		],
		correctAnswerIndex: 0,
		feedback: 'The answer is A.',
	},
	{
		question:
			'4 - Which of the following jQuery method returns true if the specified class is present on at least one of the set of matched elements?',
		answers: [
			'A - hasCSSClass( class )',
			'B - hasStyleClass( class )',
			'C - hasClass( class )',
			'D - has(class) ',
			'E - None of the above.',
		],
		correctAnswerIndex: 2,
		feedback: 'The answer is C',
	},
	{
		question:
			'5. Which of the following jQuery method removes elements matching the specified selector from the set of matched elements?',
		answers: [
			'A - getNotEquals(selector)',
			'B - isNotEquals(selector)',
			'C - notEqual(selector)',
			'D - not(selector)',
			'E - None of the above.',
		],
		correctAnswerIndex: 3,
		feedback: 'The answer is D.',
	},
	{
		question:
			'6 - Which of the following jQuery method gets a set of elements containing the unique next siblings of each of the given set of elements?',
		answers: [
			'A - next( selector)',
			'B - getNext(selector)',
			'C - locateNext(selector)',
			'D - B and C',
			'E - None of the above.',
		],
		correctAnswerIndex: 0,
		feedback: 'The answer is A.',
	},
	{
		question:
			'7 - Which of the following jQuery method sets the height property of an element?',
		answers: [
			'A - setCSSHeight( value )',
			'B - setHeight( value)',
			'C - height(value)',
			'D - getHeight(value)',
			'E - height(value)',
		],
		correctAnswerIndex: 4,
		feedback: 'The answer is E.',
	},
	{
		question:
			'8 - Which of the following jQuery method gets the current offset of the first matched element, in pixels, relative to the document?',
		answers: [
			'A - offset( )',
			'B - offsetParent( )',
			'C - position( )',
			'D - getOffset()',
			'E - None of the above.',
		],
		correctAnswerIndex: 0,
		feedback: 'The answer is A.',
	},
	{
		question:
			'9 - Which of the following jQuery method stops the rest of the event handlers from being executed?',
		answers: [
			'A - preventDefault( )',
			'B - stopImmediatePropagation( )',
			'C - stopPropagation( )',
			'D - stop()',
			'E - None of the above.',
		],
		correctAnswerIndex: 1,
		feedback: 'The answer is B.',
	},
	{
		question:
			'10 - Which of the following jQuery method loads and executes a JavaScript file using an HTTP GET request?',
		answers: [
			'A - jQuery.get( url, [data], [callback], [type] )',
			'B - jQuery.getJSON( url, [data], [callback] )',
			'C - jQuery.getScript( url, [callback] )',
			'D - jQuery.post( url, [data], [callback], [type] )',
			'E - None of the above.',
		],
		correctAnswerIndex: 2,
		feedback: 'The answer is C.',
	},
];

let currentQuestion = 0;
let numberOfCorrect = 0;
let quizBtn = document.getElementById('myBtn');
let quizNext =  document.getElementById('next');

function renderQA() {
	let questionAndAnswerHtml = '';
	answers = questions[currentQuestion].answers;
	question = questions[currentQuestion].question;
	if (currentQuestion < questions.length) {
		quizBtn.value = 'Submit Answer';
		quizNext.value = 'Next Question';
		questionAndAnswerHtml += `<legend>${questions[currentQuestion]
			.question}</legend>`;
		for (let i = 0; i < answers.length; i++) {
			questionAndAnswerHtml +=
				"<div class= 'radioButtons'> <label><input  type='radio' name='radioOption' value='" +
				i +
				"'/>" +
				answers[i] +
				'</label></div>';
		}
		$('#question').html(questionAndAnswerHtml);
		if (currentQuestion == questions.length - 1) {
				quizNext.value = 'Submit Quiz';
		}
	} else {
		renderResult();
		$(quizBtn).hide();
	}
}

function questionStatus() {
	$('.questionStatus').html(`<p>Question ${currentQuestion + 1} out of 10</p>`);
}

function renderNextQuestion() {
	currentQuestion++;
	renderQA();
}

function evaluateAnswer() {
	const isCorrect =
		$('input[name=radioOption]:checked').val() ==
		questions[currentQuestion].correctAnswerIndex;
	if (isCorrect) {
		numberOfCorrect++;
	}
	renderAnswerFeedback(isCorrect);
}

function renderAnswerFeedback(isCorrect) {
  $(".popupFeedback").show();
  if (isCorrect){
    $(".popupFeedback").html("You got it right!");
  } else {
     $(".popupFeedback").html(`Wrong Answer! The correction is ${questions[currentQuestion].answers[questions[currentQuestion].correctAnswerIndex]}`);
  }
}


function renderFeedback() {
	// let the user know how many they have right
	$('.feedback').html(`<p>You have answered ${numberOfCorrect} correctly 
  out of ${questions.length}</p>`);
}

function renderResult(){
  $("#question").html("<h1>You have finished the quiz!</h1><p class='result'>You scored a total of " + numberOfCorrect + " out of " + questions.length + "</h1>");
  $(quizBtn).hide();
  $(".popupFeedback").hide();
  $(".feedback").hide();
}

function renderRestart(e) {
	e.preventDefault();
	currentQuestion = 0;
	numberOfCorrect = 0;
	$(quizBtn).show();
	$('.restartQuiz').hide();
	$('.feedback').show();
	$('.questionStatus').show();
	questionStatus();
	renderQA();
	renderFeedback();
}

function bindStartQuizClick() {
	$('.startQuiz').click(function(e) {
		e.preventDefault();
		$('.container').hide();
		$('.allQuestions').fadeIn(1000);
		renderQA();
		questionStatus();
	});
}

function determineRenderType() {
	if (currentQuestion < questions.length - 1) {
		renderNextQuestion();
		questionStatus();
	} else {
	  currentQuestion++;
		renderResult();
    $("#myBtn").hide();
     $(".questionStatus").hide();
    $(quizBtn).hide();
		$(".popupFeedback").hide();
		$(".restartQuiz").show();
	}
}

function bindSubmitAnswer() {
	$('form').on('submit', function(e) {
		e.preventDefault();
		if ($('input[name=radioOption]:checked').length !== 0) {
			evaluateAnswer();
			renderFeedback();
			// only call this when the user hits "Next" button
			$('#next').show();
			$('#myBtn').hide();
		} else {
			$('.popupFeedback').show();
			$('.popupFeedback').html(
				'<p>You need to select an answer   to proceed!</p>'
			);
		}
	});
}
function bindGoToNextQuestionClick() {
	$('#next').on('click', function(e) {
		determineRenderType();
		$('#next').hide();
		console.log(currentQuestion, questions.length);
		if(currentQuestion < questions.length){
		  $('#myBtn').show();
		}
		$('.popupFeedback').hide();
	});
}

function bindRestartClick() {
	$('.restartQuiz').on('click', function(e) {
		renderRestart(e);
	});
}

function initializeQuizApp() {
	$('.allQuestions').hide();
	bindGoToNextQuestionClick();
	bindStartQuizClick();
	bindSubmitAnswer();
	bindRestartClick();
	$('.popupFeedback').hide();
	$('.restartQuiz').hide();
}

$(document).ready(function() {
	initializeQuizApp();
});

import he from "he";

export function formatQuestions(questions) {
  return questions.map(
    ({ question, correct_answer, incorrect_answers }, index) => {
      const correctAnswer = he.decode(correct_answer);
      const incorrectAnswers = incorrect_answers.map((answer) =>
        he.decode(answer),
      );
      const answers = shuffle([correctAnswer, ...incorrectAnswers]);

      return {
        question: he.decode(question),
        answers,
        correctAnswer: correctAnswer,
        selectedAnswer: null,
      };
    },
  );
}

/**
 * Durstenfeld's version of the Fisher — Yates shuffle algorithm.
 * See more: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

/**
 * Scroll to the top of the window.
 */
export const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

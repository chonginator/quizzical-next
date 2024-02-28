export const TRIVIA_API_CATEGORIES_URL = "https://opentdb.com/api_category.php";
export const TRIVIA_API_BASE_URL = "https://opentdb.com/api.php?";
export const TRIVIA_API_RATE_LIMIT_IN_SECONDS = 5;

export const NUMBER_OF_QUESTIONS_OPTIONS = [10, 20, 30, 40, 50];
export const QUESTION_DIFFICULTIES = [
  "Any Difficulty",
  "Easy",
  "Medium",
  "Hard",
];
export const QUESTION_TYPES = ["Any Type", "Multiple", "Boolean"];

export const DEFAULT_TRIVIA_CATEGORY = { id: 0, name: "Any Category" };
export const DEFAULT_NUMBER_OF_QUESTIONS = NUMBER_OF_QUESTIONS_OPTIONS[0];
export const DEFAULT_QUESTION_DIFFICULTY = QUESTION_DIFFICULTIES[0];
export const DEFAULT_QUESTION_TYPE = QUESTION_TYPES[0];

export const DEFAULT_NUMBER_OF_ANSWERS = 4;

export const NUMBER_OF_CATEGORY_TOGGLE_SKELETONS = 20;
export const NUMBER_OF_QUESTION_AMOUNT_TOGGLE_SKELETONS = 5;
export const NUMBER_OF_DIFFICULTY_TOGGLE_SKELETONS = 4;
export const NUMBER_OF_QUESTION_TYPE_TOGGLE_SKELETONS = 3;

export const COLOURS = {
  "--colour-primary-50": "hsl(231, 42%, 90%)",
  "--colour-primary-100": "hsl(230, 61%, 90%)",
  "--colour-primary-500": "hsl(230, 34%, 46%)",
  "--colour-primary-700": "hsl(231, 42%, 28%)",
  "--colour-gray-50": "hsl(220, 43%, 97%)",
  "--colour-gray-100": "hsl(225, 47%, 93%)",
  "--colour-gray-300": "hsl(233, 17%, 63%)",
  "--colour-success": "hsl(133, 46%, 71%)",
  "--colour-error": "hsl(360, 81%, 85%)",
};

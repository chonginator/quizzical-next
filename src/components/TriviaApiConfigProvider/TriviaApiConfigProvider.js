"use client";

import React from "react";

import {
  DEFAULT_TRIVIA_CATEGORY,
  DEFAULT_NUMBER_OF_QUESTIONS,
  DEFAULT_QUESTION_DIFFICULTY,
  DEFAULT_QUESTION_TYPE,
  TRIVIA_API_BASE_URL,
} from "@/constants";

export const TriviaApiConfigContext = React.createContext();

function TriviaApiConfigProvider({ children }) {
  const [categoryId, setCategoryId] = React.useState(
    DEFAULT_TRIVIA_CATEGORY.id,
  );

  const [numOfQuestions, setNumOfQuestions] = React.useState(
    DEFAULT_NUMBER_OF_QUESTIONS,
  );

  const [difficulty, setDifficulty] = React.useState(
    DEFAULT_QUESTION_DIFFICULTY,
  );

  const [questionType, setQuestionType] = React.useState(DEFAULT_QUESTION_TYPE);

  const categorySearchParam =
    categoryId === DEFAULT_TRIVIA_CATEGORY.id ? null : `category=${categoryId}`;

  const numOfQuestionsSearchParam = `amount=${numOfQuestions}`;

  const difficultySearchParam =
    difficulty === DEFAULT_QUESTION_DIFFICULTY
      ? null
      : `difficulty=${difficulty.toLowerCase()}`;

  const questionTypeSearchParam =
    questionType === DEFAULT_QUESTION_TYPE
      ? null
      : `type=${questionType.toLowerCase()}`;

  const triviaApiUrlSearchParams = [
    numOfQuestionsSearchParam,
    categorySearchParam,
    difficultySearchParam,
    questionTypeSearchParam,
  ]
    .filter((searchParam) => searchParam !== null)
    .join("&");

  const triviaApiUrl =
    TRIVIA_API_BASE_URL +
    new URLSearchParams(triviaApiUrlSearchParams).toString();

  const value = React.useMemo(() => {
    return {
      categoryId,
      setCategoryId,

      numOfQuestions,
      setNumOfQuestions,

      difficulty,
      setDifficulty,

      questionType,
      setQuestionType,

      triviaApiUrl,
    };
  }, [categoryId, difficulty, numOfQuestions, questionType, triviaApiUrl]);

  return (
    <TriviaApiConfigContext.Provider value={value}>
      {children}
    </TriviaApiConfigContext.Provider>
  );
}

export default TriviaApiConfigProvider;

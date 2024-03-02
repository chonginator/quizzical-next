"use client";

import React from "react";
import Cookies from "js-cookie";

import {
  DEFAULT_TRIVIA_CATEGORY,
  DEFAULT_NUMBER_OF_QUESTIONS,
  DEFAULT_QUESTION_DIFFICULTY,
  DEFAULT_QUESTION_TYPE,
  TRIVIA_API_BASE_URL,
  TRIVIA_API_RATE_LIMIT_IN_SECONDS,
} from "@/constants";

export const TriviaApiConfigContext = React.createContext();

function TriviaApiConfigProvider({
  rateLimitSecondsLeft: savedRateLimitSecondsLeft,
  children,
}) {
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

  const [rateLimitSecondsLeft, setRateLimitSecondsLeft] = React.useState(
    savedRateLimitSecondsLeft,
  );

  React.useEffect(() => {
    const savedRateLimitSecondsLeft = Cookies.get("rateLimitSecondsLeft") || 0;
    setRateLimitSecondsLeft(savedRateLimitSecondsLeft);
  }, []);

  const resetRateLimitSecondsLeft = React.useCallback(() => {
    Cookies.set("rateLimitSecondsLeft", TRIVIA_API_RATE_LIMIT_IN_SECONDS, {
      expires: 1000,
    });
    setRateLimitSecondsLeft(TRIVIA_API_RATE_LIMIT_IN_SECONDS);
  }, []);

  const decrementRateLimitSecondsLeft = React.useCallback(() => {
    const nextRateLimitSecondsLeft = Math.max(0, rateLimitSecondsLeft - 1);
    Cookies.set("rateLimitSecondsLeft", nextRateLimitSecondsLeft);
    setRateLimitSecondsLeft(nextRateLimitSecondsLeft);
  }, [rateLimitSecondsLeft]);

  React.useEffect(() => {
    if (!rateLimitSecondsLeft) {
      return;
    }

    const intervalId = window.setInterval(() => {
      decrementRateLimitSecondsLeft();
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [
    decrementRateLimitSecondsLeft,
    rateLimitSecondsLeft,
    resetRateLimitSecondsLeft,
  ]);

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
      rateLimitSecondsLeft,
      resetRateLimitSecondsLeft,
      decrementRateLimitSecondsLeft,

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
  }, [
    rateLimitSecondsLeft,
    resetRateLimitSecondsLeft,
    decrementRateLimitSecondsLeft,
    categoryId,
    numOfQuestions,
    difficulty,
    questionType,
    triviaApiUrl,
  ]);

  return (
    <TriviaApiConfigContext.Provider value={value}>
      {children}
    </TriviaApiConfigContext.Provider>
  );
}

export default TriviaApiConfigProvider;

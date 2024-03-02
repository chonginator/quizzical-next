"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { TriviaApiConfigContext } from "@/components/TriviaApiConfigProvider";
import ToggleGroup, { ToggleGroupItem } from "@/components/ToggleGroup";

import {
  NUMBER_OF_QUESTIONS_OPTIONS,
  QUESTION_DIFFICULTIES,
  QUESTION_TYPES,
} from "@/constants";

import styles from "./StartMenuControls.module.css";

function StartMenuControls({ triviaCategories }) {
  const router = useRouter();

  const {
    categoryId,
    setCategoryId,

    numOfQuestions,
    setNumOfQuestions,

    difficulty,
    setDifficulty,

    questionType,
    setQuestionType,

    rateLimitSecondsLeft,
  } = React.useContext(TriviaApiConfigContext);

  function handleStartTrivia() {
    router.push("/trivia");
  }

  return (
    <div className={styles.wrapper}>
      <ToggleGroup>
        <p className={styles.heading}>Category</p>
        <div className={styles.toggleGroup}>
          {triviaCategories.map(({ id, name }) => (
            <ToggleGroupItem
              key={id}
              isSelected={id === categoryId}
              onClick={() => setCategoryId(id)}
            >
              {name}
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>

      <ToggleGroup>
        <p className={styles.heading}>Number of Questions</p>
        <div className={styles.toggleGroup}>
          {NUMBER_OF_QUESTIONS_OPTIONS.map((option) => (
            <ToggleGroupItem
              key={option}
              isSelected={option === numOfQuestions}
              onClick={() => setNumOfQuestions(option)}
            >
              {option}
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>

      <ToggleGroup>
        <p className={styles.heading}>Difficulty</p>
        <div className={styles.toggleGroup}>
          {QUESTION_DIFFICULTIES.map((option) => (
            <ToggleGroupItem
              key={option}
              isSelected={option === difficulty}
              onClick={() => setDifficulty(option)}
            >
              {option}
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>

      <ToggleGroup>
        <p className={styles.heading}>Question Type</p>
        <div className={styles.toggleGroup}>
          {QUESTION_TYPES.map((option) => (
            <ToggleGroupItem
              key={option}
              isSelected={option === questionType}
              onClick={() => setQuestionType(option)}
            >
              {option}
            </ToggleGroupItem>
          ))}
        </div>
      </ToggleGroup>

      <button
        className={styles.startButton}
        onClick={handleStartTrivia}
        disabled={rateLimitSecondsLeft > 0}
      >
        Start quiz {rateLimitSecondsLeft > 0 && `(${rateLimitSecondsLeft})`}
      </button>
    </div>
  );
}

export default StartMenuControls;

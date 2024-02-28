"use client";

import Link from "next/link";
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
  const {
    categoryId,
    setCategoryId,

    numOfQuestions,
    setNumOfQuestions,

    difficulty,
    setDifficulty,

    questionType,
    setQuestionType,
  } = React.useContext(TriviaApiConfigContext);

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

      <Link href="/trivia" className={styles.startButton}>
        Start quiz
      </Link>
    </div>
  );
}

export default StartMenuControls;

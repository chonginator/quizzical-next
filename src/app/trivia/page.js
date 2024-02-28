"use client";

import React from "react";

import { TriviaApiConfigContext } from "@/components/TriviaApiConfigProvider";
import TriviaLoading from "./TriviaLoading";

import { formatQuestions, scrollToTop } from "@/helpers/file.helpers";
import ToggleGroup, { ToggleGroupItem } from "@/components/ToggleGroup";

import styles from "./page.module.css";
import Link from "next/link";

function Trivia() {
  const { triviaApiUrl } = React.useContext(TriviaApiConfigContext);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [status, setStatus] = React.useState("idle");
  const [questions, setQuestions] = React.useState(null);

  const fetchQuestions = React.useCallback(
    async function () {
      setStatus("loading");
      const res = await fetch(triviaApiUrl);
      const data = await res.json();

      if (data.response_code === 0) {
        setStatus("success");
        const formattedQuestions = formatQuestions(data.results);
        setQuestions(formattedQuestions);
      } else {
        setStatus("error");
        throw new Error("Failed to fetch trivia questions");
      }
    },
    [triviaApiUrl],
  );

  React.useEffect(() => {
    if (!triviaApiUrl) {
      throw new Error("Failed to fetch trivia questions");
    }

    try {
      fetchQuestions();
    } catch (error) {
      throw new Error("Failed to fetch trivia questions");
    }
  }, [fetchQuestions, triviaApiUrl]);

  return (
    <>
      {status === "loading" ? (
        <TriviaLoading />
      ) : (
        <>
          <TriviaQuestions />
          <TriviaFooter />
        </>
      )}
    </>
  );

  function TriviaQuestions() {
    return questions?.map(
      (
        { question: questionText, answers, correctAnswer, selectedAnswer },
        index,
      ) => {
        return (
          <ToggleGroup key={questionText}>
            <p className={styles.question}>{`${index + 1}. ${questionText}`}</p>
            <div className={styles.toggleRow}>
              {answers.map((answer) => {
                const isSelected = answer === selectedAnswer;
                const toggleClassName =
                  isGameOver &&
                  (answer === correctAnswer
                    ? styles.toggleCorrect
                    : isSelected
                      ? styles.toggleIncorrect
                      : "");

                return (
                  <ToggleGroupItem
                    key={answer}
                    className={toggleClassName}
                    isSelected={isSelected}
                    disabled={isGameOver}
                    onClick={() => handleSelectAnswer(index, answer)}
                    aria-pressed={answer === selectedAnswer}
                  >
                    {answer}
                  </ToggleGroupItem>
                );
              })}
            </div>
          </ToggleGroup>
        );
      },
    );
  }

  function TriviaFooter() {
    const score = questions?.reduce(
      (cumulativeScore, question) =>
        cumulativeScore + (question.correctAnswer === question.selectedAnswer),
      0,
    );

    return (
      <div className={styles.footer}>
        {isGameOver ? (
          <>
            <p className={styles.score}>
              You scored: {score}/{questions?.length} correct answers
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.button} onClick={handlePlayAgain}>
                Play again
              </button>
              <Link className={styles.button} href="/">
                Menu
              </Link>
            </div>
          </>
        ) : (
          <button
            className={styles.button}
            onClick={() => setIsGameOver(true)}
            disabled={status === "loading"}
          >
            Check Answers
          </button>
        )}
      </div>
    );
  }

  function handleSelectAnswer(questionIndex, answer) {
    setQuestions(
      questions.with(questionIndex, {
        ...questions[questionIndex],
        selectedAnswer: answer,
      }),
    );
  }

  function handlePlayAgain() {
    setIsGameOver(false);
    fetchQuestions();
    scrollToTop();
  }
}

export default Trivia;

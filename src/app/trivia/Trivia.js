"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { TriviaApiConfigContext } from "@/components/TriviaApiConfigProvider";

import TriviaError from "./TriviaError";
import TriviaLoading from "./TriviaLoading";

import { formatQuestions, scrollToTop } from "@/helpers/file.helpers";
import ToggleGroup, { ToggleGroupItem } from "@/components/ToggleGroup";

import styles from "./page.module.css";
import clsx from "clsx";
import Cookies from "js-cookie";

function Trivia({ questions: savedQuestions }) {
  const router = useRouter();
  const { rateLimitSecondsLeft, resetRateLimitSecondsLeft, triviaApiUrl } =
    React.useContext(TriviaApiConfigContext);

  const [isGameOver, setIsGameOver] = React.useState(false);
  const [status, setStatus] = React.useState("idle");
  const [questions, setQuestions] = React.useState(savedQuestions);

  const fetchQuestions = React.useCallback(
    async function () {
      setStatus("loading");
      try {
        const res = await fetch(triviaApiUrl);
        const data = await res.json();
        if (data.response_code === 0) {
          setStatus("success");
          const formattedQuestions = formatQuestions(data.results);
          setQuestions(formattedQuestions);
          Cookies.set("questions", JSON.stringify(formattedQuestions));
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }

      resetRateLimitSecondsLeft();
    },
    [resetRateLimitSecondsLeft, triviaApiUrl],
  );

  React.useEffect(() => {
    if (!triviaApiUrl) {
      setStatus("error");
    }

    if (savedQuestions) {
      return;
    }

    fetchQuestions();
  }, [fetchQuestions, savedQuestions, triviaApiUrl]);

  if (status === "error") {
    return <TriviaError />;
  }

  function handleGoToMenu() {
    Cookies.remove("questions");
    router.push("/");
  }

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
              <button
                className={clsx(styles.button, styles.playAgainButton)}
                onClick={handlePlayAgain}
                disabled={rateLimitSecondsLeft}
              >
                Play again{" "}
                {rateLimitSecondsLeft > 0 && `(${rateLimitSecondsLeft})`}
              </button>
              <button className={styles.button} onClick={handleGoToMenu}>
                Menu
              </button>
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
    const nextQuestions = questions.with(questionIndex, {
      ...questions[questionIndex],
      selectedAnswer: answer,
    });
    setQuestions(nextQuestions);
    Cookies.set("questions", JSON.stringify(nextQuestions));
  }

  function handlePlayAgain() {
    setIsGameOver(false);
    fetchQuestions();
    scrollToTop();
  }
}

export default Trivia;

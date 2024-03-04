import { cookies } from "next/headers";
import React from "react";

import Trivia from "./Trivia";

function TriviaPage() {
  const savedQuestions = cookies().get("questions");
  const questions = savedQuestions?.value || null; // TODO: JSON.parse
  const parsedQuestions = JSON.parse(questions);

  return <Trivia questions={parsedQuestions} />;
}

export default TriviaPage;

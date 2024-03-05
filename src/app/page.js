import { TRIVIA_API_CATEGORIES_URL } from "@/constants";
import StartMenuControls from "@/components/StartMenuControls";

import styles from "./page.module.css";

export const dynamic = "force-static";

async function Home() {
  const res = await fetch(TRIVIA_API_CATEGORIES_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch trivia categories");
  }

  const data = await res.json();

  const triviaCategories = [
    { id: 0, name: "Any Category" },
    ...data.trivia_categories,
  ];

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Quizzical</h1>
      <p>Let{"'"}s get quizzical</p>
      <StartMenuControls triviaCategories={triviaCategories} />
    </main>
  );
}

export default Home;

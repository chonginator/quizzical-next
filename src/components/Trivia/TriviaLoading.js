import ToggleGroup, { ToggleGroupItem } from "@/components/ToggleGroup";

import {
  DEFAULT_NUMBER_OF_QUESTIONS,
  DEFAULT_NUMBER_OF_ANSWERS,
} from "@/constants";

import styles from "./TriviaLoading.module.css";

function TriviaLoading() {
  return new Array(DEFAULT_NUMBER_OF_QUESTIONS).fill().map((_, index) => (
    <ToggleGroup key={index}>
      <div className={styles.loadingQuestion}></div>
      <div className={styles.toggleGroup}>
        {new Array(DEFAULT_NUMBER_OF_ANSWERS).fill().map((_, index) => (
          <ToggleGroupItem
            key={index}
            className={styles.loadingToggle}
          ></ToggleGroupItem>
        ))}
      </div>
    </ToggleGroup>
  ));
}

export default TriviaLoading;

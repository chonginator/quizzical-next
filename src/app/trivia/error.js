"use client";

import React from "react";
import styles from "./error.module.css";

function TriviaError({ error }) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.errorMessage}>Oops, something went wrong!</p>
    </div>
  );
}

export default TriviaError;

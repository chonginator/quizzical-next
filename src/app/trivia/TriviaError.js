import Link from "next/link";

import React from "react";

import styles from "./TriviaError.module.css";

function TriviaError() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.errorMessage}>Oops, something went wrong!</p>

      <Link className={styles.button} href="/">
        Menu
      </Link>
    </div>
  );
}

export default TriviaError;

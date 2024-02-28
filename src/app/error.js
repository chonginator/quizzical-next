"use client";

import React from "react";

import styles from "./error.module.css";

function HomeError() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.errorMessage}>Oops, something went wrong!</p>
    </div>
  );
}

export default HomeError;

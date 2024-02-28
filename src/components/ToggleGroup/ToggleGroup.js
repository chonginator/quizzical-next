import React from "react";
import clsx from "clsx";

import styles from "./ToggleGroup.module.css";

function ToggleGroup({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}

export function ToggleGroupItem({
  children,
  className = "",
  isSelected,
  disabled,
  ...delegated
}) {
  return (
    <button
      className={clsx(
        styles.toggle,
        isSelected && styles.selectedToggle,
        className,
      )}
      aria-pressed={isSelected}
      disabled={disabled}
      {...delegated}
    >
      {children}
    </button>
  );
}

export default ToggleGroup;

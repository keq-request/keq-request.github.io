import type { Props } from "@theme/CodeBlock/Content/Element";
import clsx from "clsx";
import { type ReactNode } from "react";

import styles from "./styles.module.css";

export default function CodeBlockJSX({
  children,
  className,
}: Props): ReactNode {
  return (
    <pre
      tabIndex={0}
      className={clsx(styles.codeBlockStandalone, "thin-scrollbar", className)}
    >
      <code className={styles.codeBlockLines}>{children}</code>
    </pre>
  );
}

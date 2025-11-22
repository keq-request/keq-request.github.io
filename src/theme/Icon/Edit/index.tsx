import type { Props } from "@theme/Icon/Edit";
import clsx from 'clsx';
import { type ReactNode } from "react";
import styles from './styles.module.css';

export default function IconEdit({
  className,
  ...restProps
}: Props): ReactNode {
  return (
    // <svg
    //   fill="currentColor"
    //   height="20"
    //   width="20"
    //   viewBox="0 0 40 40"
    //   className={clsx(styles.iconEdit, className)}
    //   aria-hidden="true"
    //   {...restProps}>
    //   <g>
    //     <path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z" />
    //   </g>
    // </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(styles.iconEdit, className)}
      aria-hidden="true"
      {...restProps}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

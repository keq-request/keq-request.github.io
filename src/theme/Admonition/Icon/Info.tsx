import type { Props } from "@theme/Admonition/Icon/Info";
import { type ReactNode } from "react";

export default function AdmonitionIconInfo(props: Props): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      style={{ fill: 'none', fontSize: '24px', width: '24px', height: '24px' }}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M12 9h.01" />
      <path d="M11 12h1v4h1" />
    </svg>
  );
}

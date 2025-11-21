import { type ReactNode } from "react";
import CopyButton from "./CopyButton";

interface Props {
  title?: ReactNode
  children: ReactNode
  code: string | (() => string)
}

export default function ShikiContainer(props: Props): ReactNode {
  const title = props.title;


  return (
    <div
      style={{
        borderRadius: "var(--ifm-pre-border-radius)",
        marginBottom: "var(--ifm-leading)"
      }}
      className="overflow-hidden group/shiki border border-gray-100 dark:border-gray-900"
    >
      {title && (
        <div className="px-3 py-2 border-b border-gray-100 text-(length:--ifm-code-font-size) dark:border-gray-700 dark:bg-[#24292e]">
          <span>{title}</span>
        </div>
      )}

      <div className="relative">
        <CopyButton code={props.code} />
        {props.children}
      </div>
    </div>
  );
}


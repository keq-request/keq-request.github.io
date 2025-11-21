import type { Props } from "@theme/CodeBlock/Content/String";
import { type ReactNode } from "react";
import ShikiContainer from "../ShikiContainer";
import { useShikiHighlighter } from "./hooks";


export default function CodeBlockString(props: Props): ReactNode {
  const title = props.title;
  const code = props.children;

  const html = useShikiHighlighter(code, props.language || "plaintext");

  return (
    <ShikiContainer title={title} code={code}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </ShikiContainer>
  );
}

import type { Props } from "@theme/MDXComponents/Pre";
import { type ReactNode, useRef } from "react";
import ShikiContainer from "../CodeBlock/ShikiContainer";


export default function MDXPre(props: Props): ReactNode | undefined {
  const title = props["data-title"];
  const preRef = useRef<HTMLPreElement>(null);

  const getCode = () => {
    console.log(preRef.current);
    return preRef.current?.innerText || preRef.current?.textContent || "";
  };

  return (
    <ShikiContainer title={title} code={getCode}>
      <pre {...props} ref={preRef} />
    </ShikiContainer>
  );
}

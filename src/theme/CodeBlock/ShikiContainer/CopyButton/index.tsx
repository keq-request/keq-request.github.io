import { IconCheck, IconCopy } from '@tabler/icons-react';
import { type ReactNode, useState } from 'react';



export default function CopyButton(props: {
  code: string | (() => string)
}): ReactNode {

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // const code = preRef.current?.innerText || preRef.current?.textContent || "";
    const str = typeof props.code === "function" ? props.code() : props.code;

    copyText(str, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      className="z-2 absolute top-2 right-2 opacity-0 group-hover/shiki:opacity-40 size-8 flex place-content-center p-1.5 border cursor-pointer hover:opacity-100 transition-opacity bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-600 dark:border-0 dark:text-gray-900 rounded-md"
      onClick={handleCopy}
      title={copied ? "已复制!" : "复制代码"}
    >
      {copied ? <IconCheck className='size-full' /> : <IconCopy className='size-full' />}
    </button>
  )
}


export function copyText(text: string, cb: () => void) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      cb();
    });
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      if (successful) {
        cb();
      }
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  }
}

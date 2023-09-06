import { useEffect, useRef } from "react";

function scrollToBottom(elementRef: HTMLElement) {
  elementRef.scrollTo({ top: elementRef.scrollHeight, behavior: "smooth" });
}

type ConsoleProps = {
  content: string;
};

export default function Console({ content }: ConsoleProps) {
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleRef.current && scrollToBottom(consoleRef.current);
  }, [content]);

  return (
    <div className="p-1 rounded bg-neutral-100">
      <div
        ref={consoleRef}
        className="font-['MonoLisa'] text-xs p-3 h-72 break-all overflow-y-auto whitespace-pre-line"
      >
        {content}
      </div>
    </div>
  );
}

import { createContext, useRef } from "react";
import { Microservice } from "../utils/types";

type LogsContextProps = React.PropsWithChildren;

type LogsContext = {
  logs: Record<Microservice["id"], string>;
  add: (id: Microservice["id"], log: string) => string;
  clear: (id: Microservice["id"]) => void;
};

export const LogsContext = createContext<LogsContext>({} as LogsContext);

export function LogsProvider({ children }: LogsContextProps) {
  const { current: logs } = useRef<Record<Microservice["id"], string>>({});

  function add(id: Microservice["id"], log: string) {
    const currentLogs = (logs[id] ?? "").split("\n").slice(-15).join("\n");

    logs[id] = currentLogs + log + "\n";

    return logs[id];
  }

  function clear(id: Microservice["id"]) {
    delete logs[id];
  }

  return (
    <LogsContext.Provider value={{ logs, add, clear }}>
      {children}
    </LogsContext.Provider>
  );
}

import { useContext, useState } from "react";
import { MicroservicesContext } from "../components/MicroserviceProvider";
import { LogsContext } from "../components/LogsProvider";

export function useMicroservices() {
  return useContext(MicroservicesContext);
}

export function useLogs() {
  return useContext(LogsContext);
}

export function useModal(options?: { initialState: boolean }) {
  const [isOpen, setIsOpen] = useState(!!options?.initialState);

  function open() {
    setIsOpen(true);
  }

  function dismiss() {
    setIsOpen(false);
  }

  return {
    isOpen,
    open,
    dismiss,
  };
}

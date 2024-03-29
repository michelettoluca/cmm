/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { dialog } from "@tauri-apps/api";
import { Command } from "@tauri-apps/api/shell";
import Console from "./Console";
import clsx from "clsx";
import { Play, Square, Trash } from "lucide-react";
import { useLogs, useMicroservices, useModal } from "../utils/hooks";
import { Microservice } from "../utils/types";
import Modal from "./Modal";
import { useEffect, useState } from "react";

type MicroserviceDashboardProps = {
  microservice: Microservice;
  onDelete: () => void;
};

export default function MicroserviceDashboard({
  microservice,
  onDelete,
}: MicroserviceDashboardProps) {
  const mssStore = useMicroservices();
  const logsStore = useLogs();

  const { isOpen, open, dismiss } = useModal();
  const [logs, setLogs] = useState<string>("");

  useEffect(() => {
    setLogs(logsStore.logs[microservice.id]);
    const updateConsole = () => {
      setLogs(logsStore.logs[microservice.id]);
    };

    microservice.command?.stdout?.on?.("data", updateConsole);

    return () => {
      microservice.command?.stdout?.removeListener?.("data", updateConsole);
    };
  }, [logsStore.logs, microservice]);

  async function browse() {
    const directory = (await dialog.open({
      directory: true,
      multiple: false,
    })) as string | null;

    mssStore.update(microservice.id, { directory });
  }

  function startProcess() {
    const command = new Command("mvnw", [], { cwd: microservice.directory! });

    command.spawn().then((spawn) => {
      mssStore.update(microservice.id, { spawn, command });
    });

    command.stdout.on("data", (data) => {
      logsStore.add(microservice.id, data);
    });

    command.on("close", () => {
      killProcess();
    });
  }

  function killProcess() {
    microservice.spawn?.kill().then(() => {
      microservice.command?.stdout?.removeAllListeners("data");
      mssStore.update(microservice.id, { spawn: null });
      logsStore.clear(microservice.id);
    });
  }

  const isRunning = !!microservice.spawn;

  return (
    <>
      {isOpen && (
        <Modal title={`Elimina ${microservice.name}`} onModalDismiss={dismiss}>
          <div className="p-6 pb-16">
            Sicuro di voler elimnare{" "}
            <span className="font-semibold">{microservice.name}</span>?
          </div>
          <div className="px-4 py-4 bg-neutral-800 text-neutral-50 flex justify-end items-center gap-6">
            <button onClick={dismiss}>Annulla</button>
            <button
              className="px-4 py-2 bg-red-500 rounded text-gray-50 font-semibold"
              onClick={() => {
                onDelete();
                mssStore.remove(microservice.id);
                dismiss();
              }}
            >
              Elimina
            </button>
          </div>
        </Modal>
      )}
      <div className="flex justify-between flex-shrink-0 h-20 border-b border-b-neutral-300 px-8 items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-neutral-800">
            {microservice.name}
          </span>
          <button className="text-white bg-red-500 p-2 rounded" onClick={open}>
            <Trash size={16} />
          </button>
        </div>
        <div>
          <button
            className={clsx(
              "rounded text-sm p-2 font-medium text-white",
              isRunning ? "bg-red-500" : "bg-green-500",
              !microservice.directory && !isRunning
                ? "pointer-events-none saturate-0"
                : "",
            )}
            onClick={isRunning ? killProcess : startProcess}
          >
            {isRunning ? <Square size={20} /> : <Play size={20} />}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 p-8 flex-grow overflow-y-auto">
        <div className="flex flex-col gap-2">
          <span className="+ text-neutral-600">Percorso</span>
          <div className="flex rounded overflow-hidden">
            <div className="flex-grow p-4 bg-neutral-100">
              {microservice.directory ? (
                <span className="text-neutral-800">
                  {microservice.directory}
                </span>
              ) : (
                <span className="italic text-neutral-400">
                  Nessuna cartella selezionata
                </span>
              )}
            </div>
            <button className="p-4 bg-neutral-800 text-white" onClick={browse}>
              Sfoglia
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Console content={logs} />
        </div>
      </div>
    </>
  );
}

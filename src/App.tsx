import { useState } from "react";
import clsx from "clsx";
import MicroserviceDashboard from "./components/MicroserviceDashboard";
import Modal from "./components/Modal";
import { Plus } from "lucide-react";
import { useMicroservices, useModal } from "./utils/hooks";
import { Microservice } from "./utils/types";
import { MicroserviceProvider } from "./components/MicroserviceProvider";
import { MicroserviceListItem } from "./components/MicroserviceListItem";
import { LogsProvider } from "./components/LogsProvider";

function App() {
  const mssStore = useMicroservices();
  const modal = useModal();

  const [name, setName] = useState<string>("");
  const [selectedId, setSelectedId] = useState<Microservice["id"] | null>(null);

  function closeModal() {
    setName("");
    modal.dismiss();
  }

  const microservice = mssStore.microservices.find(
    (ms) => ms.id === selectedId,
  );

  return (
    <div className="flex h-screen w-screen font-['Inter'] antialiased text-sm">
      {modal.isOpen && (
        <Modal title="Aggiungi microservizio" onModalDismiss={closeModal}>
          <div className="flex flex-col gap-2 p-6 pb-16">
            <span>Inserisci il nome del microservizio che vuoi aggiungere</span>
            <input
              className={clsx(
                "px-4 py-3 rounded border border-neutral-300 w-full",
              )}
              placeholder="Nome microservizio"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="px-4 py-4 bg-neutral-800 text-neutral-50 flex justify-end items-center gap-6">
            <button onClick={closeModal}>Annulla</button>
            <button
              className={clsx(
                "px-4 py-2 bg-neutral-50 rounded text-gray-900 font-semibold",
                !name && "bg-neutral-300 pointer-events-none",
              )}
              onClick={() => {
                const newMicroservice = mssStore.add(name);
                setSelectedId(newMicroservice.id);
                closeModal();
              }}
            >
              Aggiungi
            </button>
          </div>
        </Modal>
      )}

      <div className="flex flex-col flex-shrink-0 w-60 bg-neutral-100 border-r border-r-neutral-200">
        <div className="flex flex-col h-20 border-b border-b-neutral-300 px-5 justify-center shrink-0">
          <span className="text-xl font-extrabold text-neutral-950">CMM</span>
          <span className="text-xs text-neutral-600">
            Con ❤️ da Luca Micheletto
          </span>
        </div>
        <div className="flex flex-col flex-grow px-5 py-8 gap-2 overflow-auto">
          <span className="uppercase text-xs text-neutral-400 tracking-widest">
            Mircroservices
          </span>
          {mssStore.microservices.map((ms) => (
            <MicroserviceListItem
              key={ms.id}
              microservice={ms}
              isSelected={ms.id === selectedId}
              onClick={() => setSelectedId(ms.id)}
            />
          ))}
          <button
            className="flex pl-3 pr-4 py-2 mt-4 rounded items-center gap-1 justify-center text-sm border border-dashed border-neutral-300 text-neutral-500"
            onClick={modal.open}
          >
            <Plus size={16} /> Aggiungi
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-grow w-fit">
        {microservice ? (
          <MicroserviceDashboard
            microservice={microservice}
            onDelete={() => setSelectedId(null)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default function Providers() {
  return (
    <LogsProvider>
      <MicroserviceProvider>
        <App />
      </MicroserviceProvider>
    </LogsProvider>
  );
}

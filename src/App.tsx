/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useContext } from "react"
import clsx from "clsx"
import MicroserviceDashboard from "./components/MicroserviceDashboard"
import Modal, { useModal } from "./components/Modal"
import { Plus } from "lucide-react"
import { useMicroservices } from "./utils/hooks"
import { Microservice } from "./utils/types"
import { MicroserviceProvider } from "./components/MicroserviceProvider"
import { MicroserviceListItem } from "./components/MicroserviceListItem"

function App() {
	const {
		microservices,
		actions: { addMicroservice },
	} = useMicroservices()

	const [name, setName] = useState<string>("")

	const [selectedMicroservice, setSelectedMicroservice] =
		useState<Microservice | null>(null)

	const { isOpen, open, dismiss } = useModal()

	function closeModal() {
		setName("")
		dismiss()
	}

	return (
		<div className="flex h-screen w-screen font-['Inter'] antialiased text-sm">
			{isOpen && (
				<Modal title="Aggiungi microservizio" onModalDismiss={closeModal}>
					<div className="flex flex-col gap-2 p-6 pb-16">
						<span>Inserisci il nome del microservizio che vuoi aggiungere</span>
						<input
							className={clsx(
								"px-4 py-3 rounded border border-neutral-300 w-full"
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
								!name && "bg-neutral-300 pointer-events-none"
							)}
							onClick={() => {
								addMicroservice(name)
								closeModal()
							}}>
							Aggiungi
						</button>
					</div>
				</Modal>
			)}

			<div className="flex flex-col flex-shrink-0 w-60 bg-neutral-100 border-r border-r-neutral-200">
				<div className="flex flex-col h-20 border-b border-b-neutral-300 px-5 justify-center shrink-0">
					<span className="text-xl font-extrabold text-neutral-950">CMM</span>
					<span className="text-xs">Version 1.0</span>
				</div>
				<div className="flex flex-col flex-grow px-5 py-8 gap-2 overflow-auto">
					<span className="uppercase text-xs text-neutral-400 tracking-widest">
						Mircroservices
					</span>
					{microservices.map((microservice, idx) => (
						<MicroserviceListItem
							key={idx + 1}
							microservice={microservice}
							isSelected={selectedMicroservice === microservice}
							onClick={() => setSelectedMicroservice(microservice)}
						/>
					))}
					<button
						className="flex pl-3 pr-4 py-2 mt-4 rounded items-center gap-1 justify-center text-sm border border-dashed border-neutral-300 text-neutral-500"
						onClick={open}>
						<Plus size={16} /> Aggiungi
					</button>
				</div>
			</div>
			<div className="flex flex-col flex-grow w-fit">
				{selectedMicroservice ? (
					<MicroserviceDashboard
						microservice={selectedMicroservice}
						onDelete={() => setSelectedMicroservice(null)}
					/>
				) : null}
			</div>
		</div>
	)
}

export default function Providers() {
	return (
		<MicroserviceProvider>
			<App />
		</MicroserviceProvider>
	)
}

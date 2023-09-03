import { useState, useEffect, createContext } from "react"
import { createMicroservice } from "../utils/createMicroservice"
import { Microservice } from "../utils/types"

type MicroserviceProviderProps = React.PropsWithChildren

type MicroservicesContext = {
	microservices: Microservice[]
	actions: {
		setMicroservices: (microservices: Microservice[]) => void
		addMicroservice: (name: string) => boolean
		removeMicroservice: (name: Microservice) => boolean
		updateMicroservice: (microservice: Microservice) => void
	}
}

export const MicroservicesContext = createContext<MicroservicesContext>(
	{} as MicroservicesContext
)

export function MicroserviceProvider({ children }: MicroserviceProviderProps) {
	const [microservices, setMicroservices] = useState<Microservice[]>([])

	function addMicroservice(name: string): boolean {
		const microservice = createMicroservice(name)

		const updatedMicroservices = [...microservices, microservice]

		setMicroservices(updatedMicroservices)
		localStorage.setItem("microservices", JSON.stringify(updatedMicroservices))

		return true
	}

	function removeMicroservice(microservice: Microservice): boolean {
		const updatedMicroservices = microservices.filter(
			(ms) => ms !== microservice
		)

		setMicroservices(updatedMicroservices)
		localStorage.setItem("microservices", JSON.stringify(updatedMicroservices))

		return true
	}

	function updateMicroservice(microservice: Microservice) {
		const updatedMicroservices = microservices.map((ms) =>
			ms === microservice ? microservice : ms
		)

		setMicroservices(updatedMicroservices)
		localStorage.setItem("microservices", JSON.stringify(updatedMicroservices))
	}

	useEffect(() => {
		const mss = localStorage.getItem("microservices")

		if (!mss) {
			localStorage.setItem("microservices", JSON.stringify([]))
		} else {
			setMicroservices(JSON.parse(mss))
		}
	}, [])

	return (
		<MicroservicesContext.Provider
			value={{
				microservices,
				actions: {
					setMicroservices,
					addMicroservice,
					removeMicroservice,
					updateMicroservice,
				},
			}}>
			{children}
		</MicroservicesContext.Provider>
	)
}

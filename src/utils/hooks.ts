import { useContext } from "react"
import { MicroservicesContext } from "../components/MicroserviceProvider"

export function useMicroservices() {
	return useContext(MicroservicesContext)
}

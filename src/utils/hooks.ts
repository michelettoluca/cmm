import { useContext } from "react"
import { MicroservicesContext } from "../components/MicroserviceProvider"
import {LogsContext} from "../components/LogsProvider";

export function useMicroservices() {
	return useContext(MicroservicesContext)
}

export function useLogs() {
	return useContext(LogsContext)
}

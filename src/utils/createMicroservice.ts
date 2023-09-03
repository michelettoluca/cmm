import { Microservice } from "./types"

export function createMicroservice(name: string): Microservice {
	return {
		name,
		directory: null,
		logs: "",
		spawn: null,
	}
}

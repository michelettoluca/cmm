import { Child } from "@tauri-apps/api/shell"

export type Microservice = {
	name: string
	directory: string | null
	logs: string
	spawn: Child | null
}

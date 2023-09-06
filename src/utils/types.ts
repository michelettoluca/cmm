import {Child, Command} from "@tauri-apps/api/shell"

export type Microservice = {
  id: number
  name: string
  directory: string | null
  command: Command | null,
  spawn: Child | null
  
}

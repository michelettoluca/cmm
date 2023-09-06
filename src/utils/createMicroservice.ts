import { Microservice } from "./types";

export function createMicroservice(name: string): Microservice {
  return {
    id: Math.ceil(Math.random() * 10000),
    name,
    directory: null,
    command: null,
    spawn: null,
  };
}

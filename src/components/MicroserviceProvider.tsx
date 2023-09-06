import {useState, useEffect, createContext} from "react"
import {createMicroservice} from "../utils/createMicroservice"
import {Microservice} from "../utils/types"

type MicroserviceProviderProps = React.PropsWithChildren

type MicroservicesContext = {
  microservices: Microservice[]
  actions: {
    add: (name: string) => Microservice
    remove: (id: Microservice["id"]) => void
    update: (id: Microservice["id"], data: Partial<Microservice>) => void,
  }
}

export const MicroservicesContext = createContext<MicroservicesContext>(
  {} as MicroservicesContext
)

export function MicroserviceProvider({children}: MicroserviceProviderProps) {
  const [microservices, setMicroservices] = useState<Microservice[]>([])
  
  function add(name: string): Microservice {
    const microservice = createMicroservice(name)
    
    save([...microservices, microservice])
    
    return microservice;
  }
  
  function remove(id: Microservice["id"]) {
    const _microservices = microservices.filter(
      (ms) => ms.id !== id
    )
    
    save(_microservices)
  }
  
  function update(id: Microservice["id"], data: Partial<Microservice>) {
    const _microservices = microservices.map((microservice) =>
      microservice.id === id ? {...microservice, ...data} : microservice
    )
    
    save(_microservices)
  }
  
  
  function save(_microservices: Microservice[]) {
    setMicroservices(_microservices)
    localStorage.setItem("microservices", JSON.stringify(_microservices))
  }
  
  useEffect(() => {
    const _microservices = localStorage.getItem("microservices")
    
    if (_microservices) {
      setMicroservices(JSON.parse(_microservices))
    } else {
      localStorage.setItem("microservices", JSON.stringify([]))
    }
  }, [])
  
  return (
    <MicroservicesContext.Provider
      value={{
        microservices,
        actions: {
          add,
          remove,
          update
        },
      }}>
      {children}
    </MicroservicesContext.Provider>
  )
}

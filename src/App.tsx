import { useEffect, useRef, useState } from "react"
import { invoke, dialog } from "@tauri-apps/api"
import { Command, Child } from "@tauri-apps/api/shell"

const scrollToBottom = (elementRef: HTMLElement) => elementRef.scrollTo({ top: elementRef.scrollHeight, behavior: "smooth" })

function App() {
	const [directory, setDirectory] = useState<string | null>(null)
	const [spawn, setSpawn] = useState<Child | null>(null)

	const [consoleLines, setConsoleLines] = useState<string>("")

	const consoleRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		consoleRef.current && scrollToBottom(consoleRef.current)
	}, [consoleLines])

	// useEffect(() => {
	// 	return () => void spawn?.kill()
	// }, [])

	const addLine = (line: string) => {
		setConsoleLines((lines) => lines + line + "\n")
	}

	const isRunning = !!spawn

	const onClick = async () => {
		const selected = (await dialog.open({ directory: true, multiple: false })) as string | null

		setDirectory(selected)
	}

	const runCommand = () => {
		const command = new Command("mvn", [], { cwd: directory! })
		command
			.spawn()

			.then((spawn) => {
				console.log({ spawn })
				setSpawn(spawn)
			})

		command.stdout.on("data", addLine)
		command.on("close", () => setSpawn(null))
	}

	const killProcess = () => {
		spawn?.kill().then(() => {
			setSpawn(null)
			invoke("kill_children")
		})
	}

	return (
		<div className="flex h-screen w-screen font-['Inter'] antialiased text-sm">
			<div className="flex flex-col flex-shrink-0 w-60 bg-neutral-100 border-r border-r-neutral-200">
				<div className="flex flex-col h-20 border-b border-b-neutral-300 px-5 justify-center">
					<span className="text-xl font-extrabold text-neutral-950">CMM</span>
					<span className="text-xs">Version 1.0</span>
				</div>
				<div className="flex flex-col flex-grow px-5 py-8 gap-2">
					<span className="uppercase text-xs text-neutral-400 tracking-widest">Mircroservices</span>
					<div className="flex justify-between pl-3 pr-4 py-2 rounded items-baseline bg-white text-sm">
						<span>Gateway</span>
						<div className="h-2 w-2 bg-red-500 rounded-full"></div>
					</div>
					<div className="flex justify-between pl-3 pr-4 py-2 rounded items-baseline text-neutral-600 text-sm">
						<span>Management</span>
						<div className="h-2 w-2 bg-red-500 rounded-full"></div>
					</div>
					<div className="flex justify-between pl-3 pr-4 py-2 rounded items-baseline text-neutral-600 text-sm">
						<span>Job scheduler</span>
						<div className="h-2 w-2 bg-red-500 rounded-full"></div>
					</div>
				</div>
			</div>
			<div className="flex flex-col flex-grow w-fit">
				<div className="flex justify-between flex-shrink-0 h-20 border-b border-b-neutral-300 px-8 items-center">
					<span className="text-2xl font-extrabold text-neutral-800">Gateway</span>
					<div>
						<button
							className={`flex rounded-full gap-2 text-sm uppercase pl-6 pr-5 py-2 font-medium text-white ${isRunning ? "bg-red-500" : "bg-green-500"} ${!directory && !isRunning ? "pointer-events-none saturate-0" : ""}`}
							onClick={isRunning ? killProcess : runCommand}>
							{isRunning ? "Stop" : "Start"}
						</button>
					</div>
				</div>
				<div className="flex flex-col gap-8 p-8 flex-grow overflow-y-auto">
					<div className="flex flex-col gap-2">
						<span className="+ text-neutral-600">Project folder</span>
						<div className="flex rounded overflow-hidden">
							<div className="flex-grow p-4 bg-neutral-100">{directory ? <span className="text-neutral-800">{directory}</span> : <span className="italic text-neutral-400">No folder selected</span>}</div>
							<button className="p-4 bg-neutral-800 text-white" onClick={onClick}>
								Browse
							</button>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<span className="text text-neutral-600">Console</span>
						<div className="p-1 rounded bg-neutral-100">
							<div ref={consoleRef} className="font-['MonoLisa'] text-xs p-3 h-72 break-all overflow-y-auto whitespace-pre-line">
								{consoleLines}
							</div>
						</div>
						{/* <span className="text text-neutral-600">PID: {spawn?.pid}</span> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App

import { createContext } from "react"
import { Socket } from "socket.io-client"

export type SocketContextValue = {
	connect: (userName: string) => void
	socket: Socket
	user?: string
}

export const SocketContext = createContext<SocketContextValue>(null as any)
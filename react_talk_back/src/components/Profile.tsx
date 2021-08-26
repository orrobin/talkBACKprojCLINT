import { useContext } from "react"
import { SocketContext } from "../context/SocketContext"
import { Chat } from "./Chat"

export function Profile() {
	const context = useContext(SocketContext)

	return (
		<>
			<Chat/>
		</>
	)
}
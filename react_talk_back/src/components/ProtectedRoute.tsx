import { Box, Button, Center, Heading, Stack } from "@chakra-ui/react"
import React, { Component, useContext } from "react"
import { Route, useHistory } from "react-router-dom"
import { SocketContext } from "../context/SocketContext"

type ProtectedRouteProps = {
	component: Component
} & any


export function ProtectedRoute({ component: Component, ...rest }: ProtectedRouteProps) {
	const { user } = useContext(SocketContext)
	const router = useHistory()

	return (
		<Route {...rest} render={
			props => {
				if (user)
					return <Component {...rest} {...props}/>
				return (
					<Center height='100vh'>
						<Stack spacing={4}>
						<Heading>You are not authorized</Heading>
						<Button onClick={() => router.push('/sign-in')}>Go to sign in page</Button>
						</Stack>
					</Center>
				)
			}
		}/>
	)
}
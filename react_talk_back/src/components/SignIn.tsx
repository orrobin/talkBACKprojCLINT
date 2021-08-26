import { Button, Center, Heading, Input, Stack, Text } from "@chakra-ui/react"
import axios from "axios"
import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { SocketContext } from "../context/SocketContext"

const SignIn = () => {
	const router = useHistory()
	const [userName, setUserName] = useState('doron')
	const [password, setPassword] = useState('123456')
	const [isSignInFailed, setIsSignInFailed] = useState(false)
	const socketContext = useContext(SocketContext)

	const updateUserName = (event: any) => {
		setUserName(event.target.value)
	}

	const updatePassword = (event: any) => {
		setPassword(event.target.value)
	}

	const submitClick = () => {
		axios.post('http://localhost:3001/sign-in', { userName, password })
			.then(response => {
				setIsSignInFailed(false)
				console.log(response)
				router.push('/profile')
				socketContext.connect(userName)
			})
			.catch(error => {
				setIsSignInFailed(true)
				console.error(error)
			})
		
	}

	return (
		<Center height='100vh'>
			<form>
				<Stack spacing={4}>
					<Heading textAlign='center'>Sign in page</Heading>
					<Input placeholder='User name' value={userName} onChange={updateUserName} />
					<Input placeholder='Pasword' value={password} onChange={updatePassword} />
					{isSignInFailed && <Text color='red.400' textAlign='center'>You entered wrong details</Text>}
					<Button onClick={submitClick}>Sign in</Button>
				</Stack>
			</form>
		</Center>
	)
}

export default SignIn;
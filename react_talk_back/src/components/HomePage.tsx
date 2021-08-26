import { Center, Button,Heading, Stack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export function HomePage() {
	const router = useHistory()

	return (
		<Center height='100vh'>
			<Stack spacing={4}>
			<Heading>You are in the home page</Heading>
			<Button onClick={() => router.push('/sign-in')}>Go to sign in page</Button>
			</Stack>
			
		</Center>
	)
}
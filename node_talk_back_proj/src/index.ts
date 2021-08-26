import express from 'express'
import http from 'http'
import { UserSchema } from './models/user-schema'
import { connectToDatabase } from './mongoose'
import cors from 'cors'
import { Server } from 'socket.io'
import { MessageSchema } from './models/message-schema'
import _ from 'lodash'

const io = new Server(3002, {
	cors: {
		origin: '*',
	}
});


const expressApplication: express.Application = express()
expressApplication.use(express.json())
expressApplication.use(cors())
const DB_URI = 'mongodb+srv://orrobin:1234@cluster0.wpnbu.mongodb.net/talk_back_db?retryWrites=true&w=majority'

async function startServer() {
	const connection = await connectToDatabase(DB_URI)

	http.createServer(expressApplication).listen(3001, () => {
		console.log('Application is now listening on port 3001')
	})

	const router = express.Router()

	router.get('/', (req: express.Request, res: express.Response) => {
		res.json({ finished: 'Hello' }).end()
	})

	router.post('/sign-in', async (req: express.Request, res: express.Response) => {
		try {
		const { userName, password } = req.body
		console.log(userName, password)
		const user = await UserSchema.findOne({ userName, password })
		if (user !== null) {
		await UserSchema.updateOne({userName: user.userName},{$set: {isConnected:true}})
			res.send('Sucess')
		} else {
			res.status(400).send('Wrong details')
		}

		} catch (error) {
			console.log(error)
		}
		
	})

	expressApplication.use(router)

	
		io.on("connection", socket => {
			try{
			socket.on('enter', async (data) => {
				socket.data.userName = data.userName
				console.log('All connected ', Array.from(io.sockets.sockets.keys()))
				await UserSchema.updateOne({userName: data.userName},{
					$set:{
						socketId:socket.id
					}
				})
				console.log("before")
				// io.emit('newConnenction', UserSchema.find({}).map(user => 
				// 		_.pick(user, ['userName','socketId'])))
					console.log((await UserSchema.find({})).map(user => 
						 		_.pick(user, ['userName','socketId'])));
					
				console.log("after")

			})
				}catch(error){
				console.log(error)
			}



		socket.on("disconnect", async () => {
			await UserSchema.updateOne({userName:socket.data.userName},{isConnected:false})
			const connectedUsers = await UserSchema.find({isConnected:true}).exec()
			io.emit('newConnenction', { connectedUsers:connectedUsers.map(user => user.userName) })
		})


		socket.on('new-message', data => {
			io.emit('new-message-server', { 
				content: data.message, 
				id: socket.id,
				date: Date.now(),
				userName: socket.data.userName
			})
		})

		socket.on('send message', data => {
			io.emit('new-message-server', { 
				content: data.message, 
				id: socket.id,
				date: Date.now(),
				userName: socket.data.userName
			})
		})

		// socket.on('private-message', data => {
		// 	MessageSchema.create({
		// 		from: data.from,
		// 		to: data.to,
		// 		content: data.content,
		// 		date: Date.now()
		// 	})
		//  MessageSchema.find({ from: data.from, to: data.to })
		// })
	});
}

startServer()
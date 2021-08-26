import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
	from: {
		type: String,
		required: true
	},
	to: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	}
})

export const MessageSchema = mongoose.model('Message', messageSchema)
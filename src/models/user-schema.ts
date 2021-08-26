import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isConnected: {
		type: Boolean,
		default: false
	},
	socketId: {
		type:String,
		required: false
	}
})

export const UserSchema = mongoose.model('User', userSchema)
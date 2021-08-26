import mongoose from 'mongoose'

export async function connectToDatabase(uri: string) {
	// Use newer API of mongoDB
	mongoose.set('useFindAndModify', false)

	// Use promise as async types
	mongoose.Promise = global.Promise

	const connection = await mongoose.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})

	return connection.connection.db
}
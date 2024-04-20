const router = require('express').Router()

const { getCollection, ObjectId } = require('../todo-db')

// GET /api/todos

router.get('/', async (request, response) => {
	const collection = await getCollection('todo-api', 'todos')
	const todos = await collection.find({}).toArray()
	response.json(todos)
})

// POST /api/todos

router.post('/', async (request, response) => {
	const collection = await getCollection('todo-api', 'todos')
	const { item } = request.body
	const complete = false
	const result = await collection.insertOne({ item, complete })
	response.json(result)
})

// PUT /api/todos/:id

router.put('/:id', async (request, response) => {
	const collection = await getCollection('todo-api', 'todos')
	const { id } = request.params

	const todo = await collection.findOne({ _id: new ObjectId(id) })
	const complete = !todo.complete
	const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } })
	response.json('Completed todo!')
 })

module.exports = router
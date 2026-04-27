const router = require('express').Router()
const Person = require('../models/Person')

// CREATE
router.post('/', async (req, res) => {

  const { name, salary, approved } = req.body
  // {name: "Jackson", salary: 5000, approved: false}

  if (!name) {
    res.status(422).json({ error: "Name is required!" })
    return
  }

  try {

    const lastPerson = await Person.findOne().sort({ id: -1 })
    const nextId = lastPerson ? lastPerson.id + 1 : 1

    const person = {
      id: nextId,
      name,
      salary,
      approved
    }

    // create - criando dados
    await Person.create(person)

    res.status(201).json({ message: "Success!" })

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// READ
router.get('/', async (req, res) => {
  try {

    const people = await Person.find()

    res.status(200).json(people)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// READ - ID
router.get('/:id', async (req, res) => {
  // extrair dado da requisicao
  const id = req.params.id

  try {

    const person = await Person.findOne({ id: id })

    if (!person) {
      res.status(422).json({ message: "User not found!" })
      return
    }

    res.status(200).json(person)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// UPDATE - PUT(precisa passar completo) ou PATCH(passa so o que vai alterar)
router.put('/:id', async (req, res) => {

  const { id, name, salary, approved } = req.body

  const person = {
    id,
    name,
    salary,
    approved
  }

  try {

    const updatedPerson = await Person.findOneAndUpdate({ id: id }, person)

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: "User not found!" })
      return
    }

    res.status(200).json(person)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// DELETE
router.delete('/:id', async (req, res) => {

  const id = req.params.id

  const person = await Person.findOne({ id: id })

  if (!person) {
    res.status(422).json({ message: "User not found!" })
    return
  }

  try {

    await Person.deleteOne({ id: id })

    res.status(200).json({ message: "Success!" })

  } catch (error) {
    res.status(500).json({ error: error })
  }

})

module.exports = router
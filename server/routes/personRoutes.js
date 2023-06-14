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

  const person = {
    name,
    salary,
    approved
  }

  try {
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

// READ - NAME
router.get('/:name', async (req, res) => {
  // extrair dado da requisicao
  const name = req.params.name

  try {

    const person = await Person.findOne({ name: name })

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

  const id = req.params.id

  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved
  }

  try {

    const updatedPerson = await Person.updateOne({ _id: id }, person)

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

  const person = await Person.findOne({ _id: id })

  if (!person) {
    res.status(422).json({ message: "User not found!" })
    return
  }

  try {

    await Person.deleteOne({ _id: id })

    res.status(200).json({ message: "Success!" })

  } catch (error) {
    res.status(500).json({ error: error })
  }

})

module.exports = router
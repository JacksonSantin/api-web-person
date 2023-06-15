const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: String,
  salary: Number,
  approved: Boolean,
})

module.exports = Person
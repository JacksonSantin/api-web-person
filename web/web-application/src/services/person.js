import { api } from './api'

export default {
  list:() => {
    return api.get('person')
  },

  save:(person) => {
    return api.post('person', person)
  },

  update:(person) => {
    return api.put('person', person)
  }
}
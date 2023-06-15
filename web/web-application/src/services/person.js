import { api } from './api'

export default {
  list: () => {
    return api.get('person')
  },

  save: (person) => {
    return api.post('person', person)
  },

  update: (person,id) => {
    return api.put(`person/${id}`, person)
  },

  delete: (person,id) => {
    return api.delete(`person/${id}`, { data: person })
  }
}
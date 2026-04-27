class Person {
  constructor({
    id = 0,
    name = "",
    salary = 0,
    approved = false,
  }) {
    this.id = id
    this.name = name
    this.salary = salary
    this.approved = approved
  }
}

export default Person
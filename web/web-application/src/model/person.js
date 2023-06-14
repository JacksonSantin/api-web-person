class Person {
  constructor({
    id = "",
    name = "",
    salary = 0,
    approved = false,
  }) {
    this.name = name
    this.salary = salary
    this.approved = approved
  }
}

export default Person
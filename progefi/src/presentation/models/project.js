'use strict'

class Project {
  constructor () {
    this.id = null
    this.name = null
    this.required = true
    this.valid = {}
    this.valid.isValid = false
    this.valid.message = 'Campo requerido'
  }
  setProject (project) {
    this.id = project.id
    this.name = project.name
  }
  setValid (valid) {
    this.valid.isValid = valid.isValid
    this.valid.message = valid.message
  }
}

export default Project

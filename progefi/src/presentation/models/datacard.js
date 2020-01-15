'use strict'

class Datacard {
  constructor () {
    this.id = null
    this.code = null
    this.validated = false
    this.collectDate = null
    this.collectDateValid = {}
    this.collectDateValid.isValid = false
    this.collectDateValid.message = null
    this.formattedDate = null
    this.formattedHour = null
  }
  setCollectDate(collectDate){
    this.collectDate = collectDate
  }
  setCollectDateValid (valid) {
    this.collectDateValid.isValid = valid.isValid
    this.collectDateValid.message = valid.message
  }
  setFormattedDate(formattedDate){
    this.formattedDate = formattedDate
  }
  setFormattedHour(formattedHour){
    this.formattedHour = formattedHour
  }
  getCollectDate(){
    return this.collectDate
  }
  getFormattedDate(){
    return this.formattedDate
  }
  getFormattedHour(){
    return this.formattedHour
  }
  getCollectDateValid(){
    return this.collectDateValid
  }
  isCollectDateValid(){
    return this.collectDateValid.isValid
  }
  isValidated(){
    return this.validated
  }
  validate(){
    this.validated = true
  }
}

export default Datacard

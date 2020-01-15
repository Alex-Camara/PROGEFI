'use strict'

class Project {
  constructor () {
    this.latitude = 20.102365
    this.latitudeValid = {
      isValid: false,
      message: null
    }
    this.longitude = -101.433236
    this.longitudeValid = {
      isValid: false,
      message: null
    }
    this.altitude = null
    this.altitudeValid = {
      isValid: false,
      message: null
    }
    this.country = null
    this.countryValid = {
      isValid: false,
      message: null
    }
    this.countryState = null
    this.countryStateValid = {
      isValid: false,
      message: null
    }
    this.municipality = null
    this.municipalityValid = {
      isValid: false,
      message: null
    }
    this.locality = null
    this.localityValid = {
      isValid: false,
      message: null
    }
  }
  setLongitude (longitude) {
    this.longitude = longitude
  }
  setLatitude (latitude) {
    this.latitude = latitude
  }
  setAltitude (altitude) {
    this.altitude = altitude
  }
  setCountry (country) {
    this.country = country
  }
  setCountryState (countryState) {
    this.countryState = countryState
  }
  setMunicipality (municipality) {
    this.municipality = municipality
  }
  setLocality (locality) {
    this.locality = locality
  }
  setCountryValid (valid) {
    this.countryValid.isValid = valid.isValid
    this.countryValid.message = valid.message
  }
  setCountryStateValid (valid) {
    this.countryStateValid.isValid = valid.isValid
    this.countryStateValid.message = valid.message
  }
  setMunicipalityValid (valid) {
    this.municipalityValid.isValid = valid.isValid
    this.municipalityValid.message = valid.message
  }
  setLocalityValid (valid) {
    this.localityValid.isValid = valid.isValid
    this.localityValid.message = valid.message
  }
  setLatitudeValid (valid) {
    this.latitudeValid.isValid = valid.isValid
    this.latitudeValid.message = valid.message
  }
  setLongitudeValid (valid) {
    this.longitudeValid.isValid = valid.isValid
    this.longitudeValid.message = valid.message
  }
  setAltitudeValid (valid) {
    this.altitudeValid.isValid = valid.isValid
    this.altitudeValid.message = valid.message
  }
  getCountry () {
    return this.country
  }
  getCountryState () {
    return this.countryState
  }
  getMunicipality () {
    return this.municipality
  }
  getLocality () {
    return this.locality
  }
  getLatitude () {
    return this.latitude
  }
  getAltitude () {
    return this.altitude
  }
  getLongitude () {
    return this.longitude
  }
  getCountryValid () {
    return this.countryValid
  }
  getCountryStateValid () {
    return this.countryStateValid
  }
  getMunicipalityValid () {
    return this.municipalityValid
  }
  getLocalityValid () {
    return this.localityValid
  }
  getLatitudeValid () {
    return this.latitudeValid
  }
  getAltitudeValid () {
    return this.altitudeValid
  }
  getLongitudeValid () {
    return this.longitudeValid
  }
  isCountryValid () {
    return this.countryValid.isValid
  }
  isCountryStateValid () {
    return this.countryStateValid.isValid
  }
  isMunicipalityValid () {
    return this.municipalityValid.isValid
  }
  isLocalityValid () {
    return this.localityValid.isValid
  }
  isAltitudeValid () {
    return this.altitudeValid.isValid
  }
  isLongitudeValid () {
    return this.longitudeValid.isValid
  }
  isLatitudeValid () {
    return this.latitudeValid.isValid
  }
}

export default Project

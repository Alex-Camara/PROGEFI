'use strict'

class Validator {
  isEmpty (testValue, isRequired) {
    return new Promise((resolve, reject) => {
      if (testValue == null || testValue == '') {
        if (isRequired) {
          reject('Campo requerido')
        } else {
          reject('Campo vacío')
        }
      } else {
        resolve('ok')
      }
      /* if (isRequired) {
        if (testValue == null || testValue == '') {
          reject('Campo requerido')
        } else {
          resolve('ok')
        }
      } else {
        resolve('ok')
      } */
    })
  }
  isLengthOk (testValue, minLimit, maxLimit) {
    return new Promise((resolve, reject) => {
      testValue = testValue.toString()
      let length = testValue.length
      if (length < minLimit && length > 0) {
        reject('Longitud mínima invalida')
      } else if (length > maxLimit) {
        reject('Longitud máxima invalida')
      } else {
        resolve('ok')
      }
    })
  }
  applyRegex (testValue, regexValue) {
    return new Promise((resolve, reject) => {
      let regex = new RegExp(regexValue)
      let isRegexTrue = regex.test(testValue)
      if (isRegexTrue) {
        resolve('ok')
      } else {
        reject('Caracteres invalidos')
      }
    })
  }
  isNumber (testValue) {
    return new Promise((resolve, reject) => {
      if (!isNaN(testValue)) {
        resolve('ok')
      } else if (testValue == "-") {
        reject('Ingresa un número')
      } else {
        reject('Solo se permiten numeros')
      }
    })
  }
  isNumberLimitOk (testValue, minLimit, maxLimit) {
    return new Promise((resolve, reject) => {
      if (testValue <= maxLimit && testValue >= minLimit) {
        resolve('ok')
      } else {
        reject('Valor no permitido')
      }
    })
  }
  isDecimalLimitOk (testValue, maxLimit) {
    return new Promise((resolve, reject) => {
      testValue = testValue.toString()
      let splittedTestValue = testValue.split('.')
      if (splittedTestValue.length == 2) {
        let decimalTestValue = splittedTestValue[1]
        if (decimalTestValue >= maxLimit) {
          reject('longitud de decimales excedida')
        } else {
          resolve('ok')
        }
      } else {
        resolve('ok')
      }
    })
  }
  startsWithZero (testValue) {
    return new Promise((resolve, reject) => {
      if (testValue.length > 1) {
        if ((testValue.startsWith('0')) && !(testValue.startsWith('0.'))) {
          reject('Cero invalido')
        } else if ((testValue.startsWith('-0')) && !(testValue.startsWith('-0.'))) {
          reject('Cero invalido')
        } else {
          resolve('ok')
        }
      } else {
        resolve('ok')
      }
    })
  }
  testValidationOne (testValue, minLimit, maxLimit, isRequired, regex) {
    return new Promise((resolve, reject) => {
      this.isEmpty(testValue, isRequired)
        .then(res => {
          this.applyRegex(testValue, regex)
            .then(res => {
              this.isLengthOk(testValue, minLimit, maxLimit)

                .then(res => {
                  resolve('ok')
                })
                .catch(error => {
                  reject(error)
                })
            })
            .catch(error => {
              reject(error)
            })
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  testValidationTwo (testValue, numberMinLimit, numberMaxLimit, decimalMaxLimit, isRequired) {
    return new Promise((resolve, reject) => {
      this.isEmpty(testValue, isRequired)
        .then(() => {
          this.isNumber(testValue)
            .then(() => {
              this.startsWithZero(testValue)
                .then(() => {
                  this.isNumberLimitOk(testValue, numberMinLimit, numberMaxLimit)
                    .then(() => {
                      this.isDecimalLimitOk(testValue, decimalMaxLimit)
                        .then(() => {
                          resolve('ok')
                        })
                        .catch(error => {
                          reject(error)
                        })
                    })
                    .catch(error => {
                      reject(error)
                    })
                })
                .catch(error => {
                  reject(error)
                })
            })
            .catch(error => {
              reject(error)
            })
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default Validator

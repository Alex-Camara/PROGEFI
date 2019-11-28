'use strict'

class Validator {
    isNumber(value) {

    }
    isLenghtOk(value) {
        value = value.toString();
        let splittedValue = value.split(".");
        if (splittedValue.length > 1) {
            
        }
    }
    isDecimalsLenghtOk(coordinate) {
        coordinate = coordinate.toString();
        let splittedCoordinate = coordinate.split(".");
        if (splittedCoordinate.length > 1) {
            let decimalLength = splittedCoordinate[1].length;
            if (decimalLength > 6) {
                coordinate = parseFloat(coordinate).toFixed(6);
                return coordinate;
            } else {
                return coordinate;
            }
        } else {
            return coordinate;

        }
    }
}

export default Validator;
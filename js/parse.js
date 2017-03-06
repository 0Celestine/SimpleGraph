//age, actor grossing, num movie, movie grossing, movie year, associated actors
//Order by age, by grossing
//Probably should do something to clean the data

/*jshint esversion: 6 */

//TODO generalize to take any json
var QUANT_ATTR;


/**
 * Return the number of digits in a given number
 *@param {Number}
 */
function getNumDigits(number) {
    return number.toString().length;
}

/**
 * Returns the value of a specified sttribute for a given object in a data set.
 *@param {String} data_set
 *@param {Object} object
 *@param {String} attribute
 */
function getAttributeValue(data_set, object, attribute) {
    value = data_set[object][attribute];
    if ((attribute == "total_gross" || attribute == "box_office") && getNumDigits(value) <= 4) {
        value *= 1000000;
    }
    return value;
}

/**
 * Gets min, max, and number of unreported for a given Number-type or array attribute and json_class
 *@param {Dictionary} data_set
 *@param {String} attribute
 *@return {Dictionary} - num_anomalies, minimum, maximum
 */
function getAttributeRange(data_set, attribute) {
    var numbers = [];
    var num_anomalies = 0;

    for (var object in data_set) {
        var value = getAttributeValue(data_set, object, attribute);
        if (value instanceof Array) {
            value = value.length;
        }
        if (value <= 0) {
            num_anomalies += 1;
        } else {
            numbers.push(value);
        }
    }

    var range = {"anomalies":num_anomalies, "minimum":Math.min(...numbers), "maximum":Math.max(...numbers)};
    //console.log(range);
    return range;
}

/**
* Goes through JSON and finds quantifiable attributes.
*/
function extractQuantAttributes(){


    QUANT_ATTR = {};

    for(var i = 0; i<data.length;i++){

        var first_key = Object.keys(data[i])[0]; //Gets first dictionary key
        var type_key = data[i][first_key].json_class; //Gets the json_class

        var numerics = [];
        for(var attribute in data[i][first_key]){
            var attr_val = data[i][first_key][attribute];
            if(typeof attr_val == "number" || attr_val instanceof Array ){
                numerics.push(attribute);
            }
        }
        //console.log(numerics);
        QUANT_ATTR[type_key] = numerics;
    }

}

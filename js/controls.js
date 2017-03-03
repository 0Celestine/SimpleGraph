/*jshint esversion: 6 */
/**
* Goes through JSON and finds quantifiable attributes.
*@return {Dictionary[]} - json_class:attribute
*/
function extractQuantAttributes(){

    var type_dict = {};
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
        type_dict[type_key] = numerics;
    }
    //console.log(type_dict);
    return type_dict;
}

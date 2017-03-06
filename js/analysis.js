/**
* Called on raycast intersection, grabs point's associated data.
*@param {String} point_name - name assigned to point mesh
*/
function getPointData(point_name){
    //console.log(JSON.parse(point_name));
    return JSON.parse(point_name);
}

/**
* Given a point's data in dictionary form, displays it in the
* information panel.
*@param {Dictionary} point_data
*/
function displayPointData(point_data){
    $("#point_data_panel").empty();

    for(var attribute in point_data){
        //console.log(attribute);
        if( !(point_data[attribute] instanceof Array) ){
            var attr_label = attribute.toUpperCase().concat(":");
            $("<label></label>").text(attr_label).appendTo("#point_data_panel");
            var attr_val = point_data[attribute];
            $('<p class="indent"></p>').text(attr_val).appendTo("#point_data_panel");
        }
        else{
            var array_label = attribute.toUpperCase().concat(":");
            $("<label></label>").text(array_label).appendTo("#point_data_panel");
            var array_val;
            for(var i = 0; i < point_data[attribute].length; i++){
                array_val = point_data[attribute][i];
                $('<p class="indent"></p>').text(array_val).appendTo("#point_data_panel");
            }
        }
    }


}

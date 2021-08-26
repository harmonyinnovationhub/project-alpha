function getInputValue() {
    // Selecting the input element and get its value 
    var inputVal_lat = document.getElementsByClassName("lat_1");
    var inputVal_lng = document.getElementsByClassName("lng_1");
    var visualmarker;

    for (let i = 0; i < inputVal_lat.length; i++) {
        visualmarker = L.marker([inputVal_lat[i].value, inputVal_lng[i].value]);
        visualmarker.addTo(map);    
    }
}
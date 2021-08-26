// var xhr = new XMLHttpRequest();
// xhr.open('POST', 'test.html', true);
// xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// xhr.onload = function () {
//     // do something to response
//     console.log(this.responseText);
// };
// xhr.send(urlParams);
function sendJSON() {

    //querystring
    var urlParams;
    (window.onpopstate = function () {
        var match,
            pl = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
    })();
    console.log(urlParams)

    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "submit.php";

    // open a connection
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            result.innerHTML = this.responseText;

        }
    };

    // Converting JSON data to string
    var data = JSON.stringify(urlParams);

    // Sending data with the request
    xhr.send(data);
}

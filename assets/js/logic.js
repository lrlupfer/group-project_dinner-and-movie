var config = {
    apiKey: "AIzaSyByYKnY18v14O-mBb9eAvXfN4kPlbEZFdo",
    authDomain: "dinner-and-a-movie-de8fd.firebaseapp.com",
    databaseURL: "https://dinner-and-a-movie-de8fd.firebaseio.com",
    storageBucket: "dinner-and-a-movie-de8fd.appspot.com",
    messagingSenderId: "464961301575"
};

firebase.initializeApp(config);

$(document).ready(function() {
    $("#location").geocomplete();

});

$(document).on("click", "#submit", function() {
    event.preventDefault();

    var address = $("#location").val().replace(/\,/g, "").replace(/\s/g, "+")
    console.log("address:" + address);

    var gpKeyword = $("#keyword").val();

    $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false', null, function(data) {
        var p = data.results[0].geometry.location
        var latitude = p.lat;
        var longitude = p.lng;

        console.log("latitude: " + latitude);
        console.log("longitude: " + longitude);

        var gpEndpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
        var gpCoords = "?location=" + latitude + "," + longitude + "&radius=500&type=restaurant&keyword=";
        var gpAPIKey = "&key=AIzaSyBdIAP6XUDQPTRvBYoawbI0QhCZZI2akWo";


        console.log("keyword:" + gpKeyword);

        var gpURL = gpEndpoint + gpCoords + gpKeyword + gpAPIKey;

        console.log(gpURL);


        $.getJSON(gpURL, null, function(data) {
            console.log(data);

        });


        /*--------------------------method from stack overflow saying request in JSON with Padding
            /*$.ajax({ //ajax call
                url: gpURL,
                type: "GET",
                dataType: 'jsonp',
                cache: false,
                success: function(response){                          
                    alert(response);
            }
            --------------------------------------------------------------------------------*/

        /*__________________________________________from google documentation_______________
        var map;
        var service;
        var infowindow;

        function initialize() {
          var userLocal = new google.maps.LatLng(latitude,longitude);

          map = new google.maps.Map(document.getElementById('map'), {
              center: userLocal,
              zoom: 15
            });

          var request = {
            location: userLocal,
            radius: '500',
            types: ['restaurant']
          };

          service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
        }

        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var place = results[i];
              console.log(place.name);
              createMarker(results[i]);
            }
          }
        }

        initialize();
        callback();
        ____________________________________________________________________*/


    });

    $("input").val("");

});

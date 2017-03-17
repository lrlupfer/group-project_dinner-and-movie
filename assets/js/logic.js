var config = {
  apiKey: "AIzaSyByYKnY18v14O-mBb9eAvXfN4kPlbEZFdo",
  authDomain: "dinner-and-a-movie-de8fd.firebaseapp.com",
  databaseURL: "https://dinner-and-a-movie-de8fd.firebaseio.com",
  storageBucket: "dinner-and-a-movie-de8fd.appspot.com",
  messagingSenderId: "464961301575"
};

firebase.initializeApp(config);

$(document).ready(function(){
	$("#location").geocomplete();
});

$(document).on("click", "#submit", function() {
	event.preventDefault();

	var address = $("#location").val().replace(/\,/g, "").replace(/\s/g, "+")
	console.log("address:" + address);

	$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false', null, function (data) {
                var p = data.results[0].geometry.location
                var latitude = p.lat;
                var longitude = p.lng; 

                console.log("latitude: " + latitude); 
                console.log("longitude: " + longitude);

                                  
            });	

	$("input").val("");

});






/*function displayDinner(searchInput) {                 //display gifs function will populate the results area with the proper gifs

	var urlToZomato = "https://developers.zomato.com/api/v2.1/"
	var zomKey = "74a6d5355bee5e3ef4ab1280f8496234"
	var foodTerm = $("#foodType").val();
    var dinnerQuery = urlToZomato + foodTerm + zomKey         //queryURL will be the endpoint + the applicable search term + the public key

    console.log(dinnerQuery);                          //used to check that the total url is correct

    $.ajax({ //ajax call
        url: dinnerQuery,
        method: "GET"
    }).done(function(response) {

        console.log(response);                      //log the response JSON of the API call

        limit = $("#num-records-select").val();

        $("#alert-pop").empty();
        $("#results0").empty();                     //empty the previous contents of the three columns of gif results before populating new results
        $("#results1").empty();
        $("#results2").empty();

        for (var i = 0; i < limit ; i++) {         //cycle through the response

            var newDiv = $("<div>").addClass("result-div");                 //add a new div to house each gif result

            var newGif = $("<img>")                                         // add and img tag for each gif
                .addClass("img-responsive result")                          // give that gif a bootstrap class for responsivnesss and my own class for refrence
                .attr("src", response.data[i].images.original_still.url)    // add a src sttribute with the defualt still url
                .data("orig", response.data[i].images.original_still.url)   // add a data-orig with the still url
                .data("gif", response.data[i].images.original.url)          // add a data-gif with the animated url
                .data("mode", "still")                                      // add a data-mode used to toggle play/pause
                .appendTo(newDiv);                                          // append the img into the new Div

            var rating = $("<div>").addClass("rating")
                .text(response.data[i].rating.toUpperCase())
                .appendTo(newDiv);

            var x = i % 3;
            var columnAssign = "#results" + x;      //split the results into the 3 columns (currently not working right it is only splitting to 2, html or js issue??)

            $(columnAssign).append(newDiv);         //append the newDivs into the results area by columns

        }

    })

} */
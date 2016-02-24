console.log("i work!");

$(function() {



//gets latitude and longitude from JSON
//trying to use these coordinates to center map
var thisLatitude;
var thisLongitude;

$.ajax(window.location.pathname + '/json').done(function(result){
	thisLatitude = result[0].latitude;
	thisLongitude = result[0].longitude;
	console.log("Ok, accessing lng, lat: ", thisLatitude)
	console.log("Ok, accessing lng ", thisLongitude)
})

	// Google Map Settings
var initialize = function () {


		var map = new google.maps.Map(document.getElementById('map-canvas'), {
		  zoom: 14,
		  minZoom: 6,
		  streetViewControl: false,
		  mapTypeControl: false,
		  // center: new google.maps.LatLng(40.7444916, -73.9969177),
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		map.setCenter(new google.maps.LatLng(thisLatitude, thisLongitude));
		// Add new markers
		addMarkers(map);

	} // end initialize

	// DISPLAY THE MAP
	google.maps.event.addDomListener(window, 'load', initialize);

});

var addMarkers = function(map) {

	//ajax call to get location data
	$.ajax(window.location.pathname +'/json').
		done(function(result) {
			// add location markers
			// for (var i=0; i < result.locations.length; i++) {
				marker = new google.maps.Marker ({
				    map: map,
				    // icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
				    // position: { lat: result[i].latitude, lng: result[i].longitude },
				    position: { lat: result[0].latitude, lng: result[0].longitude},
				    title: result.name
				});				
		  // };
		});
} // end addMarkers

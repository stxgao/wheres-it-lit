function initalize() {
	var myOptions = {
		zoom: 8,
		center: new google.maps.LatLng(49.2611, -123.2531),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);

// This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

}

// Adds a marker to the map.
function addMarker(location, map) {

  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
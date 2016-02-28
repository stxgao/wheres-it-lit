var venues = [
{lat: 49.2611, lng: -123.2531},
{lat: 49.2611, lng: 123.5234},
];

var markers = [];

var map;
var flightPath;

function initalize() {
	var myOptions = {
		zoom: 10,
		center: new google.maps.LatLng(49.2611, -123.2531),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);

	flightPath = new google.maps.Polyline({
		path: [],
		strokeColor: '#000000',
		strokeOpacity: 1.0,
		strokeWeight: 3,
		geodesic: true
	});
	flightPath.setMap(map);
}


function drop() {
	clearMarkers();
	flightPath.setMap(map);
	for (var i = 0; i < venues.length; i++) {
		addMarkerWithTimeout(venues[i], i * 300);
	}

	for (var i = 0; i < venues.length; i++) {
		addLatLng(venues[i], i);
	}

}

// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(location, i) {
	var path = flightPath.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  window.setTimeout(function() {

  	path.push(new google.maps.LatLng(location.lat, location.lng));
  },i * 600);

}

function addMarkerWithTimeout(location, timeout) {
	window.setTimeout(function() {
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			animation: google.maps.Animation.DROP,
			clickable: true,
			title: "Click for more info - STEVEN"
		});
		marker.infowindow = new google.maps.InfoWindow({
			content: '<b>Speed:</b> ' + values.inst + ' knots',
			maxWidth: 200
		});
		marker.addListener('dblclick', function() {
			infowindow.open(map, marker);
		});
		markers.push(marker);
	}, timeout);


}

function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
	flightPath.setMap(null);
	flightPath.getPath().clear();

}

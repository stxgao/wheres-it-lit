/*var venues=[];



  $.ajax({
    url: 'http://api.bandsintown.com/artists/Logic/events?format=json&app_id=NWHACKS&date=all',
    crossDomain: true,
    dataType: 'jsonp',
    data: '',
    type: 'get',
    headers: {"Access-Control-Allow-Origin": "*"},
    success: function(data) {
      var jsonArray = data;
    var latLongList=[];
    for (var i = 0; i < jsonArray.length; i++) {
      //get a single jsonObject from the JsonFile
      var jsonObject = jsonArray[i];
      //get latitude from jsonObject
      var latitude = parseFloat(jsonObject.venue.latitude);
      //get longitude from jsonObject
      var longitude = parseFloat(jsonObject.venue.longitude);
      //put lat and long into single array
      var LatLong=[];
      venues.push({lat:latitude,lng:longitude});

    }


  }

});*/




var markers = [];
var pixelx = screen.width;
var pixely = screen.height;
var map;
var flightPath;

var ib;

function initialize() {

	var myOptions = {
		zoom: 1,
		center: new google.maps.LatLng(49.2611, -123.2531),
		//mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map"), myOptions);
 	ib = new InfoBox();
 	google.maps.event.addListener(map, "click", function() { ib.close() });

	infowindow = new google.maps.InfoWindow({
    	content: "loading..."
	});

	flightPath = new google.maps.Polyline({
		path: [],
		strokeColor: '#000000',
		strokeOpacity: 1.0,
		strokeWeight: 3,
		geodesic: true
	});
	flightPath.setMap(map);


}

//(new google.maps.LatLng(venues[i].lat, venues[i].lng)


function drop() {
	clearMarkers();
	flightPath.setMap(map);
	for (var i = 0; i < venues.length; i++) {
		addMarkerWithTimeout(venues[i], i * 200);
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
  },i * 200);

}

function addMarkerWithTimeout(location, timeout) {
	window.setTimeout(function() {
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			animation: google.maps.Animation.DROP,
			clickable: true,
			title: "Click for more info - STEVEN",
			html: "I'm Mr. Meeseeks look at me!"

		});
		// Begin example code to get custom infobox
		var boxText = document.createElement("div");
		boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background: yellow; padding: 5px;";
		boxText.innerHTML = marker.html;


		var myOptions = {
			content: boxText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-140, 0)
			,zIndex: null
			,boxStyle: {
				background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/tags/infobox/1.1.12/examples/tipbox.gif') no-repeat"
				,opacity: 0.75
				,width: "280px"
			}
			,closeBoxMargin: "10px 2px 2px 2px"
			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			,infoBoxClearance: new google.maps.Size((pixelx-280)/2,pixely/2)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		};
    // end example code for custom infobox

    google.maps.event.addListener(marker, "click", function (e) {
    	ib.setOptions(myOptions);
    	ib.open(map, this);
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

google.maps.event.addDomListener(window, 'load', initialize);

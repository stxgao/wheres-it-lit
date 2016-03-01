
var markers = [];
var heatData=[];
var pixelx = screen.width;
var pixely = screen.height;
var map;
var flightPath;

var ib;

function initialize() {

	var myOptions = {
		zoom: 4,
		center: new google.maps.LatLng(37.090, -95.712),
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
	function setup(){
		var temp=dataSet.slice();
		console.log(temp[1]);
		var tofind=[];
		var max=1.0;
		heatData=[];
		while (temp.length>0){
			tofind=[temp[0].venueCity,temp[0].venueCountry,temp[0].venueRegion];
			heatData.push({"location":tofind,"vDate":[temp[0].venueDate],"ll":temp[0].latlng,"vCity":tofind[0]});
			var counter = 1;

			for (var i=1;i<temp.length;i++){
				if (temp[i].venueCity==tofind[0]&&temp[i].venueCountry==tofind[1]&&temp[i].venueRegion==tofind[2]){
					heatData[heatData.length-1].vDate.push(temp[i].venueDate);

					temp.splice(i,1);
					i--;
					counter++;

				}
			}
			if (counter >max){
				max=counter;
			}
			temp.shift();
		}
		clearMarkers();
		if (cityCircle!=null){
			cityCircle.setMap(null);
		}
		for (var i=0;i<heatData.length;i++) {
			
			addMarkerWithTimeout(new google.maps.LatLng(heatData[i].ll), 0, i,1);
    		// Add the circle for this city to the map.
    		var cityCircle = new google.maps.Circle({
    			strokeColor: '#FF0000',
    			strokeOpacity: 0.8,
    			strokeWeight: 0,
    			fillColor: '#FF0000',
    			fillOpacity: (heatData[i].vDate.length-1)/(max)*0.5+0.2,
    			//heatData[i].vDate.length/(max*1.0)*0.9+0.1
    			map: map,
    			center: new google.maps.LatLng(heatData[i].ll),
    			radius: 70000
    		});
    		console.log(heatData.length);
		}
	}
function str(date,City){
	var re;
	var day; 
	re="<p>"+City+"</p>"+"<p>"+"</p>"+"<p>"+"Date:"+"</p>"+"<p>";
	for (var i=0;i<date.length;i++){
		day= new Date(date[i]);
		day.toString()
		re+=day+"</p>"+"<p>";
	}
	return re;
}

function drop() {
	clearMarkers();
	flightPath.setMap(map);
	for (var i = 0; i < dataSet.length; i++) {
		addMarkerWithTimeout(dataSet[i].latlng, i * 200, i,0);
	}

	for (var i = 0; i < dataSet.length; i++) {
		addLatLng(dataSet[i].latlng, i);
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

function addMarkerWithTimeout(location, timeout, index, tf) {
	window.setTimeout(function() {
		if( tf ==0){
			var marker = new google.maps.Marker({
			position: location,
			map: map,
			//animation: google.maps.Animation.DROP,
			clickable: true,
			title: "Click for more info - STEVEN",
			//region may be weird, so we need a try catch
			html: "<p>" + dataSet[index].venueName + "</p>" + "<p>" + dataSet[index].venueDate + "</p>" + "<p>" + dataSet[index].venueCity + ", " + dataSet[index].venueRegion + ", " + dataSet[index].venueCountry + "</p>"

		});
		}else{
			var marker = new google.maps.Marker({
			position: location,
			map: map,
			//animation: google.maps.Animation.DROP,
			clickable: true,
			title: "Click for more info - STEVEN",
			//region may be weird, so we need a try catch
			html: str(heatData[index].vDate,heatData[index].vCity)
		});}
		// Begin example code to get custom infobox
		var boxText = document.createElement("div");
		boxText.style.cssText = "color: white; border: 1px solid black; margin-top: 2px; background: grey; padding: 5px;";
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



function parse(search_url){
 $.ajax({
    url:search_url,
    crossDomain: true,
    dataType: 'jsonp',
    data: '',
    type: 'get',
    headers: {"Access-Control-Allow-Origin": "*"},
    success: function(data) {

    	var jsonArray = data;
		for (var i = 0; i < jsonArray.length; i++) {
			//get a single jsonObject from the JsonFile
			var jsonObject = jsonArray[i];
			//get latitude from jsonObject
			var latitude = parseFloat(jsonObject.venue.latitude);
			//get longitude from jsonObject
			var longitude = parseFloat(jsonObject.venue.longitude);
			//put lat and long into single array
      		venues.push({lat:latitude,lng:longitude});
		}

		for (var i = 0; i < jsonArray.length; i++) {
			//get a single jsonObject from the JsonFile
			var jsonObject = jsonArray[i];
			//get artistName from jsonObject
			var artist = jsonObject.artists[0].name;

			//get venueinfo from jsonObject
			var time = jsonObject.datetime;
			var venueN = jsonObject.venue.name;
			var venueC = jsonObject.venue.city;
			var venueCo = jsonObject.venue.country;
			var venueR = jsonObject.venue.region;
			var ticket = jsonObject.ticket_status;

			Info={};
			Info["ArtistName"]= artist;
			Info["venueDate"]= time;
			Info["venueName"]= venueN;
			Info["venueCity"]= venueC;
			Info["venueCountry"]= venueCo;
			Info["venueRegion"]= venueR;
			Info["ticketStatus"]= ticket;

			dataSet.push(Info);
		}

	}

  });
}

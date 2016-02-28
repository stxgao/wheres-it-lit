var dataSet=[];

 $.ajax({
    url: 'http://api.bandsintown.com/artists/Kanye%20West/events?format=json&app_id=NWHACKS&date=all',
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
			//get artistName from jsonObject
			var artist = jsonObject.artists[0].name;

			//get venueinfo from jsonObject
			var time = jsonObject.datetime;
			var venueN = jsonObject.venue.name;
			var venueC = jsonObject.venue.city;
			var venueCo = jsonObject.venue.country;
			var venueR = jsonObject.venue.region;
			var ticket = jsonObject.ticket_status;

			//put all info into single array
      		dataSet.push({lat:latitude,lng:longitude, ArtistName:artist, venueDate:time, venueName:venueN, venueCity:venueC,
      			venueCountry:venueCo, venueRegion:venueR,ticketStatus:ticket});
		}


		}

	}

  });

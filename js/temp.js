var venues=[];


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

  });

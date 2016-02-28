function setURL(){
	var url1 = "api.bandsintown.com/artists/";
	var urlName = input1.value.replace(/ /g,"%20");
	//alert(urlName);
	var urlEnd = "/events?format=json&app_id=NWHACKS&date=all";
	var comb = url1 + urlName + urlEnd;
	alert(comb);
}

function setURL(){
	var url1 = "bandsintown.com/";
	var urlName = input1.value.replace(/ /g,"%20");
	//alert(urlName);
	var urlEnd = "/events?format=json&app_id=YOUR_APP_ID&date=all";
	var comb = url1 + urlName + urlEnd;
	alert(comb);
}

// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {
	$.get(weekly_quakes_endpoint, function(data){
		console.log(data);
		var source = $('#quakes-list').html();
		var template = Handlebars.compile(source);
		var hmm = template({quake: data.features});
		$("#info").append(hmm);

		for (var item in data.features){
			var latitude = data.features[item].geometry.coordinates[0];
			var longitude = data.features[item].geometry.coordinates[1];
			var title = data.features[item].properties.title;

			var marker = new google.maps.Marker({
				position: {lat: latitude, lng: longitude},
				map: map,
				title: title

			});
		}

	});
	var map;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 39.76, lng: -105.01},
			zoom: 8
		});
	}

	initMap();

	var marker = new google.maps.Marker({
		position: {lat: 39.76, lng: -105.01},
		map: map,
		title: 'Hello World!'

	});

});
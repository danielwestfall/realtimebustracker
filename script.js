function switchLine(line){
var myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=ddd8e249dcd6cce5220655528e9813aa21615584664");

var requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow'
};


	fetch("https://api.tfl.gov.uk/Line/" + line + "/Route/Sequence/inbound?app_id=MIT%20xPro%20Homework&app_key=03cd84bdd6b540a8a6559c46c4ddf806", requestOptions)
		.then(response => response.json())
		.then(data => console.log(data.lineStrings.toLocaleString('en', { timeZone: 'UTC' }).substring(3,str.length - 3).split(,)))
		.catch(error => console.log('error', error));
		

	map.on('load', function () {
		map.addSource('route', {
		'type': 'geojson',
		'data': {
		'type': 'Feature',
		'properties': {},
		'geometry': {
		'type': 'LineString',
		'coordinates': data.lineStrings.flat(2)
		}
		}
		});
		map.addLayer({
		'id': 'route',
		'type': 'line',
		'source': 'route',
		'layout': {
		'line-join': 'round',
		'line-cap': 'round'
		},
		'paint': {
		'line-color': '#FFF',
		'line-width': 18
		}
		});
		});
};
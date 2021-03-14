mapboxgl.accessToken = 'pk.eyJ1IjoiZGFud2VzdGZhbGwiLCJhIjoiY2tsdm9sMTZ2MDE0ZzJwbzNsZjZnanR3diJ9.siHEwArUzuKkseW3Xa72tg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/danwestfall/ckm70cxfd1tot17m894ctkfqv',
    center: [-0.115, 51.500],
    zoom: 10.0,
    });

map.on('load', function () {
    map.addControl(
    new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    }));

var geojson = {
	'type': 'FeatureCollection',
	'features': [
		{
		'type': 'Feature',
		'geometry': {
			'type': 'LineString',
			'coordinates': [[0, 0]]
			}
		}
	]
};

    map.addSource('line', {
            'type': 'geojson',
            'data': geojson
        });


    map.addLayer({
		'id': 'line-animation',
		'type': 'line',
		'source': 'line',
		'layout': {
			'line-cap': 'round',
			'line-join': 'round'
		},
		'paint': {
			'line-color': '#ed6498',
			'line-width': 5,
			'line-opacity': 0.8
		}
	});
})

async function switchLine(lineNumber){
	var myHeaders = new Headers();
	myHeaders.append("Cookie", "__cfduid=ddd8e249dcd6cce5220655528e9813aa21615584664");
	
	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	}
	console.log(lineNumber);
	let url = "https://api.tfl.gov.uk/Line/" + lineNumber + "/Route/Sequence/inbound?app_id=MIT%20xPro%20Homework&app_key=03cd84bdd6b540a8a6559c46c4ddf806"

	console.log(url)

	let response = await fetch(url , requestOptions);
	var busJson = await response.json();
	console.log(busJson);
	
	let coordsLine = JSON.parse(busJson.lineStrings);

	console.log(JSON.parse(busJson.lineStrings));
	geojson.features[0].geometry.coordinates = coordsLine;

};



/*
	map.addSource(
		'route', {
			'type': 'geojson',
				'data': {
					'type': 'Feature',
					'properties': {},
					'geometry': {
						'type': 'LineString',
						'coordinates': coordsLine
					}
				}
			}
		);
		
		
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
*/

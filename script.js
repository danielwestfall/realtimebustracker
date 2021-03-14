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


};



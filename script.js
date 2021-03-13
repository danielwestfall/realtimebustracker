var myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=ddd8e249dcd6cce5220655528e9813aa21615584664");

var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
};

fetch("https://api.tfl.gov.uk/Line/8/Status?app_id=MIT%20xPro%20Homework&app_key=03cd84bdd6b540a8a6559c46c4ddf806", requestOptions)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));

	mapboxgl.accessToken = 'pk.eyJ1IjoiZGFud2VzdGZhbGwiLCJhIjoiY2tsdm9sMTZ2MDE0ZzJwbzNsZjZnanR3diJ9.siHEwArUzuKkseW3Xa72tg';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/danwestfall/ckm70cxfd1tot17m894ctkfqv',
    center: [-0.115, 51.500],
    zoom: 10.0,
    });

    map.addControl(
    new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    })
);
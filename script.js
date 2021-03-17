
async function switchLine(lineNumber){

    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/danwestfall/ckm70cxfd1tot17m894ctkfqv',
    center: [-0.115, 51.500],
    zoom: 10.0,
    });

	var myHeaders = new Headers();
	myHeaders.append("Cookie", "__cfduid=ddd8e249dcd6cce5220655528e9813aa21615584664");

	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	}
	
	let url = "https://api.tfl.gov.uk/Line/" + lineNumber + "/Route/Sequence/inbound?app_id=MIT%20xPro%20Homework&app_key=03cd84bdd6b540a8a6559c46c4ddf806"
    let url2 = "https://api.tfl.gov.uk/Line/" + lineNumber + "/Arrivals?app_id=MIT%20xPro%20Homework&app_key=03cd84bdd6b540a8a6559c46c4ddf806"

	let response = await fetch(url , requestOptions);
	let responseLive = await fetch(url2 , requestOptions);
    var busJson = await response.json();
    var busLive = await responseLive.json();

console.log(busJson);
console.log(busLive);

coordsLine = JSON.parse(busJson.lineStrings);


var geojson = {
	'type': 'Feature',
	'properties': {},
	'geometry': {
	'type': 'LineString',
	'coordinates': coordsLine[0]
	}
	};

map.addSource('route', {
	'type': 'geojson',
	'data': geojson
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
	'line-width': 3
	}
    
	});

    map.addLayer({
    'id': 'markers',
    'type': 'symbol',
	'source': 'route',
    'layout': {
    'icon-allow-overlap': true
    }
    });



var coordinates = coordsLine[0];

var bounds = coordinates.reduce(function (bounds, coord) {
    return bounds.extend(coord);
        }, 
    new mapboxgl.LngLatBounds([coordinates[0], coordinates[0]]));

    map.fitBounds(bounds, {
        padding: 20
    });

map.on('click', function(e) {

});

const data = busJson.stations;
const stationData = busJson.orderedLineRoutes[0].naptanIds
const length = data.length;

var busStops = [];

for (let i = 0; i < length; i++) {

    let a = data[i];
    let bsName = a.name;
    let bsCoord = [a.lon, a.lat]
    let lineListing = "| ";
    let itemNum = i;
    let stationNaptanId = stationData[i]

    for (let j = 0; j < a.lines.length; j++) {
            const b = a.lines[j].name;
            lineListing = lineListing +  b.toString() + " | ";
        };

    busStops.push([itemNum, bsName, bsCoord, lineListing, stationNaptanId])

}


busStops.forEach(element =>

    element.itemNum = new mapboxgl.Marker()
        .setLngLat([element[2][0], element[2][1]])
        .setPopup(new mapboxgl.Popup({ offset: [0, -15] })
        .setHTML('<h3>' + element[1] + '</h3><p> Lines that service this route: <br>' + element[3] + '</p>'))
        .addTo(map)
)

function liveBusData(){

let currentBuses = [];
let liveData = busLive;

for (let m = 0; m < liveData.length; m++) {

let z = busLive[m];
let itemNum = m;
let vehicleId = z.vehicleId;
let vehicleLastStop = z.stationName;
let timeToNextStop = z.timeToStation;
let busDirection = z.direction;
let busDestination = z.destinationName;
let upcomingStop = z.towards;
let thisNaptan = z.naptanId;

var index = currentBuses.findIndex(x => x.vid === vehicleId); 

index === -1 ? currentBuses.push({iNum: itemNum, vid: vehicleId, dir: busDirection, last: vehicleLastStop, next: upcomingStop, time: timeToNextStop, final: busDestination, naptanId: thisNaptan}) : console.log("object already exists")
}

console.log(currentBuses);

for (let m = 0; m < currentBuses.length; m++) {
    const thisBusLocation = currentBuses[m];
    let busLastStop = thisBusLocation.naptanId;

    for (let q = 0; q < stopData.length; q++) {
        const stopId = stopData[q];
        if (busLastStop == stopId.ATCOCode){
            thisBusLocation.lastCoords = [stopId.Longitude, stopId.Latitude];
        }
    }

    
}

currentBuses.forEach(element =>

    element.iNum = new mapboxgl.Marker({
            color: "#800080",
            
            })
        .setLngLat(element.lastCoords)
        .setPopup(new mapboxgl.Popup({ offset: [0, -15] })
        .setHTML('<h3> Bus: ' + element.vid + 
                '</h3><h5> Direction: ' + element.dir + 
                '</h5><h5>Last Stop: ' + element.last + 
                '</h5><h5>Next Stop: ' + element.next +
                '</h5><h5>Time to next stop approx ' + Math.round((element.time / 60), 1) + ' minutes' + 
                '</h5><h5>Line ends at: ' + element.final +                 
                '</h5></p>'))
        .addTo(map)
)
console.log("test");
};

setInterval(liveBusData, 30000);

};

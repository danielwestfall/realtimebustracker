import React from 'react';
import Button from 'react-bootstrap/Button';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Container from 'react-bootstrap/Container';

const List = () => {

async function switchLine(lineNumber){

// //Setup the map
// let map = new mapboxgl.Map({
//      container: 'map',
//      style: 'mapbox://styles/danwestfall/ckm70cxfd1tot17m894ctkfqv',
//      center: [-0.115, 51.500],
//      zoom: 10.0,
// });

// //Bus line API requirements
// const myHeaders = new Headers();
// 	myHeaders.append("Cookie", "__cfduid=ddd8e249dcd6cce5220655528e9813aa21615584664");

// const requestOptions = {
// 		method: 'GET',
// 		headers: myHeaders,
// 		redirect: 'follow'
// 	}

// //Create requests based on bus line via API call
// let url = "https://api.tfl.gov.uk/Line/" + lineNumber + "/Route/Sequence/inbound?app_id=MIT%20xPro%20Homework&app_key=03cd84bdd6b540a8a6559c46c4ddf806"
// let url2 = "https://api.tfl.gov.uk/Line/" + lineNumber + "/Arrivals?app_id=MIT%20xPro%20Homework&app_key=03cd84bdd6b540a8a6559c46c4ddf806"

// //Receive API request
// let response = await fetch(url , requestOptions);
// let busJson = await response.json();

// console.log(busJson);

// //Parse one part of JSON data (It was a string containing an array, needed just an array)
// let coordsLine = JSON.parse(busJson.lineStrings);

// //Create the LineString that runs along the bus route using parsed JSON string
// let geojson = {
// 	'type': 'Feature',
// 	'properties': {},
// 	'geometry': {
//         'type': 'LineString',
//         'coordinates': coordsLine[0]
//         }
// };

// //Add map source - using declared geojson feature
// map.addSource('route', {
// 	'type': 'geojson',
// 	'data': geojson
// });

// //Add layer to map for geojson
// map.addLayer({
// 	'id': 'route',
// 	'type': 'line',
// 	'source': 'route',
// 	'layout': {
// 	'line-join': 'round',
// 	'line-cap': 'round'
// 	},
// 	'paint': {
// 	'line-color': '#FFF',
// 	'line-width': 3
// 	}
    
// });

// //Add layer to map for markers
// map.addLayer({
//     'id': 'markers',
//     'type': 'symbol',
// 	'source': 'route',
//     'layout': {
//     'icon-allow-overlap': true
//     }
// });

// let coordinates = coordsLine[0];

// //Gets coordinates from linestring array - reduces them and uses them to zoom and focus on the line
// let bounds = coordinates.reduce(function (bounds, coord) {
//         return bounds.extend(coord);
//         }, 
//     new mapboxgl.LngLatBounds([coordinates[0], coordinates[0]])
//     );

// map.fitBounds(bounds, {
//     padding: 40
//     });

// //Creates gets locations of bus stops using coordinates
// const data = busJson.stations;
// const stationData = busJson.orderedLineRoutes[0].naptanIds;
// const length = data.length;

// let busStops = [];

// //Creates an array of information for each stop
// for (let i = 0; i < length; i++) {

//     let a = data[i];
//     let bsName = a.name;
//     let bsCoord = [a.lon, a.lat];
//     let lineListing = "| ";
//     let itemNum = i;
//     let stationNaptanId = stationData[i];

//     for (let j = 0; j < a.lines.length; j++) {
//             const b = a.lines[j].name;
//             lineListing = lineListing +  b.toString() + " | ";
//         };

//     busStops.push([itemNum, bsName, bsCoord, lineListing, stationNaptanId]);

// };

// //Starts the bus location function so you don't have to wait for the setInterval to go all 30 sec before the busses pop up
// liveBusData();

// //Creates popup when bus stop is clicked - gives relevant information from the array we created
// busStops.forEach(element =>

//     element.itemNum = new mapboxgl.Marker()
//         .setLngLat([element[2][0], element[2][1]])
//         .setPopup(new mapboxgl.Popup({ offset: [0, -15] })
//         .setHTML('<h3>' + element[1] + '</h3><p> Lines that service this route: <br>' + element[3] + '</p>'))
//         .addTo(map)
// );

// //Creates a global array to fill with markers that show bus location so we can remove and reload new positions
// let busMarkers = [];

// async function liveBusData(){
    
//     let responseLive = await fetch(url2 , requestOptions);
//     var busLive = await responseLive.json();
//     let currentBuses = [];
//     let liveData = busLive;

// console.log(liveData);

// //Checks for existing bus markers, and removes them if they exist
// if (busMarkers!==null) {
//     for (var i = busMarkers.length - 1; i >= 0; i--) {
//         busMarkers[i].remove();
//     }
// };

// //Sets busMarkers to empty just in case 
// busMarkers = [];

// //Loops over bus status data - uses the naptanID for the last stop and compares it to a file containing all naptanIDs and their coordinates
// //Bus status didn't come with live gps coordinates - their current given location is the last naptanID they were or are at
// for (let m = 0; m < liveData.length; m++) {

//     let z = busLive[m];
//     let itemNum = m;
//     let vehicleId = z.vehicleId;
//     let vehicleLastStop = z.stationName;
//     let timeToNextStop = z.timeToStation;
//     let busDirection = z.direction;
//     let busDestination = z.destinationName;
//     let upcomingStop = z.towards;
//     let thisNaptan = z.naptanId;
//     let index = currentBuses.findIndex(x => x.vid === vehicleId); 

// //Bus status data isn't all new - some of the previous data is left so busses can be listed multiple times in multiple locations
// //Checks the newest data and takes the first instance (newest) and old instances are discarded
//     index === -1 ? currentBuses.push({
//                     iNum: itemNum, 
//                     vid: vehicleId, 
//                     dir: busDirection, 
//                     last: vehicleLastStop, 
//                     next: upcomingStop, 
//                     time: timeToNextStop, 
//                     final: busDestination, 
//                     naptanId: thisNaptan
//                     }) 
//             : console.log("object already exists")
// };

// //Compares bus naptanID to file containing all naptanIDs and their coords
// for (let m = 0; m < currentBuses.length; m++) {
//     let thisBusLocation = currentBuses[m];
//     let busLastStop = thisBusLocation.naptanId;
//     for (let q = 0; q < stopData.length; q++) {
//         let stopId = stopData[q];
//         if (busLastStop == stopId.ATCOCode){
//             thisBusLocation.lastCoords = [stopId.Longitude, stopId.Latitude];
//             };
//     };

// };

// //Dynamically creates markers with popups for each bus and adds their ID to an array so they can be removed later
// currentBuses.forEach(element => {
//         element.iNum = new mapboxgl.Marker({color: "#800080",})
//             .setLngLat(element.lastCoords)
//             .setPopup(new mapboxgl.Popup({ offset: [0, -15] })
//             .setHTML('<h3> Bus: ' + element.vid + 
//                     '</h3><h5> Direction: ' + element.dir + 
//                     '</h5><h5>Last Stop: ' + element.last + 
//                     '</h5><h5>Next Stop: ' + element.next +
//                     '</h5><h5>Time to next stop approx ' + Math.round((element.time / 60), 1) + ' minutes' + 
//                     '</h5><h5>Line ends at: ' + element.final +                 
//                     '</h5></p>'))
//             .addTo(map);
//         busMarkers.push(element.iNum);
//         }
        
//     );

// console.log(currentBuses);
// console.log(busMarkers);
// };

// //Reload status every 30 seconds
// setInterval(liveBusData, 30000);

};

const busLines = [8,9,11,14,15,23,24,25,38,43,59,73,74,88,139,148,159,188,205,274,390,453];

function NumberList(props) {
const lines = props.busLines;
const lineSelectors = lines.map((number) =>
     <Button
          variant="primary"
          onClick={switchLine(number)}
          active>{number}</Button>
     );
     return (
          <Container fluid>
               {lineSelectors}
          </Container>
);};

     return (
          <NumberList busLines={busLines} />
     )
}

export default List

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
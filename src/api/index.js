import config from './config'

const { apikey } = config
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apikey}&format=json`

/*URL para obtener los paises segun standar de la ISO-361*/
const URLCountries = `https://restcountries.eu/rest/v2/all`;

function getArtists(country) {
	const url = URL.replace(':country', country)
	return fetch(url)
		.then(res => res.json())
		.then(json => json.topartists.artist)
}

function getCountries(){
	return fetch(URLCountries).then(function(resp){
		return resp.json();
	}).then(function(json){
		return json;
	})
}

export {
	getArtists,
	getCountries
}


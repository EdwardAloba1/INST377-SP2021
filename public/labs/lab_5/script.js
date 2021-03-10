/* eslint-disable max-len */
function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWxvYmExMjMiLCJhIjoiY2ttM3JxMzNtMDhmczJucWR4azJ3azVkcyJ9.X4dGg6xzb4DzhC5I2CTq0g'
}).addTo(mymap);
console.log('mymap',mymap)
  return map;
}


async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;

    //Endpoint link
     const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

     const cities = [];
     fetch(endpoint)
       .then(blob => blob.json())
       .then(data => cities.push(...data));

     function findMatches(wordToMatch, cities) {
       return cities.filter(place => {
         // here we need to figure out if the city or state matches what was searched
         const regex = new RegExp(wordToMatch, 'gi');
         // Can find results filtered from name, zip, city, and category
         return place.name.match(regex) || place.zip.match(regex) || place.city.match(regex) || place.category.match(regex)
       });
     }

     //Retrieves specific info from endpoint file
     function displayMatches() {
       const matchArray = findMatches(this.value, cities);
       const html = matchArray.map(place => {
         const regex = new RegExp(this.value, 'gi');
         const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
         const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
         const restaurantName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
         const restaurantType = place.category.replace(regex, `<span class="hl">${this.value}</span>`);
         const address = place.address_line_1.replace(regex, `<span class="hl">${this.value}</span>`);
         const zipcode = place.zip.replace(regex, `<span class="hl">${this.value}</span>`);

         //Formats selected info
         return `
           <li>
             <span class ="restaurant"><b>${restaurantName}</b></span><br>
             <span class = "address">${address}</span><br>
             <br/>
           </li>
           
         `;
       }).join('');
       suggestions.innerHTML = html;
     }

     const searchInput = document.querySelector('.search');
     const suggestions = document.querySelector('.suggestions');

     searchInput.addEventListener('change', displayMatches);
     searchInput.addEventListener('keyup', displayMatches);

     
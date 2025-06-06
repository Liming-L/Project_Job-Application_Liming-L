let map = undefined;

//showMap() displays the map
function showMap(lat,lon){
  let location = [lat, lon];
  // Line below needed to clear existing map object
  if (map) {
    map.remove();
  }
  // draws map at specified zoom level
  map = L.map("map").setView(location, 14);

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);

  let marker = L.marker(location).addTo(map);// places marker on map center (not reqd)
}     

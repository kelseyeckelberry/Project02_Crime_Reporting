/* eslint-disable */
// Initialize and add the map
const markerCluster = new MarkerClusterer(map, markers, {
  imagePath: `${path}/m`
});

const locations = [
  { lat: 38.980509171366094, lng: -94.69020214361967 },
  { lat: 38.98130945250535, lng: -94.69007114287267 },
  { lat: 38.98019187382965, lng: -94.68945155264056 },
  { lat: 38.979419841460995, lng: -94.68740563598648 }
];

// function to initialize map and display coordinates
function initMap() {
  const kansasCity = { lat: 39.099728, lng: -94.578568 };
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: kansasCity
  });
  const marker = new google.maps.Marker({
    position: kansasCity,
    map: map
  });
  const markers = locations.map((location, i) => {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length]
    });
  });
  new MarkerClusterer(map, markers, {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  });
}

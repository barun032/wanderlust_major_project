mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
// Set marker options.
const marker = new mapboxgl.Marker({
    color: "red",
    draggable: true
}).setLngLat(coordinates)
    .addTo(map);

// Create the popup
const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setHTML(`<h4>${listingTitle}</h4> <p>Actual location will be shared after booking!</p>`);

// Show the popup when hovering over the marker
marker.getElement().addEventListener('mouseenter', () => {
    const markerLngLat = marker.getLngLat();
    const popupLngLat = new mapboxgl.LngLat(markerLngLat.lng, markerLngLat.lat); // Adjust the latitude as needed
    popup.setLngLat(popupLngLat).addTo(map);
  });
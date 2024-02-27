let geocoder;
let map;
function initMapAndGeocode() {
  geocoder = new google.maps.Geocoder();
  let latlng = new google.maps.LatLng(-50.607037624196714, 165.97458631677614);
  const mapID = "bc62d5e70866cb03";
  let mapOptions = {
    zoom: 13,
    center: latlng,
    mapId: mapID,
  };
  map = new google.maps.Map(document.getElementById("map-holder"), mapOptions);
}

function geocodeSearch() {
  let address = document.getElementById("search-input").value;
  const { AdvancedMarkerElement } = google.maps.importLibrary("marker");
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      map.setCenter(results[0].geometry.location);
      let marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode lyckades inte på grund av följande anledning: " + status);
    }
  });
}

document
  .getElementById("search-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter" || KeyboardEvent.code === 13) {
      geocodeSearch();
    }
  });

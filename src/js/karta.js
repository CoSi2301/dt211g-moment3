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

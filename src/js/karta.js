var myMap = L.map("map-holder").setView(
  [-50.607037624196714, 165.97458631677614],
  13
);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(myMap);

let geocoder = L.Control.Geocoder.nominatim();
let showMarker;

function mapSearch() {
  let input = document.getElementById("search-input").value;
  if (input.length > 0) {
    geocoder.geocode(input, function (results) {
      if (results.length > 0) {
        let result = results[0];

        if (showMarker) {
          myMap.removeLayer(showMarker);
        }
        showMarker = L.marker([result.center.lat, result.center.lng])
          .addTo(myMap)
          .bounce()
          .on("click", function () {
            this.toggleBouncing();
          });
        myMap.setView([result.center.lat, result.center.lng], 13);
      } else {
        alert("Hittar ingen plats med det namnet, försök igen.");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("search-button").addEventListener("click", mapSearch);

  document
    .getElementById("search-input")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter" || KeyboardEvent.code === 13) {
        mapSearch();
      }
    });
});

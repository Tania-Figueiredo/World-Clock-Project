function updateTime(cityId, timeZone) {
  let dateElement = document.querySelector(`#${cityId}-date`);
  let timeElement = document.querySelector(`#${cityId}-time`);
  if (!dateElement || !timeElement) return;

  let cityTime = moment().tz(timeZone);
  dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
  timeElement.innerHTML = cityTime.format("HH:mm:ss");
}

function updateCityTimes() {
  updateTime("lisbon", "Europe/Lisbon");
  updateTime("madrid", "Europe/Madrid");
  updateTime("paris", "Europe/Paris");
  updateTime("rome", "Europe/Rome");
}

updateCityTimes();
let citiesInterval = setInterval(updateCityTimes, 1000);

let citySelect = document.querySelector("#city-select");

citySelect.addEventListener("change", function () {
  let selectedTimeZone = this.value;

  if (!selectedTimeZone) {
    let dynamicCity = document.querySelector(".dynamic-city");
    if (dynamicCity) {
      dynamicCity.remove();
    }

    document.querySelector(".cities-grid").style.display = "grid";

    updateCityTimes();
    citiesInterval = setInterval(updateCityTimes, 1000);
    return;
  }

  clearInterval(citiesInterval);

  document.querySelector(".cities-grid").style.display = "none";

  let previousCity = document.querySelector(".dynamic-city");
  if (previousCity) {
    previousCity.remove();
  }

  let cityElement = document.createElement("div");
  cityElement.classList.add("city", "dynamic-city");

  let cityName = selectedTimeZone.split("/")[1].replace("_", " ");
  cityElement.innerHTML = `
    <h2>${cityName}</h2>
    <div class="date" id="dynamic-date"></div>
    <div class="time" id="dynamic-time"></div>
  `;

  document.querySelector(".container").appendChild(cityElement);

  function updateSelectedCity() {
    let cityTime = moment().tz(selectedTimeZone);
    document.querySelector("#dynamic-date").innerHTML =
      cityTime.format("MMMM Do YYYY");
    document.querySelector("#dynamic-time").innerHTML =
      cityTime.format("HH:mm:ss");
  }

  updateSelectedCity();

  citiesInterval = setInterval(updateSelectedCity, 1000);
});

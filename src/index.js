function updateTime(cityId, timeZone) {
  let dateElement = document.querySelector(`#${cityId}-date`);
  let timeElement = document.querySelector(`#${cityId}-time`);

  if (dateElement && timeElement) {
    let time = moment().tz(timeZone);
    dateElement.innerHTML = time.format("MMMM Do YYYY");
    timeElement.innerHTML = time.format("HH:mm:ss");
  }
}

function updateAllTimes() {
  updateTime("lisbon", "Europe/Lisbon");
  updateTime("madrid", "Europe/Madrid");
  updateTime("paris", "Europe/Paris");
  updateTime("rome", "Europe/Rome");
}
updateAllTimes();
setInterval(updateAllTimes, 1000);

function showSingleCity(timeZone, cityName) {
  const grid = document.querySelector("#cities-grid");
  const single = document.querySelector("#single-city");
  const back = document.querySelector("#back-button-wrapper");

  grid.style.display = "none";
  back.classList.remove("hidden");

  let cityTime = moment().tz(timeZone);
  single.innerHTML = `
    <div class="city">
      <h2>${cityName}</h2>
      <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
      <div class="time">${cityTime.format("HH:mm:ss")}</div>
    </div>
  `;

  function updateSingle() {
    cityTime = moment().tz(timeZone);
    single.querySelector(".date").innerHTML = cityTime.format("MMMM Do YYYY");
    single.querySelector(".time").innerHTML = cityTime.format("HH:mm:ss");
  }

  setInterval(updateSingle, 1000);
}

document
  .querySelector("#city-select")
  .addEventListener("change", function (event) {
    const timeZone = event.target.value;

    if (!timeZone) return;

    if (timeZone === "current") {
      const currentZone = moment.tz.guess();
      const cityName =
        currentZone.replace("_", " ").split("/")[1] || "Current Location";
      showSingleCity(currentZone, cityName);
    } else {
      const cityName = event.target.options[event.target.selectedIndex].text;
      showSingleCity(timeZone, cityName);
    }
  });

document.querySelector("#back-button").addEventListener("click", function () {
  document.querySelector("#single-city").innerHTML = "";
  document.querySelector("#cities-grid").style.display = "grid";
  document.querySelector("#back-button-wrapper").classList.add("hidden");
  document.querySelector("#city-select").value = "";
});

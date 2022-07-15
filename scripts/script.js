const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const icon = document.querySelector(".icon");

const display = document.querySelector(".information");

const displayCard = (data) => {
  const cityDetail = data.cityDetail;
  const weatherDetail = data.weatherDetail;

  let srcLink = null;

  if (weatherDetail.IsDayTime) {
    srcLink = "day.svg.jpg";
  } else {
    srcLink = "night.jpg";
  }
  const iconSrc = `img/icons/${weatherDetail.WeatherIcon}.svg`;

  display.innerHTML = `<img src="${srcLink}" alt="card" class="card">
  <div class="icon">
                <img src="${iconSrc}" alt="">
            </div>
  <h3 class="city-name">${cityDetail.EnglishName}</h3>
  <div class="condition">${weatherDetail.WeatherText}</div>
  <div class="display">
      <span>${weatherDetail.Temperature.Metric.Value}</span>
      <span>&deg;C</span>`;

  if (display.classList.contains("none")) {
    display.classList.remove("none");
  }
};

const updateCity = async (city) => {
  const cityDetail = await getCity(city);
  const weatherDetail = await getWeather(cityDetail.Key);

  return {
    cityDetail,
    weatherDetail,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get city value
  const cityName = cityForm.city.value.trim();

  cityForm.reset();
  updateCity(cityName)
    .then((data) => {
      displayCard(data);
    })
    .catch((err) => console.log(err));

  localStorage.setItem("city", cityName);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => {
      displayCard(data);
    })
    .catch((err) => console.log(err));

  localStorage.setItem("city", cityName);
}

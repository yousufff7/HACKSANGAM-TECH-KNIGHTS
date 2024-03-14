const temp = document.getElementById("temp");
const date = document.getElementById("date-time");
const currentLocation = document.getElementById("location");
const condition = document.getElementById("condition");
const rain = document.getElementById("rain");
const mainIcon = document.getElementById("icon");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility");
const humidityStatus = document.querySelector(".humidity-status");
const airQuality = document.querySelector(".air-quality");
const airQualityStatus = document.querySelector(".air-quality-status");
const visibilityStatus = document.querySelector(".visibility-status");
const weatherCards = document.querySelector("#weather-cards");
const celciusBtn = document.querySelector(".celcius");
const fahrenheitBtn = document.querySelector(".fahrenheit");
const hourlyBtn = document.querySelector(".hourly");
const weekBtn = document.querySelector(".week");
const tempUnit = document.querySelectorAll(".temp-unit");
const searchForm = document.querySelector("#search");
const search = document.querySelector("#query");
const crops = document.getElementById("crops")
const cropshead = document.getElementById("cropshead")
let currentCity = "";
let currentUnit = "C";
let hourlyorWeek = "Week";

function getDateTime() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  hour = hour % 12;
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }

  let dayString = days[now.getDay()];
  return `${dayString}, ${hour}:${minute}`;
}

date.innerText = getDateTime();
setInterval(() => {
  date.innerText = getDateTime();
}, 1000);

function getPublicIp() {
  fetch("https://geolocation-db.com/json/", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentCity = data.city;
      getWeatherData(data.city, currentUnit, hourlyorWeek);
    });
}
getPublicIp();

function getWeatherData(city, unit, hourlyorWeek) {
  console.log(city);
  const apiKey = "2VXNCLWCN2QYBZTHRJU89EP8Q";
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())

    .then((data) => {
      let today = data.currentConditions;
      if (unit === "C") {
        temp.innerText = today.temp;
      } else {
        temp.innerText = celciusToFahrenheit(today.temp);
      }
      currentLocation.innerText = data.resolvedAddress;
      condition.innerText = today.conditions;
      rain.innerText = "Perc -" + today.precip + "%";
      windSpeed.innerText = today.windspeed;
      humidity.innerText = today.humidity + "%";
      visibility.innerText = today.visibility;
      airQuality.innerText = today.winddir;
      measureHumidityStatus(today.humidity);
      mainIcon.src = getIcon(today.icon);
      if (hourlyorWeek === "hourly") {
        updateForecast(data.days[0].hours, unit, "day");
      } else {
        updateForecast(data.days, unit, "week");
      }
      
      // Check if temperature is greater than 27°C
      if (parseInt(temp.innerText) > 27) {
        alert("The weather is not clear, you cant do your farming.");
      }

      // Check if temperature is greater than 27°C
      if (parseInt(temp.innerText) < 27) {
          alert("The weather is clear, you can do your farming.");
      }
    
  })

    .catch((err) => {
      alert("Invalid Entry");
    });
  }

function celciusToFahrenheit(temp) {
  console.log(temp);
  return ((temp * 9) / 5 + 32).toFixed(1);
}

function measureHumidityStatus(humidity) {
  if (humidity <= 30) {
    humidityStatus.innerText = "Low";
  } else if (humidity <= 60) {
    humidityStatus.innerText = "Moderate";
  } else {
    humidityStatus.innerText = "High";
  }
}

function getIcon(condition) {
  if (condition === "Partly-cloudy-day") {
    return "icons/sun/27.png";
  } else if (condition === "partly-cloudy-night") {
    return "icons/moon/15.png";
  } else if (condition === "rain") {
    return "icons/rain/39.png";
  } else if (condition === "clear-day") {
    return "icons/sun/26.png";
  } else if (condition === "clear-night") {
    return "icons/moon/10.png";
  } else {
    return "icons/sun/26.png";
  }
}

function getDayName(date) {
  let day = new Date(date);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day.getDay()];
}
function getHour(time) {
  let hour = time.split(":")[0];
  let min = time.split(":")[1];
  if (hour > 12) {
    hour = hour - 12;
    return `${hour}:${min} PM`;
  } else {
    return `${hour}:${min} AM`;
  }
}
function updateForecast(data, unit, type) {
  weatherCards.innerHTML = "";
  let day = 0;
  let numCards = 0;
  if (type === "day") {
    numCards = 24;
  } else {
    numCards = 7;
  }
  for (let i = 0; i < numCards; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    let dayName = getHour(data[day].datetime);
    if (type === "week") {
      dayName = getDayName(data[day].datetime);
    }
    
  
    let dayTemp = data[day].temp;
    if (unit === "F") {
      dayTemp = celciusToFahrenheit(data[day].temp);
    }
    let iconCondition = data[day].icon;
    let iconSrc = getIcon(iconCondition);
    let tempUnit = "°C";
    if (unit === "F") {
      tempUnit = "°F";
    }
   
    card.innerHTML = `
                        <h2 class="day-name">${dayName}</h2>
            <div class="card-icon">
              <img src="${iconSrc}" alt="" />
            </div>
            <div class="day-temp">
              <h2 class="temp">${dayTemp}</h2>
              <span class="temp-unit">${tempUnit}</span>
              
              </div>
             
      `;
    weatherCards.appendChild(card);
    weatherCards.appendChild(crops);
    

    day++;
  }
}

fahrenheitBtn.addEventListener("click", () => {
  changeUnit("F");
});
celciusBtn.addEventListener("click", () => {
  changeUnit("C");
});

function changeUnit(unit) {
  if (currentUnit !== unit) {
    currentUnit = unit;
    {
      tempUnit.forEach((elem) => {
        elem.innerText = `°${unit.toUpperCase()}`;
      });
      if (unit === "c") {
        celciusBtn.classList.add("active");
        fahrenheitBtn.classList.remove("active");
      } else {
        celciusBtn.classList.remove("active");
        fahrenheitBtn.classList.add("active");
      }
      getWeatherData(currentCity, currentUnit, hourlyorWeek);
    }
  }
}

hourlyBtn.addEventListener("click", () => {
  changeTimeSpan("hourly");
});
weekBtn.addEventListener("click", () => {
  changeTimeSpan("week");
});

function changeTimeSpan(unit) {
  if (hourlyorWeek !== unit) {
    hourlyorWeek = unit;
    if (unit === "hourly") {
      hourlyBtn.classList.add("active");
      weekBtn.classList.remove("active");
    } else {
      hourlyBtn.classList.remove("active");
      weekBtn.classList.add("active");
    }
    getWeatherData(currentCity, currentUnit, hourlyorWeek);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = search.value;
  if (location) {
    currentCity = location;
    getWeatherData(currentCity, currentUnit, hourlyorWeek);
  }
});

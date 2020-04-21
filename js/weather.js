var weatherCityCode = "";
var weatherApiKey = "";
var weatherUpdateMinutes = 10;
var weatherUpdateInterval = undefined;

// Source: https://openweathermap.org/weather-conditions
var weatherIconMapping = {
    '01d': 'day-sunny',
    '01n': 'night-clear',
    '02d': 'day-overcast',
    '02n': 'night-partly-cloudy',
    '03d': 'day-cloudy',
    '03n': 'night-cloudy',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'day-showers',
    '09n': 'night-showers',
    '10d': 'day-rain',
    '10n': 'night-rain',
    '11d': 'day-thunderstorm',
    '11n': 'night-thunderstorm',
    '13d': 'snowflake-cold',
    '13n': 'snowflake-cold',
    '50d': 'fog',
    '50n': 'fog'
}

function updateWeather() {
    if(weatherApiKey != "" && weatherCityCode !== "") {
        $.get(
            `https://api.openweathermap.org/data/2.5/weather?id=${weatherCityCode}&appid=${weatherApiKey}`,
            (result) => {
                console.log(result);
                $('#weatherCity').text(result.name);
                $('#weatherTemp').text(`${(result.main.temp - 273.15).toFixed(2)} ${"\260"}C`);
                $('#weatherIcon').attr('class', `wi wi-${weatherIconMapping[result.weather[0].icon]}`)
            }
        );
        $.get(
            `https://api.openweathermap.org/data/2.5/forecast?id=${weatherCityCode}&appid=${weatherApiKey}`,
            (result) => {
                console.log(result);
                
                let todayTemps = [];
                for (const w of result.list) {
                    let date = moment.utc(w.dt_txt);
                    if (date.isBefore(moment.utc().endOf('day'))) {
                        todayTemps.push(w.main.temp);
                    }
                }

                let todayHigh = -Infinity;
                let todayLow = Infinity;
                for (const t of todayTemps) {
                    if      (todayHigh < t) { todayHigh = t}
                    else if (todayLow > t ) { todayLow = t }
                }

                $('#weatherHigh').text(`${(todayHigh - 273.15).toFixed(2)} ${"\260"}C`);
                $('#weatherLow').text(`${(todayLow - 273.15).toFixed(2)} ${"\260"}C`);
                $('#weatherHiLoForecast').removeClass('disabled');
            }
        )
    }
}

function weatherInit() {
    updateWeather();
    try {
        clearInterval(weatherUpdateInterval);
    } catch {}
    weatherUpdateInterval = setInterval(updateWeather, weatherUpdateMinutes * 60 * 1000);
}
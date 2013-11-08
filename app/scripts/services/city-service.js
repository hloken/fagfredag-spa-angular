angular.module('yrApp').factory('cityService', function ($http, $q){
    var createForecast = function (forecastJson) {

        return {
            temperature : forecastJson.temperature[0].value,
            weatherIcon : "http://symbol.yr.no/grafikk/sym/b100/" + forecastJson.symbol[0].var + ".png",
            windDescription : forecastJson.windSpeed[0].name,
            windMps : forecastJson.windSpeed[0].mps,
            windDirection : forecastJson.windDirection[0].name,
            precipitation : forecastJson.precipitation[0].value,
            fromHours : new Date(forecastJson.from).getHours(),
            toHours : new Date(forecastJson.to).getHours(),
            from : forecastJson.from
        };
    }

    var createWeatherData = function (weatherDataJson) {
        var weatherData = {
            name : weatherDataJson.location[0].name[0],
            country : weatherDataJson.location[0].country[0]
        };

        weatherData.forecasts = [];

        weatherDataJson.forecast[0].tabular[0].time.forEach( function(forecastJson) {
            var forecast =  createForecast(forecastJson);

            weatherData.forecasts.push(forecast);
        })

        return weatherData;
    }

    return {
        getCityWeatherData : function (place) {
            var deferred = $q.defer();
            $http.get("http://yr-proxy.tosh.no/sted/" + place + "/varsel.json")
                .success(
                    function(data) {
                        var weatherDataJson = data.weatherdata;

                        var weatherData = createWeatherData(weatherDataJson);
                        deferred.resolve( weatherData )
                }).error( function(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
    };
});
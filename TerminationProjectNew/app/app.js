
var App = angular.module("App", []);

App.value("defaultCity", "Enter City");

App.service('locationService', function ($http) {
    this.getLocation = function () {
        return $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AlzaSyAQysYpEWqEZkg4bvm1SicYh7NhvAlHwvs');
    }
});

App.service('GetWeatherByCityService', function (WeatherApi) {
    this.getWeatherByCity = function (City) {
        return WeatherApi.requestWeatherByCity(City);
    }
});

App.factory('WeatherApi', function ($http) {
    var factory = {};
    factory.requestWeatherByCity = function (City) {
        var URL = 'https://api.openweathermap.org/data/2.5/weather?';
        var request = {
            url: URL,
            method: 'GET',
            params: {
                q: City,
                units: 'metric',
                appid: 'ce786550f7097ef314ec01eb7b3349f3'
            }
        };
        return $http(request);
    }
    return factory;
});


App.controller('WeatherCtrl', function ($scope, GetWeatherByCityService, locationService, defaultCity) {
    $scope.cityName = defaultCity;
    $scope.output = function () {
        GetWeatherByCityService.getWeatherByCity($scope.cityName).then(function (response) {
            $scope.city = response.data.name;
            $scope.temp = response.data.main.temp;
            $scope.wind = response.data.wind.speed;
            $scope.myImg = "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png";
            $scope.code = response.data.weather[0].description;
            $scope.hum = response.data.main.humidity;
            $scope.press = response.data.main.pressure;
            $scope.min = response.data.main.temp_min;
            $scope.max = response.data.main.temp_max;
            $scope.country = response.data.sys.country;
        });
    }
});
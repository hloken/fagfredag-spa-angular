angular.module('yrApp').controller('CityCtrl', function ($scope, cityService) {
    cityService.getCityWeatherData("Norge/Telemark/Sauherad/Gvarv").then(
        function(data) {
            $scope.locationData = data;
            $scope.currentForecast = data.forecasts[0];
            console.log($scope.currentForecast.from);
            $scope.tomorrow = new Date($scope.currentForecast.from).toDateString();
            console.log($scope.tomorrow);
        })
});
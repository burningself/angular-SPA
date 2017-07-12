(function(angular) {

  angular
    .module('moviecat.details', [])
    .config(['$routeProvider', function($routeProvider) {

      $routeProvider
        .when('/details/:id', {
          templateUrl: './details/view.html',
          controller: 'DetailsController'
        });
      
    }])
    .controller('DetailsController', ['$scope', '$routeParams', 'jsonpService', DetailsController]);

  function DetailsController($scope, $routeParams, jsonpService) {

    jsonpService.itcastJSONP('https://api.douban.com/v2/movie/subject/' + $routeParams.id,{}, function( data) {
      console.log(data);
      $scope.data = data;

      $scope.$apply();
    });
    
  }


})(angular);
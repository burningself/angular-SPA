(function(angular) {

  // /home_page
  // 首页模块

  angular
    .module('moviecat.home_page', [])
    .config(['$routeProvider', function($routeProvider, $locationProvider) {

      $routeProvider
        .when('/home_page', {
          templateUrl: './home_page/view.html'
        })
        // 项目中所有的路由都没有匹配，才会执行 otherwise
        .otherwise({
          redirectTo: '/home_page'
        });
  
    }]);

})(angular);
(function (angular) {
  // "use strict";

  // start your ride

  // 项目的主模块
  // 作用：加载项目中其他每个功能模块

  angular
    .module('moviecat', [
      // 主模块中只要引入了 ngRoute 那么所有其他的子模块中都可以使用!
      'ngRoute',
      // 首页模块
      'moviecat.home_page',
      'moviecat.service',
      // 需要将电影详情模块在电影列表模块之前引入, 因为有路由加载顺序的问题!!!
      'moviecat.details',
      'moviecat.movie_list',
      'moviecat.directive',

      /*'moviecat.in_theaters',
      'moviecat.coming_soon',
      'moviecat.top250',*/
    ])
    .config(['$locationProvider', function($locationProvider) {
      // 修改 1.6以上版本 angular 中路由的默认配置(! 前缀)
      $locationProvider.hashPrefix('');
    }])
    .controller('MainController', ['$scope', '$location', function($scope, $location) {
      // 搜索文本框
      $scope.searchText = '';
      // 搜索功能
      $scope.search = function() {
        if($scope.searchText.trim() === '') {
          return;
        }

        // 调用 $location.url() 方法, 改变url中整个路径(包含了路由以及参数)
        $location.url('/search/?q=' + $scope.searchText);
      };
    }]);

})(angular);
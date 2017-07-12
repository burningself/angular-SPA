(function (angular) {

  angular
    .module('moviecat.top250', [])
    .config(['$routeProvider', function ($routeProvider) {

      $routeProvider
        .when('/top250/:page?', {
          templateUrl: './top250/view.html',
          controller: 'In_theatersController'
        });

    }])
    .controller('In_theatersController', ['$scope', '$routeParams', '$route', 'jsonpService', In_theatersController]);

  function In_theatersController($scope, $routeParams, $route, jsonpService) {
    
    if($routeParams.page && $routeParams.page < 1) {
      $route.updateParams({page: 1});
      return;
    }

    // 当前页码
    $scope.page = $routeParams.page || '1';
    // 每页大小
    $scope.pageSize = 5;
    
    jsonpService.itcastJSONP('https://api.douban.com/v2/movie/top250', {
      count: $scope.pageSize,
      // 计算每页起始的索引号（条数的编号）
      start: ($scope.page - 1) * $scope.pageSize
    }, function( data ) {
      console.log(data);
      $scope.data = data;

      // 计算总页数：
      $scope.totalPage = Math.ceil( data.total / $scope.pageSize);
      
      if($routeParams.page > $scope.totalPage) {
        // 这个修改以后，需要 $apply() 才能进入到 angular执行的上下文
        $route.updateParams({page: $scope.totalPage});
      }
      $scope.$apply();
    });

    // 上一页和下一页方法：
    $scope.goPage = function( curPage ) {
      // 1 页码合法性校验
      if(curPage < 1 || curPage > $scope.totalPage) {
        return;
      }

      // 2 修改 按钮的样式


      // 3 更新 url 中页码
      // 只要路由发生变化以后，路由对应的控制器中的代码，会重新再执行一次
      // 这样，我们就可以重新发送 jsonp 请求，获取到最新页的数据了！
      $route.updateParams({page: curPage});
    };





  }

})(angular);
(function (angular) {

  angular
    .module('moviecat.movie_list', [])
    .config(['$routeProvider', function ($routeProvider) {

      $routeProvider
        // /:movieType/:page? 路由能够匹配：
        // /coming_soon/1
        // /top250/2
        // /in_theaters/3
        .when('/:movieType/:page?', {
          templateUrl: './movie_list/view.html',
          controller: 'MovieListController'
        });

    }])
    .controller('MovieListController', ['$scope', '$routeParams', '$route', 'jsonpService', MovieListController]);

  function MovieListController($scope, $routeParams, $route, jsonpService) {
    /*
      $routeParams:
      {
        movieType: 'top250',
        page: '1'
      }
    */
    console.log( $routeParams );
    // 加载动画开关
    $scope.isLoding = true;
    
    if($routeParams.page && $routeParams.page < 1) {
      $route.updateParams({page: 1});
      return;
    }

    // 当前页码
    $scope.page = $routeParams.page || '1';
    // 每页大小
    $scope.pageSize = 5;

    /*var obj = {
      count: $scope.pageSize,
      // 计算每页起始的索引号（条数的编号）
      start: ($scope.page - 1) * $scope.pageSize,
    };
    if( $routeParams.q ) {
      obj.q = $routeParams.q;
    }*/
    
    jsonpService.itcastJSONP('https://api.douban.com/v2/movie/' + $routeParams.movieType, {
      count: $scope.pageSize,
      // 计算每页起始的索引号（条数的编号）
      start: ($scope.page - 1) * $scope.pageSize,
      // 服务端需要哪一个参数，就获取哪一个参数，如果有多余参数，对接口也不会
      // 产生任何影响！因为 接口 不会获取它不需要的参数
      q: $routeParams.q || ''
    }, function( data ) {
      console.log(data);
      $scope.data = data;

      // 数据加载完成，关闭遮罩层
      $scope.isLoding = false;

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

      // 3 更新 url 中页码
      // 只要路由发生变化以后，路由对应的控制器中的代码，会重新再执行一次
      // 这样，我们就可以重新发送 jsonp 请求，获取到最新页的数据了！
      $route.updateParams({page: curPage});
    };

  }

})(angular);
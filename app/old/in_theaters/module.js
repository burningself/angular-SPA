(function (angular) {

  angular
    .module('moviecat.in_theaters', [])
    .config(['$routeProvider', function ($routeProvider) {

      // 可能出现的几种 url 路径情况：
      // #/in_theaters
      // #/in_theaters/1
      // #/in_theaters/2

      // #/in_theaters/:page?

      $routeProvider
        .when('/in_theaters/:page?', {
          templateUrl: './in_theaters/view.html',
          controller: 'In_theatersController'
        });

    }])
    .controller('In_theatersController', ['$scope', '$http', '$sce', '$routeParams', '$route', 'jsonpService', In_theatersController]);

  function In_theatersController($scope, $http, $sce, $routeParams, $route, jsonpService) {

    // 获取到url中的当前页码，如果获取 page 值为 undefined，此时就是没有页码
    // 表示第一页，所以，需要初始化默认值为：1 
    // console.log($routeParams);
    // 分页：
    // 每页大小： 5  --> pageSize    

    // 接口需要的参数：
    // 1 start 起始索引号
    // 2 count 每页大小

    // 第一页: 0 1 2 3 4
    // 第二页: 5 6 7 8 9
    // 第三页: 10 11 12 13 14
    // 第四页: 15 16 17 18 19

    // start = (当前页码 - 1) * 每页大小

    // 总页数: Math.ceil(总条数 / 每页大小)
    
    if($routeParams.page && $routeParams.page < 1) {
      $route.updateParams({page: 1});
      return;
    }

    // 当前页码
    $scope.page = $routeParams.page || '1';
    // 每页大小
    $scope.pageSize = 5;
    
    jsonpService.itcastJSONP('https://api.douban.com/v2/movie/in_theaters', {
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










    /*// url 中也不在需要 callback=JSON_CALLBACK
    // var src = 'http://v.showji.com/Locating/showji.com2016234999234.aspx?m=13916278541&output=json&timestamp=' + (new Date()-0);
    var src = 'https://api.douban.com/v2/movie/in_theaters';
    // https://api.douban.com/v2/movie/in_theaters?callback=angular.callbacks._0
    // 将 src 路径，添加到 angular请求的信任列表中
    var ret = $sce.trustAsResourceUrl(src);

    $http.jsonp(ret, {
      jsonpCallbackParam: 'callback'
    })
    .then(function( res ) {
      console.log(res);
    }, function(res) {
      console.log(res);
    })*/

    // $http 服务，是 angular 中用来发送ajax请求的
    /*// console.log('控制器执行了');
    $http({
      // 请求类型
      method: 'GET',
      // 请求地址
      url: './in_theaters/data.json'
    })
    .then(function successCallback(response) {
      // 成功的回调函数
      // console.log( response );
      console.log( response.data );
      $scope.data = response.data;
    }, function errorCallback(response) {
      // 失败的回调函数
      console.log( response );
    });*/

    /*$http
      .get('./in_theaters/data.json', {
        params: {name: 'jack', age: 18}
      })
      .then(function(res) {
        console.log(res);
      }, function() {

      });*/

    // 回调地狱：一层层的回调嵌套
    /*$.ajax({
      success: function() {

        $.ajax({
          success: function(){

          }
        })

      }
    })*/
  }

})(angular);
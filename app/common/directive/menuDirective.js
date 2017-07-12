(function (angular) {

  angular
    .module('moviecat.directive', [])
    .directive('menuActive', ['$location', function ($location) {
      return {
        templateUrl: './common/directive/view.html',
        link: function (scope, element, attribute) {
          // 监视 url中路径的变化
          scope.location = $location;
          scope.$watch('location.url()', function (curVale) {
            // console.log('当前路由为：', curVale );
            // 获取到的 url路由值： /top250/2
            // console.log(element);
            var aMenus = element.find('a');
            // console.log(aMenus);
            for (var i = 0; i < aMenus.length; i++) {
              var curLink = aMenus.eq(i),
                // #/in_theaters
                href = curLink.attr('href').substr(1); // '/in_theaters'

              // 判断url路由值是否包含着 当前菜单链接的 href 属性
              // 如果包含了，就让当前元素高亮
              if (curVale.startsWith(href)) {
                element.find('li').removeClass('active');
                curLink.parent().addClass('active');
                break;
              }
            }
          });
        }
      };
    }]);

})(angular);
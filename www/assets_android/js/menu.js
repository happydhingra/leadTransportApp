angular.module('RoutingApp', ['ngRoute'])
.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/abc', {
            templateUrl: 'login.html'
        })
        .when('/second', {
            templateUrl: 'second.html'
        })
        .otherwise({
				redirectTo: '/'
			});
}]);
var app = angular.module('websiteApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'underscore']);

app.run(['$rootScope', '$http', '$window', '$location',
	function($rootScope, $http, $window, $location) {
	}]);

app.config(function($routeProvider, $locationProvider)	 {
	$routeProvider.when('/', {
		templateUrl: 'home.html',
		controller: 'homeController'
	})
	.when('/shelf', {
		templateUrl: 'shelf.html',
		controller: 'shelfController'
	})
	.otherwise({redirectTo: '/'})

	$locationProvider.html5Mode(true);
});
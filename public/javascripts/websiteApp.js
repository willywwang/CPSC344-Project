var app = angular.module('websiteApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'underscore', 'toaster']);

app.run(['$rootScope', '$http', '$window', '$location',
	function($rootScope, $http, $window, $location) {
		$window.sessionStorage.setItem('comparison', true);
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
	.when('/comparison', {
		templateUrl: 'comparison.html',
		controller: 'comparisonController'
	})
	.otherwise({redirectTo: '/'})

	$locationProvider.html5Mode(true);
});
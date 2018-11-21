var app = angular.module('websiteApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'toaster', 'angularjs-dropdown-multiselect']);

app.run(['$rootScope', '$http', '$window', '$location',
	function($rootScope, $http, $window, $location) {}]);

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
	.when('/cart', {
		templateUrl: 'cart.html',
		controller: 'cartController' 
	})
	.otherwise({redirectTo: '/'})

	$locationProvider.html5Mode(true);
});
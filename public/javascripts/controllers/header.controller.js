angular.module('websiteApp')
.controller('headerController', ['$scope', '$rootScope', '$http', '$window', '$uibModal',
	function($scope, $rootScope, $http, $window, $uibModal) {
		$scope.searchUpdated = function() {
			console.log($scope.searchTerm);
		}
	}]);
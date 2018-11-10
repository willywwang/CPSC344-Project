angular.module('websiteApp')
.controller('headerController', ['$scope', '$rootScope', '$http', '$window', '$uibModal',
	function($scope, $rootScope, $http, $window, $uibModal) {
		$scope.searchUpdated = function() {
			$rootScope.$broadcast('searchUpdated', { searchTerm: $scope.searchTerm });

			if ($scope.searchTerm) {
				$window.sessionStorage.setItem('search', $scope.searchTerm);
			} else {
				$window.sessionStorage.removeItem('search');
			}
		};

		($scope.init = function() {
			$scope.searchTerm = $window.sessionStorage.getItem('search', $scope.searchTerm) || "";
			$scope.searchUpdated();
		})();
	}]);
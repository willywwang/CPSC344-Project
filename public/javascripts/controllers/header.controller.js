angular.module('websiteApp')
.controller('headerController', ['$scope', '$rootScope', '$http', '$window', '$uibModal',
	function($scope, $rootScope, $http, $window, $uibModal) {
		$scope.shoppingCount = 0;

		$scope.searchUpdated = function() {
			if ($scope.searchTerm) {
				$window.sessionStorage.setItem('search', $scope.searchTerm);
			} else {
				$window.sessionStorage.removeItem('search');
			}

			$rootScope.$broadcast('searchUpdated', { searchTerm: $scope.searchTerm });
		};

		$scope.$on('shoppingCartAdd', function(event, args) {
			$scope.shoppingCount++;
			$window.sessionStorage.setItem('shoppingCount', $scope.shoppingCount);
		});

		$scope.$on('shoppingCartRemove', function(event, args) {
			$scope.shoppingCount--;
			$window.sessionStorage.setItem('shoppingCount', $scope.shoppingCount);
		});

		($scope.init = function() {
			$scope.searchTerm = $window.sessionStorage.getItem('search') || "";
			$scope.searchUpdated();

			var count = $window.sessionStorage.getItem('shoppingCount') || '0';
			$scope.shoppingCount = parseInt(count);
		})();
	}]);
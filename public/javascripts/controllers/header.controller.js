angular.module('websiteApp')
.controller('headerController', ['$scope', '$rootScope', '$http', '$window', '$uibModal',
	function($scope, $rootScope, $http, $window, $uibModal) {
		var items = {
			cod: 3.99,
			grouper: 9.99,
			haddock: 12.99,
			halibut: 15.99,
			salmon: 11.99,
			campbellbeef: 3.39,
			kitchenchicken: 4.49,
			vegetable: 4.99,
			swansonbeef: 3.99,
			swansonchicken: 3.29
		};

		$scope.shoppingCount = 0;

		$scope.search = function() {
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
			calculateCosts();
		});

		$scope.$on('shoppingCartRemove', function(event, args) {
			$scope.shoppingCount--;
			$window.sessionStorage.setItem('shoppingCount', $scope.shoppingCount);
			calculateCosts();
		});

		($scope.init = function() {
			$scope.searchTerm = $window.sessionStorage.getItem('search') || "";
			$scope.search();

			var count = $window.sessionStorage.getItem('shoppingCount') || '0';
			$scope.shoppingCount = parseInt(count);

			calculateCosts();
		})();

		function calculateCosts() {
			$scope.cost = 0;

			Object.keys(items).forEach(function(item) {
				var quantity = $window.sessionStorage.getItem(item);

				if (quantity) {
					$scope.cost += parseInt(quantity) * items[item];
				}
			});
		}
	}]);